import { createAction, props } from '@ngrx/store';
import { SupplierComplaint } from '../../models/supplierComplaint';

export enum SupplierComplaintActions {
  SET_SUPPLIERCOMPLAINTS = "[suppliercomplaint] Set List of supplier's complaint",
  GET_SUPPLIERCOMPLAINTS = "[suppliercomplaint] Get List of supplier's complaint Success",

  ADD_SUPPLIERCOMPLAINT = "[suppliercomplaint] Add supplier's complaint",
  ADD_SUPPLIERCOMPLAINT_SUCCESS = "[suppliercomplaint] Add supplier's Success",
  ADD_SUPPLIERCOMPLAINT_FAILED = "[suppliercomplaint] Add supplier's Failed",

  UPDATE_SUPPLIERCOMPLAINT = "[suppliercomplaint] Update supplier's complaint",
  UPDATE_SUPPLIERCOMPLAINT_SUCCESS = "[suppliercomplaint] Update supplier's complaint Success",
  UPDATE_SUPPLIERCOMPLAINT_FAILED = "[suppliercomplaint] Update supplier's complaint Failed",

  UPDATE_SUPPLIERCOMPLAINT_STATUS = "[suppliercomplaint] Update supplier's complaint status",
  UPDATE_SUPPLIERCOMPLAINT_STATUS_SUCCESS = "[suppliercomplaint] Update supplier's complaint status Success",
  UPDATE_SUPPLIERCOMPLAINT_STATUS_FAILED = "[suppliercomplaint] Update supplier's complaint status Failed",

  DELETE_SUPPLIERCOMPLAINT = "[suppliercomplaint] delete supplier's complaint",
  DELETE_SUPPLIERCOMPLAINT_SUCCESS = "[suppliercomplaint] delete supplier's complaint Success",
  DELETE_SUPPLIERCOMPLAINT_FAILED = "[suppliercomplaint] delete supplier's complaint Failed",
}

export const setSupplierComplaintState = createAction(
  SupplierComplaintActions.SET_SUPPLIERCOMPLAINTS,
  props<{ supplierComplaints: SupplierComplaint[] }>()
);
//--------------------------------------------------------------------
export const updateSupplierComplaintState = createAction(
  SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_SUCCESS,
  props<{ supplierComplaint: SupplierComplaint }>()
);
