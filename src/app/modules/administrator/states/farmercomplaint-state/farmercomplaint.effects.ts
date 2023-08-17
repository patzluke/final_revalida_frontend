import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import {
  FarmerComplaintActions,
  setFarmerComplaintState,
  updateFarmerComplaintState,
} from './farmercomplaint.actions';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FarmerComplaint } from '../../models/farmercomplaint';

@Injectable()
export class FarmerComplaintEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getFarmerComplaints$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FarmerComplaintActions.GET_FARMERCOMPLAINTS),
        mergeMap(() =>
          this.adminService
            .selectAllFarmerComplaints()
            .pipe(
              map((farmerComplaints) =>
                setFarmerComplaintState({ farmerComplaints: farmerComplaints })
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  updateFarmerComplaintStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS),
      switchMap((data: { farmerComplaint: FarmerComplaint }) =>
        this.adminService.updateIntoFarmerComplaint(data.farmerComplaint).pipe(
          map((farmerComplaint: FarmerComplaint) =>
            updateFarmerComplaintState({
              farmerComplaint: farmerComplaint,
            })
          )
        )
      )
    );
  });

  updateFarmerComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerComplaintActions.UPDATE_FARMERCOMPLAINT),
      switchMap((data: { farmerComplaint: FarmerComplaint }) =>
        this.adminService.updateIntoFarmerComplaint(data.farmerComplaint).pipe(
          map((farmerComplaint: FarmerComplaint) =>
            updateFarmerComplaintState({
              farmerComplaint: farmerComplaint,
            })
          ),
          tap(() => {
            Swal.fire(
              'Success',
              'You\'ve successfully replied!',
              'success'
            );
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error, ' hey');

            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_FAILED,
            });
          })
        )
      )
    );
  });
}
