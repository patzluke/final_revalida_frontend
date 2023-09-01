import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { FarmerService } from '../../services/farmer.service';;
import { CourseActions, setCourseState } from './course.actions';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private farmerService: FarmerService
  ) {}

  getCourses$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.GET_COURSES),
        mergeMap(() =>
          this.farmerService.selectAllCourses().pipe(
            map((courses) =>
              setCourseState({
                courses: courses,
              })
            )
          )
        )
      );
    },
    { dispatch: true }
  );
}
