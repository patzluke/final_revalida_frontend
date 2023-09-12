import { Component, OnInit } from '@angular/core';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import { CropPayment } from '../../models/crop-payment';
import { Store } from '@ngrx/store';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { SupplierService } from '../../services/supplier.service';
import { FileDetails } from '../../models/fileDetails';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cropPayment?: CropPayment;
  farmerName = '';
  transcationReferenceNumber = new FormControl('');
  address = new FormControl('');
  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  constructor(
    private store: Store,
    private supplierService: SupplierService,
    private _router: Router
  ) {
    this.cropPayment = history.state.cropPayment;
    this.farmerName = `${this.cropPayment?.cropOrder.sellCropDetail.farmer.user.firstName} ${this.cropPayment?.cropOrder.sellCropDetail.farmer.user.lastName}`;
  }

  ngOnInit(): void {
    this.transcationReferenceNumber.setValidators([Validators.required]);
    this.transcationReferenceNumber.patchValue(
      this.cropPayment?.transcationReferenceNumber as string
    );
    this.isDefaultAddress = true;

    this.address.patchValue(this.cropPayment?.cropOrder.address as string);
    if (
      this.cropPayment?.cropOrder?.sellCropDetail?.postAdvertisementResponse
        ?.isFinalOfferAccepted
    ) {
      this.transcationReferenceNumber.disable();
    }
  }

  onImageSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  submitPayment() {
    if (this.transcationReferenceNumber.valid) {
      let farmerUser = this.cropPayment?.cropOrder.supplier.user;
      let farmerFullName = `${farmerUser?.firstName} ${farmerUser?.middleName} ${farmerUser?.lastName}`;

      let updatedCropPayment = {
        ...this.cropPayment,
        userId: localStorage.getItem('userId') as any,
        farmerUserId:
          this.cropPayment?.cropOrder.sellCropDetail.farmer.user.userId,
        proofOfPaymentImage: '',
        transcationReferenceNumber:
          this.transcationReferenceNumber.getRawValue(),
        address: this.address.getRawValue(),
        postResponseId:
          this.cropPayment?.cropOrder.sellCropDetail.postAdvertisementResponse
            .postResponseId,
        notificationTitle: 'Payment Status',
        notificationMessage: `${farmerFullName} has submitted their proof of payment for ${this.cropPayment?.cropOrder.sellCropDetail.cropName}`,
      };
      Swal.fire({
        title:
          "Are you sure you want to submit? you won't be able to change the details here after submitting",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.supplierService.upload(this.selectedImage).subscribe({
            next: (value) => {
              updatedCropPayment.proofOfPaymentImage = `${value.fileUri.concat(
                value.fileName
              )}`;
              this.store.dispatch({
                type: CropPaymentActions.UPDATE_CROPPAYMENT,
                cropPayment: updatedCropPayment,
              });
              this._router.navigate(['/supplier/post-advertisement-list']);
            },
            error: (err) => {
              Swal.fire(
                'Failed to Submit!',
                `Please upload your Proof of payment!`,
                'error'
              );
            },
          });
        }
      });
    } else {
      this.transcationReferenceNumber.markAsTouched();
      this.transcationReferenceNumber?.setErrors({ invalid: true });
    }
  }

  isDefaultAddress: boolean = false;
  updateAddress() {
    if (this.isDefaultAddress) {
      this.address.patchValue(this.cropPayment?.cropOrder.address as string);
    } else {
      this.address.reset();
    }
  }

  goBack = () => {
    window.history.back();
  };
}
