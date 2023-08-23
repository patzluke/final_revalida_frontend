import { Component } from '@angular/core';
import { faSave, faCancel, faMailReply, faEnvelope, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  faRightToBracket = faRightToBracket;
}
