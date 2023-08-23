import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import {
  PostAdvertisementResponsesActions,
  setPostAdvertisementResponsesState,
} from './postadvertisement-responses.actions';

@Injectable()
export class PostAdvertisementResponsesEffects {
  constructor(
    private actions$: Actions,
    private supplierService: SupplierService
  ) {}

  getPostAdvertisementResponses$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          PostAdvertisementResponsesActions.GET_POSTADVERTISEMENTRESPONSES
        ),
        mergeMap((data: { postId: number }) =>
          this.supplierService
            .selectAllPostAdvertisementResponsesByPostId(data.postId)
            .pipe(
              map((postAdvertisementResponses) =>
                setPostAdvertisementResponsesState({
                  postAdvertisementResponses: postAdvertisementResponses,
                })
              )
            )
        )
      );
    },
    { dispatch: true }
  );
}
