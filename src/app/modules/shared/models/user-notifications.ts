import { User } from '../../farmer/models/user';

export interface UserNotifications {
  notificationId?: number;
  notificationTitle: string;
  notificationMessage: string;
  isRead: boolean;
  dateCreated: string;
  user: User;
}
