import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CourseActions } from '../../states/course-state/course.actions';
import { selectCourses } from '../../states/course-state/course.selectors';
import { Course } from '../../models/course';
import { CourseEnrolledActions } from '../../states/course-enrolled-state/course-enrolled.actions';
import Swal from 'sweetalert2';
import {
  selectCourseEnrolledByCourseId,
  selectCoursesEnrolled,
} from '../../states/course-enrolled-state/course-enrolled.selectors';
import { CourseEnrolled } from '../../models/courseEnrolled';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  dateToday = new Date();
  currentPage: number = 1;
  itemsPerPage: number = 4; // Number of items to show per page
  noEnrolledCourse: boolean = true;
  noAvailableCourses: boolean = true;

  //selectors
  selectCourses$ = this.store.select(selectCourses());
  selectCoursesEnrolled$ = this.store.select(selectCoursesEnrolled());
  selectCourseEnrolledByCourseId$ = (course: Course) => {
    return this.store.select(
      selectCourseEnrolledByCourseId(
        localStorage.getItem('userNo') as any,
        course.courseId as number
      )
    );
  };

  convertStringToDate = (date: string) => {
    return new Date(date);
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: CourseActions.GET_COURSES,
    });
    this.store.dispatch({
      type: CourseEnrolledActions.GET_COURSEENROLLED,
      farmerId: localStorage.getItem('userNo'),
    });

    this.selectCoursesEnrolled$.subscribe((coursesEnrolled) => {
      if (coursesEnrolled.length > 0) {
        this.noEnrolledCourse = false;
      }
    });

    this.selectCourses$.subscribe((coursesEnrolled) => {
      if (coursesEnrolled.length > 0) {
        this.noAvailableCourses = false;
      }
    });
  }

  // Function to calculate the starting index of items for the current page
  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Function to calculate the ending index of items for the current page
  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  // Function to change the current page
  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  enrollCourse(course: Course) {
    Swal.fire({
      title: 'Are you sure you want to enroll in this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        let selectedCourse = { ...course };
        selectedCourse.farmerId = localStorage.getItem('userNo') as any;

        this.store.dispatch({
          type: CourseEnrolledActions.ADD_COURSEENROLLED,
          courseEnrolled: selectedCourse,
        });
      }
    });
  }
}
