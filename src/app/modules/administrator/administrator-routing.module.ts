import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FarmingTipComponent } from './pages/farming-tip/farming-tip.component';
import { FarmerComplaintComponent } from './pages/farmer-complaint/farmer-complaint.component';
import { farmerUserGuard } from 'src/app/guards/farmer-user.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'farmingtips',
    component: FarmingTipComponent,
  },
  {
    path: 'farmercomplaint',
    component: FarmerComplaintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
