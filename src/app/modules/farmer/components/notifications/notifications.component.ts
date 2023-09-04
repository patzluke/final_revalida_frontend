import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserNotificationsActions } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.actions';
import { UserNotificationsState } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.reducer';
import { selectUserNotificationsEarlier, selectUserNotificationsRecent } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  getToDayString = (date: string) => {
    return new Date(date).toDateString();
  }
  //selectors
  selectUserNotificationsRecent$ = this.store.select(selectUserNotificationsRecent());
  selectUserNotificationsEarlier$ = this.store.select(selectUserNotificationsEarlier());

  constructor(private store: Store<UserNotificationsState>) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: UserNotificationsActions.GET_USERNOTIFICATIONS,
      userId: localStorage.getItem('userId'),
    });
  }
}
