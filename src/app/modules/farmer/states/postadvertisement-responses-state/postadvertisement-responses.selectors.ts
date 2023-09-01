import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostAdvertisementResponsesState } from './postadvertisement-responses.reducer';

export const selectPostAdvertisementResponsesState =
  createFeatureSelector<PostAdvertisementResponsesState>(
    'postAdvertisementResponsesList (Farmer)'
  );

export const selectPostAdvertisementResponses = () =>
  createSelector(
    selectPostAdvertisementResponsesState,
    (state: PostAdvertisementResponsesState) => state.postAdvertisementResponses
  );

export const selectPostAdvertisementResponse = (postResponseId: number) =>
  createSelector(
    selectPostAdvertisementResponsesState,
    (state: PostAdvertisementResponsesState) =>
      state.postAdvertisementResponses.find((postAdvertisementResponse) => {
        return postAdvertisementResponse.postResponseId == postResponseId;
      })
  );

  export const selectPostAdvertisementResponseByPostId = (postId: number, farmerId: number) =>
  createSelector(
    selectPostAdvertisementResponsesState,
    (state: PostAdvertisementResponsesState) =>
      state.postAdvertisementResponses.find((postAdvertisementResponse) => {
        return postAdvertisementResponse.postAdvertisement?.postId == postId && postAdvertisementResponse.farmer?.farmerId == farmerId;
      })
  );
