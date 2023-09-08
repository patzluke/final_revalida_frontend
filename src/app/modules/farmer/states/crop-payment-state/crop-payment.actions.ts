import { createAction, props } from '@ngrx/store';
import { CropPayment } from '../../models/crop-payment';

export enum CropPaymentActions {
  SET_CROPPAYMENT = '[CropPayment] Set List of CropPayment (Farmer Side)',
  GET_CROPPAYMENT = '[CropPayment] Get List of CropPayment (Farmer Side) Success',

  ADD_CROPPAYMENT = '[CropPayment] Add CropPayment',
  ADD_CROPPAYMENT_SUCCESS = '[CropPayment] Add CropPayment Success',
  ADD_CROPPAYMENT_FAILED = '[CropPayment] Add CropPayment Failed',

  UPDATE_CROPPAYMENT = "[CropPayment] Update CropPayment (Farmer Side)",
  UPDATE_CROPPAYMENT_SUCCESS = "[CropPayment] Update CropPayment (Farmer Side) Success",
  UPDATE_CROPPAYMENT_FAILED = "[CropPayment] Update CropPayment (Farmer Side) Failed",
}

export const setCropPaymentState = createAction(
  CropPaymentActions.SET_CROPPAYMENT,
  props<{ cropPayments: CropPayment[] }>()
);
//--------------------------------------------------------------------
export const addCropPaymentState = createAction(
  CropPaymentActions.ADD_CROPPAYMENT_SUCCESS,
  props<{ cropPayment: CropPayment }>()
);
//--------------------------------------------------------------------
export const updateCropPaymentState = createAction(
  CropPaymentActions.UPDATE_CROPPAYMENT_SUCCESS,
  props<{ cropPayment: CropPayment }>()
);
