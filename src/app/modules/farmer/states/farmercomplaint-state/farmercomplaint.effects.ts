import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import {
  FarmerComplaintActions,
  addSingleFarmerComplaintState,
  setSingleFarmerComplaintState,
  updateSingleFarmerComplaintState,
} from './farmercomplaint.actions';
import Swal from 'sweetalert2';
import { FarmerService } from '../../services/farmer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FarmerComplaint } from '../../models/farmercomplaint';

@Injectable()
export class FarmerComplaintEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getSingleFarmerComplaints$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FarmerComplaintActions.GET_SINGLE_FARMERCOMPLAINTS),
        mergeMap((data: { farmerId: number }) =>
          this.farmerService.selectFarmerComplaints(data.farmerId).pipe(
            map((farmerComplaints) =>
              setSingleFarmerComplaintState({
                farmerComplaints: farmerComplaints,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );

  insertSingleFarmerComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerComplaintActions.ADD_FARMERCOMPLAINT),
      switchMap((data: { farmerComplaint: FarmerComplaint }) =>
        this.farmerService.insertIntoFarmerComplaint(data.farmerComplaint).pipe(
          map((farmerComplaint: FarmerComplaint) =>
            addSingleFarmerComplaintState({
              farmerComplaint: farmerComplaint,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Complaint Submitted', 'success');
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error, ' hey');

            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: FarmerComplaintActions.ADD_FARMERCOMPLAINT_FAILED,
            });
          })
        )
      )
    );
  });

  updateSingleFarmerComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerComplaintActions.UPDATE_SINGLE_FARMERCOMPLAINT),
      switchMap((data: { farmerComplaint: FarmerComplaint }) =>
        this.farmerService.updateIntoFarmerComplaint(data.farmerComplaint).pipe(
          map((farmerComplaint: FarmerComplaint) =>
            updateSingleFarmerComplaintState({
              farmerComplaint: farmerComplaint,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Successfully Updated!', 'success');
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: FarmerComplaintActions.UPDATE_SINGLE_FARMERCOMPLAINT_FAILED,
            });
          })
        )
      )
    );
  });

  softDeleteSingleFarmerComplaint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS),
      switchMap((data: { farmerComplaintId: number }) =>
        this.farmerService
          .softDeleteFarmerComplaint(data.farmerComplaintId)
          .pipe(
            map((farmerComplaint: FarmerComplaint) =>
              updateSingleFarmerComplaintState({
                farmerComplaint: farmerComplaint,
              })
            )
          )
      )
    );
  });
}
