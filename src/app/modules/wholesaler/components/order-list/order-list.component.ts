import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  ngOnInit() {
    // You can perform any initializations here if needed.
  }

  viewInfo(id: number) {
    localStorage.setItem('orderId', String(id))
    const order = this.orders.find(order => order.orderId === id);

    if (order) {
      this.orderId = order.orderId;
      this.cropName = order.cropName;
      this.quantity = order.quantity;
      this.cropImage = order.cropImage;
      this.status = order.status;
      this.deliveryDate = order.deliveryDate;
      console.log(this.orderId);
      console.log(this.cropName);
      console.log(this.quantity);
      console.log(this.cropImage);
      console.log(this.status);
      console.log(this.deliveryDate);
    }
  }

  orderId?: number;
  cropName?: string;
  quantity?: number;
  cropImage?: string;
  status?: boolean;
  deliveryDate?: string | Date;

  orders: {
    orderId: number,
    cropName: string,
    quantity: number,
    cropImage: string,
    status: boolean,
    deliveryDate: string | Date
  }[] = [
      {
        orderId: 1,
        cropImage: '../../../../../assets/images/oats.png',
        quantity: 15,
        cropName: 'Oats',
        status: true,
        deliveryDate: '2023-05-09'
      }, {
        orderId: 2,
        cropImage: '../../../../../assets/images/potato.png',
        quantity: 16,
        cropName: 'Potato',
        status: true,
        deliveryDate: '2023-05-09'
      }, {
        orderId: 3,
        cropImage: '../../../../../assets/images/corn.png',
        quantity: 17,
        cropName: 'Corn',
        status: true,
        deliveryDate: '2023-05-09'
      }
    ];
}
