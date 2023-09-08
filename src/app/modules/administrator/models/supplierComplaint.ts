import { Supplier } from './supplier';

export interface SupplierComplaint {
  supplierComplaintId?: number;
  complaintType?: string;
  adminReplyMessage?: string;
  complaintTitle?: string;
  complaintMessage?: string;
  isRead?: boolean;
  isResolved?: boolean;
  readDate?: string;
  dateSubmitted?: string;
  activeDeactive?: boolean;
  supplier?: Supplier;
  image?: string;
  //For inserting
  supplierId?: number;
}
