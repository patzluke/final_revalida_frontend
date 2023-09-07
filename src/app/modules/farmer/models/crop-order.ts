import { SellCropDetails } from './sell-crop-details';
import { Supplier } from './supplier';

export interface CropOrder {
  orderIdRef?: number;
  address: string;
  orderStatus: string;
  orderReceivedDate: string;
  paymentReceivedDate: string;
  sellCropDetail: SellCropDetails;
  supplier: Supplier;
  cancelReason: string;
}
