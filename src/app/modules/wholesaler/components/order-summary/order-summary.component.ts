import { Component, OnInit } from '@angular/core';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import { CropPayment } from '../../models/crop-payment';
import { Store } from '@ngrx/store';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { SupplierService } from '../../services/supplier.service';
import { FileDetails } from '../../models/fileDetails';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cropPayment?: CropPayment;
  farmerName = '';
  transactionNumber = new FormControl('');
  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  constructor(private store: Store, private supplierService: SupplierService) {
    this.cropPayment = history.state.cropPayment;
    this.farmerName = `${this.cropPayment?.cropOrder.sellCropDetail.farmer.user.firstName} ${this.cropPayment?.cropOrder.sellCropDetail.farmer.user.lastName}`;
  }

  ngOnInit() {}

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
    let updatedCropPayment = {
      ...this.cropPayment,
      userId: localStorage.getItem('userId') as any,
      proofOfPaymentImage: '',
      transactionNumber: this.transactionNumber.getRawValue(),
      postResponseId:
        this.cropPayment?.cropOrder.sellCropDetail.postAdvertisementResponse
          .postResponseId,
    };
    this.supplierService.upload(this.selectedImage).subscribe({
      next: (value) => {
        updatedCropPayment.proofOfPaymentImage = `${value.fileUri.concat(
          value.fileName
        )}`;
        console.log(updatedCropPayment);

        this.store.dispatch({
          type: CropPaymentActions.UPDATE_CROPPAYMENT,
          cropPayment: updatedCropPayment,
        });
      },
      error: (err) => {
        Swal.fire('Failed to Submit!', `Something went wrong.`, 'error');
      },
    });

    //must be redirected to the Crop orders list
  }
}
