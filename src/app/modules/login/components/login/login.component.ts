import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword: boolean = false;

  showPasswordFunction(event: Event) {
    this.showPassword = (event.target as HTMLInputElement).checked;
  }
}
