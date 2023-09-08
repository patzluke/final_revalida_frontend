import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import { AdminService } from '../../services/administrator.service';
import {
  SupplierComplaintActions,
  setSupplierComplaintState,
  updateSupplierComplaintState,
} from './suppliercomplaint.actions';
import { SupplierComplaint } from '../../models/supplierComplaint';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SupplierComplaintsEffect {
  constructor(private adminService: AdminService, private actions$: Actions) {}

  // get
  getSingleSupplierComplaints$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SupplierComplaintActions.GET_SUPPLIERCOMPLAINTS),
        mergeMap(() =>
          this.adminService.selectAllSupplierComplaints().pipe(
            map((supplierComplaints) =>
              setSupplierComplaintState({
                supplierComplaints: supplierComplaints,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );

  //update status
  updateSupplierComplaintStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_STATUS),
      switchMap((data: { supplierComplaint: SupplierComplaint }) =>
        this.adminService
          .updateIntoSupplierComplaint(data.supplierComplaint)
          .pipe(
            map((supplierComplaint: SupplierComplaint) =>
              updateSupplierComplaintState({
                supplierComplaint: supplierComplaint,
              })
            )
          )
      )
    );
  });

  updateSupplierComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT),
      switchMap((data: { supplierComplaint: SupplierComplaint }) =>
        this.adminService
          .updateIntoSupplierComplaint(data.supplierComplaint)
          .pipe(
            map((supplierComplaint: SupplierComplaint) =>
              updateSupplierComplaintState({
                supplierComplaint: supplierComplaint,
              })
            ),
            tap(() => {
              Swal.fire('Success', "You've successfully replied!", 'success');
            }),
            catchError((error: HttpErrorResponse) => {
              Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
              return of({
                type: SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_FAILED,
              });
            })
          )
      )
    );
  });
}
