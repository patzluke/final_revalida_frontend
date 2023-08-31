import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { FileDetails } from 'src/app/modules/wholesaler/models/fileDetails';
import Swal from 'sweetalert2';
import { Farmer } from '../../models/farmer';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier';

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

  user: Supplier = { user: undefined };
  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];

  //ElementRefs
  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private supplierService: SupplierService
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
    this.supplierService
      .findOneByUserId(localStorage.getItem('userId') as any)
      .subscribe((data) => {
        this.user = data;

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
      supplierId: this.user.supplierId,
      ...this.user.user,
      birthDate: new Date(this.user.user?.birthDate as string),
    });
    this.imagePreviewUrl = this.user.user?.image as string;
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

  onImageSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
      this.changeImage = true;
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
          if (this.selectedImage) {
            this.supplierService.upload(this.selectedImage).subscribe({
              next: (data) => {
                this.imagePreviewUrl = `${data.fileUri.concat(data.fileName)}`;
              },
              error: (err) => {
                Swal.fire(
                  'Failed to Change Picture!',
                  `Something went wrong.`,
                  'error'
                );
              },
            });
          }

          const profileData = {
            userId: this.personalInfoForm.controls['userId'].getRawValue(),
            farmerId: this.personalInfoForm.controls['farmerId'].getRawValue(),
            image: this.imagePreviewUrl,
            firstName:
              this.personalInfoForm.controls['firstName'].getRawValue(),
            middleName:
              this.personalInfoForm.controls['middleName'].getRawValue(),
            lastName: this.personalInfoForm.controls['lastName'].getRawValue(),
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

          this.supplierService.updateAdminInfo(profileData).subscribe({
            next: (data) => {
              this.user = { ...data };
              this.personalInfoForm.patchValue({
                supplierId: data.supplierId,
                ...data.user,
              });
              Swal.fire('Success', 'Profile Successfully updated!', 'success');
            },
            error: (err) => {
              Swal.fire(
                'Failed to Update Profile!',
                `Something went wrong.`,
                'error'
              );
            },
          });
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
          this.supplierService.updateAdminInfo(passwordData).subscribe({
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
          if (this.selectedImage) {
            this.supplierService.upload(this.selectedImage).subscribe({
              next: (data) => {
                this.imagePreviewUrl = `${data.fileUri.concat(data.fileName)}`;
              },
              error: (err) => {
                Swal.fire(
                  'Failed to Change Picture!',
                  `Something went wrong.`,
                  'error'
                );
              },
            });
          }

          const validIdData = {
            userId: localStorage.getItem('userId'),
            validIdType: this.validIdForm.controls['validIdType'].getRawValue(),
            validIdNumber:
              this.validIdForm.controls['validIdNumber'].getRawValue(),
            validIdPicture: this.imagePreviewUrl,
          };

          this.supplierService.updateAdminInfo(validIdData).subscribe({
            next: (data) => {
              this.user = { ...data };
              this.validIdForm.reset();
              Swal.fire('Success', 'Valid Id Successfully updated!', 'success');
            },
            error: (err) => {
              Swal.fire(
                'Failed to Update Valid Id!',
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
