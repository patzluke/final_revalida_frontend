import { Component } from '@angular/core';
import { faAdd, faCancel, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent {
  faAdd = faAdd
  faCancel = faCancel
  faPenToSquare = faPenToSquare
  faTrash = faTrash
  suppliers: {
    crop_id: number,
    farmer_id: number,
    crop_name: string,
    price: number,
    quantity: number,
    crop_image: string
  }[] = [
      {
        crop_id: 1,
        farmer_id: 1,
        crop_name: 'Corn Crops',
        price: 500,
        quantity: 100,
        crop_image: './../../../../../assets/images/corn.png'
      },
      {
        crop_id: 2,
        farmer_id: 1,
        crop_name: 'Potato Crops',
        price: 1500,
        quantity: 300,
        crop_image: './../../../../../assets/images/potato.png'
      },
      {
        crop_id: 1,
        farmer_id: 1,
        crop_name: 'Kamote Crops',
        price: 1200,
        quantity: 600,
        crop_image: './../../../../../assets/images/kamote.png'
      },
    ]
}
