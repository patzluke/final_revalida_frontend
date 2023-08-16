import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropAdvertisementsComponent } from './components/crop-advertisements/crop-advertisements.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { ComplaintPageComponent } from './components/complaint-page/complaint-page.component';
import { ComplaintStatusComponent } from './components/complaint-status/complaint-status.component';
import { FarmerRoutingModule } from './farmer-routing.module';
import { EditCropComponent } from './components/edit-crop/edit-crop.component';
import { AddCropComponent } from './components/add-crop/add-crop.component';
import { CropOrdersComponent } from './components/crop-orders/crop-orders.component';
import { CropPaymentComponent } from './components/crop-payment/crop-payment.component';
import { CourseEnrolledComponent } from './components/course-enrolled/course-enrolled.component';
import { ViewReportComponent } from './components/view-report/view-report.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    CropAdvertisementsComponent,
    SellProductComponent,
    ComplaintPageComponent,
    ComplaintStatusComponent,
    EditCropComponent,
    AddCropComponent,
    CropOrdersComponent,
    CropPaymentComponent,
    CourseEnrolledComponent,
    ViewReportComponent
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    ChartModule
  ]
})
export class FarmerModule { }
