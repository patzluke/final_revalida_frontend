import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loginService
        .authenticateUser(
          this.loginForm.value.username,
          this.loginForm.value.password
        )
        .subscribe({
          next: (data: any) => {
            let token: {
              userId: number;
              userNo: number;
              userType: string;
              username: string;
              isActive: boolean;
              iat: number;
              exp: number;
            } = jwtDecode(data[0]);
            localStorage.setItem('userId', `${token.userId}`);
            localStorage.setItem('userNo', `${token.userNo}`);
            localStorage.setItem('userType', `${token.userType}`);
            localStorage.setItem('username', `${token.username}`);
            localStorage.setItem('isActive', `${token.isActive}`);
            localStorage.setItem('iat', `${token.iat}`);
            localStorage.setItem('exp', `${token.exp}`);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', `${data}`);

            if (localStorage.getItem('isActive') == 'false') {
              Swal.fire({
                title: 'Account temporarily locked',
                text: 'Please contact the administrator',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              localStorage.clear();
            }

            if (localStorage.getItem('userType') == 'Administrator') {
              this._router.navigateByUrl('/administrator');
            }
          },
          error: (err) => {
            Swal.fire({
              title: 'Wrong Credential',
              text: 'Try Again',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  };

  showPasswordFunction(event: Event) {
    this.showPassword = (event.target as HTMLInputElement).checked;
  }
}
