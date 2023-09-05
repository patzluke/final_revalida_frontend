import { createAction, props } from '@ngrx/store';
import { UserNotifications } from '../../models/user-notifications';

export enum UserNotificationsActions {
  SET_USERNOTIFICATIONS = '[User Notifications] Set List of User Notifications ',
  GET_USERNOTIFICATIONS = '[User Notifications] Get List of User Notifications  Success',
  GET_USERNOTIFICATIONS_FAILED = '[User Notifications] Get List of User Notifications  Failed',

  UPDATE_USERNOTIFICATIONS = '[User Notifications] Update User Notifications status',
  UPDATE_USERNOTIFICATIONS_SUCCESS = '[User Notifications] Update User Notifications status Success',
  UPDATE_USERNOTIFICATIONS_FAILED = '[User Notifications] Update User Notifications status Failed',
}

export const setUserNotificationsState = createAction(
  UserNotificationsActions.SET_USERNOTIFICATIONS,
  props<{ userNotifications: UserNotifications[] }>()
);
//--------------------------------------------------------------------
export const updateUserNotificationsState = createAction(
  UserNotificationsActions.UPDATE_USERNOTIFICATIONS_SUCCESS,
  props<{ userNotificationsList: UserNotifications[] }>()
);
