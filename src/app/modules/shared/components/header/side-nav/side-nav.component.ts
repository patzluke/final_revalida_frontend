import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, shareReplay } from 'rxjs';
import { UserNotificationsState } from '../../../states/user-notifications-state/user-notifications.reducer';
import { UserNotificationsActions } from '../../../states/user-notifications-state/user-notifications.actions';
import { selectUserNotifications } from '../../../states/user-notifications-state/user-notifications.selectors';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  isMinWidth800: boolean = false;

  //selectors
  selectUserNotifications$ = this.store.select(selectUserNotifications());

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private store: Store<UserNotificationsState>
  ) {
    this.isMinWidth800 = window.innerWidth > 800;
  }

  updateNotificationStatusesToRead = () => {
    this.store.dispatch({
      type: UserNotificationsActions.UPDATE_USERNOTIFICATIONS,
      userId: localStorage.getItem('userId'),
    });
  };

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
      .observe('(max-width: 767px)')
      .pipe(
        map((result: BreakpointState) => result.matches),
        shareReplay()
      );

    this.store.dispatch({
      type: UserNotificationsActions.GET_USERNOTIFICATIONS,
      userId: localStorage.getItem('userId'),
    });
  }

  isSidebarExpanded = false;
  isHandset$!: Observable<boolean>;
  userType = localStorage.getItem('userType');

  toggleSidebar() {
    if (this.isHandset$) {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    } else {
      this.isSidebarExpanded = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.isSidebarExpanded = !this.isHandset$;
    this.isMinWidth800 = window.innerWidth > 800;
  }

  sideNav: boolean = false;
  toggleSidenav(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
    this.sideNav = !this.sideNav;
  }

  logout = () => {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  };
}
