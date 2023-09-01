import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostAdvertisementState } from './postadvertisement.reducer';

export const selectPostAdvertisementState =
  createFeatureSelector<PostAdvertisementState>('postAdvertisementList (supplier)');

export const selectPostAdvertisements = () =>
  createSelector(
    selectPostAdvertisementState,
    (state: PostAdvertisementState) =>
      state.postAdvertisements.filter(
        (postAdvertisement) => postAdvertisement.activeDeactive == true
      )
  );

export const selectPostAdvertisement = (postId: number) =>
  createSelector(
    selectPostAdvertisementState,
    (state: PostAdvertisementState) =>
      state.postAdvertisements.find((postAdvertisement) => {
        return (
          postAdvertisement.postId == postId &&
          postAdvertisement.activeDeactive == true
        );
      })
  );
