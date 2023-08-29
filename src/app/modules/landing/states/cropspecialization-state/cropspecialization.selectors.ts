import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CropSpecializationState } from './cropspecialization.reducer';

export const selectCropSpecializationState =
  createFeatureSelector<CropSpecializationState>('cropSpecializationList');

export const selectCropSpecializations = () =>
  createSelector(
    selectCropSpecializationState,
    (state: CropSpecializationState) => state.cropSpecializations
  );

export const selectCropSpecialization = (cropSpecializationId: number) =>
  createSelector(
    selectCropSpecializationState,
    (state: CropSpecializationState) =>
      state.cropSpecializations.find((cropSpecialization) => {
        return cropSpecialization.cropSpecializationId == cropSpecializationId;
      })
  );
