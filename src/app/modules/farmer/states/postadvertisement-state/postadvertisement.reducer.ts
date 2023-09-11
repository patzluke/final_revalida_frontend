import { createReducer, on } from '@ngrx/store';
import { setPostAdvertisementState } from './postadvertisement.actions';
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
    return { ...state, postAdvertisements: [...postAdvertisements] };
  })
);
