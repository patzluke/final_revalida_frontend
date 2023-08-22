import { createAction, props } from '@ngrx/store';
import { PostAdvertisement } from '../../models/post-advertisement';

export enum PostAdvertisementActions {
  SET_POSTADVERTISEMENT = "[PostAdvertisement] Set List of PostAdvertisement",
  GET_POSTADVERTISEMENT = "[PostAdvertisement] Get List of PostAdvertisement Success",

  ADD_POSTADVERTISEMENT = "[PostAdvertisement] Add PostAdvertisement",
  ADD_POSTADVERTISEMENT_SUCCESS = "[PostAdvertisement] Add PostAdvertisement Success",
  ADD_POSTADVERTISEMENT_FAILED = "[PostAdvertisement] Add PostAdvertisement Failed",

  UPDATE_POSTADVERTISEMENT = "[PostAdvertisement] Update PostAdvertisement",
  UPDATE_POSTADVERTISEMENT_SUCCESS = "[PostAdvertisement] Update PostAdvertisement Success",
  UPDATE_POSTADVERTISEMENT_FAILED = "[PostAdvertisement] Update PostAdvertisement Failed",

  DELETE_POSTADVERTISEMENT = "[PostAdvertisement] delete PostAdvertisement",
  DELETE_POSTADVERTISEMENT_SUCCESS = "[PostAdvertisement] delete PostAdvertisement Success",
  DELETE_POSTADVERTISEMENT_FAILED = "[PostAdvertisement] delete PostAdvertisement Failed",
}

export const setPostAdvertisementState = createAction(
  PostAdvertisementActions.SET_POSTADVERTISEMENT,
  props<{ postAdvertisements: PostAdvertisement[] }>()
);
//--------------------------------------------------------------------
export const addPostAdvertisementState = createAction(
  PostAdvertisementActions.ADD_POSTADVERTISEMENT_SUCCESS,
  props<{ postAdvertisement: PostAdvertisement }>()
);
//--------------------------------------------------------------------
export const updatePostAdvertisementState = createAction(
  PostAdvertisementActions.UPDATE_POSTADVERTISEMENT_SUCCESS,
  props<{ postAdvertisement: PostAdvertisement }>()
);
//--------------------------------------------------------------------
export const deletePostAdvertisementState = createAction(
  PostAdvertisementActions.DELETE_POSTADVERTISEMENT_SUCCESS,
  props<{ postId: number }>()
);
