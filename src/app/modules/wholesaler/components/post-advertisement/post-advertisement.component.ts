import { Component, OnInit } from '@angular/core';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import { FileDetails } from '../../models/fileDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { PostAdvertisement } from '../../models/post-advertisement';

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

  //Formgroups
  addEditPostAdvertisementForm: FormGroup;

  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  constructor(
    private store: Store,
    private supplierService: SupplierService,
    private fb: FormBuilder
  ) {
    this.addEditPostAdvertisementForm = fb.group({
      postId: [0, Validators.required],
      cropImage: ['', Validators.required],
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
  }

  onImageSelected(event: any): void {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
    console.log(selectedFile);
    console.log(this.selectedImage);
  }

  addPostAdvertisement() {
    let newAdvertisement: PostAdvertisement = {
      ...this.addEditPostAdvertisementForm.value,
      supplierId: localStorage.getItem('userNo'),
    };

    this.supplierService.upload(this.selectedImage).subscribe({
      next: (value) => {
        newAdvertisement.cropImage = `${value.fileUri.concat(value.fileName)}`;
        this.store.dispatch({
          type: PostAdvertisementActions.ADD_POSTADVERTISEMENT,
          postAdvertisement: newAdvertisement,
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
