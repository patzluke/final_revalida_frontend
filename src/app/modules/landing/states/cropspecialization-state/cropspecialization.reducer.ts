import { createReducer, on } from '@ngrx/store';
import { CropSpecialization } from '../../models/crop-specialization';
import { setCropSpecializationState } from './cropspecialization.actions';

export interface CropSpecializationState {
  cropSpecializations: CropSpecialization[];
}

export const initialState: CropSpecializationState = {
  cropSpecializations: [],
};

export const cropSpecializationReducer = createReducer(
  initialState,
  on(setCropSpecializationState, (state, { cropSpecializations }) => {
    return { ...state, cropSpecializations: cropSpecializations };
  })
);
