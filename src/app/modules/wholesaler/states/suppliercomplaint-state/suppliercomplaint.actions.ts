import { createAction, props } from '@ngrx/store';
import { SupplierComplaint } from '../../models/suppliercomplaint';

export enum SupplierComplaintActions {
  SET_SINGLE_SUPPLIERCOMPLAINTS = "[suppliercomplaint] Set List of supplier's complaint",
  GET_SINGLE_SUPPLIERCOMPLAINTS = "[suppliercomplaint] Get List of supplier's complaint Success",

  ADD_SUPPLIERCOMPLAINT = "[suppliercomplaint] Add supplier's complaint",
  ADD_SUPPLIERCOMPLAINT_SUCCESS = "[suppliercomplaint] Add supplier's Success",
  ADD_SUPPLIERCOMPLAINT_FAILED = "[suppliercomplaint] Add supplier's Failed",

  UPDATE_SINGLE_SUPPLIERCOMPLAINT = "[suppliercomplaint] Update supplier's complaint",
  UPDATE_SINGLE_SUPPLIERCOMPLAINT_SUCCESS = "[suppliercomplaint] Update supplier's complaint Success",
  UPDATE_SINGLE_SUPPLIERCOMPLAINT_FAILED = "[suppliercomplaint] Update supplier's complaint Failed",

  UPDATE_SUPPLIERCOMPLAINT_STATUS = "[suppliercomplaint] Update supplier's complaint status",
  UPDATE_SUPPLIERCOMPLAINT_STATUS_SUCCESS = "[suppliercomplaint] Update supplier's complaint status Success",
  UPDATE_SUPPLIERCOMPLAINT_STATUS_FAILED = "[suppliercomplaint] Update supplier's complaint status Failed",

  DELETE_SUPPLIERCOMPLAINT = "[suppliercomplaint] delete supplier's complaint",
  DELETE_SUPPLIERCOMPLAINT_SUCCESS = "[suppliercomplaint] delete supplier's complaint Success",
  DELETE_SUPPLIERCOMPLAINT_FAILED = "[suppliercomplaint] delete supplier's complaint Failed",
}

export const setSingleSupplierComplaintState = createAction(
  SupplierComplaintActions.SET_SINGLE_SUPPLIERCOMPLAINTS,
  props<{ supplierComplaints: SupplierComplaint[] }>()
);
//--------------------------------------------------------------------
export const addSingleSupplierComplaintState = createAction(
  SupplierComplaintActions.ADD_SUPPLIERCOMPLAINT_SUCCESS,
  props<{ supplierComplaint: SupplierComplaint }>()
);
//--------------------------------------------------------------------
export const updateSingleSupplierComplaintState = createAction(
  SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_STATUS_SUCCESS,
  props<{ supplierComplaint: SupplierComplaint }>()
);
