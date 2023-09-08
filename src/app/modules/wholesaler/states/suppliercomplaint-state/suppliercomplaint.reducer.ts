import { createReducer, on } from '@ngrx/store';
import {
  addSingleSupplierComplaintState,
  setSingleSupplierComplaintState,
  updateSingleSupplierComplaintState,
} from './suppliercomplaint.actions';
import { SupplierComplaint } from '../../models/suppliercomplaint';

export interface SupplierComplaintState {
  supplierComplaints: SupplierComplaint[];
}

export const initialState: SupplierComplaintState = {
  supplierComplaints: [],
};

export const supplierComplaintReducer = createReducer(
  initialState,
  on(setSingleSupplierComplaintState, (state, { supplierComplaints }) => {
    return { ...state, supplierComplaints: supplierComplaints };
  }),
  on(addSingleSupplierComplaintState, (state, { supplierComplaint }) => {
    return {
      ...state,
      supplierComplaints: [supplierComplaint, ...state.supplierComplaints],
    };
  }),
  on(updateSingleSupplierComplaintState, (state, { supplierComplaint }) => {
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
