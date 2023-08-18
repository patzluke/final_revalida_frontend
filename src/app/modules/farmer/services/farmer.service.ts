import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FarmerComplaint } from '../models/farmercomplaint';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api';

  authenticateUser = (username: string, password: string) => {
    return this.http.post(`${this.baseUrl}/auth/login`, {
      username,
      password,
    });
  };

  selectFarmerComplaints = (farmerId: number) => {
    return this.http.get<FarmerComplaint[]>(
      `${this.baseUrl}/farmer/get/farmercomplaints/${farmerId}`
    );
  };

  insertIntoFarmerComplaint = (farmerComplaint: FarmerComplaint) => {
    return this.http.post<FarmerComplaint>(
      `${this.baseUrl}/farmer/insert/farmercomplaints`,
      farmerComplaint
    );
  };

  updateIntoFarmerComplaint = (farmerComplaint: FarmerComplaint) => {
    return this.http.put<FarmerComplaint>(
      `${this.baseUrl}/farmer/update/farmercomplaints`,
      farmerComplaint
    );
  };

  softDeleteFarmerComplaint = (farmerComplaintId: number) => {
    return this.http.delete<FarmerComplaint>(
      `${this.baseUrl}/farmer/delete/farmercomplaints/${farmerComplaintId}`
    );
  };

  isUserLoggedIn = () => {
    return localStorage.getItem('token') || false;
  };
}
