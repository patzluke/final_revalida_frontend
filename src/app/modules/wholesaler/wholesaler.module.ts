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
import { postAdvertisementReducer } from './states/postadvertisement-state/postadvertisement.reducer';
import { PostAdvertisementEffects } from './states/postadvertisement-state/postadvertisement.effects';
import { PostAdvertisementListComponent } from './components/post-advertisement-list/post-advertisement-list.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { cropSpecializationReducer } from './states/cropspecialization-state/cropspecialization.reducer';
import { CropSpecializationEffects } from './states/cropspecialization-state/cropspecialization.effects';
import { TooltipModule } from 'primeng/tooltip';
import { PostAdvertisementResponseListComponent } from './components/post-advertisement-response-list/post-advertisement-response-list.component';
import { PostAdvertisementResponsesEffects } from './states/postadvertisement-responses-state/postadvertisement-responses.effects';
import { postAdvertisementResponsesReducer } from './states/postadvertisement-responses-state/postadvertisement-responses.reducer';

@NgModule({
  declarations: [
    PostAdvertisementComponent,
    PostAdvertisementResponsesComponent,
    ReportViewPageComponent,
    PostAdvertisementListComponent,
    PostAdvertisementResponseListComponent,
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
    StoreModule.forFeature('postAdvertisementList', postAdvertisementReducer),
    StoreModule.forFeature('cropSpecializationList', cropSpecializationReducer),
    StoreModule.forFeature(
      'postAdvertisementResponsesList',
      postAdvertisementResponsesReducer
    ),
    EffectsModule.forFeature([
      PostAdvertisementEffects,
      CropSpecializationEffects,
      PostAdvertisementResponsesEffects,
    ]),
  ],
})
export class WholesalerModule {}
