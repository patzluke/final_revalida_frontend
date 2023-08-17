import { createAction, props } from '@ngrx/store';
import { FarmingTip } from '../../models/farmingTip';
import { FarmerComplaint } from '../../models/farmercomplaint';

export enum FarmerComplaintActions {
  SET_FARMERCOMPLAINTS = '[farmercomplaint] Set List of farmercomplaint',
  GET_FARMERCOMPLAINTS = '[farmercomplaint] Get List of farmercomplaint Success',

  ADD_FARMERCOMPLAINT = '[farmercomplaint] Add farmercomplaint',
  ADD_FARMERCOMPLAINT_SUCCESS = '[farmercomplaint] Add farmercomplaint Success',
  ADD_FARMERCOMPLAINT_FAILED = '[farmercomplaint] Add farmercomplaint Failed',

  UPDATE_FARMERCOMPLAINT = '[farmercomplaint] Update farmercomplaint',
  UPDATE_FARMERCOMPLAINT_SUCCESS = '[farmercomplaint] Update farmercomplaint Success',
  UPDATE_FARMERCOMPLAINT_FAILED = '[farmercomplaint] Update farmercomplaint Failed',

  UPDATE_FARMERCOMPLAINT_STATUS = '[farmercomplaint] Update farmercomplaint status',
  UPDATE_FARMERCOMPLAINT_STATUS_SUCCESS = '[farmercomplaint] Update farmercomplaint status Success',
  UPDATE_FARMERCOMPLAINT_STATUS_FAILED = '[farmercomplaint] Update farmercomplaint status Failed',

  DELETE_FARMERCOMPLAINT = '[farmercomplaint] delete farmercomplaint',
  DELETE_FARMERCOMPLAINT_SUCCESS = '[farmercomplaint] delete farmercomplaint Success',
  DELETE_FARMERCOMPLAINT_FAILED = '[farmercomplaint] delete farmercomplaint Failed',
}

export const setFarmerComplaintState = createAction(
  FarmerComplaintActions.SET_FARMERCOMPLAINTS,
  props<{ farmerComplaints: FarmerComplaint[] }>()
);
//--------------------------------------------------------------------
export const updateFarmerComplaintState = createAction(
  FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_SUCCESS,
  props<{ farmerComplaint: FarmerComplaint }>()
);
