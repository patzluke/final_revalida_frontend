import { createAction, props } from '@ngrx/store';
import { FarmingTip } from '../../models/farmingTip';

export enum FarmingTipActions {
  SET_FARMINGTIPS = '[farmingtips] Set List of farmingtips (Farmer Side)',
  GET_FARMINGTIPS = '[farmingtips] Get List of farmingtips (Farmer Side) Success',

  ADD_FARMINGTIP = '[farmingtips] Add farmingtip (Farmer Side)',
  ADD_FARMINGTIP_SUCCESS = '[farmingtips] Add farmingtip (Farmer Side) Success',
  ADD_FARMINGTIP_FAILED = '[farmingtips] Add farmingtip (Farmer Side) Failed',

  UPDATE_FARMINGTIP = '[farmingtips] Update farmingtip (Farmer Side)',
  UPDATE_FARMINGTIP_SUCCESS = '[farmingtips] Update farmingtip (Farmer Side) Success',
  UPDATE_FARMINGTIP_FAILED = '[farmingtips] Update farmingtip (Farmer Side) Failed',

  DELETE_FARMINGTIP = '[farmingtips] delete farmingtip (Farmer Side)',
  DELETE_FARMINGTIP_SUCCESS = '[farmingtips] delete farmingtip (Farmer Side) Success',
  DELETE_FARMINGTIP_FAILED = '[farmingtips] delete farmingtip (Farmer Side) Failed',
}

export const setFarmingTipState = createAction(
  FarmingTipActions.SET_FARMINGTIPS,
  props<{ farmingTips: FarmingTip[] }>()
);
//--------------------------------------------------------------------
export const addFarmingTipState = createAction(
  FarmingTipActions.ADD_FARMINGTIP_SUCCESS,
  props<{ farmingTip: FarmingTip }>()
);
//--------------------------------------------------------------------
export const updateFarmingTipState = createAction(
  FarmingTipActions.UPDATE_FARMINGTIP_SUCCESS,
  props<{ farmingTip: FarmingTip }>()
);
//--------------------------------------------------------------------
export const deleteFarmingTipState = createAction(
  FarmingTipActions.DELETE_FARMINGTIP_SUCCESS,
  props<{ farmingTipId: number }>()
);
