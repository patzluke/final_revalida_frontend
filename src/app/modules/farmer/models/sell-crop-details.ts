import { Farmer } from "./farmer";
import { PostAdvertisementResponse } from "./post-advertisement-response";

export interface SellCropDetails {
  sellId?: number;
  farmer: Farmer;
  postAdvertisementResponse: PostAdvertisementResponse;
  cropName: string;
  price: number;
  quantity: number;
  mobilenumBanknumber: string;
  accountName: string;
  paymentMode: string;
  cropOrders: Object;

  //for backend input
  farmerId?: number;

}
