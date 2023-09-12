import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostAdvertisementActionsSupplierSide } from '../../states/postadvertisement-state/postadvertisement.actions';
import {
  selectPostAdvertisement,
  selectPostAdvertisements,
} from '../../states/postadvertisement-state/postadvertisement.selectors';
import { PostAdvertisement } from '../../models/post-advertisement';
import Swal from 'sweetalert2';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';
import { selectCropSpecializations } from '../../states/cropspecialization-state/cropspecialization.selectors';
import { CropSpecializationActions } from '../../states/cropspecialization-state/cropspecialization.actions';
import { CropSpecialization } from '../../models/crop-specialization';
import { FileDetails } from '../../models/fileDetails';
import { Router } from '@angular/router';
import { PostAdvertisementState } from '../../states/postadvertisement-state/postadvertisement.reducer';

@Component({
  selector: 'app-post-advertisement-list',
  templateUrl: './post-advertisement-list.component.html',
  styleUrls: ['./post-advertisement-list.component.scss'],
})
export class PostAdvertisementListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  selectedReadDate: string | undefined = '';
  cropTypes: CropSpecialization[] = [];
  selectedCropTypes: CropSpecialization[] = [];

  user: Supplier = { user: undefined };

  selectedPostAdvertisement?: PostAdvertisement;

  //Formgroups
  addPostAdvertisementForm: FormGroup;
  editPostAdvertisementForm: FormGroup;

  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  selectedImageEdit!: File;
  imagePreviewUrlEdit!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());
  selectCropSpecializations$ = this.store.select(selectCropSpecializations());

  measurementOptions = [
    { label: 'Kilograms (Kg)', value: 'kg' },
    { label: 'Tons (tn)', value: 'lb' },
    { label: 'Pounds (tn)', value: 'tn' },
    { label: 'Liters (L)', value: 'L' },
    { label: 'Gallons (gal)', value: 'gal' },
    { label: 'Sacks (sac)', value: 'sac' },
    { label: 'Boxes (bx)', value: 'bx' },
    { label: 'Crates', value: 'Crates' },
  ];

  constructor(
    private store: Store<PostAdvertisementState>,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private _router: Router
  ) {
    this.addPostAdvertisementForm = fb.group({
      postId: [0],
      cropName: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [, [Validators.required, Validators.min(0)]],
      measurement: ['', Validators.required],
      price: [, [Validators.required, Validators.min(0)]],
      datePosted: [''],
      dateModified: [''],
      cropSpecialization: [{}],
      supplier: [{}],
      postAdvertisementResponses: [[]],

      //for inserting and updating
      cropSpecializationId: [0],
      supplierId: [],
    });

    this.editPostAdvertisementForm = fb.group({
      postId: [0, Validators.required],
      cropName: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [, Validators.required],
      measurement: ['', Validators.required],
      price: [, Validators.required],
      datePosted: [''],
      dateModified: [''],
      cropSpecialization: [{}],
      supplier: [{}],
      postAdvertisementResponses: [[]],

      //for inserting and updating
      cropSpecializationId: [0],
      supplierId: [],
    });
  }

  ngOnInit() {
    this.supplierService
      .findOneByUserId(localStorage.getItem('userId') as any)
      .subscribe((data) => {
        this.user = data;
      });

    this.store.dispatch({
      type: PostAdvertisementActionsSupplierSide.GET_POSTADVERTISEMENT,
      supplierId: localStorage.getItem('userNo'),
    });

    this.store.dispatch({
      type: CropSpecializationActions.GET_CROPSPECIALIZATION,
    });

    this.selectPostAdvertisements$.subscribe((data) => {
      data.map((ads) => {
        if (
          this.filteredAdvertisements.find((item) => item.postId == ads.postId)
        ) {
          return;
        }
        this.filteredAdvertisements.push({
          ...ads,
          showFullDescription: false,
        });
      });
    });

    this.selectCropSpecializations$.subscribe({
      next: (data) => {
        this.cropTypes = data;
      },
    });
  }

  deleteAdvertisement(advertisement: PostAdvertisement) {
    Swal.fire({
      title: 'Are you sure you want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: PostAdvertisementActionsSupplierSide.DELETE_POSTADVERTISEMENT,
          postId: advertisement.postId,
        });
        this.selectPostAdvertisements$.subscribe((data) => {
          this.filteredAdvertisements = [];
          data.map((ads) => {
            if (
              this.filteredAdvertisements.find(
                (item) => item.postId == ads.postId
              )
            ) {
              return;
            }
            this.filteredAdvertisements.push({
              ...ads,
              showFullDescription: false,
            });
          });
        });
      }
    });
  }

  filteredAdvertisements: PostAdvertisement[] = [];
  // Toggle description visibility
  toggleDescription(post: PostAdvertisement): void {
    this.filteredAdvertisements = this.filteredAdvertisements.map((ads) => {
      if (ads.postId == post.postId) {
        ads.showFullDescription = !ads.showFullDescription;
      }
      return ads;
    });
  }

  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items to show per page

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  // search
  isSearchResultEmpty: boolean = false;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredAdvertisements = this.filteredAdvertisements.filter((ad) =>
      ad.cropName.toLowerCase().includes(filterValue)
    );

    this.isSearchResultEmpty = this.filteredAdvertisements.length === 0;
  }

  selectedSortingOption: string = '';
  sortingOptions = [
    { label: 'Sort A-Z', value: 'asc' },
    { label: 'Sort Z-A', value: 'desc' },
    { label: 'Newest to Oldest', value: 'newest' },
    { label: 'Oldest to Newest', value: 'oldest' },
  ];

  sortAdvertisements(): void {
    if (this.selectedSortingOption === 'asc') {
      this.filteredAdvertisements.sort((a, b) =>
        a.cropName.localeCompare(b.cropName)
      );
    } else if (this.selectedSortingOption === 'desc') {
      this.filteredAdvertisements.sort((a, b) =>
        b.cropName.localeCompare(a.cropName)
      );
    } else if (this.selectedSortingOption === 'newest') {
      this.filteredAdvertisements.sort((a, b) => {
        const aDate = a.datePosted ? new Date(a.datePosted).getTime() : 0;
        const bDate = b.datePosted ? new Date(b.datePosted).getTime() : 0;
        return bDate - aDate;
      });
    } else if (this.selectedSortingOption === 'oldest') {
      this.filteredAdvertisements.sort((a, b) => {
        const aDate = a.datePosted ? new Date(a.datePosted).getTime() : 0;
        const bDate = b.datePosted ? new Date(b.datePosted).getTime() : 0;
        return aDate - bDate;
      });
    }
  }

  filterAdvertisementsByType(): void {
    if (this.selectedCropTypes.length === 0) {
      this.filteredAdvertisements = this.filteredAdvertisements;
    } else {
      this.filteredAdvertisements = this.filteredAdvertisements.filter((ad) => {
        const adCropSpecializationId =
          ad.cropSpecialization?.cropSpecializationId;
        return this.selectedCropTypes.some(
          (selectedCrop) =>
            selectedCrop.cropSpecializationId === adCropSpecializationId
        );
      });
    }
  }

  isAddPost: boolean = false;
  toggleAddPost = () => {
    this.isAddPost = !this.isAddPost;
    if (this.isAddPost == false) {
      this.imagePreviewUrl = '';
    }
  };

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  onImageSelectedEdit(event: any): void {
    this.selectedImageEdit = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrlEdit = e.target.result;
    };
    reader.readAsDataURL(this.selectedImageEdit);
  }

  addPostAdvertisementSubmit() {
    if (this.addPostAdvertisementForm.valid) {
      this.isAddPost = false;
      Swal.fire({
        title: 'Are you sure you want to save changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save changes',
      }).then((result) => {
        if (result.isConfirmed) {
          let advertisement: PostAdvertisement = {
            ...this.addPostAdvertisementForm.value,
            supplierId: localStorage.getItem('userNo') as any,
          };
          this.supplierService.upload(this.selectedImage).subscribe({
            next: (value) => {
              advertisement.cropImage = `${value.fileUri.concat(
                value.fileName
              )}`;
              this.store.dispatch({
                type: PostAdvertisementActionsSupplierSide.ADD_POSTADVERTISEMENT,
                postAdvertisement: advertisement,
              });

              Swal.fire({
                title: 'Advertisement created!',
                icon: 'success',
              });
            },
            error: (e) => {
              Swal.fire(
                'Failed to Submit!',
                `Please upload your crop image!`,
                'error'
              );
            },
          });
          this.addPostAdvertisementForm.reset();
          this.imagePreviewUrl = '';
        } else if (result.dismiss || result.isDenied) {
          this.isAddPost = !this.isAddPost;
        }
      });
    } else {
      Object.keys(this.addPostAdvertisementForm.controls).forEach((field) => {
        const control = this.addPostAdvertisementForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }

  editPost: boolean = false;
  toggleEditPost = () => {
    this.editPost = !this.editPost;
  };

  selectAdvertisement(postId: any) {
    this.store.select(selectPostAdvertisement(postId)).subscribe((data) => {
      this.selectedPostAdvertisement = data as PostAdvertisement;
      this.editPostAdvertisementForm.patchValue({
        ...data,
        supplierId: data?.supplier?.supplierId,
        cropSpecializationId: data?.cropSpecialization?.cropSpecializationId,
        quantity: data?.quantity,
        measurement: data?.measurement,
      });
    });
  }

  editPostAdvertisement = () => {
    if (this.editPostAdvertisementForm.valid) {
      this.editPost = false;
      let advertisement: PostAdvertisement = {
        ...this.editPostAdvertisementForm.value,
        supplierId: localStorage.getItem('userNo') as any,
        cropImage: this.selectedPostAdvertisement?.cropImage,
      };
      if (this.selectedImageEdit != undefined) {
        this.supplierService.upload(this.selectedImageEdit).subscribe({
          next: (value) => {
            advertisement.cropImage = `${value.fileUri.concat(value.fileName)}`;
            this.store.dispatch({
              type: PostAdvertisementActionsSupplierSide.UPDATE_POSTADVERTISEMENT,
              postAdvertisement: advertisement,
            });
            this.selectPostAdvertisements$.subscribe((data) => {
              this.filteredAdvertisements = [];
              data.map((ads) => {
                if (
                  this.filteredAdvertisements.find(
                    (item) => item.postId == ads.postId
                  )
                ) {
                  return;
                }
                this.filteredAdvertisements.push({
                  ...ads,
                  showFullDescription: false,
                });
              });
            });
          },
          error: (e) => {
            console.log(e);
          },
        });
      } else {
        this.store.dispatch({
          type: PostAdvertisementActionsSupplierSide.UPDATE_POSTADVERTISEMENT,
          postAdvertisement: advertisement,
        });

        this.selectPostAdvertisements$.subscribe((data) => {
          this.filteredAdvertisements = [];
          data.map((ads) => {
            if (
              this.filteredAdvertisements.find(
                (item) => item.postId == ads.postId
              )
            ) {
              return;
            }
            this.filteredAdvertisements.push({
              ...ads,
              showFullDescription: false,
            });
          });
        });
      }
    } else {
      Object.keys(this.editPostAdvertisementForm.controls).forEach((field) => {
        const control = this.editPostAdvertisementForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  };

  checkFbSocial(post: PostAdvertisement) {
    if (post?.supplier?.user?.socials[0] == null) {
      return false;
    }
    return post?.supplier?.user?.socials.find((social) =>
      social.includes('facebook') ? true : false
    )
      ? true
      : false;
  }

  selectFbSocial(post: PostAdvertisement) {
    return (
      (post?.supplier?.user?.socials.find((social) =>
        social.includes('facebook') ? true : false
      ) as string) || 'https://www.facebook.com/'
    );
  }

  checkIGSocial(post: PostAdvertisement) {
    if (post?.supplier?.user?.socials[0] == null) {
      return false;
    }
    return post?.supplier?.user?.socials.find((social) =>
      social.includes('instagram') ? true : false
    )
      ? true
      : false;
  }

  selectIGSocial(post: PostAdvertisement) {
    return (
      (post?.supplier?.user?.socials.find((social) =>
        social.includes('instagram') ? true : false
      ) as string) || 'https://www.instagram.com/'
    );
  }
}
