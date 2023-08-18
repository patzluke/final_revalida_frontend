import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostAdvertisementComponent } from './components/post-advertisement/post-advertisement.component';
import { PostAdvertisementResponsesComponent } from './components/post-advertisement-responses/post-advertisement-responses.component';

const routes: Routes = [
  {
    path: 'post-advertisement',
    component: PostAdvertisementComponent
  },
  {
    path: 'post-advertisement-responses',
    component: PostAdvertisementResponsesComponent
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
export class WholesalerRoutingModule { }
