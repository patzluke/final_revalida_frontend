import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostAdvertisementListComponent } from './components/post-advertisement-list/post-advertisement-list.component';
import { PostAdvertisementResponseListComponent } from './components/post-advertisement-response-list/post-advertisement-response-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {
    path: 'post-advertisement-list',
    component: PostAdvertisementListComponent,
  },
  {
    path: 'post-advertisement-list/post-advertisement-responses-list/:postId',
    component: PostAdvertisementResponseListComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WholesalerRoutingModule { }
