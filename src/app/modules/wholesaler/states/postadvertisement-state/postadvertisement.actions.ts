import { createAction, props } from '@ngrx/store';
import { PostAdvertisement } from '../../models/post-advertisement';

export enum PostAdvertisementActionsSupplierSide {
  SET_POSTADVERTISEMENT = "[PostAdvertisement] Set List of PostAdvertisement (Supplier Side)",
  GET_POSTADVERTISEMENT = "[PostAdvertisement] Get List of PostAdvertisement (Supplier Side) Success",

  ADD_POSTADVERTISEMENT = "[PostAdvertisement] Add PostAdvertisement (Supplier Side)",
  ADD_POSTADVERTISEMENT_SUCCESS = "[PostAdvertisement] Add PostAdvertisement (Supplier Side) Success",
  ADD_POSTADVERTISEMENT_FAILED = "[PostAdvertisement] Add PostAdvertisement (Supplier Side) Failed",

  UPDATE_POSTADVERTISEMENT = "[PostAdvertisement] Update PostAdvertisement (Supplier Side)",
  UPDATE_POSTADVERTISEMENT_SUCCESS = "[PostAdvertisement] Update PostAdvertisement (Supplier Side) Success",
  UPDATE_POSTADVERTISEMENT_FAILED = "[PostAdvertisement] Update PostAdvertisement (Supplier Side) Failed",

  DELETE_POSTADVERTISEMENT = "[PostAdvertisement] delete PostAdvertisement (Supplier Side)",
  DELETE_POSTADVERTISEMENT_SUCCESS = "[PostAdvertisement] delete PostAdvertisement (Supplier Side) Success",
  DELETE_POSTADVERTISEMENT_FAILED = "[PostAdvertisement] delete PostAdvertisement (Supplier Side) Failed",
}

export const setPostAdvertisementStateSupplierSide = createAction(
  PostAdvertisementActionsSupplierSide.SET_POSTADVERTISEMENT,
  props<{ postAdvertisements: PostAdvertisement[] }>()
);
//--------------------------------------------------------------------
export const addPostAdvertisementStateSupplierSide = createAction(
  PostAdvertisementActionsSupplierSide.ADD_POSTADVERTISEMENT_SUCCESS,
  props<{ postAdvertisement: PostAdvertisement }>()
);
//--------------------------------------------------------------------
export const updatePostAdvertisementStateSupplierSide = createAction(
  PostAdvertisementActionsSupplierSide.UPDATE_POSTADVERTISEMENT_SUCCESS,
  props<{ postAdvertisement: PostAdvertisement }>()
);
//--------------------------------------------------------------------
export const deletePostAdvertisementStateSupplierSide = createAction(
  PostAdvertisementActionsSupplierSide.DELETE_POSTADVERTISEMENT_SUCCESS,
  props<{ postId: number }>()
);
