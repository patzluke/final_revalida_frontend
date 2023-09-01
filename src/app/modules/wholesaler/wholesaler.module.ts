import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { PostAdvertisementComponent } from './components/post-advertisement/post-advertisement.component';
import { PostAdvertisementResponsesComponent } from './components/post-advertisement-responses/post-advertisement-responses.component';
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

@NgModule({
  declarations: [
    PostAdvertisementComponent,
    PostAdvertisementResponsesComponent,
    ReportViewPageComponent,
    PostAdvertisementListComponent,
    PostAdvertisementResponseListComponent,
    ProfileComponent,
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
    StoreModule.forFeature('postAdvertisementList (supplier)', postAdvertisementReducerSupplierSide),
    StoreModule.forFeature('cropSpecializationList', cropSpecializationReducer),
    StoreModule.forFeature(
      'postAdvertisementResponsesList',
      postAdvertisementResponsesReducer
    ),
    EffectsModule.forFeature([
      PostAdvertisementEffectsSupplierSide,
      CropSpecializationEffects,
      PostAdvertisementResponsesEffects,
    ]),
  ],
})
export class WholesalerModule {}
