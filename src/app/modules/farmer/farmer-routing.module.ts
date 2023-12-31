import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintPageComponent } from './components/complaint-page/complaint-page.component';
import { ComplaintStatusComponent } from './components/complaint-status/complaint-status.component';
import { CropAdvertisementsComponent } from './components/crop-advertisements/crop-advertisements.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { CropOrdersComponent } from './components/crop-orders/crop-orders.component';
import { ViewReportComponent } from './components/view-report/view-report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FarmingTipComponent } from './components/farming-tip/farming-tip.component';
import { ViewFarmingTipComponent } from './components/farming-tip/pages/view-farming-tip/view-farming-tip.component';
import { ViewCourseComponent } from './components/courses/components/view-course/view-course.component';

const routes: Routes = [
  {
    path: 'complaints/add',
    component: ComplaintPageComponent,
  },
  {
    path: 'complaints/edit/:farmerComplaintId',
    component: ComplaintPageComponent,
  },
  {
    path: 'complaint-status',
    component: ComplaintStatusComponent,
  },
  {
    path: 'crop-advertisements',
    component: CropAdvertisementsComponent,
  },
  {
    path: 'sell-product',
    component: SellProductComponent,
  },
  {
    path: 'crop-orders',
    component: CropOrdersComponent,
  },
  {
    path: 'view-report',
    component: ViewReportComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/view',
    component: ViewCourseComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'farming-tips',
    component: FarmingTipComponent,
  },
  {
    path: 'farming-tips/view',
    component: ViewFarmingTipComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerRoutingModule {}
