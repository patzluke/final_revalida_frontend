import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { MessageService } from 'primeng/api';
import { Otp } from '../../models/otp';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-role-email',
  templateUrl: './user-role-email.component.html',
  styleUrls: ['./user-role-email.component.scss'],
  providers: [MessageService],
})
export class UserRoleEmailComponent implements OnInit {
  emailInput = new FormControl('');
  otpInput = new FormControl('');
  currentOtp?: Otp;
  isOtpEmailSent: string = 'default';
  isOtpEmailResent: string = 'default';
  isOtpEmailValidated: string = 'default';
  isOtpInput = false;
  isOtpResent = false;
  IsResetPasswordSuccess = false;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private messageService: MessageService,
    private _router: Router
  ) {
    this.emailInput.setValidators([Validators.required, Validators.email]);
    this.otpInput.setValidators([Validators.required]);
  }

  ngOnInit() {}

  timeLeft: number = 5; // Set the initial time in seconds
  interval: any;

  resend: boolean = false;

  startTimer(): void {
    this.resend = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        this.stopTimer();
        this.resend = false;
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

  submitEmailInput() {
    if (this.emailInput.valid) {
      this.isOtpEmailSent = 'submitting';
      this.forgotPasswordService
        .insertIntoOtp(this.emailInput.getRawValue())
        .subscribe({
          next: (value) => {
            this.currentOtp = value;
            this.isOtpEmailSent = 'default';
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Otp sent successfully',
            });
            this.startTimer();
            this.isOtpInput = true;
          },
          error: (err) => {
            this.isOtpEmailSent = 'default';
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong',
            });
          },
        });
    } else {
      this.emailInput.markAsTouched();
      this.emailInput?.setErrors({ invalid: true });
    }
  }

  verifyOtp() {
    if (this.otpInput.valid) {
      this.isOtpEmailSent = 'submitting';
      this.forgotPasswordService
        .validateOtp({
          otpId: this.currentOtp?.otpId,
          otpCode: this.otpInput.getRawValue(),
        })
        .subscribe({
          next: (value) => {
            if (value.response == 'Wrong Otp') {
              this.isOtpEmailSent = 'default';
              Swal.fire('Wrong Otp', `Please Try Again`, 'error');
            } else if (value.response == 'matched') {
              this.isOtpEmailSent = 'default';
              this.IsResetPasswordSuccess = true;
            } else if (value.response == 'exceeded number of tries') {
              Swal.fire('Exceeded number of tries', `Returning to login page`, 'error');
              this._router.navigateByUrl('/login')
            }
          },
          error: (err) => {},
        });
    } else {
      this.otpInput.markAsTouched();
      this.otpInput?.setErrors({ invalid: true });
    }
  }

  resendOtp() {
    this.isOtpEmailResent = 'submitting';
    this.forgotPasswordService.updateIntoOtp(this.currentOtp?.otpId).subscribe({
      next: (value) => {
        this.currentOtp = value;
        this.isOtpEmailResent = 'submitted';
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Otp re-sent successfully',
        });
        this.isOtpResent = true;
      },
      error: (err) => {
        this.isOtpEmailResent = 'default';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      },
    });
  }

  returnToLogin() {
    this._router.navigateByUrl('/login')
  }
}
