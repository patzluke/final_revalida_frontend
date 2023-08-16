import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmingTipState, farmingTipReducer } from './farmingtip.reducer';

export const selectFarmingTipState =
  createFeatureSelector<FarmingTipState>('farmingTipList');

export const selectselectFarmingTips = () =>
  createSelector(
    selectFarmingTipState,
    (state: FarmingTipState) => state.farmingTips
  );

export const selectselectFarmingTip = (farmingTipId: number) =>
  createSelector(selectFarmingTipState, (state: FarmingTipState) =>
    state.farmingTips.find((farmingTip) => {
      return farmingTip.farmingTipId == farmingTipId;
    })
  );
