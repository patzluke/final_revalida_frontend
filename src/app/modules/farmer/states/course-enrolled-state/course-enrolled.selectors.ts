import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseEnrolledState } from './course-enrolled.reducer';

export const selectCourseEnrolledState =
  createFeatureSelector<CourseEnrolledState>('coursesEnrolledList');

export const selectCoursesEnrolled = () =>
  createSelector(selectCourseEnrolledState, (state: CourseEnrolledState) =>
    state.coursesEnrolled.filter(
      (courseEnrolled) =>
        new Date(courseEnrolled.endOfEnrollment as string) > new Date()
    )
  );

export const selectCourseEnrolled = (enrollmentId: number) =>
  createSelector(selectCourseEnrolledState, (state: CourseEnrolledState) =>
    state.coursesEnrolled.find((courseEnrolled) => {
      return courseEnrolled.enrollmentId == enrollmentId;
    })
  );

export const selectCourseEnrolledByCourseId = (
  farmerId: number,
  courseId: number
) =>
  createSelector(selectCourseEnrolledState, (state: CourseEnrolledState) =>
    state.coursesEnrolled.find((courseEnrolled) => {
      return (
        courseEnrolled.farmer.farmerId == farmerId &&
        courseEnrolled.course.courseId == courseId &&
        new Date(courseEnrolled.endOfEnrollment as string) > new Date()
      );
    })
  );
