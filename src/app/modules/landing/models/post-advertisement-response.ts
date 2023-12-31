import { Farmer } from './farmer';
import { PostAdvertisement } from './post-advertisement';

export interface PostAdvertisementResponse {
  postResponseId?: number;
  price: string;
  quantity: string;
  dateCreated?: string;
  dateModified?: string;
  isAccepted?: boolean;
  message: string;
  preferredPaymentMode: string;
  farmer?: Farmer;
  postAdvertisement?: PostAdvertisement;

  //for inserting and updating
  farmerId?: number;
  postId?: number;
}
