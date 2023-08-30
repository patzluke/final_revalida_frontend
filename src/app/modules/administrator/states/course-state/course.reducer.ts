import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course';
import { addCoursetate, deleteCoursetate, setCourseState, updateCoursetate } from './course.actions';

export interface CourseState {
  courses: Course[];
}

export const initialState: CourseState = {
  courses: [],
};

export const courseReducer = createReducer(
  initialState,
  on(setCourseState, (state, { courses }) => {
    console.log(courses, ' hey');

    return { ...state, courses: courses };
  }),
  on(addCoursetate, (state, { course }) => {
    return { ...state, courses: [course, ...state.courses] };
  }),
  on(updateCoursetate, (state, { course }) => {
    return {
      ...state,
      farmingTips: state.courses.map((oldCourse) =>
      oldCourse.courseId == course.courseId
          ? course
          : oldCourse
      ),
    };
  }),
  on(deleteCoursetate, (state, { courseId }) => {
    return {
      ...state,
      farmingTips: state.courses.filter(
        (oldCourse) => oldCourse.courseId !== courseId
      ),
    };
  })
);
