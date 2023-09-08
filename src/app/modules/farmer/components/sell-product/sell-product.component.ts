import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { selectCropPayments } from '../../states/crop-payment-state/crop-payment.selectors';
import Swal from 'sweetalert2';
import { CropPayment } from '../../models/crop-payment';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent implements OnInit {
  currentUserType = localStorage.getItem('userType');
  selectedValue = new FormControl('');
  cropPayments: CropPayment[] = [];
  //selectors
  selectCropPayments$ = this.store.select(selectCropPayments());

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      farmerId: localStorage.getItem('userNo'),
    });

    this.selectCropPayments$.subscribe((data) => {
      this.cropPayments = data;
    });
  }

  changeStatus(cropPayment: CropPayment) {
    let updatedCropPayment = {
      orderIdRef: cropPayment.cropOrder.orderIdRef,
      paymentId: cropPayment.paymentId,
      orderStatus:
        cropPayment.cropOrder.orderStatus == 'To deliver'
          ? 'proof of payment submitted'
          : 'To deliver',
    };
    Swal.fire({
      title:
        'Are you sure you have received the suppliers payment? this will change your crop shipment status to "To deliver".',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      denyButtonText: 'cancel',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: CropPaymentActions.UPDATE_CROPPAYMENT,
          cropPayment: updatedCropPayment,
        });
      }
    });
  }

  cancelOrder(cropPayment: CropPayment) {
    let updatedCropPayment = {
      orderIdRef: cropPayment.cropOrder.orderIdRef,
      paymentId: cropPayment.paymentId,
      orderStatus: 'Cancelled'
    };
    Swal.fire({
      title:
        'Are you sure you want to cancel this pending order?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      denyButtonText: 'cancel',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: CropPaymentActions.UPDATE_CROPPAYMENT,
          cropPayment: updatedCropPayment,
        });
      }
    });
  }
}
