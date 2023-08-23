import { PostAdvertisement } from './post-advertisement';

export interface CropSpecialization {
  cropSpecializationId?: number;
  specializationName: string;
  postAdvertisements: PostAdvertisement;
}
