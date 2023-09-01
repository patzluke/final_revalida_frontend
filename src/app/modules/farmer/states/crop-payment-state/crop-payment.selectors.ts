import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CropPaymentState } from './crop-payment.reducer';

export const selectCropPaymentState = createFeatureSelector<CropPaymentState>(
  'cropPaymentList (Farmer Acc)'
);

export const selectCropPayments = () =>
  createSelector(
    selectCropPaymentState,
    (state: CropPaymentState) => state.cropPayments
  );

export const selectCropPayment = (paymentId: number) =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.find((cropPayment) => {
      return cropPayment.paymentId == paymentId;
    })
  );
