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
import { ViewFarmingTipComponent } from './pages/farming-tips/pages/view-farming-tip/view-farming-tip.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { TermsServiceComponent } from './pages/terms-service/terms-service.component';

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
    path: 'farming-tips/view',
    component: ViewFarmingTipComponent,
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
  {
    path: 'privacy-policy',
    component: PolicyComponent,
  },
  {
    path: 'terms-of-service',
    component: TermsServiceComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
