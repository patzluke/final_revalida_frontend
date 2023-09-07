import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap, catchError, of } from 'rxjs';
import { FarmerService } from '../../services/farmer.service';
import {
  CropPaymentActions,
  addCropPaymentState,
  setCropPaymentState,
  updateCropPaymentState,
} from './crop-payment.actions';
import { CropPayment } from '../../models/crop-payment';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CropPaymentEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getCropPayments$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CropPaymentActions.GET_CROPPAYMENT),
        mergeMap((data: { farmerId: number }) =>
          this.farmerService.selectAllCropPaymentByFarmer(data.farmerId).pipe(
            map((cropPayments) =>
              setCropPaymentState({
                cropPayments: cropPayments,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );

  insertCropPayment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CropPaymentActions.ADD_CROPPAYMENT),
      switchMap((data: { cropPayment: any }) =>
        this.farmerService
          .insertIntoSellCropDetailsAndCropOrdersAndPayment(data.cropPayment)
          .pipe(
            map((cropPayment: CropPayment) =>
              addCropPaymentState({
                cropPayment: cropPayment,
              })
            ),
            tap(() => {
              Swal.fire('Success', 'Final Offer Submitted', 'success');
            }),
            catchError((error: HttpErrorResponse) => {
              console.log(error, ' hey');

              Swal.fire(
                'Failed to Submit Final Offer!',
                `Something Went Wrong`,
                'error'
              );
              return of({
                type: CropPaymentActions.ADD_CROPPAYMENT_FAILED,
              });
            })
          )
      )
    );
  });

  updateCropPayment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CropPaymentActions.UPDATE_CROPPAYMENT),
      mergeMap((data: { cropPayment: any }) =>
        this.farmerService.updateCropOrderStatus(data.cropPayment).pipe(
          map((cropPayment: CropPayment) =>
            updateCropPaymentState({
              cropPayment: cropPayment,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Status Successfully changed!', 'success');
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
}
