import { createAction, props } from '@ngrx/store';
import { FarmerComplaint } from '../../models/farmercomplaint';

export enum FarmerComplaintActions {
  SET_SINGLE_FARMERCOMPLAINTS = "[farmercomplaint] Set List of farmer's complaint",
  GET_SINGLE_FARMERCOMPLAINTS = "[farmercomplaint] Get List of farmer's complaint Success",

  ADD_FARMERCOMPLAINT = "[farmercomplaint] Add farmer's complaint",
  ADD_FARMERCOMPLAINT_SUCCESS = "[farmercomplaint] Add farmer's Success",
  ADD_FARMERCOMPLAINT_FAILED = "[farmercomplaint] Add farmer's Failed",

  UPDATE_SINGLE_FARMERCOMPLAINT = "[farmercomplaint] Update farmer's complaint",
  UPDATE_SINGLE_FARMERCOMPLAINT_SUCCESS = "[farmercomplaint] Update farmer's complaint Success",
  UPDATE_SINGLE_FARMERCOMPLAINT_FAILED = "[farmercomplaint] Update farmer's complaint Failed",

  UPDATE_FARMERCOMPLAINT_STATUS = "[farmercomplaint] Update farmer's complaint status",
  UPDATE_FARMERCOMPLAINT_STATUS_SUCCESS = "[farmercomplaint] Update farmer's complaint status Success",
  UPDATE_FARMERCOMPLAINT_STATUS_FAILED = "[farmercomplaint] Update farmer's complaint status Failed",

  DELETE_FARMERCOMPLAINT = "[farmercomplaint] delete farmer's complaint",
  DELETE_FARMERCOMPLAINT_SUCCESS = "[farmercomplaint] delete farmer's complaint Success",
  DELETE_FARMERCOMPLAINT_FAILED = "[farmercomplaint] delete farmer's complaint Failed",
}

export const setSingleFarmerComplaintState = createAction(
  FarmerComplaintActions.SET_SINGLE_FARMERCOMPLAINTS,
  props<{ farmerComplaints: FarmerComplaint[] }>()
);
//--------------------------------------------------------------------
export const addSingleFarmerComplaintState = createAction(
  FarmerComplaintActions.ADD_FARMERCOMPLAINT_SUCCESS,
  props<{ farmerComplaint: FarmerComplaint }>()
);
//--------------------------------------------------------------------
export const updateSingleFarmerComplaintState = createAction(
  FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS_SUCCESS,
  props<{ farmerComplaint: FarmerComplaint }>()
);

// export const addFarmerComplaintState = createAction(
//   FarmerComplaintActions.ADD_FARMERCOMPLAINT,
//   props<{ farmerComplaint: FarmerComplaint }>()
// )
