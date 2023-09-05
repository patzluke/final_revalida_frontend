import { User } from '../../farmer/models/user';

export interface UserNotifications {
  notificationId?: number;
  notificationMessage: string;
  isRead: boolean;
  dateCreated: string;
  user: User;
}
