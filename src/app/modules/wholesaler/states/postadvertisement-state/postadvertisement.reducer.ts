import { createReducer, on } from '@ngrx/store';
import { PostAdvertisement } from '../../models/post-advertisement';
import { addPostAdvertisementStateSupplierSide, deletePostAdvertisementStateSupplierSide, setPostAdvertisementStateSupplierSide, updatePostAdvertisementStateSupplierSide } from './postadvertisement.actions';

export interface PostAdvertisementState {
  postAdvertisements: PostAdvertisement[];
}

export const initialState: PostAdvertisementState = {
  postAdvertisements: [],
};

export const postAdvertisementReducerSupplierSide = createReducer(
  initialState,
  on(setPostAdvertisementStateSupplierSide, (state, { postAdvertisements }) => {
    return { ...state, postAdvertisements: postAdvertisements };
  }),
  on(addPostAdvertisementStateSupplierSide, (state, { postAdvertisement }) => {
    return {
      ...state,
      postAdvertisements: [postAdvertisement, ...state.postAdvertisements],
    };
  }),
  on(updatePostAdvertisementStateSupplierSide, (state, { postAdvertisement }) => {
    return {
      ...state,
      postAdvertisements: state.postAdvertisements.map((oldPostAdvertisement) => {
       return oldPostAdvertisement.postId as number == postAdvertisement.postId as number
          ? postAdvertisement
          : oldPostAdvertisement
    }),
    };
  }),
  on(deletePostAdvertisementStateSupplierSide, (state, { postId }) => {
    return {
      ...state,
      postAdvertisements: state.postAdvertisements.filter(
        (oldPostAdvertisement) => oldPostAdvertisement.postId !== postId
      ),
    };
  })
);
