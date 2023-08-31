import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Error400Component } from './component/error400/error400.component';
import { Error401Component } from './component/error401/error401.component';
import { Error402Component } from './component/error402/error402.component';
import { Error403Component } from './component/error403/error403.component';
import { Error404Component } from './component/error404/error404.component';
import { Error405Component } from './component/error405/error405.component';
import { Error406Component } from './component/error406/error406.component';
import { Error407Component } from './component/error407/error407.component';
import { Error408Component } from './component/error408/error408.component';
import { Error409Component } from './component/error409/error409.component';
import { Error413Component } from './component/error413/error413.component';
import { Error414Component } from './component/error414/error414.component';
import { Error415Component } from './component/error415/error415.component';
import { Error500Component } from './component/error500/error500.component';
import { Error501Component } from './component/error501/error501.component';
import { Error502Component } from './component/error502/error502.component';
import { Error503Component } from './component/error503/error503.component';

const routes: Routes = [
  {
    path: '400',
    component: Error400Component
  },
  {
    path: '401',
    component: Error401Component
  },
  {
    path: '402',
    component: Error402Component
  },
  {
    path: '403',
    component: Error403Component
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '405',
    component: Error405Component
  },
  {
    path: '406',
    component: Error406Component
  },
  {
    path: '407',
    component: Error407Component
  },
  {
    path: '408',
    component: Error408Component
  },
  {
    path: '409',
    component: Error409Component
  },
  {
    path: '413',
    component: Error413Component
  },
  {
    path: '414',
    component: Error414Component
  },
  {
    path: '415',
    component: Error415Component
  },
  {
    path: '500',
    component: Error500Component
  },
  {
    path: '501',
    component: Error501Component
  },
  {
    path: '502',
    component: Error502Component
  },
  {
    path: '503',
    component: Error503Component
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule { }
