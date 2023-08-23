import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDetails } from '../models/fileDetails';
import { PostAdvertisement } from '../models/post-advertisement';
import { CropSpecialization } from '../models/crop-specialization';
import { PostAdvertisementResponse } from '../models/post-advertisement-response';

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

  upload(file: File): Observable<FileDetails> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>(
      `${this.baseUrl}/file/insert/image`,
      formData
    );
  }
}
