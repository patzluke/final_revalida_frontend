import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { selectCourses } from '../../states/course-state/course.selectors';
import { CourseActions } from '../../states/course-state/course.actions';
import { faL } from '@fortawesome/free-solid-svg-icons';

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
  addCourseForm: FormGroup;
  editCourseForm: FormGroup;

  //selectors
  selectCourses$ = this.store.select(selectCourses());

  constructor(private store: Store, private fb: FormBuilder) {
    this.addCourseForm = fb.group({
      courseId: [0],
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      durationInDays: ['', [Validators.required, Validators.min(0)]],
    });

    this.editCourseForm = fb.group({
      courseId: [0],
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      durationInDays: ['', [Validators.required, Validators.min(0)]],
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

  isAddCouse: boolean = false;
  toggleAddCourseModal = () => {
    this.isAddCouse = !this.isAddCouse;
  };

  addCourseSubmit() {
    if (this.addCourseForm.valid) {
      this.isAddCouse = false;
      let addEditFarmingTipFormValues = this.addCourseForm.getRawValue();
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
      this.addCourseForm.reset();
    } else {
      Object.keys(this.addCourseForm.controls).forEach((field) => {
        const control = this.addCourseForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }

  selectCourse(course: Course) {
    this.editCourseForm.patchValue({ ...course });
  }

  isEditCouse: boolean = false;
  toggleEditCourseModal = () => {
    this.isEditCouse = !this.isEditCouse;
  };

  editCourseSubmit() {
    if (this.editCourseForm.valid) {
      this.isEditCouse = false;
      let addEditFarmingTipFormValues = this.editCourseForm.getRawValue();
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
    } else {
      Object.keys(this.editCourseForm.controls).forEach((field) => {
        const control = this.editCourseForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
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
