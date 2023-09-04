import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FarmerComplaint } from '../models/farmercomplaint';
import { PostAdvertisement } from '../models/post-advertisement';
import { PostAdvertisementResponse } from '../models/post-advertisement-response';
import { FileDetails } from '../../registration/models/fileDetails';
import { Observable } from 'rxjs';
import { Farmer } from '../models/farmer';
import { CropSpecialization } from '../models/crop-specialization';
import { Course } from '../models/course';
import { CourseEnrolled } from '../models/courseEnrolled';
import { CropPayment } from '../models/crop-payment';
import { UserNotifications } from '../../shared/models/user-notifications';

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
    return this.http.get<Farmer>(`${this.baseUrl}/farmer/get/farmer/${userId}`);
  };

  updateAdminInfo = (adminInfo: any) => {
    return this.http.put<Farmer>(
      `${this.baseUrl}/farmer/update/farmer`,
      adminInfo
    );
  };

  selectAllCropSpecialization = () => {
    return this.http.get<CropSpecialization[]>(
      `${this.baseUrl}/supplier/get/cropspecialization`
    );
  };

  selectAllCourses = () => {
    return this.http.get<Course[]>(`${this.baseUrl}/farmer/get/course`);
  };

  selectAllCoursesEnrolledByFarmer = (farmerId: number) => {
    return this.http.get<CourseEnrolled[]>(
      `${this.baseUrl}/farmer/get/courseenrolled/${farmerId}`
    );
  };

  insertIntoCourseEnrolled = (response: CourseEnrolled) => {
    return this.http.post<CourseEnrolled>(
      `${this.baseUrl}/farmer/insert/courseenrolled`,
      response
    );
  };

  selectAllPostAdvertisementResponsesByFarmerId = (farmerId: number) => {
    return this.http.get<PostAdvertisementResponse[]>(
      `${this.baseUrl}/farmer/get/postadvertisementresponse/${farmerId}`
    );
  };

  selectAllCropPaymentByFarmer = (farmerId: number) => {
    return this.http.get<CropPayment[]>(
      `${this.baseUrl}/farmer/get/croppayment/${farmerId}`
    );
  };

  insertIntoSellCropDetailsAndCropOrdersAndPayment = (response: any) => {
    return this.http.post<CropPayment>(
      `${this.baseUrl}/farmer/insert/croppayment`,
      response
    );
  };

  selectAllNotificationsByUserId = (userId: number) => {
    return this.http.get<UserNotifications[]>(
      `${this.baseUrl}/usernotifications/get/${userId}`
    );
  };
}
