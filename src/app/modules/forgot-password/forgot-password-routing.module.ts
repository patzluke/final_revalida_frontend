import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleEmailComponent } from './components/user-role-email/user-role-email.component';
import { ResendOtpComponent } from './components/resend-otp/resend-otp.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

const routes: Routes = [
  {
    path: 'user-role-email',
    component: UserRoleEmailComponent
  },
  {
    path: 'resend-otp',
    component: ResendOtpComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
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
export class ForgotPasswordRoutingModule { }
