import { createAction, props } from '@ngrx/store';
import { FarmingTip } from '../../models/farmingTip';

export enum FarmingTipActions {
  SET_FARMINGTIPS = '[farmingtips] Set List of farmingtips',
  GET_FARMINGTIPS = '[farmingtips] Get List of farmingtips Success',

  ADD_FARMINGTIP = '[farmingtips] Add farmingtip',
  ADD_FARMINGTIP_SUCCESS = '[farmingtips] Add farmingtip Success',
  ADD_FARMINGTIP_FAILED = '[farmingtips] Add farmingtip Failed',

  UPDATE_FARMINGTIP = '[farmingtips] Update farmingtip',
  UPDATE_FARMINGTIP_SUCCESS = '[farmingtips] Update farmingtip Success',
  UPDATE_FARMINGTIP_FAILED = '[farmingtips] Update farmingtip Failed',

  DELETE_FARMINGTIP = '[farmingtips] delete farmingtip',
  DELETE_FARMINGTIP_SUCCESS = '[farmingtips] delete farmingtip Success',
  DELETE_FARMINGTIP_FAILED = '[farmingtips] delete farmingtip Failed',
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
