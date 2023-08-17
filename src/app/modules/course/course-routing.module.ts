import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CourseComponent
  },
  {
    path: 'add-course',
    component: AddCourseComponent
  },
  {
    path: 'edit-course',
    component: EditCourseComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
