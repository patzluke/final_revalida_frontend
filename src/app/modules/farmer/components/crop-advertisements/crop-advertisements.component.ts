import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { selectPostAdvertisements } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { PostAdvertisement } from '../../models/post-advertisement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostAdvertisementResponsesActions } from '../../states/postadvertisement-responses-state/postadvertisement-responses.actions';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import Swal from 'sweetalert2';
import { selectCropSpecializations } from '../../states/cropspecialization-state/cropspecialization.selectors';
import { CropSpecializationActions } from '../../states/cropspecialization-state/cropspecialization.actions';
import { CropSpecialization } from '../../models/crop-specialization';
import { selectPostAdvertisementResponseByPostId } from '../../states/postadvertisement-responses-state/postadvertisement-responses.selectors';
import { Observable } from 'rxjs';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import { selectCropPaymentByFarmerIdAndPostResponseId } from '../../states/crop-payment-state/crop-payment.selectors';

@Component({
  selector: 'app-crop-advertisements',
  templateUrl: './crop-advertisements.component.html',
  styleUrls: ['./crop-advertisements.component.scss'],
})
export class CropAdvertisementsComponent implements OnInit {
  advertisements: PostAdvertisement[] = [];
  cropTypes: CropSpecialization[] = [];
  selectedCropTypes: CropSpecialization[] = [];

  sortingOptions = [
    { label: 'Sort A-Z', value: 'asc' },
    { label: 'Sort Z-A', value: 'desc' },
    { label: 'Newest to Oldest', value: 'newest' },
    { label: 'Oldest to Newest', value: 'oldest' },
  ];

  measurementOptions = [
    { label: 'Kilograms (Kg)', value: 'kg' },
    { label: 'Tons (tn)', value: 'tn' },
    { label: 'Milliliter (ml)', value: 'ml' },
  ];

  paymentOptions = [
    { label: 'UnionBank', value: 'UnionBank' },
    { label: 'Gcash', value: 'Gcash' },
  ];

  selectedSortingOption: string = '';

  //formGroups
  addAdvertisementResponseForm: FormGroup;
  finalOfferForm: FormGroup;

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());
  selectCropSpecializations$ = this.store.select(selectCropSpecializations());
  selectPostAdvertisementResponse$ = (post: PostAdvertisement) => {
    return this.store.select(
      selectPostAdvertisementResponseByPostId(
        post.postId as number,
        localStorage.getItem('userNo') as any
      )
    );
  };

  selectPostAdvertisementResponseByPostId$ = (postId: number) => {
    return this.store.select(
      selectPostAdvertisementResponseByPostId(
        postId,
        localStorage.getItem('userNo') as any
      )
    );
  };

  constructor(private store: Store, private fb: FormBuilder) {
    this.addAdvertisementResponseForm = fb.group({
      postResponseId: [''],
      cropName: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      dateCreated: [''],
      dateModified: [''],
      message: [''],
      preferredPaymentMode: ['', Validators.required],

      measurement: ['', Validators.required],

      userId: [0],
      postId: [0],
      farmerId: [0],
    });

    this.finalOfferForm = fb.group({
      //sell_crop_details table fields
      sellId: [''],
      cropName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      measurement: ['', Validators.required],
      mobilenumBanknumber: ['', Validators.required],
      paymentMode: ['', Validators.required],
      postResponseId: [0, Validators.required],
      farmerId: [0, Validators.required],

      //crop_orders table fields
      supplierId: [0, Validators.required],
      address: ['', Validators.required],

      isAccepted: [''],
    });
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      farmerId: localStorage.getItem('userNo'),
    });

    this.store.dispatch({
      type: CropSpecializationActions.GET_CROPSPECIALIZATION,
    });

    this.store.dispatch({
      type: PostAdvertisementActions.GET_POSTADVERTISEMENT,
    });

    this.store.dispatch({
      type: PostAdvertisementResponsesActions.GET_POSTADVERTISEMENTRESPONSES,
      farmerId: localStorage.getItem('userNo'),
    });

    this.selectPostAdvertisements$.subscribe((data) => {
      data.map((ads) => {
        if (this.advertisements.find((item) => item.postId == ads.postId)) {
          return;
        }
        this.advertisements.push({ ...ads, showFullDescription: false });
      });
    });

    this.selectCropSpecializations$.subscribe({
      next: (data) => {
        this.cropTypes = data;
      },
    });

    // console.log('post advertisements', this.advertisements);
    // console.log('crop types', this.cropTypes);
    this.filteredAdvertisements = this.advertisements;
  }

  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items to show per page

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  // Toggle description visibility
  toggleDescription(post: PostAdvertisement): void {
    this.advertisements = this.advertisements.map((ads) => {
      if (ads.postId == post.postId) {
        ads.showFullDescription = !ads.showFullDescription;
      }
      return ads;
    });
  }

  openDialog: boolean = false;
  toggleDialog = () => {
    this.openDialog = !this.openDialog;
  };

  selectAdvertisement(post: PostAdvertisement) {
    this.addAdvertisementResponseForm
      .get('cropName')
      ?.patchValue(post.cropName);
    this.addAdvertisementResponseForm.get('postId')?.patchValue(post.postId);
    this.addAdvertisementResponseForm
      .get('userId')
      ?.patchValue(post.supplier?.user.userId);
  }

  addOfferSubmit() {
    if (this.addAdvertisementResponseForm.valid) {
      let addAdvertisementResponseFormValues =
        this.addAdvertisementResponseForm.value;
      let newAdvertisementResponse = {
        price: addAdvertisementResponseFormValues.price,
        quantity: `${addAdvertisementResponseFormValues.quantity} ${addAdvertisementResponseFormValues.measurement}`,
        message: addAdvertisementResponseFormValues.message,
        preferredPaymentMode:
          addAdvertisementResponseFormValues.preferredPaymentMode,
        farmerId: localStorage.getItem('userNo') as any,
        postId: addAdvertisementResponseFormValues.postId,
        userId: addAdvertisementResponseFormValues.userId,
        cropName: addAdvertisementResponseFormValues.cropName,
      };

      this.openDialog = false;
      Swal.fire({
        title: 'Are you sure you want to send this offer?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        confirmButtonText: 'Send offer',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch({
            type: PostAdvertisementResponsesActions.ADD_POSTADVERTISEMENTRESPONSES,
            postAdvertisementResponse: newAdvertisementResponse,
          });
          this.addAdvertisementResponseForm.reset();
        } else if (result.isDenied) {
          this.openDialog = true;
        } else if (result.isDismissed) {
          this.addAdvertisementResponseForm.reset();
          this.openDialog = false;
        }
      });
    } else {
      Object.keys(this.addAdvertisementResponseForm.controls).forEach(
        (field) => {
          const control = this.addAdvertisementResponseForm.get(field);
          if (control?.invalid) {
            control.markAsTouched();
            control?.setErrors({ invalid: true });
          }
        }
      );
    }
  }

  // search
  isSearchResultEmpty: boolean = false;
  filteredAdvertisements: PostAdvertisement[] = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredAdvertisements = this.advertisements.filter((ad) =>
      ad.cropName.toLowerCase().includes(filterValue)
    );

    this.isSearchResultEmpty = this.filteredAdvertisements.length === 0;
  }

  filterAdvertisementsByType(): void {
    if (this.selectedCropTypes.length === 0) {
      this.filteredAdvertisements = this.advertisements;
    } else {
      this.filteredAdvertisements = this.advertisements.filter((ad) => {
        const adCropSpecializationId =
          ad.cropSpecialization?.cropSpecializationId;
        return this.selectedCropTypes.some(
          (selectedCrop) =>
            selectedCrop.cropSpecializationId === adCropSpecializationId
        );
      });
    }
  }

  sortAdvertisements(): void {
    if (this.selectedSortingOption === 'asc') {
      this.filteredAdvertisements.sort((a, b) =>
        a.cropName.localeCompare(b.cropName)
      );
    } else if (this.selectedSortingOption === 'desc') {
      this.filteredAdvertisements.sort((a, b) =>
        b.cropName.localeCompare(a.cropName)
      );
    } else if (this.selectedSortingOption === 'newest') {
      this.filteredAdvertisements.sort((a, b) => {
        const aDate = a.datePosted ? new Date(a.datePosted).getTime() : 0;
        const bDate = b.datePosted ? new Date(b.datePosted).getTime() : 0;
        return bDate - aDate;
      });
    } else if (this.selectedSortingOption === 'oldest') {
      this.filteredAdvertisements.sort((a, b) => {
        const aDate = a.datePosted ? new Date(a.datePosted).getTime() : 0;
        const bDate = b.datePosted ? new Date(b.datePosted).getTime() : 0;
        return aDate - bDate;
      });
    }
  }

  hasOffer: boolean = true;
  openViewOfferDialog: boolean = false;
  editFinalOffer: boolean = false;

  postAdvertisementResponse?: PostAdvertisementResponse;
  toggleViewOffer = (
    postAdvertisementResponse: Observable<PostAdvertisementResponse | undefined>
  ) => {
    postAdvertisementResponse.forEach((data) => {
      this.store
        .select(
          selectCropPaymentByFarmerIdAndPostResponseId(
            data?.farmer?.farmerId as number,
            data?.postResponseId as number
          )
        )
        .forEach((data) => {
          this.finalOfferForm.patchValue({
            mobilenumBanknumber:
              data?.cropOrder.sellCropDetail.mobilenumBanknumber,
          });
        });
      this.postAdvertisementResponse = data as PostAdvertisementResponse;
      this.finalOfferForm.patchValue({
        cropName: data?.postAdvertisement?.cropName,
        price: data?.price,
        quantity: data?.quantity.split(' ')[0],
        measurement: data?.quantity.split(' ')[1],
        paymentMode: data?.preferredPaymentMode,
        farmerId: localStorage.getItem('userNo'),
        supplierId: data?.postAdvertisement?.supplier?.supplierId,
        address: data?.postAdvertisement?.supplier?.user.address,
        isAccepted: data?.isAccepted,
        postResponseId: data?.postResponseId,
      });
      if (!data?.isAccepted || data?.isFinalOfferSubmitted) {
        this.finalOfferForm.controls['mobilenumBanknumber'].disable();
      }
    });
    this.finalOfferForm.controls['cropName'].disable();
    this.openViewOfferDialog = !this.openViewOfferDialog;
  };

  toggleEditFinalOffer = () => {
    this.editFinalOffer = !this.editFinalOffer;
  };

  submitFinalOffer = () => {
    if (this.finalOfferForm.valid) {
      this.finalOfferForm.controls['cropName'].enable();
      let finalOfferValues = this.finalOfferForm.value;
      finalOfferValues.quantity = this.finalOfferForm.value.quantity.concat(
        ' ',
        this.finalOfferForm.value.measurement
      );
      console.log(finalOfferValues, ' tingin');

      this.openViewOfferDialog = false;
      Swal.fire({
        title: 'Are you sure you want to send your final offer?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#d33',
        confirmButtonText: 'Send Final offer',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch({
            type: CropPaymentActions.ADD_CROPPAYMENT,
            cropPayment: finalOfferValues,
          });
        } else if (result.isDenied) {
          this.finalOfferForm.controls['cropName'].disable();
          this.openViewOfferDialog = true;
        } else if (result.isDismissed) {
          this.addAdvertisementResponseForm.reset();
          this.openViewOfferDialog = false;
        }
      });
      //redirect to products page
    } else {
      Object.keys(this.finalOfferForm.controls).forEach((field) => {
        const control = this.finalOfferForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  };

  checkFbSocial(post: PostAdvertisement) {
    return post?.supplier?.user?.socials.find((social) =>
      social.includes('facebook') ? true : false
    )
      ? true
      : false;
  }

  selectFbSocial(post: PostAdvertisement) {
    return (
      (post?.supplier?.user?.socials.find((social) =>
        social.includes('facebook') ? true : false
      ) as string) || 'https://www.facebook.com/'
    );
  }

  checkIGSocial(post: PostAdvertisement) {
    return post?.supplier?.user?.socials.find((social) =>
      social.includes('instagram') ? true : false
    )
      ? true
      : false;
  }

  selectIGSocial(post: PostAdvertisement) {
    return (
      (post?.supplier?.user?.socials.find((social) =>
        social.includes('instagram') ? true : false
      ) as string) || 'https://www.instagram.com/'
    );
  }
}
