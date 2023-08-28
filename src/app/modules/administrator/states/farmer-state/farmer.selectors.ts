import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmerState } from './farmer.reducer';

export const selectFarmerState =
  createFeatureSelector<FarmerState>('farmerList');

export const selectFarmersValidated = () =>
  createSelector(selectFarmerState, (state: FarmerState) =>
    state.farmers.filter((farmer) => farmer.user?.isValidated)
  );

export const selectFarmersNotValidated = () =>
  createSelector(selectFarmerState, (state: FarmerState) =>
    state.farmers.filter((farmer) => !farmer.user?.isValidated)
  );

export const selectFarmer = (farmerId: number) =>
  createSelector(selectFarmerState, (state: FarmerState) =>
    state.farmers.find((farmer) => {
      return farmer.farmerId == farmerId;
    })
  );
