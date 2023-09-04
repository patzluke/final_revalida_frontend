import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserNotificationsState } from './user-notifications.reducer';

export const selectUserNotificationsState =
  createFeatureSelector<UserNotificationsState>('userNotificationsList');

export const selectUserNotifications = () =>
  createSelector(
    selectUserNotificationsState,
    (state: UserNotificationsState) =>
      state.userNotifications.filter(
        (userNotification) => userNotification.isRead == false
      )
  );

export const selectUserNotificationsRecent = () =>
  createSelector(
    selectUserNotificationsState,
    (state: UserNotificationsState) =>
      state.userNotifications.filter((userNotification) => {
        let datePlus24Hrs = new Date(userNotification.dateCreated);
        datePlus24Hrs.setHours(datePlus24Hrs.getHours() + 24);
        let dateToday = new Date();
        if (datePlus24Hrs <= dateToday) {
          return false;
        }
        return true;
      })
  );

export const selectUserNotificationsEarlier = () =>
  createSelector(
    selectUserNotificationsState,
    (state: UserNotificationsState) =>
      state.userNotifications.filter((userNotification) => {
        let datePlus24Hrs = new Date(userNotification.dateCreated);
        datePlus24Hrs.setHours(datePlus24Hrs.getHours() + 24);
        let dateToday = new Date();
        if (datePlus24Hrs <= dateToday) {
          return true;
        }
        return false;
      })
  );
