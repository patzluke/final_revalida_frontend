import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  supplierCropPayment: CropPayment[] = [];

  //selectors
  selectCropPayments$ = this.store.select(selectCropPayments());

  ngOnInit() {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      supplierId: localStorage.getItem('userNo'),
    });

    this.selectCropPayments$.subscribe((data) => {
      this.supplierCropPayment = data;
      console.log(this.supplierCropPayment);
      this.filterCropPaymentByStatus();
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
    let isCheckboxChecked = false;

    Swal.fire({
      title:
        'Are you sure you have received Farmer\'s crops? this will change the order status to "Completed".',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      denyButtonText: 'cancel',
      confirmButtonText: 'Save changes',
      html: '<label><input type="checkbox" id="confirmCheckbox" style="transform: scale(1.2); vertical-align: 1px; margin-right: 1rem">I am sure and I have confirmed that I received my order from the farmer.</label>',
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
          type: CropPaymentActions.UPDATE_CROPPAYMENT_ORDER_STATUS,
          cropPayment: updatedCropPayment,
        });
      }
    });
  }

  isViewOrder: boolean = false;
  toggleViewOrder = () => {
    this.isViewOrder = !this.isViewOrder;
  };

  // For farmer
  selectedCropPayment?: CropPayment;
  selectCropPayment(cropPayment: CropPayment) {
    this.selectedCropPayment = cropPayment;
  }

  checkFbSocial(cropPayment: any) {
    return cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
      (social: any) => (social.includes('facebook') ? true : false)
    )
      ? true
      : false;
  }

  selectFbSocial(cropPayment: any) {
    return (
      (cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
        (social: any) => (social.includes('facebook') ? true : false)
      ) as string) || 'https://www.facebook.com/'
    );
  }

  checkIGSocial(cropPayment: any) {
    return cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
      (social: any) => (social.includes('instagram') ? true : false)
    )
      ? true
      : false;
  }

  selectIGSocial(cropPayment: any) {
    return (
      (cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
        (social: any) => (social.includes('instagram') ? true : false)
      ) as string) || 'https://www.instagram.com/'
    );
  }

  // for supplier
  checkFbSocialSupplier(cropPayment: any) {
    return cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
      (social: any) => (social.includes('facebook') ? true : false)
    )
      ? true
      : false;
  }

  selectFbSocialSupplier(cropPayment: any) {
    return (
      (cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
        (social: any) => (social.includes('facebook') ? true : false)
      ) as string) || 'https://www.facebook.com/'
    );
  }

  checkIGSocialSupplier(cropPayment: any) {
    return cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
      (social: any) => (social.includes('instagram') ? true : false)
    )
      ? true
      : false;
  }

  selectIGSocialSupplier(cropPayment: any) {
    return (
      (cropPayment?.cropOrder?.sellCropDetail?.farmer?.user?.socials.find(
        (social: any) => (social.includes('instagram') ? true : false)
      ) as string) || 'https://www.instagram.com/'
    );
  }

  toDeliverOrders: CropPayment[] = [];
  completedOrders: CropPayment[] = [];
  cancelledOrders: CropPayment[] = [];

  filterCropPaymentByStatus = () => {
    this.toDeliverOrders = this.supplierCropPayment.filter(
      (order) => order.cropOrder.orderStatus === 'To deliver'
    );

    this.completedOrders = this.supplierCropPayment.filter(
      (order) => order.cropOrder.orderStatus === 'Completed'
    );

    this.cancelledOrders = this.supplierCropPayment.filter(
      (order) => order.cropOrder.orderStatus === 'Cancelled'
    );
  };
}
