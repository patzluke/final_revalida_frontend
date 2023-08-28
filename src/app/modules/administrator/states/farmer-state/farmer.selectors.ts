import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmerState } from './farmer.reducer';

export const selectFarmerState =
  createFeatureSelector<FarmerState>('farmerList');

export const selectFarmers = () =>
  createSelector(selectFarmerState, (state: FarmerState) =>
    state.farmers.filter((farmers) => farmers)
  );

export const selectFarmer = (farmerId: number) =>
  createSelector(selectFarmerState, (state: FarmerState) =>
    state.farmers.find((farmer) => {
      return farmer.farmerId == farmerId;
    })
  );
