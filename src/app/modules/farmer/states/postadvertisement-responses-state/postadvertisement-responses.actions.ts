import { createAction, props } from '@ngrx/store';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';

export enum PostAdvertisementResponsesActions {
  SET_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponse] Set List of PostAdvertisementResponse (Farmer Side)',
  GET_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponse] Get List of PostAdvertisementResponse Success (Farmer Side)',

  ADD_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponses] insert PostAdvertisement responses (Farmer Side)',
  ADD_POSTADVERTISEMENTRESPONSES_SUCCESS = '[PostAdvertisementResponses] insert PostAdvertisement responses Success (Farmer Side)',
  ADD_POSTADVERTISEMENTRESPONSES_FAILED = '[PostAdvertisementResponses] insert PostAdvertisement responses Failed (Farmer Side)',

  UPDATE_POSTADVERTISEMENTRESPONSES = '[PostAdvertisementResponses] Update PostAdvertisement responses (Farmer Side)',
  UPDATE_POSTADVERTISEMENTRESPONSES_SUCCESS = '[PostAdvertisementResponses] Update PostAdvertisement responses Success (Farmer Side)',
  UPDATE_POSTADVERTISEMENTRESPONSES_FAILED = '[PostAdvertisementResponses] Update PostAdvertisement responses Failed (Farmer Side)',
}

export const setPostAdvertisementResponsesState = createAction(
  PostAdvertisementResponsesActions.SET_POSTADVERTISEMENTRESPONSES,
  props<{ postAdvertisementResponses: PostAdvertisementResponse[] }>()
);
//--------------------------------------------------------------------
export const addAdvertisementResponsesState = createAction(
  PostAdvertisementResponsesActions.ADD_POSTADVERTISEMENTRESPONSES_SUCCESS,
  props<{ postAdvertisementResponse: PostAdvertisementResponse }>()
);
//--------------------------------------------------------------------
export const updatePostAdvertisementResponsesState = createAction(
  PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES_SUCCESS,
  props<{ postAdvertisementResponse: PostAdvertisementResponse }>()
);
