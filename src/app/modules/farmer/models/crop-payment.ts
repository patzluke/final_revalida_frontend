import { CropOrder } from "./crop-order";

export interface CropPayment {
  paymentId?: number;
  paidBy: string;
  payDate: string;
  paymentMode: string;
  cropOrder: CropOrder;
  transcationReferenceNumber: string;
  proofOfPaymentImage: string;
}
