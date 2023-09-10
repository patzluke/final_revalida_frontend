import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  CropPaymentActions,
  setCropPaymentState,
  updateCropPaymentState,
} from './crop-payment.actions';

import { SupplierService } from '../../services/supplier.service';
import { CropPayment } from '../../models/crop-payment';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable()
export class CropPaymentEffects {
  constructor(
    private actions$: Actions,
    private supplierService: SupplierService
  ) {}

  getCropPayments$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CropPaymentActions.GET_CROPPAYMENT),
        mergeMap((data: { supplierId: number }) =>
          this.supplierService
            .selectAllCropPaymentBySupplier(data.supplierId)
            .pipe(
              map((cropPayments) =>
                setCropPaymentState({
                  cropPayments: cropPayments,
                })
              ),
              catchError((error: HttpErrorResponse) => {
                return of({
                  type: CropPaymentActions.SET_CROPPAYMENT,
                  cropPayments: []
                });
              })
            )
        )
      );
    },
    { dispatch: true }
  );

  updateCropPayment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CropPaymentActions.UPDATE_CROPPAYMENT),
      mergeMap((data: { cropPayment: any }) =>
        this.supplierService.updateCropPaymentStatus(data.cropPayment).pipe(
          map((cropPayment: CropPayment) =>
            updateCropPaymentState({
              cropPayment: cropPayment,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Payment Submitted!', 'success');
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to Submit!', `Something Went Wrong`, 'error');
            return of({
              type: CropPaymentActions.UPDATE_CROPPAYMENT_FAILED,
            });
          })
        )
      )
    );
  });

  updateCropPaymentOrderStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CropPaymentActions.UPDATE_CROPPAYMENT_ORDER_STATUS),
      mergeMap((data: { cropPayment: any }) =>
        this.supplierService.updateCropOrderStatus(data.cropPayment).pipe(
          map((cropPayment: CropPayment) =>
            updateCropPaymentState({
              cropPayment: cropPayment,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Status is now updated!', 'success');
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire(
              'Failed to update status!',
              `Something Went Wrong`,
              'error'
            );
            return of({
              type: CropPaymentActions.UPDATE_CROPPAYMENT_FAILED,
            });
          })
        )
      )
    );
  });
}
