import { createReducer, on } from '@ngrx/store';
import { UserNotifications } from '../../models/user-notifications';
import {
  setUserNotificationsState,
  updateUserNotificationsState,
} from './user-notifications.actions';

export interface UserNotificationsState {
  userNotifications: UserNotifications[];
}

export const initialState: UserNotificationsState = {
  userNotifications: [],
};

export const userNotificationsReducer = createReducer(
  initialState,
  on(setUserNotificationsState, (state, { userNotifications }) => {
    return { ...state, userNotifications: userNotifications };
  }),
  on(updateUserNotificationsState, (state, { userNotificationsList }) => {
    return { ...state, userNotifications: userNotificationsList };
  })
);
