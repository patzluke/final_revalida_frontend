import { Component } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {

  totalPrice?: number;

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const order of this.orders) {
      totalPrice += order.price * order.quantity;
    }
    return totalPrice;
  }

  orders: {
    id: number,
    cropName: string,
    price: number,
    quantity: number
  }[] = [{
    id: 1,
    cropName: "Corn",
    price: 100,
    quantity: 10
  }, {
    id: 2,
    cropName: "Potato",
    price: 200,
    quantity: 20
  }, {
    id: 3,
    cropName: "Oat",
    price: 300,
    quantity: 30
  }
    ]
}
