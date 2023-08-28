import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserApplicantsState } from './userapplicant.reducer';

export const selectUserApplicantsState =
  createFeatureSelector<UserApplicantsState>('userApplicantList');

export const selectUserApplicants = () =>
  createSelector(
    selectUserApplicantsState,
    (state: UserApplicantsState) => state.userApplicants
  );

  export const selectFarmerApplicants = () =>
  createSelector(
    selectUserApplicantsState,
    (state: UserApplicantsState) => state.userApplicants.filter(applicant => applicant.userType == 'Farmer')
  );

export const selectUserApplicant = (applicantId: number) =>
  createSelector(selectUserApplicantsState, (state: UserApplicantsState) =>
    state.userApplicants.find((applicant) => {
      return applicant.applicantId == applicantId;
    })
  );
