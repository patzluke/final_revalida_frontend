import { createReducer, on } from '@ngrx/store';
import { SellCropDetails } from '../../models/sell-crop-details';
import { setSellCropDetailsState } from './sell-crop-details.actions';
export interface SellCropDetailsState {
  sellCropDetails: SellCropDetails[];
}

export const initialState: SellCropDetailsState = {
  sellCropDetails: [],
};

export const sellCropDetailsReducer = createReducer(
  initialState,
  on(setSellCropDetailsState, (state, { sellCropDetails }) => {
    return { ...state, sellCropDetails: sellCropDetails };
  }),
);
