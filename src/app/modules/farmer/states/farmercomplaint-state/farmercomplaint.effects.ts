import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import {
  FarmerComplaintActions,
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

  // updateSingleFarmerComplaintStatus$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS),
  //     switchMap((data: { farmerComplaint: FarmerComplaint }) =>
  //       this.adminService.updateIntoFarmerComplaint(data.farmerComplaint).pipe(
  //         map((farmerComplaint: FarmerComplaint) =>
  //           updateFarmerComplaintState({
  //             farmerComplaint: farmerComplaint,
  //           })
  //         )
  //       )
  //     )
  //   );
  // });

  // updateSingleFarmerComplaint$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(FarmerComplaintActions.UPDATE_FARMERCOMPLAINT),
  //     switchMap((data: { farmerComplaint: FarmerComplaint }) =>
  //       this.adminService.updateIntoFarmerComplaint(data.farmerComplaint).pipe(
  //         map((farmerComplaint: FarmerComplaint) =>
  //           updateFarmerComplaintState({
  //             farmerComplaint: farmerComplaint,
  //           })
  //         ),
  //         tap(() => {
  //           Swal.fire(
  //             'Success',
  //             'You\'ve successfully replied!',
  //             'success'
  //           );
  //         }),
  //         catchError((error: HttpErrorResponse) => {
  //           console.log(error, ' hey');

  //           Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
  //           return of({
  //             type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_FAILED,
  //           });
  //         })
  //       )
  //     )
  //   );
  // });
}
