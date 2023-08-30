import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  CropSpecializationActions,
  setCropSpecializationState,
} from './cropspecialization.actions';
import { LandingService } from '../../services/landing.service';

@Injectable()
export class CropSpecializationEffects {
  constructor(
    private actions$: Actions,
    private landingService: LandingService
  ) {}

  getCropSpecializations$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CropSpecializationActions.GET_CROPSPECIALIZATION),
        mergeMap(() =>
          this.landingService.selectAllCropSpecialization().pipe(
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
