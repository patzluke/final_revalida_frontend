import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CropPaymentState } from './crop-payment.reducer';

export const selectCropPaymentState = createFeatureSelector<CropPaymentState>(
  'cropPaymentList (Supplier Acc)'
);

export const selectCropPayments = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter(
      (payment) => payment.payDate != null && payment.paidBy != null
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

export const verifyIfIsCropReceivedMoreThan24Hours = () =>
  createSelector(selectCropPaymentState, (state: CropPaymentState) =>
    state.cropPayments.filter((cropPayment) => {
      let datePlus24Hrs = new Date(cropPayment.cropOrder.orderReceivedDate);
      datePlus24Hrs.setHours(datePlus24Hrs.getHours() + 24);
      let dateToday = new Date();
      if (datePlus24Hrs <= dateToday) {
        return false;
      }
      return true;
    })
  );
