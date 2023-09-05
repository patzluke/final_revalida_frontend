import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import {
  UserNotificationsActions,
  setUserNotificationsState,
  updateUserNotificationsState,
} from './user-notifications.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserNotificationsEffects {
  constructor(
    private actions$: Actions,
    private sharedService: SharedService
  ) {}

  getUserNotifications$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserNotificationsActions.GET_USERNOTIFICATIONS),
        mergeMap((data: { userId: number }) =>
          this.sharedService
            .selectAllNotificationsOfFarmerByUserId(data.userId)
            .pipe(
              map((userNotifications) =>
                setUserNotificationsState({
                  userNotifications: userNotifications,
                })
              ),
              catchError((error: HttpErrorResponse) => {
                return of({
                  type: UserNotificationsActions.GET_USERNOTIFICATIONS_FAILED,
                });
              })
            )
        )
      );
    },
    { dispatch: true }
  );

  updateUserNotifications$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserNotificationsActions.UPDATE_USERNOTIFICATIONS),
        mergeMap((data: { userId: number }) =>
          this.sharedService
            .updateAllNotificationsToReadOfUserByUserId(data.userId)
            .pipe(
              map((userNotificationsList) =>
                updateUserNotificationsState({
                  userNotificationsList: userNotificationsList,
                })
              )
            )
        )
      );
    },
    { dispatch: true }
  );
}
