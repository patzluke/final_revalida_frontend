import { Farmer } from './farmer';
import { PostAdvertisement } from './post-advertisement';

export interface PostAdvertisementResponse {
  postResponseId: string;
  price: string;
  quantity: number;
  dateCreated: string;
  dateModified: string;
  isAccepted: boolean;
  message: string;
  preferredPaymentMode: string;
  farmer: Farmer;
  postAdvertisement: PostAdvertisement;
}