import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { selectCropPayments } from '../../states/crop-payment-state/crop-payment.selectors';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  //selectors
  selectCropPayments$ = this.store.select(selectCropPayments());

  ngOnInit() {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      supplierId: localStorage.getItem('userNo'),
    });
    this.selectCropPayments$.subscribe(
      data => {
        this.details = data;
        console.log(this.details)
      })
  }

  constructor(private http: HttpClient, private store: Store) {

  }

  private SAMPLE_BASE_URL = 'http://localhost:8080/api/supplier';

  details?: any[]

  // id: number = 2

  getSellCropDetailByUserId(): Observable<any[]> {
    const newUrl = `${this.SAMPLE_BASE_URL}/select/crop-detail`;
    return this.http.get<any[]>(newUrl);
  }

  execute() {
    this.getSellCropDetailByUserId().subscribe(
      (data: any[]) => {
        this.details = data;
        console.log(this.details);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
