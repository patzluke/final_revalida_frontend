import { createAction, props } from '@ngrx/store';
import { PostAdvertisement } from '../../models/post-advertisement';

export enum PostAdvertisementActions {
  SET_POSTADVERTISEMENT = '[PostAdvertisement] Set List of PostAdvertisement (Landing Side)',
  GET_POSTADVERTISEMENT = '[PostAdvertisement] Get List of PostAdvertisement (Landing Side) Success',
}

export const setPostAdvertisementState = createAction(
  PostAdvertisementActions.SET_POSTADVERTISEMENT,
  props<{ postAdvertisements: PostAdvertisement[] }>()
);
