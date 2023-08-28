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
import { TabViewModule } from 'primeng/tabview';
import { FarmerListComponent } from './pages/farmer-list/farmer-list.component';
import { farmerReducer } from './states/farmer-state/farmer.reducer';
import { FarmerEffects } from './states/farmer-state/farmer.effects';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { supplierReducer } from './states/supplier-state/supplier.reducer';
import { SupplierEffects } from './states/supplier-state/supplier.effects';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    LandingPageComponent,
    FarmingTipComponent,
    FarmerComplaintComponent,
    ProfileComponent,
    FarmerListComponent,
    SupplierListComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
    TableModule,
    SliderModule,
    TagModule,
    TabViewModule,
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
    StoreModule.forFeature('farmerList', farmerReducer),
    StoreModule.forFeature('supplierList', supplierReducer),
    EffectsModule.forFeature([FarmingTipEffects, FarmerComplaintEffects, FarmerEffects, SupplierEffects]),
  ],
})
export class AdministratorModule {}
