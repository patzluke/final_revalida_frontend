import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FarmingTipsComponent } from './pages/farming-tips/farming-tips.component';
import { WhoWeAreComponent } from './pages/who-we-are/who-we-are.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OurProcessComponent } from './pages/our-process/our-process.component';
import { SustainabilityComponent } from './pages/sustainability/sustainability.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AdvertisementsComponent } from './pages/advertisements/advertisements.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { StoreModule } from '@ngrx/store';
import { postAdvertisementReducer } from './states/postadvertisement-state/postadvertisement.reducer';
import { cropSpecializationReducer } from './states/cropspecialization-state/cropspecialization.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostAdvertisementEffects } from './states/postadvertisement-state/postadvertisement.effects';
import { CropSpecializationEffects } from './states/cropspecialization-state/cropspecialization.effects';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { farmingTipsReducer } from './states/farmingtips-state/farmingtips.reducer';
import { FarmingTipsEffects } from './states/farmingtips-state/farmingtips.effects';
import { ViewFarmingTipComponent } from './pages/farming-tips/pages/view-farming-tip/view-farming-tip.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    FarmingTipsComponent,
    WhoWeAreComponent,
    ContactComponent,
    OurProcessComponent,
    SustainabilityComponent,
    AdvertisementsComponent,
    ViewFarmingTipComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    MatDividerModule,
    FormsModule,
    TooltipModule,
    StoreModule.forFeature(
      'postAdvertisementList (Landing Side)',
      postAdvertisementReducer
    ),
    StoreModule.forFeature('cropSpecializationList', cropSpecializationReducer),
    StoreModule.forFeature(
      'farmingTipsList (Landing Side)',
      farmingTipsReducer
    ),
    EffectsModule.forFeature([
      PostAdvertisementEffects,
      CropSpecializationEffects,
      FarmingTipsEffects,
    ]),
  ],
})
export class LandingModule {}
