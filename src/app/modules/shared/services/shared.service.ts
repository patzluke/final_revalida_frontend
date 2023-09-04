import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserNotifications } from '../models/user-notifications';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api';

  selectAllNotificationsOfFarmerByUserId = (userId: number) => {
    return this.http.get<UserNotifications[]>(
      `${this.baseUrl}/usernotifications/get/${userId}`
    );
  };

  updateAllNotificationsToReadOfUserByUserId = (userId: number) => {
    return this.http.get<UserNotifications[]>(
      `${this.baseUrl}/usernotifications/update/${userId}`
    );
  };
}
