import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintPageComponent } from './components/complaint-page/complaint-page.component';
import { ComplaintStatusComponent } from './components/complaint-status/complaint-status.component';
import { CropAdvertisementsComponent } from './components/crop-advertisements/crop-advertisements.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { EditCropComponent } from './components/edit-crop/edit-crop.component';
import { AddCropComponent } from './components/add-crop/add-crop.component';
import { CropOrdersComponent } from './components/crop-orders/crop-orders.component';
import { CropPaymentComponent } from './components/crop-payment/crop-payment.component';
import { CourseEnrolledComponent } from './components/course-enrolled/course-enrolled.component';
import { ViewReportComponent } from './components/view-report/view-report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';

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
    path: 'edit-crop',
    component: EditCropComponent,
  },
  {
    path: 'add-crop',
    component: AddCropComponent,
  },
  {
    path: 'crop-orders',
    component: CropOrdersComponent,
  },
  {
    path: 'crop-payment',
    component: CropPaymentComponent,
  },
  {
    path: 'course-enrolled',
    component: CourseEnrolledComponent,
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
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerRoutingModule {}
