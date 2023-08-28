import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  UserApplicantActions,
  setSUserApplicantState,
} from './userapplicant.actions';

@Injectable()
export class UserApplicantEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getUserApplicants$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserApplicantActions.GET_USERAPPLICANT),
        mergeMap(() =>
          this.adminService
            .selectAllUserApplicants()
            .pipe(
              map((userApplicants) =>
                setSUserApplicantState({ userApplicants: userApplicants })
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  // updateFarmerComplaint$ = createEffect(() => {
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
  //           Swal.fire('Success', "You've successfully replied!", 'success');
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
