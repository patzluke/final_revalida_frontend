import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupplierComplaintState } from './suppliercomplaint.reducers';

export const selectSupplierComplaintState =
  createFeatureSelector<SupplierComplaintState>(
    'suppplierComplaintsList (Admin Acc)'
  );

export const selectSupplierComplaints = () =>
  createSelector(
    selectSupplierComplaintState,
    (state: SupplierComplaintState) =>
      state.supplierComplaints.filter(
        (supplierComplaint) => supplierComplaint.activeDeactive == true
      )
  );

export const selectSupplierComplaint = (supplierComplaintId: number) =>
  createSelector(
    selectSupplierComplaintState,
    (state: SupplierComplaintState) =>
      state.supplierComplaints.find((supplierComplaint) => {
        return (
          supplierComplaint.supplierComplaintId == supplierComplaintId &&
          supplierComplaint.activeDeactive == true
        );
      })
  );
