import { Component } from '@angular/core';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './post-advertisement.component.html',
  styleUrls: ['./post-advertisement.component.scss']
})
export class PostAdvertisementComponent {

  faSave = faSave
  faCancel = faCancel
  advertisement: {
    post_id: string
    crop_specialization_id: string
    crop_name: string
    description: string
    crop_image: string
    quantity: number
  }[] = []

  crop_specialization: {
    crop_id: string
    crop: string
  }[] = [
      { crop_id: 'CROP0001', crop: 'Feed Crops' },
      { crop_id: 'CROP0002', crop: 'Fiber Crops' },
      { crop_id: 'CROP0003', crop: 'Oil Crops' },
      { crop_id: 'CROP0004', crop: 'Ornamental Crops' },
      { crop_id: 'CROP0005', crop: 'Industrial Crops' },
      { crop_id: 'CROP0006', crop: 'Harvesting Crops' },
      { crop_id: 'CROP0007', crop: 'GMOs' },
      { crop_id: 'CROP0008', crop: 'Seed Banks' }
    ]
}
