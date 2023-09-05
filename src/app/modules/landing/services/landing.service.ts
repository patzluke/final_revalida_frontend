import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostAdvertisement } from '../models/post-advertisement';
import { CropSpecialization } from '../models/crop-specialization';
import { FarmingTip } from '../models/farming-tip';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api';

  selectAllPostAdvertisements = () => {
    return this.http.get<PostAdvertisement[]>(
      `${this.baseUrl}/landing/get/postadvertisements`
    );
  };

  selectAllCropSpecialization = () => {
    return this.http.get<CropSpecialization[]>(
      `${this.baseUrl}/landing/get/cropspecialization`
    );
  };

  selectAllFarmingTips = () => {
    return this.http.get<FarmingTip[]>(
      `${this.baseUrl}/landing/get/farmingtips`
    );
  };
}
