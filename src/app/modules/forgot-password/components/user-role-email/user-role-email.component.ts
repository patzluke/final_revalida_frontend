import { Component } from '@angular/core';
import { faSave, faCancel, faMailReply, faEnvelope, faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-role-email',
  templateUrl: './user-role-email.component.html',
  styleUrls: ['./user-role-email.component.scss']
})
export class UserRoleEmailComponent {
  faMailReply = faMailReply;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faCancel = faCancel;
  faRightToBracket = faRightToBracket;
}
