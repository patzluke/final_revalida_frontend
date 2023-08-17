import { Farmer } from "./farmer";

export interface FarmerComplaint {
  farmerComplaintId?: number;
  adminReplyMessage?: string;
  complaintMessage?: string;
  isRead: boolean;
  isResolved?: boolean;
  readDate?: string;
  dateSubmitted?: string;
  farmer?: Farmer;
}
