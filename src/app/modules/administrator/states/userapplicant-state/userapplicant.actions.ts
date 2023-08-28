import { createAction, props } from '@ngrx/store';
import { UserApplicants } from '../../models/userapplicants';

export enum UserApplicantActions {
  SET_USERAPPLICANT = '[UserApplicant] Set List of UserApplicant',
  GET_USERAPPLICANT = '[UserApplicant] Get List of UserApplicant Success',

  UPDATE_USERAPPLICANT_STATUS = '[UserApplicant] Update UserApplicant status',
  UPDATE_USERAPPLICANT_STATUS_SUCCESS = '[UserApplicant] Update UserApplicant status Success',
  UPDATE_USERAPPLICANT_STATUS_FAILED = '[UserApplicant] Update UserApplicant status Failed',
}

export const setSUserApplicantState = createAction(
  UserApplicantActions.SET_USERAPPLICANT,
  props<{ userApplicants: UserApplicants[] }>()
);
//--------------------------------------------------------------------
export const updateUserApplicantState = createAction(
  UserApplicantActions.UPDATE_USERAPPLICANT_STATUS_SUCCESS,
  props<{ userApplicant: UserApplicants }>()
);
