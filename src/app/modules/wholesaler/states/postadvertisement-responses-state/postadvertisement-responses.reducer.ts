import { createReducer, on } from '@ngrx/store';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import {
  setPostAdvertisementResponsesState,
  updatePostAdvertisementResponsesState,
} from './postadvertisement-responses.actions';

export interface PostAdvertisementResponsesState {
  postAdvertisementResponses: PostAdvertisementResponse[];
}

export const initialState: PostAdvertisementResponsesState = {
  postAdvertisementResponses: [],
};

export const postAdvertisementResponsesReducer = createReducer(
  initialState,
  on(
    setPostAdvertisementResponsesState,
    (state, { postAdvertisementResponses }) => {
      return {
        ...state,
        postAdvertisementResponses: postAdvertisementResponses,
      };
    }
  ),
  on(
    updatePostAdvertisementResponsesState,
    (state, { postAdvertisementResponse }) => {
      return {
        ...state,
        postAdvertisementResponses: state.postAdvertisementResponses.map(
          (oldPostAdvertisementResponse) =>
            oldPostAdvertisementResponse.postResponseId ==
            postAdvertisementResponse.postResponseId
              ? postAdvertisementResponse
              : oldPostAdvertisementResponse
        ),
      };
    }
  )
);
