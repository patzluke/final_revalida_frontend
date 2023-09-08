import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { selectCropPayments } from '../../states/crop-payment-state/crop-payment.selectors';
import Swal from 'sweetalert2';
import { CropPayment } from '../../models/crop-payment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  currentUserType = localStorage.getItem('userType');

  //selectors
  selectCropPayments$ = this.store.select(selectCropPayments());

  ngOnInit() {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      supplierId: localStorage.getItem('userNo'),
    });
  }

  constructor(private store: Store) {}

  changeStatus(cropPayment: CropPayment) {
    let updatedCropPayment = {
      orderIdRef: cropPayment.cropOrder.orderIdRef,
      paymentId: cropPayment.paymentId,
      orderStatus:
        cropPayment.cropOrder.orderStatus == 'To deliver'
          ? 'Completed'
          : 'To deliver',
    };
    Swal.fire({
      title:
        'Are you sure you have received Farmer\'s crops? this will change the order status to "Completed".',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      denyButtonText: 'cancel',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: CropPaymentActions.UPDATE_CROPPAYMENT_ORDER_STATUS,
          cropPayment: updatedCropPayment,
        });
      }
    });
  }

  checkIfIsCropReceivedMoreThan24Hours = (cropPayment: CropPayment) => {
    let datePlus24Hrs = new Date(cropPayment.cropOrder.orderReceivedDate);
    datePlus24Hrs.setHours(datePlus24Hrs.getHours() + 24);
    let dateToday = new Date();
    if (datePlus24Hrs <= dateToday) {
      return false;
    }
    return true;
  };
}
