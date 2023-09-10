import { createReducer, on } from '@ngrx/store';
import { SupplierComplaint } from '../../models/supplierComplaint';
import {
  setSupplierComplaintState,
  updateSupplierComplaintState,
} from './suppliercomplaint.actions';

export interface SupplierComplaintState {
  supplierComplaints: SupplierComplaint[];
}

export const initialState: SupplierComplaintState = {
  supplierComplaints: [],
};

export const supplierComplaintReducer = createReducer(
  initialState,
  on(setSupplierComplaintState, (state, { supplierComplaints }) => {
    return { ...state, supplierComplaints: supplierComplaints };
  }),
  on(updateSupplierComplaintState, (state, { supplierComplaint }) => {
    return {
      ...state,
      supplierComplaints: state.supplierComplaints.map((oldSupplierComplaint) =>
        oldSupplierComplaint.supplierComplaintId ==
        supplierComplaint.supplierComplaintId
          ? supplierComplaint
          : oldSupplierComplaint
      ),
    };
  })
);
