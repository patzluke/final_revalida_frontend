export interface User {
  userId?: number;
  activeDeactive?: boolean;
  activeStatus: boolean;
  address: string;
  birthDate: string;
  civilStatus: string;
  contactNo: string;
  dateCreated: string;
  email: string;
  firstName: string;
  gender: string;
  image: string;
  lastName: string;
  middleName: string;
  nationality: string;
  password: string;
  socials: string[];
  userType: string;
  username: string;
  isValidated?: boolean;
  validIdPicture?: string
  validIdNumber?: string;
  validIdType?: string;
}
