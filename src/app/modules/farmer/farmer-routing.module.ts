import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintPageComponent } from './components/complaint-page/complaint-page.component';
import { ComplaintStatusComponent } from './components/complaint-status/complaint-status.component';
import { CropAdvertisementsComponent } from './components/crop-advertisements/crop-advertisements.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';

const routes: Routes = [
  {
    path: 'complaints',
    component: ComplaintPageComponent
  },
  {
    path: 'complaint-status',
    component: ComplaintStatusComponent
  },
  {
    path: 'crop-advertisements',
    component: CropAdvertisementsComponent
  },
  {
    path: 'sell-product',
    component: SellProductComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
