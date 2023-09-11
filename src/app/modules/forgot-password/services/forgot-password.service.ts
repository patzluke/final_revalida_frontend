import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Otp } from '../models/otp';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api';

  insertIntoOtp = (payload: any) => {
    return this.http.post<Otp>(`${this.baseUrl}/auth/insert/otp`, {
      email: payload,
    });
  };

  updateIntoOtp = (payload: any) => {
    return this.http.put<Otp>(`${this.baseUrl}/auth/update/otp`, {
      otpId: payload,
    });
  };

  validateOtp = (payload: any) => {
    return this.http.put<any>(`${this.baseUrl}/auth/validate/otp`, payload);
  };
}
