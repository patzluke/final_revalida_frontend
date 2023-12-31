import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropAdvertisementsComponent } from './components/crop-advertisements/crop-advertisements.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { ComplaintPageComponent } from './components/complaint-page/complaint-page.component';
import { ComplaintStatusComponent } from './components/complaint-status/complaint-status.component';
import { FarmerRoutingModule } from './farmer-routing.module';
import { CropOrdersComponent } from './components/crop-orders/crop-orders.component';
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
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { cropSpecializationReducer } from './states/cropspecialization-state/cropspecialization.reducer';
import { CropSpecializationEffects } from './states/cropspecialization-state/cropspecialization.effects';
import { CoursesComponent } from './components/courses/courses.component';
import { courseReducer } from './states/course-state/course.reducer';
import { CourseEffects } from './states/course-state/course.effects';
import { TabViewModule } from 'primeng/tabview';
import { coursesEnrolledReducer } from './states/course-enrolled-state/course-enrolled.reducer';
import { CourseEnrolledEffects } from './states/course-enrolled-state/course-enrolled.effects';

import { cropPaymentReducer } from './states/crop-payment-state/crop-payment.reducer';
import { CropPaymentEffects } from './states/crop-payment-state/crop-payment.effects';
import { NotificationsComponent } from './components/notifications/notifications.component';

import { TooltipModule } from 'primeng/tooltip';
import { FarmingTipComponent } from './components/farming-tip/farming-tip.component';
import { ViewFarmingTipComponent } from './components/farming-tip/pages/view-farming-tip/view-farming-tip.component';
import { farmingTipReducer } from './states/farmingtip-state/farmingtip.reducer';
import { FarmingTipEffects } from './states/farmingtip-state/farmingtip.effects';
import { ViewCourseComponent } from './components/courses/components/view-course/view-course.component';

@NgModule({
  declarations: [
    CropAdvertisementsComponent,
    SellProductComponent,
    ComplaintPageComponent,
    ComplaintStatusComponent,
    CropOrdersComponent,
    ViewReportComponent,
    ProfileComponent,
    CoursesComponent,
    NotificationsComponent,
    FarmingTipComponent,
    ViewFarmingTipComponent,
    ViewCourseComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
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
    MultiSelectModule,
    InputTextareaModule,
    TooltipModule,
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
    StoreModule.forFeature('farmingTipList (Farmer Side)', farmingTipReducer),
    StoreModule.forFeature('cropSpecializationList', cropSpecializationReducer),
    StoreModule.forFeature('courseList', courseReducer),
    StoreModule.forFeature('coursesEnrolledList', coursesEnrolledReducer),
    StoreModule.forFeature('cropPaymentList (Farmer Acc)', cropPaymentReducer),
    EffectsModule.forFeature([
      FarmerComplaintEffects,
      PostAdvertisementEffects,
      PostAdvertisementResponsesEffects,
      CropSpecializationEffects,
      CourseEffects,
      CourseEnrolledEffects,
      CropPaymentEffects,
      FarmingTipEffects,
    ]),
    FontAwesomeModule,
  ],
})
export class FarmerModule {}
