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

@NgModule({
  declarations: [LandingPageComponent, FarmingTipComponent],
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
    StoreModule.forFeature('farmingTipList', farmingTipReducer),
    EffectsModule.forFeature([FarmingTipEffects])
  ],
})
export class AdministratorModule {}