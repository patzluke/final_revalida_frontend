import { createAction, props } from '@ngrx/store';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';

export enum PostAdvertisementResponsesActions {
  SET_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponse] Set List of PostAdvertisementResponse',
  GET_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponse] Get List of PostAdvertisementResponse Success',
}

export const setPostAdvertisementResponsesState = createAction(
  PostAdvertisementResponsesActions.SET_POSTADVERTISEMENTRESPONSES,
  props<{ postAdvertisementResponses: PostAdvertisementResponse[] }>()
);
