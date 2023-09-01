import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import Swal from 'sweetalert2';
import { FarmerService } from '../../services/farmer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FarmerComplaint } from '../../models/farmercomplaint';
import {
  CourseEnrolledActions,
  addCourseEnrolledState,
  setCourseEnrolledState,
} from './course-enrolled.actions';
import { CourseEnrolled } from '../../models/courseEnrolled';

@Injectable()
export class CourseEnrolledEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getCoursesEnrolled$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseEnrolledActions.GET_COURSEENROLLED),
        mergeMap((data: { farmerId: number }) =>
          this.farmerService
            .selectAllCoursesEnrolledByFarmer(data.farmerId)
            .pipe(
              map((coursesEnrolled) =>
                setCourseEnrolledState({
                  coursesEnrolled: coursesEnrolled,
                })
              )
            )
        )
      );
    },
    { dispatch: true }
  );

  insertCourseEnrolled$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseEnrolledActions.ADD_COURSEENROLLED),
      switchMap((data: { courseEnrolled: CourseEnrolled }) =>
        this.farmerService.insertIntoCourseEnrolled(data.courseEnrolled).pipe(
          map((courseEnrolled) =>
            addCourseEnrolledState({
              courseEnrolled: courseEnrolled,
            })
          ),
          tap(() => {
            Swal.fire(
              'Success',
              "You've successfully enrolled in this course!",
              'success'
            );
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error, ' hey');
            Swal.fire('Failed to Enroll!', `Something Went Wrong`, 'error');
            return of({
              type: CourseEnrolledActions.ADD_COURSEENROLLED_FAILED,
            });
          })
        )
      )
    );
  });
}
