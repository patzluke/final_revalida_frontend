import { createReducer, on } from '@ngrx/store';
import { FarmingTip } from '../../models/farming-tip';
import { setFarmingTipsState } from './farmingtips.actions';

export interface FarmingTipsState {
  farmingTips: FarmingTip[];
}

export const initialState: FarmingTipsState = {
  farmingTips: [],
};

export const farmingTipsReducer = createReducer(
  initialState,
  on(setFarmingTipsState, (state, { farmingTips }) => {
    return { ...state, farmingTips: farmingTips };
  })
);
