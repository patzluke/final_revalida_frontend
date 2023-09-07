import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  faAdd,
  faCancel,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { selectCropPayments } from '../../states/crop-payment-state/crop-payment.selectors';
import { CropOrder } from '../../models/crop-order';
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
  editStudentGradeForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.editStudentGradeForm = fb.group({
      inputArray: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      farmerId: localStorage.getItem('userNo'),
    });

    this.selectCropPayments$.subscribe((data) => {
      this.cropPayments = data;
      if (this.inputArray.getRawValue().length == 0) {
        data.forEach((student) => {
          let gradeForm = this.inputArray as FormArray;
          let studentGrade = this.fb.group({
            cropOrder: this.fb.group({
              orderIdRef: student.cropOrder.orderIdRef,
              address: student.cropOrder.address,
              orderStatus: student.cropOrder.orderStatus,
              sellCropDetail: student.cropOrder.sellCropDetail,
              supplier: student.cropOrder.supplier,
              cancelReason: student.cropOrder.cancelReason,
            }),
            paidBy: [student.paidBy],
            payDate: [student.payDate],
            paymentId: [student.paymentId],
            paymentMode: [student.paymentMode],
            proofOfPaymentImage: [student.proofOfPaymentImage],
            transcationReferenceNumber: [student.transcationReferenceNumber],
          });
          console.log(studentGrade.getRawValue());

          gradeForm.push(studentGrade);
        });
      }
    });
  }

  get inputArray(): FormArray {
    return this.editStudentGradeForm.get('inputArray') as FormArray;
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
        cropPayment.cropOrder.orderStatus == 'proof of payment submitted'
          ? 'Are you sure you have received the suppliers payment? this will change your crop shipment status to "To deliver".'
          : 'Are you sure you haven\'t received the suppliers payment yet? this will change your crop shipment status to "proof of payment submitted" again. Take note you can only change this again within 30 minutes of payment received date.',
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

  checkIfIsCropReceivedMoreThan30mins = (cropPayment: CropPayment) => {
    let datePlus24Hrs = new Date(cropPayment.cropOrder.orderReceivedDate);
    datePlus24Hrs.setHours(datePlus24Hrs.getHours() + 24);
    let dateToday = new Date();
    if (datePlus24Hrs <= dateToday) {
      return false;
    }
    return true;
  };
}
