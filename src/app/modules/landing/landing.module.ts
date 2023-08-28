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
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AdvertisementsComponent } from './pages/advertisements/advertisements.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    HomeComponent,
    FarmingTipsComponent,
    WhoWeAreComponent,
    ContactComponent,
    OurProcessComponent,
    SustainabilityComponent,
    AdvertisementsComponent,
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
  ],
})
export class LandingModule {}
