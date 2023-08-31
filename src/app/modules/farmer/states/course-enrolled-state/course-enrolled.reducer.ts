import { createReducer, on } from '@ngrx/store';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { CourseEnrolled } from '../../models/courseEnrolled';
import {
  addCourseEnrolledState,
  setCourseEnrolledState,
} from './course-enrolled.actions';

export interface CourseEnrolledState {
  coursesEnrolled: CourseEnrolled[];
}

export const initialState: CourseEnrolledState = {
  coursesEnrolled: [],
};

export const coursesEnrolledReducer = createReducer(
  initialState,
  on(setCourseEnrolledState, (state, { coursesEnrolled }) => {
    return { ...state, coursesEnrolled: coursesEnrolled };
  }),
  on(addCourseEnrolledState, (state, { courseEnrolled }) => {
    return {
      ...state,
      coursesEnrolled: [courseEnrolled, ...state.coursesEnrolled],
    };
  })
);
