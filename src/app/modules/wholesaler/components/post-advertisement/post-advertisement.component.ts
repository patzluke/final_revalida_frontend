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
import { CropSpecializationActions } from '../../states/cropspecialization-state/cropspecialization.actions';
import { selectCropSpecializations } from '../../states/cropspecialization-state/cropspecialization.selectors';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './post-advertisement.component.html',
  styleUrls: ['./post-advertisement.component.scss'],
})
export class PostAdvertisementComponent implements OnInit {
  subscription!: Subscription;

  faSave = faSave;
  faCancel = faCancel;

  selectedPostAdvertisement!: PostAdvertisement;

  //Formgroups
  addEditPostAdvertisementForm: FormGroup;

  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  //selectors
  selectCropSpecializations$ = this.store.select(selectCropSpecializations());

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
      measurement: [''],
      price: [, Validators.required],
      datePosted: [''],
      dateModified: [''],
      cropSpecialization: [{}],
      supplier: [{}],
      postAdvertisementResponses: [[]],

      //for inserting and updating
      cropSpecializationId: [0, Validators.required],
      supplierId: [],
    });
  }

  ngOnInit(): void {
    this.subscription = interval(2500).subscribe(() => {});

    this.store.dispatch({
      type: CropSpecializationActions.GET_CROPSPECIALIZATION,
    });
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
              quantity: data?.quantity.split(' ')[0],
              measurement: data?.quantity.split(' ')[1],
            });
          });
      }
    });
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
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
                  if (result.isDenied || result.isDismissed) {
                    this._router.navigateByUrl(
                      '/supplier/post-advertisement-list'
                    );
                  } else if (result.isConfirmed) {
                    this.addEditPostAdvertisementForm.reset();
                    this._router
                      .navigateByUrl('/', { skipLocationChange: true })
                      .then(() => {
                        this._router.navigate(['/supplier/post-advertisement']);
                      });
                  }
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
            quantity: this.addEditPostAdvertisementForm.value.quantity
              .split(' ')[0]
              .concat(' ', this.addEditPostAdvertisementForm.value.measurement),
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
