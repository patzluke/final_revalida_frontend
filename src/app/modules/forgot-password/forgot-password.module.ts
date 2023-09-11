import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { UserRoleEmailComponent } from './components/user-role-email/user-role-email.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    UserRoleEmailComponent,
    ResendOtpComponent,
    EmailConfirmationComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    StepsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ]
})
export class ForgotPasswordModule { }
