import { createReducer, on } from '@ngrx/store';
import {
  addPostAdvertisementState,
  deletePostAdvertisementState,
  setPostAdvertisementState,
  updatePostAdvertisementState,
} from './postadvertisement.actions';
import { PostAdvertisement } from '../../models/post-advertisement';

export interface PostAdvertisementState {
  postAdvertisements: PostAdvertisement[];
}

export const initialState: PostAdvertisementState = {
  postAdvertisements: [],
};

export const postAdvertisementReducer = createReducer(
  initialState,
  on(setPostAdvertisementState, (state, { postAdvertisements }) => {
    return { ...state, postAdvertisements: postAdvertisements };
  }),
  on(addPostAdvertisementState, (state, { postAdvertisement }) => {
    return {
      ...state,
      postAdvertisements: [postAdvertisement, ...state.postAdvertisements],
    };
  }),
  on(updatePostAdvertisementState, (state, { postAdvertisement }) => {
    return {
      ...state,
      postAdvertisements: state.postAdvertisements.map((oldPostAdvertisement) =>
        oldPostAdvertisement.postId == postAdvertisement.postId
          ? postAdvertisement
          : oldPostAdvertisement
      ),
    };
  }),
  on(deletePostAdvertisementState, (state, { postId }) => {
    return {
      ...state,
      postAdvertisements: state.postAdvertisements.filter(
        (oldPostAdvertisement) => oldPostAdvertisement.postId !== postId
      ),
    };
  })
);
