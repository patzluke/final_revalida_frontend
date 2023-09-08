import { createReducer, on } from '@ngrx/store';
import { CropPayment } from '../../models/crop-payment';
import {
  addCropPaymentState,
  setCropPaymentState,
  updateCropPaymentState,
} from './crop-payment.actions';

export interface CropPaymentState {
  cropPayments: CropPayment[];
}

export const initialState: CropPaymentState = {
  cropPayments: [],
};

export const cropPaymentReducer = createReducer(
  initialState,
  on(setCropPaymentState, (state, { cropPayments }) => {
    return { ...state, cropPayments: cropPayments };
  }),
  on(addCropPaymentState, (state, { cropPayment }) => {
    return {
      ...state,
      cropPayments: [cropPayment, ...state.cropPayments],
    };
  }),
  on(updateCropPaymentState, (state, { cropPayment }) => {
    return {
      ...state,
      cropPayments: state.cropPayments.map((oldCropPayment) => {
       return oldCropPayment.paymentId == cropPayment.paymentId
          ? cropPayment
          : oldCropPayment
    }),
    };
  }),
);
