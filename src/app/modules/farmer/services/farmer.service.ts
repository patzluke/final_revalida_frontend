import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FarmerComplaint } from '../models/farmercomplaint';
import { PostAdvertisement } from '../models/post-advertisement';
import { PostAdvertisementResponse } from '../models/post-advertisement-response';
import { FileDetails } from '../../registration/models/fileDetails';
import { Observable } from 'rxjs';
import { Farmer } from '../models/farmer';

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

  selectAllPostAdvertisements = () => {
    return this.http.get<PostAdvertisement[]>(
      `${this.baseUrl}/farmer/get/postadvertisements`
    );
  };

  insertIntoPostAdvertisementResponse = (
    response: PostAdvertisementResponse
  ) => {
    return this.http.post<PostAdvertisementResponse>(
      `${this.baseUrl}/farmer/insert/postadvertisementresponse`,
      response
    );
  };

  upload = (file: File): Observable<FileDetails> => {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>(
      `${this.baseUrl}/file/insert/image`,
      formData
    );
  };

  findOneByUserId = (userId: number) => {
    return this.http.get<Farmer>(
      `${this.baseUrl}/farmer/get/farmer/${userId}`
    );
  };

  updateAdminInfo = (adminInfo: any) => {
    return this.http.put<Farmer>(
      `${this.baseUrl}/farmer/update/farmer`,
      adminInfo
    );
  };
}
