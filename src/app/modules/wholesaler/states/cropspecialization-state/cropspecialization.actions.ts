import { createAction, props } from '@ngrx/store';
import { CropSpecialization } from '../../models/crop-specialization';

export enum CropSpecializationActions {
  SET_CROPSPECIALIZATION = '[CropSpecialization] Set List of CropSpecialization',
  GET_CROPSPECIALIZATION = '[CropSpecialization] Get List of CropSpecialization Success',
}

export const setCropSpecializationState = createAction(
  CropSpecializationActions.SET_CROPSPECIALIZATION,
  props<{ cropSpecializations: CropSpecialization[] }>()
);
