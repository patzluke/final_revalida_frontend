import { createReducer, on } from '@ngrx/store';
import { UserApplicants } from '../../models/userapplicants';
import {
  setSUserApplicantState,
  updateUserApplicantState,
} from './userapplicant.actions';

export interface UserApplicantsState {
  userApplicants: UserApplicants[];
}

export const initialState: UserApplicantsState = {
  userApplicants: [],
};

export const userApplicantsReducer = createReducer(
  initialState,
  on(setSUserApplicantState, (state, { userApplicants }) => {
    return { ...state, userApplicants: userApplicants };
  }),
  on(updateUserApplicantState, (state, { userApplicant }) => {
    return {
      ...state,
      userApplicants: state.userApplicants.map((oldUserApplicant) =>
        oldUserApplicant.applicantId == userApplicant.applicantId
          ? userApplicant
          : oldUserApplicant
      ),
    };
  })
);
