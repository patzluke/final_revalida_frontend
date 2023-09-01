import { Course } from './course';
import { Farmer } from './farmer';

export interface CourseEnrolled {
  enrollmentId?: number;
  endOfEnrollment?: string;
  enrollmentDate?: string;
  course: Course;
  farmer: Farmer;
}
