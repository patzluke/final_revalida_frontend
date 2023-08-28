import { createReducer, on } from '@ngrx/store';
import { Farmer } from '../../models/farmer';
import { setFarmerState, updateFarmerState } from './farmer.actions';

export interface FarmerState {
  farmers: Farmer[];
}

export const initialState: FarmerState = {
  farmers: [],
};

export const farmerReducer = createReducer(
  initialState,
  on(setFarmerState, (state, { farmers }) => {
    return { ...state, farmers: farmers };
  }),
  on(updateFarmerState, (state, { farmer }) => {
    return {
      ...state,
      farmers: state.farmers.map((oldFarmer) =>
        oldFarmer.farmerId == farmer.farmerId ? farmer : oldFarmer
      ),
    };
  })
);
