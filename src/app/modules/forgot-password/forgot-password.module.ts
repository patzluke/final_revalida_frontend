import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { UserRoleEmailComponent } from './components/user-role-email/user-role-email.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    UserRoleEmailComponent,
    ResendOtpComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
