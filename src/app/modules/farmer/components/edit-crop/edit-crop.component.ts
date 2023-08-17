import { Component } from '@angular/core';
import { faPenToSquare, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-crop',
  templateUrl: './edit-crop.component.html',
  styleUrls: ['./edit-crop.component.scss']
})
export class EditCropComponent {
  faPenToSquare = faPenToSquare
  faCancel = faCancel
}
