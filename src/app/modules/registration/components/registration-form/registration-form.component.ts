import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AddressService } from '../../service/address.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  userType = [{ type: 'Farmer' }, { type: 'Supplier' }];
  genders = [{ gender: 'Male' }, { gender: 'Female' }];
  personalInfoForm!: FormGroup;
  contactDetailsForm!: FormGroup;
  socialsFormArray!: FormArray;

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

  socialType = [
    {
      type: 'Facebook: ',
    },
    {
      type: 'Instagram: ',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private elementRef: ElementRef
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

    this.personalInfoForm = this.formBuilder.group({
      userType: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      status: [''],
      dateCreated: [''],
      activeDeactive: [''],
    });

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

    this.barangays = this.addressService.getBarangay();
    this.cities = this.addressService.getCities();
    this.provinces = this.addressService.getProvinces();
    this.regions = this.addressService.getRegions();
  }

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
  }

  moveToReviewTab(): void {
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

  submit = () => {
    this.personalInfoForm.controls['status'].patchValue(true);
    this.personalInfoForm.controls['activeDeactive'].patchValue(true);
    this.personalInfoForm.controls['dateCreated'].patchValue(this.dateToday);

    const signupData = {
      usertType: this.personalInfoForm.controls['userType'].getRawValue(),
      username: this.personalInfoForm.controls['username'].getRawValue(),
      password: this.personalInfoForm.controls['password'].getRawValue(),
      firstName: this.personalInfoForm.controls['firstName'].getRawValue(),
      middleName: this.personalInfoForm.controls['middleName'].getRawValue(),
      lastName: this.personalInfoForm.controls['lastName'].getRawValue(),
      birthdate: this.personalInfoForm.controls['birthdate'].getRawValue(),
      gender: this.personalInfoForm.controls['gender'].getRawValue(),
      nationality: this.personalInfoForm.controls['nationality'].getRawValue(),
      status: this.personalInfoForm.controls['status'].getRawValue(),
      dateCreated: this.personalInfoForm.controls['dateCreated'].getRawValue(),
      activeDeactive:
        this.personalInfoForm.controls['activeDeactive'].getRawValue(),

      address: this.contactDetailsForm.controls['address'].getRawValue(),
      email: this.contactDetailsForm.controls['email'].getRawValue(),
      contactNo: this.contactDetailsForm.controls['contactNo'].getRawValue(),
      socials: this.contactDetailsForm.controls['socials'].getRawValue(),
    };

    console.log('signup data', signupData);
    // alert if succesfull r
  };
}
