import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, catchError, of } from 'rxjs';
import { SupplierService } from '../../services/supplier.service';
import {
  PostAdvertisementResponsesActions,
  setPostAdvertisementResponsesState,
  updatePostAdvertisementResponsesState,
} from './postadvertisement-responses.actions';
import Swal from 'sweetalert2';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PostAdvertisementResponsesEffects {
  constructor(
    private actions$: Actions,
    private supplierService: SupplierService
  ) {}

  getPostAdvertisementResponse$ = createEffect(
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

  updatePostAdvertisementResponse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES
      ),
      switchMap((data: { postAdvertisementResponse: PostAdvertisementResponse }) =>
        this.supplierService
          .updatePostAdvertisementResponsesIsAcceptedStatus(
            data.postAdvertisementResponse
          )
          .pipe(
            map((postAdvertisementResponse: PostAdvertisementResponse) =>
            updatePostAdvertisementResponsesState({
              postAdvertisementResponse: postAdvertisementResponse,
              })
            ),
            catchError((error: HttpErrorResponse) => {
              Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
              return of({
                type: PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES_FAILED,
              });
            })
          )
      )
    );
  });
}
