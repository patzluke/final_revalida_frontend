import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
      .observe('(max-width: 767px)')
      .pipe(
        map((result: BreakpointState) => result.matches),
        shareReplay()
      );
  }

  isSidebarExpanded = true;
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
  }

  logout = () => {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  };
}
