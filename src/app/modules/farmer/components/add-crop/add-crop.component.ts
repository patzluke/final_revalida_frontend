import { Component } from '@angular/core';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.scss']
})
export class AddCropComponent {

  faSave = faSave
  faCancel = faCancel
}
