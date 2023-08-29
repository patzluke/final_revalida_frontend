import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FarmingTip } from '../models/farmingTip';
import { FarmerComplaint } from '../models/farmercomplaint';
import { Farmer } from '../models/farmer';
import { Supplier } from '../models/supplier';
import { UserApplicants } from '../models/userapplicants';
import { User } from '../models/user';
import { Administrator } from '../models/administrator';
import { FileDetails } from '../../registration/models/fileDetails';
import { Observable } from 'rxjs';

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

  findOneByUserId = (userId: number) => {
    return this.http.get<Administrator>(
      `${this.baseUrl}/admin/get/admin/${userId}`
    );
  };

  updateAdminInfo = (adminInfo: any) => {
    return this.http.put<Administrator>(
      `${this.baseUrl}/admin/update/admin`,
      adminInfo
    );
  };

  selectAllUserApplicants = () => {
    return this.http.get<UserApplicants[]>(
      `${this.baseUrl}/admin/get/userapplicants`
    );
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

  validateUserAccount = (farmerComplaint: Farmer | User) => {
    return this.http.put<Farmer | Supplier>(
      `${this.baseUrl}/admin/verify/account`,
      farmerComplaint
    );
  };

  upload = (file: File): Observable<FileDetails> => {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>(
      `${this.baseUrl}/file/insert/image`,
      formData
    );
  }
}
