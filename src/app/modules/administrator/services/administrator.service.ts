import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FarmingTip } from '../models/farmingTip';
import { FarmerComplaint } from '../models/farmercomplaint';
import { Farmer } from '../models/farmer';
import { Supplier } from '../models/supplier';

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

  selectAllFarmers = () => {
    return this.http.get<Farmer[]>(`${this.baseUrl}/admin/get/farmers`);
  };

  selectAllSuppliers = () => {
    return this.http.get<Supplier[]>(`${this.baseUrl}/admin/get/suppliers`);
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

  selectAllFarmerComplaints = () => {
    return this.http.get<FarmerComplaint[]>(
      `${this.baseUrl}/admin/get/farmercomplaints`
    );
  };

  updateIntoFarmerComplaint = (farmerComplaint: FarmerComplaint) => {
    return this.http.put<FarmerComplaint>(
      `${this.baseUrl}/admin/update/farmercomplaints`,
      farmerComplaint
    );
  };
}
