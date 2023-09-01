import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course';

export enum CourseActions {
  SET_COURSES = "[COURSE] Set List of course ",
  GET_COURSES = "[COURSE] Get List of course  Success",
}

export const setCourseState = createAction(
  CourseActions.SET_COURSES,
  props<{ courses: Course[] }>()
);
