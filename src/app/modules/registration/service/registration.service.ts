import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  serverUrlJson = 'http://localhost:3000';
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getRegions = (): Observable<any> => {
    return this.http
      .get<any[]>(`${this.serverUrlJson}/region`)
      .pipe(tap((x) => x));
  };

  getProvinces = (): Observable<any> => {
    return this.http
      .get<any[]>(`${this.serverUrlJson}/province`)
      .pipe(tap((x) => x));
  };

  getCities = (): Observable<any> => {
    return this.http
      .get<any[]>(`${this.serverUrlJson}/city`)
      .pipe(tap((x) => x));
  };

  getBarangay = (): Observable<any> => {
    return this.http
      .get<any[]>(`${this.serverUrlJson}/barangay`)
      .pipe(tap((x) => x));
  };

  registerUser = (user: User) => {
    return this.http.post<User>(`${this.baseUrl}/registration/user`, user);
  };
}
