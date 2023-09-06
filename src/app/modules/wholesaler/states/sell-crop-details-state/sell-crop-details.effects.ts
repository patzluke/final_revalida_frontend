import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import {
  SellCropDetailsActions,
  setSellCropDetailsState,
} from './sell-crop-details.actions';

@Injectable()
export class SellCropDetailsEffects {
  constructor(
    private actions$: Actions,
    private supplierService: SupplierService
  ) {}

  getSellCropDetails$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SellCropDetailsActions.GET_SELLCROPDETAILS),
        mergeMap(() =>
          this.supplierService.selectAllSellCropDetails().pipe(
            map((sellCropDetails) =>
              setSellCropDetailsState({
                sellCropDetails: sellCropDetails,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );
}
