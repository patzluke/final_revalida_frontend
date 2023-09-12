import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { FarmerService } from '../../services/farmer.service';
import { Farmer } from '../../models/farmer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
  validIdForm!: FormGroup;
  dateToday: Date = new Date();

  facebookSelected: boolean = false;
  instagramSelected: boolean = false;
  facebookLink: string = '';
  instagramLink: string = '';
  socialLinksAdded: boolean = false;

  changeImage: boolean = false;
  isMaxSize: boolean = false;

  validIds = [
    { type: "Driver's License" },
    { type: 'SSS Card' },
    { type: 'Unified Multi-purpose ID (UMID)' },
    { type: 'Philippine Identification System (PhilSys) ID' },
    { type: 'Tax Identification Number (TIN)' },
    { type: 'Voter’s ID' },
    { type: 'Postal ID' },
    { type: 'PhilHealth' },
    { type: 'NBI Clearance' },
  ];

  user: Farmer = { user: undefined };

  //ElementRefs
  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private farmerService: FarmerService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      userId: 0,
      farmerId: 0,
      image: [''],
      username: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: [new Date(''), [Validators.required, this.ageValidator]],
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
        //currentPassword: ['', Validators.required],
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

    this.validIdForm = this.formBuilder.group({
      validIdType: ['', Validators.required],
      validIdNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.farmerService
      .findOneByUserId(localStorage.getItem('userId') as any)
      .subscribe((data) => {
        this.user = data;
        console.log('profile data', this.user);

        this.facebookSelected = this.user.user?.socials?.find((social) =>
          social.includes('facebook') ? true : false
        )
          ? true
          : false;

        this.facebookLink =
          (this.user.user?.socials?.find((social) =>
            social.includes('facebook') ? true : false
          ) as string) || '';

        this.instagramSelected = this.user.user?.socials?.find((social) =>
          social.includes('instagram') ? true : false
        )
          ? true
          : false;

        this.instagramLink =
          (this.user.user?.socials?.find((social) =>
            social.includes('instagram') ? true : false
          ) as string) || '';
      });
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
    this.personalInfoForm.patchValue({
      farmerId: this.user.farmerId,
      ...this.user.user,
      birthDate: new Date(this.user.user?.birthDate as string),
    });
    this.imagePreviewUrlPicture = this.user.user?.image as string;
    this.editProfileDetail = true;
    this.personalInfoForm.disable();
    this.personalInfoForm.get('email')?.enable();
  }

  showEditPasswordDetDialog() {
    this.passwordForm.reset();
    this.editPassword = true;
  }

  addSocialLinks(): void {
    this.socialsFormArray.clear();
    if (this.facebookSelected && this.facebookLink.trim() !== '') {
      this.socialsFormArray.push(new FormControl(this.facebookLink));
    }
    if (this.instagramSelected && this.instagramLink.trim() !== '') {
      this.socialsFormArray.push(new FormControl(this.instagramLink));
    }
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthdate = new Date(control.value);

    if (!birthdate) {
      return null;
    }
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdate.getFullYear();

    if (age < 18) {
      return { underage: true };
    }
    return null;
  }

  //-------------------------------------------------
  changePictureImage: boolean = false;
  isPictureMaxSize: boolean = false;

  selectedPictureImage!: File;
  imagePreviewUrlPicture!: string | ArrayBuffer;

  //image upload

  onPictureSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    this.selectedPictureImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrlPicture = e.target.result;
      this.changePictureImage = true;
    };
    reader.readAsDataURL(selectedFile);
  };

  //-------------------------------------------------
  changeValidIdPictureImage: boolean = false;
  isValidIdPictureMaxSize: boolean = false;

  selectedValidIdPictureImage!: File;
  imagePreviewUrlValidIdPicture!: string | ArrayBuffer;

  //image upload

  onValidIdPictureSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    this.selectedValidIdPictureImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrlValidIdPicture = e.target.result;
      this.changeValidIdPictureImage = true;
    };
    reader.readAsDataURL(selectedFile);
  };

  //-------------------------------------------------
  changeRecentPictureImage: boolean = false;
  isRecentPictureMaxSize: boolean = false;

  selectedRecentPictureImage!: File;
  imagePreviewUrlRecentPicture!: string | ArrayBuffer;

  //image upload

  onRecentPictureSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    this.selectedRecentPictureImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrlRecentPicture = e.target.result;
      this.changeRecentPictureImage = true;
    };
    reader.readAsDataURL(selectedFile);
  };

  updateProfileInfo = () => {
    if (this.personalInfoForm.valid) {
      this.editProfileDetail = false;
      Swal.fire({
        title: 'Are you sure you want to update your profile?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText: 'cancel',
        confirmButtonText: 'Save changes',
      }).then((result) => {
        if (result.isConfirmed) {
          // update
          if (this.selectedPictureImage) {
            this.farmerService.upload(this.selectedPictureImage).subscribe({
              next: (data) => {
                this.imagePreviewUrlPicture = `${data.fileUri.concat(
                  data.fileName
                )}`;
                const profileData = {
                  userId:
                    this.personalInfoForm.controls['userId'].getRawValue(),
                  farmerId:
                    this.personalInfoForm.controls['farmerId'].getRawValue(),
                  image: `${data.fileUri.concat(data.fileName)}`,
                  firstName:
                    this.personalInfoForm.controls['firstName'].getRawValue(),
                  middleName:
                    this.personalInfoForm.controls['middleName'].getRawValue(),
                  lastName:
                    this.personalInfoForm.controls['lastName'].getRawValue(),
                  birthDate:
                    this.personalInfoForm.controls['birthDate'].getRawValue(),
                  gender:
                    this.personalInfoForm.controls['gender'].getRawValue(),
                  nationality:
                    this.personalInfoForm.controls['nationality'].getRawValue(),
                  civilStatus:
                    this.personalInfoForm.controls['civilStatus'].getRawValue(),

                  address:
                    this.personalInfoForm.controls['address'].getRawValue(),
                  email: this.personalInfoForm.controls['email'].getRawValue(),
                  contactNo:
                    this.personalInfoForm.controls['contactNo'].getRawValue(),
                  socials:
                    this.personalInfoForm.controls['socials'].getRawValue(),
                };

                this.farmerService.updateAdminInfo(profileData).subscribe({
                  next: (data) => {
                    this.user = { ...data };
                    this.personalInfoForm.patchValue({
                      farmerId: data.farmerId,
                      ...data.user,
                    });
                    Swal.fire(
                      'Success',
                      'Profile Successfully updated!',
                      'success'
                    );
                  },
                  error: (err) => {
                    Swal.fire(
                      'Failed to Update Profile!',
                      `Something went wrong.`,
                      'error'
                    );
                  },
                });
              },
              error: (err) => {
                Swal.fire(
                  'Failed to Change Picture!',
                  `Something went wrong.`,
                  'error'
                );
              },
            });
          } else {
            const profileData = {
              userId: this.personalInfoForm.controls['userId'].getRawValue(),
              farmerId:
                this.personalInfoForm.controls['farmerId'].getRawValue(),
              image: '',
              firstName:
                this.personalInfoForm.controls['firstName'].getRawValue(),
              middleName:
                this.personalInfoForm.controls['middleName'].getRawValue(),
              lastName:
                this.personalInfoForm.controls['lastName'].getRawValue(),
              birthDate:
                this.personalInfoForm.controls['birthDate'].getRawValue(),
              gender: this.personalInfoForm.controls['gender'].getRawValue(),
              nationality:
                this.personalInfoForm.controls['nationality'].getRawValue(),
              civilStatus:
                this.personalInfoForm.controls['civilStatus'].getRawValue(),

              address: this.personalInfoForm.controls['address'].getRawValue(),
              email: this.personalInfoForm.controls['email'].getRawValue(),
              contactNo:
                this.personalInfoForm.controls['contactNo'].getRawValue(),
              socials: this.personalInfoForm.controls['socials'].getRawValue(),
            };

            this.farmerService.updateAdminInfo(profileData).subscribe({
              next: (data) => {
                this.user = { ...data };
                this.personalInfoForm.patchValue({
                  farmerId: data.farmerId,
                  ...data.user,
                });
                Swal.fire(
                  'Success',
                  'Profile Successfully updated!',
                  'success'
                );
              },
              error: (err) => {
                Swal.fire(
                  'Failed to Update Profile!',
                  `Something went wrong.`,
                  'error'
                );
              },
            });
          }
        } else if (result.isDenied) {
          this.editProfileDetail = true;
        }
      });
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
        userId: localStorage.getItem('userId'),
        password: newPassword,
      };

      this.editPassword = false;
      Swal.fire({
        title: 'Are you sure you want to update your password?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText: 'cancel',
        confirmButtonText: 'Save changes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.farmerService.updateAdminInfo(passwordData).subscribe({
            next: (data) => {
              this.user = { ...data };
              this.passwordForm.reset();
              Swal.fire('Success', 'Password Successfully updated!', 'success');
            },
            error: (err) => {
              Swal.fire(
                'Failed to Update Password!',
                `Something went wrong.`,
                'error'
              );
            },
          });
        } else if (result.isDenied) {
          this.editPassword = true;
        }
      });
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

  verifyBtn: boolean = false;
  toggleVerifyActBtn = () => {
    this.verifyBtn = !this.verifyBtn;
  };

  verifyAccount = () => {
    if (this.validIdForm.valid) {
      this.verifyBtn = false;
      Swal.fire({
        title: 'Are you sure you want to update your valid id?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        denyButtonText: 'cancel',
        confirmButtonText: 'Save changes',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.selectedValidIdPictureImage) {
            this.farmerService
              .upload(this.selectedValidIdPictureImage)
              .forEach((data1) => {
                this.farmerService
                  .upload(this.selectedRecentPictureImage)
                  .forEach((data) => {
                    this.imagePreviewUrlValidIdPicture = `${data1.fileUri.concat(
                      data1.fileName
                    )}`;
                    this.imagePreviewUrlRecentPicture = `${data.fileUri.concat(
                      data.fileName
                    )}`;

                    const validIdData = {
                      userId: localStorage.getItem('userId'),
                      validIdType:
                        this.validIdForm.controls['validIdType'].getRawValue(),
                      validIdNumber:
                        this.validIdForm.controls[
                          'validIdNumber'
                        ].getRawValue(),
                      validIdPicture: this.imagePreviewUrlValidIdPicture,
                      recentPicture: this.imagePreviewUrlRecentPicture,
                    };

                    this.farmerService.updateAdminInfo(validIdData).subscribe({
                      next: (data) => {
                        this.user = { ...data };
                        this.validIdForm.reset();
                        Swal.fire(
                          'Success',
                          'Valid Id Successfully updated!',
                          'success'
                        );
                      },
                      error: (err) => {
                        Swal.fire(
                          'Failed to Update Valid Id!',
                          `Something went wrong.`,
                          'error'
                        );
                      },
                    });
                  });
              });
          }
        } else if (result.isDenied) {
          this.editPassword = true;
        }
      });
    } else {
      Object.keys(this.validIdForm.controls).forEach((field) => {
        const control = this.validIdForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  };
}
