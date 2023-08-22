import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { SupplierService } from '../../services/supplier.service';
import {
  PostAdvertisementActions,
  addPostAdvertisementState,
  deletePostAdvertisementState,
  setPostAdvertisementState,
  updatePostAdvertisementState,
} from './postadvertisement.actions';
import { PostAdvertisement } from '../../models/post-advertisement';

@Injectable()
export class PostAdvertisementEffects {
  constructor(
    private actions$: Actions,
    private supplierService: SupplierService
  ) {}

  getPostAdvertisements$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PostAdvertisementActions.GET_POSTADVERTISEMENT),
        mergeMap((data: { supplierId: number }) =>
          this.supplierService
            .selectPostAdvertisementBySupplierId(data.supplierId)
            .pipe(
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

  insertPostAdvertisement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostAdvertisementActions.ADD_POSTADVERTISEMENT),
      switchMap((data: { postAdvertisement: PostAdvertisement }) =>
        this.supplierService
          .insertIntoPostAdvertisement(data.postAdvertisement)
          .pipe(
            map((postAdvertisement: PostAdvertisement) =>
              addPostAdvertisementState({
                postAdvertisement: postAdvertisement,
              })
            ),
            catchError((error: HttpErrorResponse) => {
              console.log(error, ' hey');
              Swal.fire(
                'Failed to create Ad!',
                `Something Went Wrong`,
                'error'
              );
              return of({
                type: PostAdvertisementActions.ADD_POSTADVERTISEMENT_FAILED,
              });
            })
          )
      )
    );
  });

  updatePostAdvertisement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostAdvertisementActions.UPDATE_POSTADVERTISEMENT),
      switchMap((data: { postAdvertisement: PostAdvertisement }) =>
        this.supplierService
          .updateIntoPostAdvertisement(data.postAdvertisement)
          .pipe(
            map((postAdvertisement: PostAdvertisement) =>
              updatePostAdvertisementState({
                postAdvertisement: postAdvertisement,
              })
            ),
            tap(() => {
              Swal.fire('Success', 'Advertisement Updated!', 'success');
            }),
            catchError((error: HttpErrorResponse) => {
              Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
              return of({
                type: PostAdvertisementActions.UPDATE_POSTADVERTISEMENT_FAILED,
              });
            })
          )
      )
    );
  });

  softDeletePostAdvertisement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostAdvertisementActions.DELETE_POSTADVERTISEMENT),
      switchMap((data: { postId: number }) =>
        this.supplierService.softDeletePostAdvertisement(data.postId).pipe(
          map((postAdvertisement: PostAdvertisement) =>
            deletePostAdvertisementState({
              postId: postAdvertisement.postId as number,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Advertisement deleted!', 'success');
          }),
          catchError((error) => {
            Swal.fire('Failed to Delete!', `Something Went Wrong`, 'error');
            return of({
              type: PostAdvertisementActions.DELETE_POSTADVERTISEMENT_FAILED,
            });
          })
        )
      )
    );
  });
}
