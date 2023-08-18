import { Farmer } from './farmer';

export interface FarmerComplaint {
  farmerComplaintId?: number;
  adminReplyMessage?: string;
  complaintTitle: string;
  complaintMessage: string;
  isRead?: boolean;
  isResolved?: boolean;
  readDate?: string;
  dateSubmitted?: string;
  farmer?: Farmer;

  //For inserting
  farmerId?: number;
}
