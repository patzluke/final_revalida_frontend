import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CropPaymentState } from './crop-payment.reducer';

export const selectCropPaymentState = createFeatureSelector<CropPaymentState>(
  'cropPaymentList (Supplier Acc)'
);

export const selectCropPayments = () =>
  createSelector(
    selectCropPaymentState,
    (state: CropPaymentState) => state.cropPayments
  );

export const selectCropPayment = (postResponseId: number, supplierId: number) =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.find((cropPayment) => {
      return (
        cropPayment.cropOrder.sellCropDetail.postAdvertisementResponse
          .postResponseId == postResponseId &&
        cropPayment.cropOrder.supplier.supplierId == supplierId
      );
    })
  );
