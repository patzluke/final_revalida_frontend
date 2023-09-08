import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  SupplierActions,
  setSupplierState,
  updateSupplierState,
} from './supplier.actions';
import { Supplier } from '../../models/supplier';

@Injectable()
export class SupplierEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getFarmers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SupplierActions.GET_SUPPLIER),
        mergeMap(() =>
          this.adminService
            .selectAllSuppliers()
            .pipe(
              map((suppliers) => setSupplierState({ suppliers: suppliers }))
            )
        )
      );
    },
    { dispatch: true }
  );

  updateSupplier$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierActions.UPDATE_SUPPLIER_STATUS),
      switchMap((data: { supplier: Supplier }) =>
        this.adminService.validateUserAccount(data.supplier).pipe(
          map((supplier: Supplier) => {
            return updateSupplierState({
              supplier: supplier,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: SupplierActions.UPDATE_SUPPLIER_STATUS_FAILED,
            });
          })
        )
      )
    );
  });

  updateSupplierActiveStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierActions.UPDATE_SUPPLIER_ACTIVE_STATUS),
      switchMap((data: { user: Supplier }) =>
        this.adminService.changeUserActiveStatus(data.user).pipe(
          map((supplier: Supplier) => {
            return updateSupplierState({
              supplier: supplier,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to change active status!', `Something Went Wrong`, 'error');
            return of({
              type: SupplierActions.UPDATE_SUPPLIER_ACTIVE_STATUS_FAILED,
            });
          })
        )
      )
    );
  });
}
