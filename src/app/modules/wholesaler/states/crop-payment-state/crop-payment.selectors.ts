import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CropPaymentState } from './crop-payment.reducer';

export const selectCropPaymentState = createFeatureSelector<CropPaymentState>(
  'cropPaymentList (Supplier Acc)'
);

export const selectCropPayments = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (payment) =>
        payment.cropOrder.orderStatus !== 'Not Yet Paid' &&
        payment.proofOfPaymentImage !== null &&
        payment.transcationReferenceNumber !== null
    )
  );

export const selectCropPaymentsProofOfPaymentSubmitted = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (order) => order.cropOrder.orderStatus === 'proof of payment submitted'
    )
  );

export const selectCropPaymentsToDeliver = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (order) => order.cropOrder.orderStatus === 'To deliver'
    )
  );

export const selectCropPaymentsCompleted = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (order) => order.cropOrder.orderStatus === 'Completed'
    )
  );

export const selectCropPaymentsCancelled = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (order) => order.cropOrder.orderStatus === 'Cancelled'
    )
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
