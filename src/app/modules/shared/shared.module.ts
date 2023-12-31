import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { SideNavComponent } from './components/header/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingRoutingModule } from '../landing/landing-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { StoreModule } from '@ngrx/store';
import { userNotificationsReducer } from './states/user-notifications-state/user-notifications.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserNotificationsEffects } from './states/user-notifications-state/user-notifications.effects';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    LoaderComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    RouterModule,
    MatExpansionModule,
    LandingRoutingModule,
    StoreModule.forFeature('userNotificationsList', userNotificationsReducer),
    EffectsModule.forFeature([UserNotificationsEffects]),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
