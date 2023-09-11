import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDetails } from '../models/fileDetails';
import { PostAdvertisement } from '../models/post-advertisement';
import { CropSpecialization } from '../models/crop-specialization';
import { PostAdvertisementResponse } from '../models/post-advertisement-response';
import { Supplier } from '../models/supplier';
import { CropPayment } from '../models/crop-payment';
import { SellCropDetails } from '../models/sell-crop-details';
import { SupplierComplaint } from '../models/suppliercomplaint';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api';

  selectPostAdvertisementBySupplierId = (supplierId: number) => {
    return this.http.get<PostAdvertisement[]>(
      `${this.baseUrl}/supplier/get/postadvertisement/${supplierId}`
    );
  };

  insertIntoPostAdvertisement = (postAdvertisement: PostAdvertisement) => {
    return this.http.post<PostAdvertisement>(
      `${this.baseUrl}/supplier/insert/postadvertisement`,
      postAdvertisement
    );
  };

  updateIntoPostAdvertisement = (postAdvertisement: PostAdvertisement) => {
    return this.http.put<PostAdvertisement>(
      `${this.baseUrl}/supplier/update/postadvertisement`,
      postAdvertisement
    );
  };

  softDeletePostAdvertisement = (postId: number) => {
    return this.http.delete<PostAdvertisement>(
      `${this.baseUrl}/supplier/delete/postadvertisement/${postId}`
    );
  };

  selectAllCropSpecialization = () => {
    return this.http.get<CropSpecialization[]>(
      `${this.baseUrl}/supplier/get/cropspecialization`
    );
  };

  selectAllPostAdvertisementResponsesByPostId = (postId: number) => {
    return this.http.get<PostAdvertisementResponse[]>(
      `${this.baseUrl}/supplier/get/postadvertisementresponse/${postId}`
    );
  };

  updatePostAdvertisementResponsesIsAcceptedStatus = (
    advertisementResponse: PostAdvertisementResponse
  ) => {
    return this.http.put<PostAdvertisementResponse>(
      `${this.baseUrl}/supplier/update/postadvertisementresponse`,
      advertisementResponse
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
    return this.http.get<Supplier>(
      `${this.baseUrl}/supplier/get/supplier/${userId}`
    );
  };

  updateAdminInfo = (adminInfo: any) => {
    return this.http.put<Supplier>(
      `${this.baseUrl}/supplier/update/supplier`,
      adminInfo
    );
  };

  selectAllCropPaymentBySupplier = (supplierId: number) => {
    return this.http.get<CropPayment[]>(
      `${this.baseUrl}/supplier/get/croppayment/${supplierId}`
    );
  };

  selectAllSellCropDetails = () => {
    return this.http.get<SellCropDetails[]>(
      `${this.baseUrl}/supplier/get/sellcropdetails`
    );
  };

  updateCropPaymentStatus = (cropPayment: any) => {
    return this.http.put<CropPayment>(
      `${this.baseUrl}/supplier/update/croppayment`,
      cropPayment
    );
  };

  updateCropOrderStatus = (cropPayment: any) => {
    return this.http.put<CropPayment>(
      `${this.baseUrl}/supplier/update/croporders`,
      cropPayment
    );
  };

  // Supplier complaints
  selectSupplierComplaints = (supplierId: number) => {
    return this.http.get<SupplierComplaint[]>(
      `${this.baseUrl}/supplier/get/suppliercomplaints/${supplierId}`
    );
  };

  insertIntoSupplierComplaint = (supplierComplaint: SupplierComplaint) => {
    return this.http.post<SupplierComplaint>(
      `${this.baseUrl}/supplier/insert/suppliercomplaints`,
      supplierComplaint
    );
  };

  updateIntoSupplierComplaint = (supplierComplaint: SupplierComplaint) => {
    return this.http.put<SupplierComplaint>(
      `${this.baseUrl}/supplier/update/suppliercomplaints`,
      supplierComplaint
    );
  };

  softDeleteSupplierComplaint = (supplierComplaintId: number) => {
    return this.http.delete<SupplierComplaint>(
      `${this.baseUrl}/supplier/delete/suppliercomplaints/${supplierComplaintId}`
    );
  };

  // Sales Report
  getTotalSales(farmerId: number): Observable<any> {
    const newUrl = `${this.baseUrl}/farmer/get/farmer-total-sales-by-id/${farmerId}`;
    return this.http.get<any>(newUrl);
  }

  getCustomerCount(farmerId: number): Observable<any> {
    const newUrl = `${this.baseUrl}/farmer/get/customer-count/${farmerId}`;
    return this.http.get<any>(newUrl);
  }

  getSalesPerMonth(farmerId: number): Observable<any> {
    const newUrl = `${this.baseUrl}/farmer/get/sales-per-month/${farmerId}`;
    return this.http.get<any>(newUrl);
  }

  getThreeRecentOrders(farmerId: number): Observable<any> {
    const newUrl = `${this.baseUrl}/farmer/get/three-recent-sales/${farmerId}`;
    return this.http.get<any>(newUrl);
  }
}
