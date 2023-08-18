import { createReducer, on } from '@ngrx/store';
import {
  setSingleFarmerComplaintState,
  updateSingleFarmerComplaintState,
} from './farmercomplaint.actions';
import { FarmerComplaint } from '../../models/farmercomplaint';

export interface FarmerComplaintState {
  farmerComplaints: FarmerComplaint[];
}

export const initialState: FarmerComplaintState = {
  farmerComplaints: [],
};

export const farmerComplaintReducer = createReducer(
  initialState,
  on(setSingleFarmerComplaintState, (state, { farmerComplaints }) => {
    return { ...state, farmerComplaints: farmerComplaints };
  }),
  on(updateSingleFarmerComplaintState, (state, { farmerComplaint }) => {
    return {
      ...state,
      farmerComplaints: state.farmerComplaints.map((oldFarmerComplaint) =>
        oldFarmerComplaint.farmerComplaintId ==
        farmerComplaint.farmerComplaintId
          ? farmerComplaint
          : oldFarmerComplaint
      ),
    };
  })
);
