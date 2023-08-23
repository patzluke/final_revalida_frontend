import { createAction, props } from '@ngrx/store';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';

export enum PostAdvertisementResponsesActions {
  SET_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponse] Set List of PostAdvertisementResponse',
  GET_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponse] Get List of PostAdvertisementResponse Success',

  UPDATE_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponses] Update PostAdvertisement responses',
  UPDATE_POSTADVERTISEMENTRESPONSES_SUCCESS = '[PostAdvertisementResponses] Update PostAdvertisement responses Success',
  UPDATE_POSTADVERTISEMENTRESPONSES_FAILED = '[PostAdvertisementResponses] Update PostAdvertisement responses Failed',
}

export const setPostAdvertisementResponsesState = createAction(
  PostAdvertisementResponsesActions.SET_POSTADVERTISEMENTRESPONSES,
  props<{ postAdvertisementResponses: PostAdvertisementResponse[] }>()
);
//--------------------------------------------------------------------
export const updatePostAdvertisementResponsesState = createAction(
  PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES_SUCCESS,
  props<{ postAdvertisementResponse: PostAdvertisementResponse }>()
);
