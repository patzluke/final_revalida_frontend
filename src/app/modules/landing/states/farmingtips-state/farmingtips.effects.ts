import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { LandingService } from '../../services/landing.service';
import { FarmingTipsActions, setFarmingTipsState } from './farmingtips.actions';

@Injectable()
export class FarmingTipsEffects {
  constructor(
    private landingService: LandingService,
    private actions$: Actions
  ) {}

  getFarmingTips$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FarmingTipsActions.GET_FARMINGTIPS),
        mergeMap(() =>
          this.landingService.selectAllFarmingTips().pipe(
            map((farmingTips) =>
              setFarmingTipsState({
                farmingTips: farmingTips,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );
}
