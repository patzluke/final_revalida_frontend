import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthenticateUserInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`),
      });
      if (new Date() > new Date((localStorage.getItem('exp') as any) * 1000)) {
        Swal.fire('Oops..!', 'Token Expired', 'error');
        localStorage.clear();
        this._router.navigateByUrl('/login');
      }
    }
    return next.handle(request);
  }
}
