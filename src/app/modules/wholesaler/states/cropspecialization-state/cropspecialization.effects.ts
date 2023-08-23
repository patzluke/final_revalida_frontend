import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import {
  CropSpecializationActions,
  setCropSpecializationState,
} from './cropspecialization.actions';

@Injectable()
export class CropSpecializationEffects {
  constructor(
    private actions$: Actions,
    private supplierService: SupplierService
  ) {}

  getCropSpecializations$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CropSpecializationActions.GET_CROPSPECIALIZATION),
        mergeMap(() =>
          this.supplierService.selectAllCropSpecialization().pipe(
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
