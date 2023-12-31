import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserNotificationsActions } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.actions';
import { UserNotificationsState } from 'src/app/modules/shared/states/user-notifications-state/user-notifications.reducer';
import {
  selectUserNotificationsEarlier,
  selectUserNotificationsRecent,
} from 'src/app/modules/shared/states/user-notifications-state/user-notifications.selectors';
import { UserNotifications } from 'src/app/modules/shared/models/user-notifications';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  user: Supplier = { user: undefined };
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
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: UserNotificationsActions.GET_USERNOTIFICATIONS,
      userId: localStorage.getItem('userId'),
    });


    this.supplierService
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
