import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportViewPageComponent } from './components/report-view-page/report-view-page.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostAdvertisementListComponent } from './components/post-advertisement-list/post-advertisement-list.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { cropSpecializationReducer } from './states/cropspecialization-state/cropspecialization.reducer';
import { CropSpecializationEffects } from './states/cropspecialization-state/cropspecialization.effects';
import { TooltipModule } from 'primeng/tooltip';
import { PostAdvertisementResponseListComponent } from './components/post-advertisement-response-list/post-advertisement-response-list.component';
import { PostAdvertisementResponsesEffects } from './states/postadvertisement-responses-state/postadvertisement-responses.effects';
import { postAdvertisementResponsesReducer } from './states/postadvertisement-responses-state/postadvertisement-responses.reducer';
import { CardModule } from 'primeng/card';
import { MatDividerModule } from '@angular/material/divider';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DividerModule } from 'primeng/divider';
import { ProfileComponent } from './components/profile/profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { postAdvertisementReducerSupplierSide } from './states/postadvertisement-state/postadvertisement.reducer';
import { PostAdvertisementEffectsSupplierSide } from './states/postadvertisement-state/postadvertisement.effects';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { cropPaymentReducer } from './states/crop-payment-state/crop-payment.reducer';
import { CropPaymentEffects } from './states/crop-payment-state/crop-payment.effects';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { sellCropDetailsReducer } from './states/sell-crop-details-state/sell-crop-details.reducer';
import { SellCropDetailsEffects } from './states/sell-crop-details-state/sell-crop-details.effects';
import { SupplierComplaintComponent } from './components/supplier-complaint/supplier-complaint.component';
import { supplierComplaintReducer } from './states/suppliercomplaint-state/suppliercomplaint.reducer';
import { SupplierComplaintsEffect } from './states/suppliercomplaint-state/suppliercomplaint.effects';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    ReportViewPageComponent,
    PostAdvertisementListComponent,
    PostAdvertisementResponseListComponent,
    ProfileComponent,
    OrderSummaryComponent,
    OrderListComponent,
    NotificationsComponent,
    SupplierComplaintComponent,
  ],
  imports: [
    CommonModule,
    WholesalerRoutingModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CardModule,
    MatDividerModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    MatIconModule,
    MatButtonModule,
    DividerModule,
    MultiSelectModule,
    TabViewModule,
    StoreModule.forFeature(
      'postAdvertisementList (supplier)',
      postAdvertisementReducerSupplierSide
    ),
    StoreModule.forFeature('cropSpecializationList', cropSpecializationReducer),
    StoreModule.forFeature(
      'postAdvertisementResponsesList',
      postAdvertisementResponsesReducer
    ),
    StoreModule.forFeature(
      'cropPaymentList (Supplier Acc)',
      cropPaymentReducer
    ),
    StoreModule.forFeature(
      'sellCropDetails (Supplier Acc)',
      sellCropDetailsReducer
    ),
    StoreModule.forFeature(
      'SingleSuppplierComplaintsList (Supplier Acc)',
      supplierComplaintReducer
    ),
    EffectsModule.forFeature([
      PostAdvertisementEffectsSupplierSide,
      CropSpecializationEffects,
      PostAdvertisementResponsesEffects,
      CropPaymentEffects,
      SellCropDetailsEffects,
      SupplierComplaintsEffect,
    ]),
  ],
})
export class WholesalerModule {}
