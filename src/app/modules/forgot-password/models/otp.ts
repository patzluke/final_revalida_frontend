import { User } from "../../registration/models/user";

export interface Otp {
  otpId?: number;
  issuedTime: string;
  expiryTime: string;
  otpCode: number;
  tries?: boolean;
  user?: User;
}
