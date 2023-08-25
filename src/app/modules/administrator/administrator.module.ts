import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FarmingTipComponent } from './pages/farming-tip/farming-tip.component';
import { StoreModule } from '@ngrx/store';
import { farmingTipReducer } from './states/farmingtip-state/farmingtip.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FarmingTipEffects } from './states/farmingtip-state/farmingtip.effects';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { FarmerComplaintComponent } from './pages/farmer-complaint/farmer-complaint.component';
import { farmerComplaintReducer } from './states/farmercomplaint-state/farmercomplaint.reducer';
import { FarmerComplaintEffects } from './states/farmercomplaint-state/farmercomplaint.effects';
import { ProfileComponent } from './pages/profile/profile.component';
import { CardModule } from 'primeng/card';
import { MatDividerModule } from '@angular/material/divider';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { MatButtonModule } from '@angular/material/button';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    LandingPageComponent,
    FarmingTipComponent,
    FarmerComplaintComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    TableModule,
    SliderModule,
    TagModule,
    ProgressBarModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    MatDividerModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    PasswordModule,
    MatButtonModule,
    DividerModule,
    StoreModule.forFeature('farmingTipList', farmingTipReducer),
    StoreModule.forFeature('farmerComplaintsList', farmerComplaintReducer),
    EffectsModule.forFeature([FarmingTipEffects, FarmerComplaintEffects]),
  ],
})
export class AdministratorModule {}
