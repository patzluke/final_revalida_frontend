import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FarmingTipsComponent } from './pages/farming-tips/farming-tips.component';
import { WhoWeAreComponent } from './pages/who-we-are/who-we-are.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OurProcessComponent } from './pages/our-process/our-process.component';
import { SustainabilityComponent } from './pages/sustainability/sustainability.component';
import { AdvertisementsComponent } from './pages/advertisements/advertisements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'farming-tips',
    component: FarmingTipsComponent,
  },
  {
    path: 'who-we-are',
    component: WhoWeAreComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'our-process',
    component: OurProcessComponent,
  },
  {
    path: 'sustainability',
    component: SustainabilityComponent,
  },
  {
    path: 'crop-advertisements',
    component: AdvertisementsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
