import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/modules/farmer/models/course';
import { CourseEnrolledActions } from 'src/app/modules/farmer/states/course-enrolled-state/course-enrolled.actions';
import { selectCourseEnrolledByCourseId } from 'src/app/modules/farmer/states/course-enrolled-state/course-enrolled.selectors';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss'],
})
export class ViewCourseComponent implements OnInit {
  courseId: number = 0;
  selectedCourse: any | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const farmerId = localStorage.getItem('userNo');

    this.activatedRoute.queryParams.subscribe((data) => {
      this.courseId = data['course'];

      this.store.dispatch({
        type: CourseEnrolledActions.GET_COURSEENROLLED,
        farmerId: localStorage.getItem('userNo'),
      });

      this.store
        .select(
          selectCourseEnrolledByCourseId(parseInt(farmerId!), this.courseId)
        )
        .subscribe((data) => {
          this.selectedCourse = data;
          console.log(this.selectedCourse);
        });
    });
  }
}
