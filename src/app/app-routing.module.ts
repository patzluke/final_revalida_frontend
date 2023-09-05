import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { administratorUserGuard } from './guards/administrator-user.guard';
import { farmerUserGuard } from './guards/farmer-user.guard';
import { supplierUserGuard } from './guards/supplier-user.guard';
import { Error400Component } from './modules/error-pages/component/error400/error400.component';
import { Error404Component } from './modules/error-pages/component/error404/error404.component';
import { ErrorPageComponent } from './modules/shared/components/error-page/error-page.component';

const routes: Routes = [
  // landing
  {
    path: '',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'farmer',
    canActivate: [farmerUserGuard],
    loadChildren: () =>
      import('./modules/farmer/farmer.module').then((m) => m.FarmerModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'administrator',
    canActivate: [administratorUserGuard],
    loadChildren: () =>
      import('./modules/administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
  },
  {
    path: 'supplier',
    canActivate: [supplierUserGuard],
    loadChildren: () =>
      import('./modules/wholesaler/wholesaler.module').then(
        (m) => m.WholesalerModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/course/course.module').then((m) => m.CourseModule),
  },
  // registration
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./modules/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  // Error page
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
