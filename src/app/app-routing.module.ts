import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // landing
  {
    path: '',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'farmer',
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
    loadChildren: () =>
      import('./modules/administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/wholesaler/wholesaler.module').then(
        (m) => m.WholesalerModule
      ),
  },
  {
    path: '',
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
