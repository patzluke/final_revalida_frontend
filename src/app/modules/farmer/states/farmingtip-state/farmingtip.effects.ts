import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import {
  FarmingTipActions,
  addFarmingTipState,
  deleteFarmingTipState,
  setFarmingTipState,
  updateFarmingTipState,
} from './farmingtip.actions';
import Swal from 'sweetalert2';
import { FarmingTip } from '../../models/farmingTip';
import { HttpErrorResponse } from '@angular/common/http';
import { FarmerService } from '../../services/farmer.service';

@Injectable()
export class FarmingTipEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getFarmingTip$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FarmingTipActions.GET_FARMINGTIPS),
        mergeMap(() =>
          this.farmerService
            .selectAllFarmingTip()
            .pipe(
              map((farmingTips) =>
                setFarmingTipState({ farmingTips: farmingTips })
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  insertFarmingTip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmingTipActions.ADD_FARMINGTIP),
      switchMap((data: { farmingTip: FarmingTip }) =>
        this.farmerService.insertIntoFarmingTip(data.farmingTip).pipe(
          map((data: FarmingTip) =>
            addFarmingTipState({
              farmingTip: data,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Tip added successfully!', 'success');
          }),
          catchError((error) => {
            Swal.fire('Failed to Add!', error.error, 'error');
            return of({
              type: FarmingTipActions.ADD_FARMINGTIP_FAILED,
            });
          })
        )
      )
    );
  });

  updateFarmingTip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmingTipActions.UPDATE_FARMINGTIP),
      switchMap((data: { farmingTip: FarmingTip }) =>
        this.farmerService.updateIntoFarmingTip(data.farmingTip).pipe(
          map((farmingTip: FarmingTip) =>
            updateFarmingTipState({
              farmingTip: farmingTip,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Tip successfully updated!', 'success');
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: FarmingTipActions.UPDATE_FARMINGTIP_FAILED,
            });
          })
        )
      )
    );
  });

  deleteFarmingTip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FarmingTipActions.DELETE_FARMINGTIP),
      switchMap((data: { farmingTipId: number }) =>
        this.farmerService.deleteFarmingTip(data.farmingTipId).pipe(
          map((farmingTip: FarmingTip) =>
            deleteFarmingTipState({
              farmingTipId: farmingTip.farmingTipId as number,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Tip successfully deleted!', 'success');
          }),
          catchError((error) => {
            Swal.fire('Failed to Delete!', `Something Went Wrong`, 'error');
            return of({
              type: FarmingTipActions.DELETE_FARMINGTIP_FAILED,
            });
          })
        )
      )
    );
  });
}
