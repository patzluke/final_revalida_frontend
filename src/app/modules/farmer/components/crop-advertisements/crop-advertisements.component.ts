import { Component } from '@angular/core';

@Component({
  selector: 'app-crop-advertisements',
  templateUrl: './crop-advertisements.component.html',
  styleUrls: ['./crop-advertisements.component.scss']
})
export class CropAdvertisementsComponent {

  posts: {
    postId: number,
    crop_specialization_id: number,
    crop_name: string,
    crop_description: string,
    crop_image: string,
    quantity: number
  }[] = [
      {
        postId: 1,
        crop_specialization_id: 1,
        crop_name: 'Potato Crop',
        crop_description: 'Fresh Potato Crop',
        crop_image: 'https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg',
        quantity: 50
      },
      {
        postId: 2,
        crop_specialization_id: 1,
        crop_name: 'Potato Crop',
        crop_description: 'Fresh Potato Crop',
        crop_image: 'https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg',
        quantity: 50
      },
      {
        postId: 3,
        crop_specialization_id: 1,
        crop_name: 'Potato Crop',
        crop_description: 'Fresh Potato Crop',
        crop_image: 'https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg',
        quantity: 50
      },
      {
        postId: 4,
        crop_specialization_id: 1,
        crop_name: 'Potato Crop',
        crop_description: 'Fresh Potato Crop',
        crop_image: 'https://plantix.net/en/library/assets/custom/crop-images/potato.jpeg',
        quantity: 50
      },
    ]
}
