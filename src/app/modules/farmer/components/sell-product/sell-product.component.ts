import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAdd, faCancel, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent {

  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items to show per page

  addCrop!: FormGroup

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }


  faAdd = faAdd
  faCancel = faCancel
  faPenToSquare = faPenToSquare
  faTrash = faTrash
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
