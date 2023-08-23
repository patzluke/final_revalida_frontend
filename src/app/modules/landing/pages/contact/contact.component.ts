import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  emailForm!: FormGroup;

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    const serviceID = 'service_djx0he9';
    const templateID = 'template_vxnvypd';
    const userID = '2L6p-bZnm7eoJXSgU';

    const templateData = {
      name: this.emailForm.controls['name'].getRawValue(),
      email: this.emailForm.controls['email'].getRawValue(),
      message: this.emailForm.controls['message'].getRawValue(),
    };

    emailjs.send(serviceID, templateID, templateData, userID).then(
      (res: EmailJSResponseStatus) => {
        console.log('email sent');
        Swal.fire({
          title: 'Successfully sent',
          text: 'Email sent',

          confirmButtonText: 'OK',
        });
        this.emailForm.reset();
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          title: 'Error while sending email',
          text: 'Try Again',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  // validators
}
