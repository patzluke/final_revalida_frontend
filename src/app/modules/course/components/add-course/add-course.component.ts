import { Component } from '@angular/core';
import { faAdd, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  faAdd = faAdd
  faCancel = faCancel
}
