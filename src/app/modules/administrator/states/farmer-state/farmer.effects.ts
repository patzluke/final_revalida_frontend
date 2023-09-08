import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FarmerActions,
  setFarmerState,
  updateFarmerState,
} from './farmer.actions';
import { Farmer } from '../../models/farmer';
import { faR } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class FarmerEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getFarmers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FarmerActions.GET_FARMER),
        mergeMap(() =>
          this.adminService
            .selectAllFarmers()
            .pipe(map((farmers) => setFarmerState({ farmers: farmers })))
        )
      );
    },
    { dispatch: true }
  );

  updateFarmer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerActions.UPDATE_FARMER_STATUS),
      switchMap((data: { farmer: Farmer }) =>
        this.adminService.validateUserAccount(data.farmer).pipe(
          map((farmer: Farmer) => {
            return updateFarmerState({
              farmer: farmer,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: FarmerActions.UPDATE_FARMER_STATUS_FAILED,
            });
          })
        )
      )
    );
  });

  updateFarmerActiveStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmerActions.UPDATE_FARMER_ACTIVE_STATUS),
      switchMap((data: { user: Farmer }) =>
        this.adminService.changeUserActiveStatus(data.user).pipe(
          map((farmer: Farmer) => {
            return updateFarmerState({
              farmer: farmer,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to change active status!', `Something Went Wrong`, 'error');
            return of({
              type: FarmerActions.UPDATE_FARMER_STATUS_FAILED,
            });
          })
        )
      )
    );
  });
}
