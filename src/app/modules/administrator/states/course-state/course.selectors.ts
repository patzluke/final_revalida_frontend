import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

export const selectCourseState =
  createFeatureSelector<CourseState>('courseList');

export const selectCourses = () =>
  createSelector(selectCourseState, (state: CourseState) =>
    state.courses.filter((course) => course.activeDeactive == true)
  );

export const selectCourse = (courseId: number) =>
  createSelector(selectCourseState, (state: CourseState) =>
    state.courses.find((course) => {
      return course.courseId == courseId;
    })
  );
