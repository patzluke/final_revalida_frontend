import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FarmingTipComponent } from './pages/farming-tip/farming-tip.component';
import { FarmerComplaintComponent } from './pages/farmer-complaint/farmer-complaint.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FarmerListComponent } from './pages/farmer-list/farmer-list.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { CourseListComponent } from './pages/course-list/course-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'farmingtips',
    component: FarmingTipComponent,
  },
  {
    path: 'farmercomplaint',
    component: FarmerComplaintComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'farmers',
    component: FarmerListComponent,
  },
  {
    path: 'suppliers',
    component: SupplierListComponent,
  },
  {
    path: 'courses',
    component: CourseListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
