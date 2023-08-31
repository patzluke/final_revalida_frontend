import { createAction, props } from '@ngrx/store';
import { CourseEnrolled } from '../../models/courseEnrolled';

export enum CourseEnrolledActions {
  SET_COURSEENROLLED = '[CourseEnrolled] Set List of CourseEnrolled',
  GET_COURSEENROLLED = '[CourseEnrolled] Get List of CourseEnrolled  Success',

  ADD_COURSEENROLLED = '[CourseEnrolled] Add CourseEnrolled',
  ADD_COURSEENROLLED_SUCCESS = '[CourseEnrolled] Add CourseEnrolled Success',
  ADD_COURSEENROLLED_FAILED = '[CourseEnrolled] Add CourseEnrolled Failed',
}

export const setCourseEnrolledState = createAction(
  CourseEnrolledActions.SET_COURSEENROLLED,
  props<{ coursesEnrolled: CourseEnrolled[] }>()
);
//--------------------------------------------------------------------
export const addCourseEnrolledState = createAction(
  CourseEnrolledActions.ADD_COURSEENROLLED_SUCCESS,
  props<{ courseEnrolled: CourseEnrolled }>()
);
