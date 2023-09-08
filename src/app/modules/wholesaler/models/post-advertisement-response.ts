import { Farmer } from './farmer';
import { PostAdvertisement } from './post-advertisement';

export interface PostAdvertisementResponse {
  postResponseId: number;
  price: string;
  quantity: string;
  dateCreated: string;
  dateModified: string;
  isAccepted: boolean;
  isFinalOfferSubmitted?: boolean;
  isFinalOfferAccepted?: boolean;
  isTransactionCompleted?: boolean;
  message: string;
  preferredPaymentMode: string;
  farmer: Farmer;
  postAdvertisement: PostAdvertisement;
}
