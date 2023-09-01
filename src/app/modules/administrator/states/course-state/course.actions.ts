import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course';

export enum CourseActions {
  SET_COURSE = '[Course] Set List of Course',
  GET_COURSE = '[Course] Get List of Course Success',

  ADD_COURSE = '[Course] Add Course',
  ADD_COURSE_SUCCESS = '[Course] Add Course Success',
  ADD_COURSE_FAILED = '[Course] Add Course Failed',

  UPDATE_COURSE = '[Course] Update Course',
  UPDATE_COURSE_SUCCESS = '[Course] Update Course Success',
  UPDATE_COURSE_FAILED = '[Course] Update Course Failed',

  DELETE_COURSE = '[Course] delete Course',
  DELETE_COURSE_SUCCESS = '[Course] delete Course Success',
  DELETE_COURSE_FAILED = '[Course] delete Course Failed',
}

export const setCourseState = createAction(
  CourseActions.SET_COURSE,
  props<{ courses: Course[] }>()
);
//--------------------------------------------------------------------
export const addCoursetate = createAction(
  CourseActions.ADD_COURSE_SUCCESS,
  props<{ course: Course }>()
);
//--------------------------------------------------------------------
export const updateCoursetate = createAction(
  CourseActions.UPDATE_COURSE_SUCCESS,
  props<{ course: Course }>()
);
//--------------------------------------------------------------------
export const deleteCoursetate = createAction(
  CourseActions.DELETE_COURSE_SUCCESS,
  props<{ courseId: number }>()
);
