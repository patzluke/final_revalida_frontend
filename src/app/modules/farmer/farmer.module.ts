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
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { farmerComplaintReducer } from './states/farmercomplaint-state/farmercomplaint.reducer';
import { FarmerComplaintEffects } from './states/farmercomplaint-state/farmercomplaint.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { postAdvertisementReducer } from './states/postadvertisement-state/postadvertisement.reducer';
import { PostAdvertisementEffects } from './states/postadvertisement-state/postadvertisement.effects';
import { ProfileComponent } from './components/profile/profile.component';
import { CardModule } from 'primeng/card';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { MatIconModule } from '@angular/material/icon';
import { postAdvertisementResponsesReducer } from './states/postadvertisement-responses-state/postadvertisement-responses.reducer';
import { PostAdvertisementResponsesEffects } from './states/postadvertisement-responses-state/postadvertisement-responses.effects';
import { MatButtonModule } from '@angular/material/button';
import { DividerModule } from 'primeng/divider';

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
    ViewReportComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    ChartModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    MatDividerModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    MatIconModule,
    MatButtonModule,
    DividerModule,
    StoreModule.forFeature(
      'SingleFarmerComplaintsList',
      farmerComplaintReducer
    ),
    StoreModule.forFeature(
      'postAdvertisementList (Farmer Acc)',
      postAdvertisementReducer
    ),
    StoreModule.forFeature(
      'postAdvertisementResponsesList (Farmer)',
      postAdvertisementResponsesReducer
    ),
    EffectsModule.forFeature([
      FarmerComplaintEffects,
      PostAdvertisementEffects,
      PostAdvertisementResponsesEffects,
    ]),
    FontAwesomeModule,
  ],
})
export class FarmerModule {}
