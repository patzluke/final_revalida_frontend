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
import { faL } from '@fortawesome/free-solid-svg-icons';

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
  ];

  measurementOptions = [
    { label: 'Kilograms (Kg)', value: 'kg' },
    { label: 'Tons (tn)', value: 'tn' },
  ];

  paymentOptions = [
    { label: 'UnionBank', value: 'UnionBank' },
    { label: 'Gcash', value: 'Gcash' },
  ];

  selectedSortingOption: string = '';

  //formGroups
  addAdvertisementResponseForm: FormGroup;

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());
  selectCropSpecializations$ = this.store.select(selectCropSpecializations());

  constructor(private store: Store, private fb: FormBuilder) {
    this.addAdvertisementResponseForm = fb.group({
      postResponseId: [0, Validators.required],
      price: [0, Validators.required],
      quantity: ['', Validators.required],
      dateCreated: [''],
      dateModified: [''],
      message: [''],
      preferredPaymentMode: ['', Validators.required],

      measurement: ['', Validators.required],

      postId: [0],
      farmerId: [0],
    });
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: CropSpecializationActions.GET_CROPSPECIALIZATION,
    });

    this.store.dispatch({
      type: PostAdvertisementActions.GET_POSTADVERTISEMENT,
    });

    this.selectPostAdvertisements$.subscribe((data) => {
      data.map((ads) => {
        if (this.advertisements.find((item) => item.postId == ads.postId)) {
          return;
        }
        this.advertisements.push({ ...ads, showFullDescription: false });
      });
    });

    this.selectCropSpecializations$.subscribe((data) => {
      data.map((specialization) => {
        this.cropTypes.push(specialization);
      });
    });

    console.log('post advertisements', this.advertisements);
    this.filteredAdvertisements = this.advertisements;
    console.log('crop types', this.cropTypes);
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
    this.addAdvertisementResponseForm.get('postId')?.patchValue(post.postId);
  }

  addOfferSubmit() {
    if (this.addAdvertisementResponseForm.valid) {
      let addAdvertisementResponseFormValues =
        this.addAdvertisementResponseForm.value;
      let newAdvertisementResponse: PostAdvertisementResponse = {
        price: addAdvertisementResponseFormValues.price,
        quantity: `${addAdvertisementResponseFormValues.quantity} ${addAdvertisementResponseFormValues.measurement}`,
        message: addAdvertisementResponseFormValues.message,
        preferredPaymentMode:
          addAdvertisementResponseFormValues.preferredPaymentMode,
        farmerId: localStorage.getItem('userNo') as any,
        postId: addAdvertisementResponseFormValues.postId,
      };

      Swal.fire({
        title: 'Are you sure you want to send this offer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Send offer',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch({
            type: PostAdvertisementResponsesActions.ADD_POSTADVERTISEMENTRESPONSES,
            postAdvertisementResponse: newAdvertisementResponse,
          });
        }
      });
      this.addAdvertisementResponseForm.reset();
      this.openDialog = false;
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
    }
  }
}
