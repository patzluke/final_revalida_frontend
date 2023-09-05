import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmingTipsState } from './farmingtips.reducer';

export const selectFarmingTipsState = createFeatureSelector<FarmingTipsState>(
  'farmingTipsList (Landing Side)'
);

export const selectFarmingTips = () =>
  createSelector(
    selectFarmingTipsState,
    (state: FarmingTipsState) => state.farmingTips
  );

export const selectFarmingTip = (farmingTipId: number) =>
  createSelector(selectFarmingTipsState, (state: FarmingTipsState) =>
    state.farmingTips.find((farmingTip) => {
      return farmingTip.farmingTipId == farmingTipId;
    })
  );
