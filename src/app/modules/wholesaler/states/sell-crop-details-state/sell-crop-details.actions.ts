import { createAction, props } from '@ngrx/store';
import { SellCropDetails } from '../../models/sell-crop-details';

export enum SellCropDetailsActions {
  SET_SELLCROPDETAILS = '[SellCropDetails] Set List of SellCropDetails (Supplier Side)',
  GET_SELLCROPDETAILS = '[SellCropDetails] Get List of CropPayment (Supplier Side) Success',
}

export const setSellCropDetailsState = createAction(
  SellCropDetailsActions.SET_SELLCROPDETAILS,
  props<{ sellCropDetails: SellCropDetails[] }>()
);
