import { createReducer, on } from '@ngrx/store';
import { setCourseState } from './course.actions';
import { Course } from '../../models/course';

export interface CourseState {
  courses: Course[];
}

export const initialState: CourseState = {
  courses: [],
};

export const courseReducer = createReducer(
  initialState,
  on(setCourseState, (state, { courses }) => {
    return { ...state, courses: courses };
  })
);
