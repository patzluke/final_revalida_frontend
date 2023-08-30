import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/administrator.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CourseActions,
  addCoursetate,
  deleteCoursetate,
  setCourseState,
  updateCoursetate,
} from './course.actions';
import { Course } from '../../models/course';

@Injectable()
export class CourseEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getCourse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.GET_COURSE),
        mergeMap(() =>
          this.adminService
            .selectAllCourses()
            .pipe(map((courses) => setCourseState({ courses: courses })))
        )
      );
    },
    { dispatch: true }
  );

  insertCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.ADD_COURSE),
      switchMap((data: { course: Course }) =>
        this.adminService.insertIntoCourses(data.course).pipe(
          map((data: Course) =>
            addCoursetate({
              course: data,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Course added successfully!', 'success');
          }),
          catchError((error) => {
            Swal.fire('Failed to Add!', `Something Went Wrong`, 'error');
            return of({
              type: CourseActions.ADD_COURSE_FAILED,
            });
          })
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.UPDATE_COURSE),
      switchMap((data: { course: Course }) =>
        this.adminService.updateIntoCourses(data.course).pipe(
          map((course: Course) =>
            updateCoursetate({
              course: course,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Course successfully updated!', 'success');
          }),
          catchError((error: HttpErrorResponse) => {
            Swal.fire('Failed to Update!', `Something Went Wrong`, 'error');
            return of({
              type: CourseActions.UPDATE_COURSE_FAILED,
            });
          })
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.DELETE_COURSE),
      switchMap((data: { courseId: number }) =>
        this.adminService.deleteCourse(data.courseId).pipe(
          map((course: Course) =>
            deleteCoursetate({
              courseId: course.courseId as number,
            })
          ),
          tap(() => {
            Swal.fire('Success', 'Course successfully deleted!', 'success');
          }),
          catchError((error) => {
            Swal.fire('Failed to Delete!', `Something Went Wrong`, 'error');
            return of({
              type: CourseActions.DELETE_COURSE_FAILED,
            });
          })
        )
      )
    );
  });
}
