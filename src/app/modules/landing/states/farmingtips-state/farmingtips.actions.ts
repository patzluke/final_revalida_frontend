import { createAction, props } from '@ngrx/store';
import { FarmingTip } from '../../models/farming-tip';

export enum FarmingTipsActions {
  SET_FARMINGTIPS = '[FarmingTips] Set List of FarmingTips (Landing Side)',
  GET_FARMINGTIPS = '[FarmingTips] Get List of FarmingTips (Landing Side) Success',
}

export const setFarmingTipsState = createAction(
  FarmingTipsActions.SET_FARMINGTIPS,
  props<{ farmingTips: FarmingTip[] }>()
);
