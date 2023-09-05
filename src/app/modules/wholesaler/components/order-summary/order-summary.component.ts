import { Component, OnInit } from '@angular/core';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import { CropPayment } from '../../models/crop-payment';
import { Store } from '@ngrx/store';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cropPayment?: CropPayment;
  farmerName = '';
  constructor(private store: Store) {
    this.cropPayment = history.state.cropPayment;
    this.farmerName = `${this.cropPayment?.cropOrder.sellCropDetail.farmer.user.firstName} ${this.cropPayment?.cropOrder.sellCropDetail.farmer.user.lastName}`;
  }

  ngOnInit(): void {}

  submitPayment() {
    let updatedCropPayment = { ...this.cropPayment, userId: 0, proofOfPaymentImage: '', postResponseId : this.cropPayment?.cropOrder.sellCropDetail.postAdvertisementResponse.postResponseId };
    updatedCropPayment.userId = localStorage.getItem('userId') as any;

    this.store.dispatch({
      type: CropPaymentActions.UPDATE_CROPPAYMENT,
      cropPayment: updatedCropPayment,
    });

    //must be redirected to the Crop orders list
  }
}
