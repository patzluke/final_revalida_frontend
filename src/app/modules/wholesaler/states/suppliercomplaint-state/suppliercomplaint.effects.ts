import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import {
  SupplierComplaintActions,
  addSingleSupplierComplaintState,
  setSingleSupplierComplaintState,
  updateSingleSupplierComplaintState,
} from './suppliercomplaint.actions';
import { SupplierComplaint } from '../../models/suppliercomplaint';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SupplierComplaintsEffect {
  constructor(
    private supplierService: SupplierService,
    private actions$: Actions
  ) {}

  getSingleSupplierComplaints$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SupplierComplaintActions.GET_SINGLE_SUPPLIERCOMPLAINTS),
        mergeMap((data: { supplierId: number }) =>
          this.supplierService.selectSupplierComplaints(data.supplierId).pipe(
            map((supplierComplaints) =>
              setSingleSupplierComplaintState({
                supplierComplaints: supplierComplaints,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );

  insertSingleSupplierComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierComplaintActions.ADD_SUPPLIERCOMPLAINT),
      switchMap((data: { supplierComplaint: SupplierComplaint }) =>
        this.supplierService
          .insertIntoSupplierComplaint(data.supplierComplaint)
          .pipe(
            map((supplierComplaint: SupplierComplaint) =>
              addSingleSupplierComplaintState({
                supplierComplaint: supplierComplaint,
              })
            ),

            tap(() => {
              Swal.fire('Success', 'Complaint Submitted', 'success');
            }),
            catchError((error: HttpErrorResponse) => {
              console.log(error, ' hey');

              Swal.fire(
                'Failed to submit complaint!',
                `Something Went Wrong`,
                'error'
              );
              return of({
                type: SupplierComplaintActions.ADD_SUPPLIERCOMPLAINT_FAILED,
              });
            })
          )
      )
    );
  });

  updateSingleSupplierComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierComplaintActions.UPDATE_SINGLE_SUPPLIERCOMPLAINT),
      switchMap((data: { supplierComplaint: SupplierComplaint }) =>
        this.supplierService
          .updateIntoSupplierComplaint(data.supplierComplaint)
          .pipe(
            map((supplierComplaint: SupplierComplaint) =>
              updateSingleSupplierComplaintState({
                supplierComplaint: supplierComplaint,
              })
            ),
            tap(() => {
              Swal.fire('Success', 'Successfully Updated!', 'success');
            }),
            catchError((error: HttpErrorResponse) => {
              Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
              return of({
                type: SupplierComplaintActions.UPDATE_SINGLE_SUPPLIERCOMPLAINT_FAILED,
              });
            })
          )
      )
    );
  });

  softDeleteSingleSupplierComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_STATUS),
      switchMap((data: { supplierComplaintId: number }) =>
        this.supplierService
          .softDeleteSupplierComplaint(data.supplierComplaintId)
          .pipe(
            map((supplierComplaint: SupplierComplaint) =>
              updateSingleSupplierComplaintState({
                supplierComplaint: supplierComplaint,
              })
            )
          )
      )
    );
  });
}
