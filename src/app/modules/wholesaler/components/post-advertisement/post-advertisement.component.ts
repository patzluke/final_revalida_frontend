import { Component, OnInit } from '@angular/core';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import { FileDetails } from '../../models/fileDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { PostAdvertisement } from '../../models/post-advertisement';
import { selectPostAdvertisement } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './post-advertisement.component.html',
  styleUrls: ['./post-advertisement.component.scss'],
})
export class PostAdvertisementComponent implements OnInit {
  subscription!: Subscription;

  faSave = faSave;
  faCancel = faCancel;

  crop_specialization: {
    crop_id: string;
    crop: string;
  }[] = [
    { crop_id: 'CROP0001', crop: 'Feed Crops' },
    { crop_id: 'CROP0002', crop: 'Fiber Crops' },
    { crop_id: 'CROP0003', crop: 'Oil Crops' },
    { crop_id: 'CROP0004', crop: 'Ornamental Crops' },
    { crop_id: 'CROP0005', crop: 'Industrial Crops' },
    { crop_id: 'CROP0006', crop: 'Harvesting Crops' },
    { crop_id: 'CROP0007', crop: 'GMOs' },
    { crop_id: 'CROP0008', crop: 'Seed Banks' },
  ];

  selectedPostAdvertisement!: PostAdvertisement;

  //Formgroups
  addEditPostAdvertisementForm: FormGroup;

  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  //selectors

  constructor(
    private store: Store,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.addEditPostAdvertisementForm = fb.group({
      postId: [0, Validators.required],
      cropName: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [, Validators.required],
      price: [, Validators.required],
      datePosted: [''],
      dateModified: [''],
      cropSpecialization: [{}],
      supplier: [{}],
      postAdvertisementResponses: [[]],

      //for inserting and updating
      cropSpecializationId: [, Validators.required],
      supplierId: [],
    });
  }

  ngOnInit(): void {
    this.subscription = interval(2500).subscribe(() => {});

    this.store.dispatch({
      type: PostAdvertisementActions.GET_POSTADVERTISEMENT,
      supplierId: localStorage.getItem('userNo'),
    });
    this.activatedRoute.params.subscribe((data) => {
      if (Object.keys(data).length != 0) {
        this.store
          .select(selectPostAdvertisement(data['postId']))
          .subscribe((data) => {
            this.selectedPostAdvertisement = data as PostAdvertisement;
            this.addEditPostAdvertisementForm.patchValue({
              ...data,
              supplierId: data?.supplier?.supplierId,
              cropSpecializationId:
                data?.cropSpecialization?.cropSpecializationId,
            });
          });
      }
    });
  }

  onImageSelected(event: any): void {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }

  addEditPostAdvertisementSubmit() {
    Swal.fire({
      title: 'Are you sure you want to save changes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.selectedPostAdvertisement?.postId == undefined) {
          let advertisement: PostAdvertisement = {
            ...this.addEditPostAdvertisementForm.value,
            supplierId: localStorage.getItem('userNo') as any,
          };
          this.supplierService.upload(this.selectedImage).subscribe({
            next: (value) => {
              advertisement.cropImage = `${value.fileUri.concat(
                value.fileName
              )}`;
              this.store.dispatch({
                type: PostAdvertisementActions.ADD_POSTADVERTISEMENT,
                postAdvertisement: advertisement,
              });
              if (value) {
                Swal.fire({
                  title: 'Advertisement created! do you want to create more?',
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No',
                }).then((result) => {
                  if (!result.isConfirmed) {
                    this._router.navigateByUrl(
                      '/supplier/post-advertisement-list'
                    );
                  }
                  this.addEditPostAdvertisementForm.reset();
                  this._router
                    .navigateByUrl('/', { skipLocationChange: true })
                    .then(() => {
                      this._router.navigate(['/supplier/post-advertisement']);
                    });
                });
              }
            },
            error: (e) => {
              console.log(e);
            },
          });
        } else {
          let advertisement: PostAdvertisement = {
            ...this.addEditPostAdvertisementForm.value,
            supplierId: localStorage.getItem('userNo') as any,
            cropImage: this.selectedPostAdvertisement.cropImage,
          };
          if (this.selectedImage != undefined) {
            this.supplierService.upload(this.selectedImage).subscribe({
              next: (value) => {
                advertisement.cropImage = `${value.fileUri.concat(
                  value.fileName
                )}`;
                this.store.dispatch({
                  type: PostAdvertisementActions.UPDATE_POSTADVERTISEMENT,
                  postAdvertisement: advertisement,
                });
              },
              error: (e) => {
                console.log(e);
              },
            });
          } else {
            this.store.dispatch({
              type: PostAdvertisementActions.UPDATE_POSTADVERTISEMENT,
              postAdvertisement: advertisement,
            });
          }
        }
      }
    });
  }
}
