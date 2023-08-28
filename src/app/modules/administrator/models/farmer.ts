import { User } from './user';

export interface Farmer {
  farmerId?: number;
  cropSpecializationId?: string;
  user?: User;

  //for account verification variables
}
