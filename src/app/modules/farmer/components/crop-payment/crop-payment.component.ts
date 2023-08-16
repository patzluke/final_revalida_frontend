import { Component } from '@angular/core';

@Component({
  selector: 'app-crop-payment',
  templateUrl: './crop-payment.component.html',
  styleUrls: ['./crop-payment.component.scss']
})
export class CropPaymentComponent {

  payments: {
    payment_id: string,
    pay_date: string,
    payment_mode: string,
    paid_by: string,
    order_id_ref: string,
    status: string,
  }[] = [
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
      {
        payment_id: 'PY202308160000000000001',
        pay_date: '2023-08-16 12:00:00 PM',
        payment_mode: 'BANK TRANSFER',
        paid_by: 'OPTIMUS PRIME',
        order_id_ref: 'ORDIDREF202308160000000000001',
        status: 'PAID',
      },
    ]
}