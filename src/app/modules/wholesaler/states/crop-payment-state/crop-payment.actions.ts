import { createAction, props } from '@ngrx/store';
import { CropPayment } from '../../models/crop-payment';

export enum CropPaymentActions {
  SET_CROPPAYMENT = '[CropPayment] Set List of CropPayment (Supplier Side)',
  GET_CROPPAYMENT = '[CropPayment] Get List of CropPayment (Supplier Side) Success',

  UPDATE_CROPPAYMENT = "[CropPayment] Update CropPayment (Supplier Side)",
  UPDATE_CROPPAYMENT_SUCCESS = "[CropPayment] Update CropPayment (Supplier Side) Success",
  UPDATE_CROPPAYMENT_FAILED = "[CropPayment] Update CropPayment (Supplier Side) Failed",
}

export const setCropPaymentState = createAction(
  CropPaymentActions.SET_CROPPAYMENT,
  props<{ cropPayments: CropPayment[] }>()
);
//--------------------------------------------------------------------
export const updateCropPaymentState = createAction(
  CropPaymentActions.UPDATE_CROPPAYMENT_SUCCESS,
  props<{ cropPayment: CropPayment }>()
);
