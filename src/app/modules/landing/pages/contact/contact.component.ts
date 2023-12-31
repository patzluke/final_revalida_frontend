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
    if (this.emailForm.valid) {
      const serviceID = 'service_3qx2qoq';
      const templateID = 'template_i8jvttp';
      const userID = 'j7oWHxAO4ERImqdKL';

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
    } else {
      Object.keys(this.emailForm.controls).forEach((field) => {
        const control = this.emailForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }
}
