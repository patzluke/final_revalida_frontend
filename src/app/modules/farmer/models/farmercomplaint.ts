import { Farmer } from './farmer';

export interface FarmerComplaint {
  farmerComplaintId?: number;
  complaintType?: string;
  adminReplyMessage?: string;
  complaintTitle?: string;
  complaintMessage?: string;
  isRead?: boolean;
  isResolved?: boolean;
  readDate?: string;
  dateSubmitted?: string;
  activeDeactive?: boolean;
  farmer?: Farmer;
  image?: string;
  //For inserting
  farmerId?: number;
}
