import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, catchError, of, tap, pipe } from 'rxjs';
import {
  PostAdvertisementResponsesActions,
  addAdvertisementResponsesState,
  setPostAdvertisementResponsesState,
  updatePostAdvertisementResponsesState,
} from './postadvertisement-responses.actions';
import Swal from 'sweetalert2';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import { HttpErrorResponse } from '@angular/common/http';
import { FarmerService } from '../../services/farmer.service';

@Injectable()
export class PostAdvertisementResponsesEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getPostAdvertisementResponse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          PostAdvertisementResponsesActions.GET_POSTADVERTISEMENTRESPONSES
        ),
        mergeMap((data: { farmerId: number }) =>
          this.farmerService
            .selectAllPostAdvertisementResponsesByFarmerId(data.farmerId)
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

  insertAdvertisementResponse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostAdvertisementResponsesActions.ADD_POSTADVERTISEMENTRESPONSES),
      switchMap(
        (data: { postAdvertisementResponse: PostAdvertisementResponse }) =>
          this.farmerService
            .insertIntoPostAdvertisementResponse(data.postAdvertisementResponse)
            .pipe(
              map((postAdvertisementResponse: PostAdvertisementResponse) =>
                addAdvertisementResponsesState({
                  postAdvertisementResponse: postAdvertisementResponse,
                })
              ),
              tap(() => {
                Swal.fire('Success', 'Offer Submitted', 'success');
              }),
              catchError((error: HttpErrorResponse) => {
                console.log(error, ' hey');

                Swal.fire('Failed to Submit!', `Something Went Wrong`, 'error');
                return of({
                  type: PostAdvertisementResponsesActions.ADD_POSTADVERTISEMENTRESPONSES_FAILED,
                });
              })
            )
      )
    );
  });

  updateAdvertisementResponseStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES
      ),
      map((data: { postAdvertisementResponse: any }) => {
        return updatePostAdvertisementResponsesState({
          postAdvertisementResponse: data.postAdvertisementResponse,
        });
      })
    );
  });
}
