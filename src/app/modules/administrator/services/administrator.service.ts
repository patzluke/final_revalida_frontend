import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FarmingTip } from '../models/farmingTip';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api';

  authenticateUser = (username: string, password: string) => {
    return this.http.post(`${this.baseUrl}/auth/login`, {
      username,
      password,
    });
  };

  selectAllFarmingTip = () => {
    return this.http.get<FarmingTip[]>(`${this.baseUrl}/admin/get/farmingtips`);
  };

  insertIntoFarmingTip = (farmingTip: FarmingTip) => {
    return this.http.post<FarmingTip>(
      `${this.baseUrl}/admin/insert/farmingtips`,
      farmingTip
    );
  };

  updateIntoFarmingTip = (farmingTip: FarmingTip) => {
    return this.http.put<FarmingTip>(
      `${this.baseUrl}/admin/update/farmingtips`,
      farmingTip
    );
  };

  deleteFarmingTip = (farmingTipId: number) => {
    return this.http.delete<FarmingTip>(
      `${this.baseUrl}/admin/delete/farmingtips/${farmingTipId}`
    );
  };

  isUserLoggedIn = () => {
    return localStorage.getItem('token') || false;
  };
}
