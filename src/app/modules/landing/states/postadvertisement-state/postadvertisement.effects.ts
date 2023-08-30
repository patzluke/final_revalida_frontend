import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  PostAdvertisementActions,
  setPostAdvertisementState,
} from './postadvertisement.actions';
import { LandingService } from '../../services/landing.service';

@Injectable()
export class PostAdvertisementEffects {
  constructor(
    private actions$: Actions,
    private landingService: LandingService
  ) {}

  getPostAdvertisements$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostAdvertisementActions.GET_POSTADVERTISEMENT),
        mergeMap(() =>
          this.landingService.selectAllPostAdvertisements().pipe(
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
