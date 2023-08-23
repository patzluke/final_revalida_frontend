import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  PostAdvertisementActions,
  setPostAdvertisementState,
} from './postadvertisement.actions';
import { FarmerService } from '../../services/farmer.service';

@Injectable()
export class PostAdvertisementEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getPostAdvertisements$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostAdvertisementActions.GET_POSTADVERTISEMENT),
        mergeMap(() =>
          this.farmerService.selectAllPostAdvertisements().pipe(
            map((postAdvertisements) =>
              setPostAdvertisementState({
                postAdvertisements: postAdvertisements,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );
}
