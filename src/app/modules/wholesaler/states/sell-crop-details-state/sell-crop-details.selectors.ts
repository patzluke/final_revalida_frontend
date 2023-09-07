import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SellCropDetailsState } from './sell-crop-details.reducer';

export const selectSellCropDetailsState =
  createFeatureSelector<SellCropDetailsState>('sellCropDetails (Supplier Acc)');

export const selectSellCropDetails = () =>
  createSelector(
    selectSellCropDetailsState,
    (state: SellCropDetailsState) => state.sellCropDetails
  );

export const selectSellCropDetailsByFarmerIdAndResponseId = (farmerId: number, postResponseId: number) =>
  createSelector(selectSellCropDetailsState, (state: SellCropDetailsState) =>
    state.sellCropDetails.find(
      (sellCropDetail) =>
        sellCropDetail.farmer.farmerId == farmerId &&
        sellCropDetail.postAdvertisementResponse.postResponseId ==
          postResponseId
    )
  );
