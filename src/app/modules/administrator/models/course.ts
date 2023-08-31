import { CourseEnrolled } from './courseEnrolled';

export interface Course {
  courseId?: number;
  courseName: string;
  description: string;
  durationInDays: number;
  activeDeactive?: boolean;
  courseEnrolleds?: CourseEnrolled;
}
