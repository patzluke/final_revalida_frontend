import { Component, OnInit } from '@angular/core';
import { faSave, faCancel, faMailReply, faEnvelope, faUser, faRightToBracket, faKeyboard } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-resend-otp',
  templateUrl: './resend-otp.component.html',
  styleUrls: ['./resend-otp.component.scss']
})
export class ResendOtpComponent implements OnInit {
  faMailReply = faMailReply;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faCancel = faCancel;
  faRightToBracket = faRightToBracket;
  faKeyboard = faKeyboard;



  constructor() { }
  ngOnInit() {
    this.startTimer()
  }

  timeLeft: number = 15; // Set the initial time in seconds
  interval: any;

  resend: boolean = false;

  startTimer(): void {
    this.resend = true
    this.timeLeft = 60
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        this.stopTimer();
        this.resend = false;
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }
}
