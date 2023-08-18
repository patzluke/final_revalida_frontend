import { Component } from '@angular/core';

@Component({
  selector: 'app-post-advertisement-responses',
  templateUrl: './post-advertisement-responses.component.html',
  styleUrls: ['./post-advertisement-responses.component.scss']
})
export class PostAdvertisementResponsesComponent {

  currentPage: number = 1;
  itemsPerPage: number = 4; // Number of items to show per page

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }


  responses: {
    post_response_id: string
    post_id: string
    farmer_id: string
    price: number
    quantity: number
    message: string
    is_accepted: boolean
    preferred_payment_mode: string
    date_created: string
    date_modified: string
  }[] = [
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
      {
        post_response_id: 'POSRESID202307170000000000001',
        post_id: 'POSID202308170000000000001',
        farmer_id: 'FRMR202308110000000000001',
        price: 15000,
        quantity: 1000,
        message: 'Gusto ko yan!!!',
        is_accepted: true,
        preferred_payment_mode: 'BANK TRANSFER',
        date_created: '2023-08-12 10:00:00 AM',
        date_modified: '2023-08-12 10:00:00 AM',
      },
    ]
}
