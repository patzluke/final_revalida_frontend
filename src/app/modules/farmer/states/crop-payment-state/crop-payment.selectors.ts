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

export const selectCropPaymentsNotYetPaid = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (order) => order.cropOrder.orderStatus === 'Not Yet Paid'
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

export const selectCropPayment = (paymentId: number) =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.find((cropPayment) => {
      return cropPayment.paymentId == paymentId;
    })
  );

export const selectCropPaymentByFarmerIdAndPostResponseId = (
  farmerId: number,
  postResponseId: number
) =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.find((cropPayment) => {
      return (
        cropPayment.cropOrder.sellCropDetail.farmer.farmerId == farmerId &&
        cropPayment.cropOrder.sellCropDetail.postAdvertisementResponse
          .postResponseId == postResponseId
      );
    })
  );
