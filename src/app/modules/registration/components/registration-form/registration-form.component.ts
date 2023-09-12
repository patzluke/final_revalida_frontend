import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { RegisterService } from '../../service/registration.service';
import { gsap } from 'gsap';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FileDetails } from 'src/app/modules/wholesaler/models/fileDetails';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  userType = [{ type: 'Farmer' }, { type: 'Supplier' }];
  genders = [{ gender: 'Male' }, { gender: 'Female' }];
  civilStatus = [
    { status: 'Married' },
    { status: 'Single' },
    { status: 'Divorced' },
    { status: 'Widowed' },
  ];
  personalInfoForm!: FormGroup;
  contactDetailsForm!: FormGroup;
  socialsFormArray!: FormArray;
  validIdForm!: FormGroup;

  activeIndex: number = 0;
  dateToday: Date = new Date();
  formattedContactNo: string = '+63';

  regions: Observable<any[]> = new Observable<any[]>();
  selectedRegion: any;
  provinces: Observable<any[]> = new Observable<any[]>();
  filteredProvinces: Observable<any[]> = new Observable<any[]>();
  selectedProvince: any;
  cities: Observable<any[]> = new Observable<any[]>();
  filteredCities: Observable<any[]> | null = new Observable<any[]>();
  selectedCity: any;
  barangays: Observable<any[]> = new Observable<any[]>();
  filteredBarangays: Observable<any[]> = new Observable<any[]>();
  selectedBarangay: any;
  address: string = '';

  facebookSelected: boolean = false;
  instagramSelected: boolean = false;
  facebookLink: string = 'Facebook: ';
  instagramLink: string = 'Instagram: ';
  socialLinksAdded: boolean = false;

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

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private elementRef: ElementRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement.querySelector('.logo');
    const letters = gsap.utils.toArray('.letter') as HTMLElement[];
    const tweens: any = {};

    element.addEventListener('mouseover', (event: MouseEvent) =>
      onMouseOver(event)
    );

    element.addEventListener('mouseleave', (event: MouseEvent) =>
      onMouseLeave(event)
    );

    letters.forEach((letter, index) => {
      tweens[index] = gsap.to(letter, {
        yPercent: -50,
        yoyo: true,
        repeat: 1,
        duration: 0.3,
        paused: true,
        ease: 'quart.out',
      });

      letter.dataset['tween'] = index.toString();
    });

    function onMouseOver(event: MouseEvent): void {
      const trg = event.target as HTMLElement;

      if (trg.dataset['tween']) {
        const tween = tweens[trg.dataset['tween']];
        console.log('targe', trg.dataset['tween']);

        if (!gsap.isTweening(trg)) {
          tween.play(0);
        }
      }
    }

    const onMouseLeave = (event: MouseEvent) => {
      const trg = event.target as HTMLElement;
      if (trg.dataset['tween']) {
        const tween = tweens[trg.dataset['tween']];
        console.log('targe', trg.dataset['tween']);

        if (!gsap.isTweening(trg)) {
          tween.pause(0);
        }
      }
    };

    this.personalInfoForm = this.formBuilder.group(
      {
        userType: ['', Validators.required],
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        birthdate: ['', [Validators.required, this.ageValidator]],
        gender: ['', Validators.required],
        nationality: ['', Validators.required],
        status: [''],
        dateCreated: [''],
        activeDeactive: [''],
        civilStatus: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.contactDetailsForm = this.formBuilder.group({
      region: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      barangay: ['', Validators.required],
      houseNo: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      socials: this.formBuilder.array([new FormControl()]),
    });

    this.socialsFormArray = this.contactDetailsForm.controls[
      'socials'
    ] as FormArray;

    this.validIdForm = this.formBuilder.group({
      validIdType: ['', Validators.required],
      validIdNumber: ['', Validators.required],
    });

    this.barangays = this.registerService.getBarangay();
    this.cities = this.registerService.getCities();
    this.provinces = this.registerService.getProvinces();
    this.regions = this.registerService.getRegions();
  }

  passwordMatchValidator = (
    group: FormGroup
  ): { [key: string]: any } | null => {
    const newPasswordControl = group.get('password');
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

  ngOnDestroy(): void {}

  populateProvince(): void {
    const selectedRegion: any = this.contactDetailsForm.get(`region`)?.value;
    const selectedRegionCode = selectedRegion ? selectedRegion.id : null;

    if (selectedRegionCode) {
      this.filteredProvinces = this.provinces.pipe(
        map((provinces: any[]) => {
          return provinces.filter(
            (province: any) => province.region_code === selectedRegionCode
          );
        })
      );
    } else {
      this.filteredProvinces = new Observable<any[]>();
    }

    console.log(this.filteredProvinces);
  }

  populateCities(): void {
    const selectedRegion: any = this.contactDetailsForm?.get(`region`)?.value;
    const selectedProvince: any =
      this.contactDetailsForm?.get(`province`)?.value;

    const selectedRegionCode = selectedRegion ? selectedRegion.id : null;
    const selectedProvinceCode = selectedProvince ? selectedProvince.id : null;

    if (selectedRegionCode && selectedProvinceCode) {
      this.filteredCities = this.cities.pipe(
        map((cities: any[]) => {
          return cities.filter((city: any) => {
            return (
              city.region_code === selectedRegionCode &&
              city.province_code === selectedProvinceCode
            );
          });
        })
      );
    } else {
      this.filteredCities = new Observable<any[]>();
    }
  }

  populateBarangays(): void {
    const selectedRegion: any = this.contactDetailsForm?.get(`region`)?.value;
    const selectedProvince: any =
      this.contactDetailsForm?.get(`province`)?.value;
    const selectedCity: any = this.contactDetailsForm?.get(`city`)?.value;
    const selectedRegionCode = selectedRegion ? selectedRegion.id : null;
    const selectedProvinceCode = selectedProvince ? selectedProvince.id : null;
    const selectedCityCode = selectedCity ? selectedCity.id : null;

    if (selectedRegionCode && selectedProvinceCode && selectedCityCode) {
      this.filteredBarangays = this.barangays.pipe(
        map((barangays: any[]) => {
          return barangays.filter((barangay: any) => {
            return (
              barangay.region_code === selectedRegionCode &&
              barangay.province_code === selectedProvinceCode &&
              barangay.city_code === selectedCityCode
            );
          });
        })
      );
    } else {
      this.filteredBarangays = new Observable<any[]>();
    }
  }

  addressValue = (): void => {
    const selectedregion: any = this.contactDetailsForm?.get('region')?.value;
    const selectedProvince: any =
      this.contactDetailsForm?.get('province')?.value;
    const selectedCity: any = this.contactDetailsForm?.get('city')?.value;
    const selectedBaranggay: any =
      this.contactDetailsForm?.get('barangay')?.value;

    this.address =
      this.contactDetailsForm.get('houseNo')?.value +
      ', ' +
      selectedBaranggay.name +
      ', ' +
      selectedCity.name +
      ', ' +
      selectedProvince.name +
      ', ' +
      selectedregion.name;

    this.contactDetailsForm.controls['address'].patchValue(this.address);
  };

  moveToContactDetailsTab(): void {
    if (this.personalInfoForm.valid) {
      this.activeIndex = 1;
    } else {
      Object.keys(this.personalInfoForm.controls).forEach((field) => {
        const control = this.personalInfoForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
    console.log(this.personalInfoForm.value, this.contactDetailsForm.value);
  }

  moveToValidIdTab(): void {
    if (this.contactDetailsForm.valid) {
      this.activeIndex = 2;
    } else {
      Object.keys(this.contactDetailsForm.controls).forEach((field) => {
        const control = this.contactDetailsForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }

  moveToReviewTab(): void {
    if (
      this.imagePreviewUrlRecentPicture == undefined ||
      this.imagePreviewUrlValidIdPicture == undefined
    ) {
      Swal.fire(
        'Failed',
        'Please upload your 2x2 picture and your valid id!',
        'error'
      );
      return;
    }

    if (
      this.validIdForm.valid &&
      this.imagePreviewUrlRecentPicture != undefined &&
      this.imagePreviewUrlValidIdPicture != undefined
    ) {
      this.activeIndex = 3;
    } else {
      Object.keys(this.validIdForm.controls).forEach((field) => {
        const control = this.validIdForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
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
    const birthdate = control.value;

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

  submit = () => {
    const signupData: any = {
      userType: this.personalInfoForm.controls['userType'].getRawValue(),
      username: this.personalInfoForm.controls['username'].getRawValue(),
      password: this.personalInfoForm.controls['password'].getRawValue(),
      firstName: this.personalInfoForm.controls['firstName'].getRawValue(),
      middleName: this.personalInfoForm.controls['middleName'].getRawValue(),
      lastName: this.personalInfoForm.controls['lastName'].getRawValue(),
      birthDate: this.personalInfoForm.controls['birthdate'].getRawValue(),
      gender: this.personalInfoForm.controls['gender'].getRawValue(),
      nationality: this.personalInfoForm.controls['nationality'].getRawValue(),
      civilStatus: this.personalInfoForm.controls['civilStatus'].getRawValue(),
      address: this.contactDetailsForm.controls['address'].getRawValue(),
      email: this.contactDetailsForm.controls['email'].getRawValue(),
      contactNo: this.contactDetailsForm.controls['contactNo'].getRawValue(),
      socials: this.contactDetailsForm.controls['socials'].getRawValue(),
      validIdType: this.validIdForm.controls['validIdType'].getRawValue(),
      validIdNumber: this.validIdForm.controls['validIdNumber'].getRawValue(),
      validIdPicture: '',
      recentPicture: '',
    };
    Swal.fire({
      title: 'Are you sure you want to register?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.registerService
          .upload(this.selectedValidIdPictureImage)
          .subscribe({
            next: (value) => {
              this.registerService
                .upload(this.selectedRecentPictureImage)
                .subscribe({
                  next: (value2) => {
                    signupData.validIdPicture = `${value.fileUri.concat(
                      value.fileName
                    )}`;
                    signupData.recentPicture = `${value2.fileUri.concat(
                      value2.fileName
                    )}`;
                    this.registerService.registerUser(signupData).subscribe({
                      next: (data) => {
                        Swal.fire(
                          'Success',
                          "You've Successfully registered. You may now sign in! Please Wait while we check your details for your account Verification!",
                          'success'
                        );
                        this._router.navigateByUrl('/login');
                      },
                      error: (err: HttpErrorResponse) => {
                        if (err.error.message == 'username already exists') {
                          Swal.fire(
                            'Failed to Register!',
                            `Username already exists!`,
                            'error'
                          );
                        } else if (
                          err.error.message == 'email already exists'
                        ) {
                          Swal.fire(
                            'Failed to Register!',
                            `Email already exists!`,
                            'error'
                          );
                        } else if (
                          err.error.message == 'mobile number already exists'
                        ) {
                          Swal.fire(
                            'Failed to Register!',
                            `Mobile number already exists!`,
                            'error'
                          );
                        } else {
                          Swal.fire(
                            'Failed to Register!',
                            `Something went wrong.`,
                            'error'
                          );
                        }
                      },
                    });
                  },
                  error: (err) => {
                    Swal.fire(
                      'Failed to Register!',
                      `Something went wrong.`,
                      'error'
                    );
                  },
                });
            },
            error: (e) => {
              Swal.fire(
                'Failed to Register!',
                `Something went wrong.`,
                'error'
              );
            },
          });
      }
    });
  };
}
