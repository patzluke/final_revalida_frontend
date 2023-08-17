import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { PostAdvertisementComponent } from './components/post-advertisement/post-advertisement.component';
import { PostAdvertisementResponsesComponent } from './components/post-advertisement-responses/post-advertisement-responses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportViewPageComponent } from './components/report-view-page/report-view-page.component';


@NgModule({
  declarations: [
    PostAdvertisementComponent,
    PostAdvertisementResponsesComponent,
    ReportViewPageComponent
  ],
  imports: [
    CommonModule,
    WholesalerRoutingModule,
    FontAwesomeModule
  ]
})
export class WholesalerModule { }
