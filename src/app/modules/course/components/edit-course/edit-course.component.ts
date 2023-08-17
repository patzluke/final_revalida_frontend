import { Component } from '@angular/core';
import { faPenToSquare, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {

  faPenToSquare = faPenToSquare
  faCancel = faCancel
}
