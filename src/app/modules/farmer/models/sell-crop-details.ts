import { Farmer } from "./farmer";

export interface SellCropDetails {
  sellId?: number;
  farmer: Farmer;
  cropName: string;
  price: number;
  quantity: number;
  mobilenumBanknumber: string;
  paymentMode: string;
  cropOrders: Object;
  
  //for backend input
  farmerId?: number;

}
