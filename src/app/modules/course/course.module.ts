import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './components/course/course.component';
import { CourseRoutingModule } from './course-routing.module';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCourseComponent } from './components/add-course/add-course.component';



@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,

    FontAwesomeModule
  ]
})
export class CourseModule { }
