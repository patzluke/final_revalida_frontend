import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostAdvertisementComponent } from './components/post-advertisement/post-advertisement.component';
import { PostAdvertisementResponsesComponent } from './components/post-advertisement-responses/post-advertisement-responses.component';
import { PostAdvertisementListComponent } from './components/post-advertisement-list/post-advertisement-list.component';
import { PostAdvertisementResponseListComponent } from './components/post-advertisement-response-list/post-advertisement-response-list.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'post-advertisement-list',
    component: PostAdvertisementListComponent,
  },
  {
    path: 'post-advertisement',
    component: PostAdvertisementComponent,
  },
  {
    path: 'post-advertisement/:postId',
    component: PostAdvertisementComponent,
  },
  {
    path: 'post-advertisement-list/post-advertisement-responses-list/:postId',
    component: PostAdvertisementResponseListComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WholesalerRoutingModule { }
