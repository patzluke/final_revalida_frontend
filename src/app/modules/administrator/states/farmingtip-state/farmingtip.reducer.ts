import { createReducer, on } from '@ngrx/store';
import {
  addFarmingTipState,
  deleteFarmingTipState,
  setFarmingTipState,
  updateFarmingTipState,
} from './farmingtip.actions';
import { FarmingTip } from '../../models/farmingTip';

export interface FarmingTipState {
  farmingTips: FarmingTip[];
}

export const initialState: FarmingTipState = {
  farmingTips: [],
};

export const farmingTipReducer = createReducer(
  initialState,
  on(setFarmingTipState, (state, { farmingTips }) => {
    return { ...state, farmingTips: farmingTips };
  }),
  on(addFarmingTipState, (state, { farmingTip }) => {
    return { ...state, farmingTips: [...state.farmingTips, farmingTip] };
  }),
  on(updateFarmingTipState, (state, { farmingTip }) => {
    return {
      ...state,
      farmingTips: state.farmingTips.map((oldFarmingTip) =>
        oldFarmingTip.farmingTipId == farmingTip.farmingTipId
          ? farmingTip
          : oldFarmingTip
      ),
    };
  }),

  on(deleteFarmingTipState, (state, { farmingTipId }) => {
    return {
      ...state,
      farmingTips: state.farmingTips.filter(
        (oldFarmingTip) => oldFarmingTip.farmingTipId !== farmingTipId
      ),
    };
  })
);
