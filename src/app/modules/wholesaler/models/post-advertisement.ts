import { CropSpecialization } from './crop-specialization';
import { PostAdvertisementResponse } from './post-advertisement-response';
import { Supplier } from './supplier';

export interface PostAdvertisement {
  postId?: number;
  cropImage: string;
  cropName: string;
  description: string;
  quantity: string;
  price: number;
  measurement?: string;
  datePosted?: string;
  dateModified?: string;
  activeDeactive?: boolean;
  cropSpecialization?: CropSpecialization;
  supplier?: Supplier;
  postAdvertisementResponses?: PostAdvertisementResponse;

  //for inserting and updating advertisement
  supplierId: number;
  cropSpecializationId: number;

  //for front end logic - read less or read more
  showFullDescription?: boolean;
}
