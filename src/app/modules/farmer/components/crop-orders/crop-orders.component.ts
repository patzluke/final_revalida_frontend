import { Component } from '@angular/core';

@Component({
  selector: 'app-crop-orders',
  templateUrl: './crop-orders.component.html',
  styleUrls: ['./crop-orders.component.scss']
})
export class CropOrdersComponent {

  orders: {
    order_id_ref: string,
    crop_id: number,
    supplier_id: number,
    quantity: number,
    price: number,
    address: string
  }[] = [
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 1,
        quantity: 500,
        price: 2500,
        address: 'Batanes'
      },
      {
        order_id_ref: 'ORDIDREF0000000000001',
        crop_id: 1,
        supplier_id: 2,
        quantity: 500,
        price: 2500,
        address: 'Batangas'
      },
    ]
}
