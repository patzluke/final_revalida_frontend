import { Component, OnInit } from '@angular/core';

import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  totalPrice?: number

  ngOnInit() {
    let total = 0;
    for (const supplier of this.suppliers) {
      total += supplier.price * supplier.quantity
    }
    this.totalPrice = total;
    return total;
  }

  faWallet = faWallet

  suppliers: {
    cropName: string,
    price: number,
    quantity: number,
    mobileNumBankNumber: string,
    paymentMode: string
  }[] = [
      {
        cropName: 'Corn',
        price: 1500,
        quantity: 25,
        mobileNumBankNumber: '8923-5839-5387',
        paymentMode: 'BANK'
      },
      {
        cropName: 'Potato',
        price: 1600,
        quantity: 30,
        mobileNumBankNumber: '09123456789',
        paymentMode: 'GCASH'
      },
      {
        cropName: 'Kamote',
        price: 1700,
        quantity: 35,
        mobileNumBankNumber: '09123456789',
        paymentMode: 'GCASH'
      },
      {
        cropName: 'Tubo',
        price: 1600,
        quantity: 40,
        mobileNumBankNumber: '8923-5839-5387',
        paymentMode: 'BANK'
      }
    ]
}
