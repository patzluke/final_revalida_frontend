import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { selectCourses } from '../../states/course-state/course.selectors';
import { CourseActions } from '../../states/course-state/course.actions';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  courses: Course[] = [];

  //Formgroups
  addEditCourseForm: FormGroup;

  //selectors
  selectCourses$ = this.store.select(selectCourses());

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.addEditCourseForm = fb.group({
      courseId: [0, Validators.required],
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      durationInDays: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: CourseActions.GET_COURSE });
    this.selectCourses$.subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }

  addCourseSubmit() {
    let addEditFarmingTipFormValues = this.addEditCourseForm.getRawValue();
    let addCourse: Course = {
      courseId: addEditFarmingTipFormValues.courseId,
      courseName: addEditFarmingTipFormValues.courseName,
      description: addEditFarmingTipFormValues.description,
      durationInDays: addEditFarmingTipFormValues.durationInDays,
    };
    this.store.dispatch({
      type: CourseActions.ADD_COURSE,
      course: addCourse,
    });
  }

  selectCourse(course: Course) {
    this.addEditCourseForm.patchValue({ ...course });
  }

  editCourseSubmit() {
    let addEditFarmingTipFormValues = this.addEditCourseForm.getRawValue();
    let updatedCourse: Course = {
      courseId: addEditFarmingTipFormValues.courseId,
      courseName: addEditFarmingTipFormValues.courseName,
      description: addEditFarmingTipFormValues.description,
      durationInDays: addEditFarmingTipFormValues.durationInDays,
    };
    this.store.dispatch({
      type: CourseActions.UPDATE_COURSE,
      course: updatedCourse,
    });
  }

  deleteCourse(course: Course) {
    Swal.fire({
      title: 'Delete Course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: CourseActions.DELETE_COURSE,
          courseId: course.courseId,
        });
      }
    });
  }
}
