import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserNotificationsActions } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.actions';
import { UserNotificationsState } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.reducer';
import {
  selectUserNotificationsEarlier,
  selectUserNotificationsRecent,
} from 'src/app/modules/shared/states/user-notifications-state/user-notifications.selectors';
import { Farmer } from '../../models/farmer';
import { FarmerService } from '../../services/farmer.service';
import { UserNotifications } from 'src/app/modules/shared/models/user-notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  user: Farmer = { user: undefined };
  selectedNotif: UserNotifications | undefined;

  getToDayString = (date: string) => {
    return new Date(date).toDateString();
  };

  //selectors
  selectUserNotificationsRecent$ = this.store.select(
    selectUserNotificationsRecent()
  );

  selectUserNotificationsEarlier$ = this.store.select(
    selectUserNotificationsEarlier()
  );

  constructor(
    private store: Store<UserNotificationsState>,
    private farmerService: FarmerService
  ) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: UserNotificationsActions.GET_USERNOTIFICATIONS,
      userId: localStorage.getItem('userId'),
    });

    this.farmerService
      .findOneByUserId(localStorage.getItem('userId') as any)
      .subscribe((data) => {
        this.user = data;
        //console.log('profile data', this.user);
      });
  }

  selectNotification = (selectedNotif: UserNotifications) => {
    this.selectedNotif = selectedNotif;
  };
}
