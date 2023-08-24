import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  editProfileDetail: boolean = false;
  editPassword: boolean = false;

  genders = [{ gender: 'Male' }, { gender: 'Female' }];
  civilStatus = [
    { status: 'Married' },
    { status: 'Single' },
    { status: 'Divorced' },
    { status: 'Widowed' },
  ];

  personalInfoForm!: FormGroup;
  socialsFormArray!: FormArray;
  passwordForm!: FormGroup;
  dateToday: Date = new Date();

  socialType = [
    {
      type: 'Facebook: ',
    },
    {
      type: 'Instagram: ',
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      civilStatus: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      socials: this.formBuilder.array([new FormControl()]),
    });

    this.socialsFormArray = this.personalInfoForm.controls[
      'socials'
    ] as FormArray;

    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator = (
    group: FormGroup
  ): { [key: string]: any } | null => {
    const newPasswordControl = group.get('newPassword');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!newPasswordControl || !confirmPasswordControl) {
      return null;
    }

    const newPassword = newPasswordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (newPassword === confirmPassword) {
      confirmPasswordControl.setErrors(null);
      return null;
    } else {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  };

  showEditProfileDetDialog() {
    this.editProfileDetail = true;
  }

  showEditPasswordDetDialog() {
    this.editPassword = true;
  }

  deleteSocial = (i: number) => {
    this.socialsFormArray.removeAt(i);
  };

  addSocial = () => {
    this.socialsFormArray.push(new FormControl());
  };

  getSocialLogoUrl(socialType: string): string {
    switch (socialType) {
      case 'Facebook: ':
        return '/assets/images/fb-logo.png';
      case 'Instagram: ':
        return '/assets/images/ig-logo.png';
      // Add more cases for other social media types
      default:
        return 'path-to-default-logo.png';
    }
  }

  updateProfileInfo = () => {
    if (this.personalInfoForm.valid) {
      // update
      const profileData = {
        firstName: this.personalInfoForm.controls['firstName'].getRawValue(),
        middleName: this.personalInfoForm.controls['middleName'].getRawValue(),
        lastName: this.personalInfoForm.controls['lastName'].getRawValue(),
        birthdate: this.personalInfoForm.controls['birthdate'].getRawValue(),
        gender: this.personalInfoForm.controls['gender'].getRawValue(),
        nationality:
          this.personalInfoForm.controls['nationality'].getRawValue(),
        civilStatus:
          this.personalInfoForm.controls['civilStatus'].getRawValue(),

        address: this.personalInfoForm.controls['address'].getRawValue(),
        email: this.personalInfoForm.controls['email'].getRawValue(),
        contactNo: this.personalInfoForm.controls['contactNo'].getRawValue(),
        socials: this.personalInfoForm.controls['socials'].getRawValue(),
      };

      console.log('update profile details data', profileData);
    } else {
      Object.keys(this.personalInfoForm.controls).forEach((field) => {
        const control = this.personalInfoForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  };

  updatePassword = () => {
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;

      const passwordData = {
        password: newPassword,
      };

      console.log('update password', passwordData);

      // if (this.validateCurrentPassword(currentPassword)) {
      //   // service
      // } else {
      //   console.log('Invalid current password.');
      // }
    } else {
      Object.keys(this.passwordForm.controls).forEach((field) => {
        const control = this.passwordForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  };

  // validateCurrentPassword = (currentPassword: string): boolean => {
  //   //return currentPassword === this.professorPass.password;
  //   return false;
  //   // get current pass
  // };
}
