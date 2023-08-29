import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  CropSpecializationActions,
  setCropSpecializationState,
} from './cropspecialization.actions';
import { FarmerService } from '../../services/farmer.service';

@Injectable()
export class CropSpecializationEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getCropSpecializations$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CropSpecializationActions.GET_CROPSPECIALIZATION),
        mergeMap(() =>
          this.farmerService.selectAllCropSpecialization().pipe(
            map((cropSpecializations) =>
              setCropSpecializationState({
                cropSpecializations: cropSpecializations,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );
}
