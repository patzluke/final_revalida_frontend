import { CropPayment } from './crop-payment';
import { SellCropDetails } from './sell-crop-details';
import { Supplier } from './supplier';

export interface CropOrder {
  orderIdRef?: number;
  address: string;
  orderStatus: string;
  isProofOfPaymentSubmitted: boolean;
  isCropReceivedBySupplier: boolean;
  isPaymentReceivedByFarmer: boolean;
  sellCropDetail: SellCropDetails;
  paymentReceivedDate: string;
  supplier: Supplier;
  orderReceivedDate: string;
  cancelReason: string;
}
