import { createAction, props } from '@ngrx/store';
import { Farmer } from '../../models/farmer';

export enum FarmerActions {
  SET_FARMER = '[farmer] Set List of farmer',
  GET_FARMER = '[farmer] Get List of farmer Success',

  UPDATE_FARMER = '[farmer] Update farmer',
  UPDATE_FARMER_SUCCESS = '[farmer] Update farmer Success',
  UPDATE_FARMER_FAILED = '[farmer] Update farmer Failed',

  UPDATE_FARMER_STATUS = '[farmer] Update farmer status',
  UPDATE_FARMER_STATUS_SUCCESS = '[farmer] Update farmer status Success',
  UPDATE_FARMER_STATUS_FAILED = '[farmer] Update farmer status Failed',

  UPDATE_FARMER_ACTIVE_STATUS = '[farmer] Update farmer active status',
  UPDATE_FARMER_ACTIVE_STATUS_SUCCESS = '[farmer] Update farmer active status Success',
  UPDATE_FARMER_ACTIVE_STATUS_FAILED = '[farmer] Update farmer active status Failed',
}

export const setFarmerState = createAction(
  FarmerActions.SET_FARMER,
  props<{ farmers: Farmer[] }>()
);
//--------------------------------------------------------------------
export const updateFarmerState = createAction(
  FarmerActions.UPDATE_FARMER_SUCCESS,
  props<{ farmer: Farmer }>()
);
