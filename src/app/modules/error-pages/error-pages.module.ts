import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './component/error404/error404.component';
import { Error400Component } from './component/error400/error400.component';
import { Error401Component } from './component/error401/error401.component';
import { Error402Component } from './component/error402/error402.component';
import { Error403Component } from './component/error403/error403.component';
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
import { ErrorPagesRoutingModule } from './error-pages-routing.module';



@NgModule({
  declarations: [
    Error404Component,
    Error400Component,
    Error401Component,
    Error402Component,
    Error403Component,
    Error405Component,
    Error406Component,
    Error407Component,
    Error408Component,
    Error409Component,
    Error413Component,
    Error414Component,
    Error415Component,
    Error500Component,
    Error501Component,
    Error502Component,
    Error503Component
  ],
  imports: [
    CommonModule,
    ErrorPagesRoutingModule
  ]
})
export class ErrorPagesModule { }
