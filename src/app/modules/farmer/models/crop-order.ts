import { CropPayment } from "./crop-payment";
import { SellCropDetails } from "./sell-crop-details";
import { Supplier } from "./supplier";

export interface CropOrder {
  orderIdRef?: number;
  address: string;
  isReceivedBySupplier: boolean;
  orderStatus: string;
  sellCropDetail: SellCropDetails;
  supplier: Supplier;
  cropPayments?: Array<CropPayment>;
  cancelReason: string
}
