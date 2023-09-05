import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmingTipState, farmingTipReducer } from './farmingtip.reducer';

export const selectFarmingTipState = createFeatureSelector<FarmingTipState>(
  'farmingTipList (Farmer Side)'
);

export const selectFarmingTips = () =>
  createSelector(
    selectFarmingTipState,
    (state: FarmingTipState) => state.farmingTips
  );

export const selectFarmingTip = (farmingTipId: number) =>
  createSelector(selectFarmingTipState, (state: FarmingTipState) =>
    state.farmingTips.find((farmingTip) => {
      return farmingTip.farmingTipId == farmingTipId;
    })
  );
