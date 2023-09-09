import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import {
  selectCropPayments,
  selectCropPaymentsCancelled,
  selectCropPaymentsCompleted,
  selectCropPaymentsNotYetPaid,
  selectCropPaymentsProofOfPaymentSubmitted,
  selectCropPaymentsToDeliver,
} from '../../states/crop-payment-state/crop-payment.selectors';
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
  //selectors
  selectCropPayments$ = this.store.select(selectCropPayments());
  selectCropPaymentsNotYetPaid$ = this.store.select(
    selectCropPaymentsNotYetPaid()
  );
  selectCropPaymentsProofOfPaymentSubmitted$ = this.store.select(
    selectCropPaymentsProofOfPaymentSubmitted()
  );
  selectCropPaymentsToDeliver$ = this.store.select(
    selectCropPaymentsToDeliver()
  );
  selectCropPaymentsCompleted$ = this.store.select(
    selectCropPaymentsCompleted()
  );
  selectCropPaymentsCancelled$ = this.store.select(
    selectCropPaymentsCancelled()
  );

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      farmerId: localStorage.getItem('userNo'),
    });
  }

  changeStatus(cropPayment: CropPayment) {
    let updatedCropPayment = {
      orderIdRef: cropPayment.cropOrder.orderIdRef,
      paymentId: cropPayment.paymentId,
      orderStatus: 'To deliver',
      supplierId: cropPayment.cropOrder.supplier.supplierId,
      farmerId: localStorage.getItem('userNo'),
    };
    let isCheckboxChecked = false;
    Swal.fire({
      title:
        'Are you sure you have received the suppliers payment? This will change your crop shipment status to "To deliver".',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      denyButtonText: 'Cancel',
      confirmButtonText: 'Save Changes',
      html: '<label><input type="checkbox" id="confirmCheckbox" style="transform: scale(1.2); vertical-align: 1px; margin-right: 1rem"> I am sure and I have confirmed that I received the payment from the supplier.</label>',
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.disabled = true;
        }

        const checkbox = document.getElementById(
          'confirmCheckbox'
        ) as HTMLInputElement;
        checkbox.addEventListener('change', () => {
          isCheckboxChecked = checkbox.checked;

          const confirmButton = Swal.getConfirmButton();
          if (confirmButton) {
            confirmButton.disabled = !isCheckboxChecked;
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed && isCheckboxChecked) {
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
      orderStatus: 'Cancelled',
      cancelReason: '', // Initialize cancellation reason
      supplierId: cropPayment.cropOrder.supplier.supplierId,
      farmerId: localStorage.getItem('userNo'),
    };

    Swal.fire({
      title: 'Are you sure you want to cancel this pending order?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      denyButtonText: 'Cancel',
      confirmButtonText: 'Save Changes',
      html:
        '<div><p>Enter cancellation reason: </p></div>' +
        '<textarea  type="textarea" id="cancellationReasonInput" required  style="width: 100%"></textarea>',
    }).then((result) => {
      if (result.isConfirmed) {
        const inputField = document.getElementById(
          'cancellationReasonInput'
        ) as HTMLInputElement;

        //console.log('cancel data', updatedCropPayment);
        updatedCropPayment.cancelReason = inputField.value;

        if (updatedCropPayment.cancelReason) {
          this.store.dispatch({
            type: CropPaymentActions.UPDATE_CROPPAYMENT,
            cropPayment: updatedCropPayment,
          });
        } else {
          Swal.fire('Please enter a cancellation reason.', '', 'warning');
        }
      }
    });
  }

  isViewOrder: boolean = false;
  toggleViewOrder = () => {
    this.isViewOrder = !this.isViewOrder;
  };

  selectedCropPayment?: CropPayment;
  selectCropPayment(cropPayment: CropPayment) {
    this.selectedCropPayment = cropPayment;
  }

  checkFbSocial(cropPayment: any) {
    return cropPayment?.cropOrder?.supplier?.user?.socials.find((social: any) =>
      social.includes('facebook') ? true : false
    )
      ? true
      : false;
  }

  selectFbSocial(cropPayment: any) {
    return (
      (cropPayment?.cropOrder?.supplier?.user?.socials.find((social: any) =>
        social.includes('facebook') ? true : false
      ) as string) || 'https://www.facebook.com/'
    );
  }

  checkIGSocial(cropPayment: any) {
    return cropPayment?.cropOrder?.supplier?.user?.socials.find((social: any) =>
      social.includes('instagram') ? true : false
    )
      ? true
      : false;
  }

  selectIGSocial(cropPayment: any) {
    return (
      (cropPayment?.cropOrder?.supplier?.user?.socials.find((social: any) =>
        social.includes('instagram') ? true : false
      ) as string) || 'https://www.instagram.com/'
    );
  }
}
