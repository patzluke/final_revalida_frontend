import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FarmerComplaintState } from './farmercomplaint.reducer';

export const selectFarmerComplaintState =
  createFeatureSelector<FarmerComplaintState>('farmerComplaintsList');

export const selectFarmerComplaints = () =>
  createSelector(selectFarmerComplaintState, (state: FarmerComplaintState) =>
    state.farmerComplaints.filter(
      (farmerComplaint) => farmerComplaint.activeDeactive == true
    )
  );

export const selectFarmerComplaint = (farmerComplaintId: number) =>
  createSelector(selectFarmerComplaintState, (state: FarmerComplaintState) =>
    state.farmerComplaints.find((farmerComplaint) => {
      return (
        farmerComplaint.farmerComplaintId == farmerComplaintId &&
        farmerComplaint.activeDeactive == true
      );
    })
  );
