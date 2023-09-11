import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostAdvertisement } from 'src/app/modules/farmer/models/post-advertisement';

import Swal from 'sweetalert2';
import { CropSpecialization } from '../../models/crop-specialization';
import { selectCropSpecializations } from '../../states/cropspecialization-state/cropspecialization.selectors';
import { CropSpecializationActions } from '../../states/cropspecialization-state/cropspecialization.actions';
import { selectPostAdvertisements } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss'],
})
export class AdvertisementsComponent implements OnInit {
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
  ];

  paymentOptions = [
    { label: 'UnionBank', value: 'UnionBank' },
    { label: 'Gcash', value: 'Gcash' },
  ];

  selectedSortingOption: string = '';

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());
  selectCropSpecializations$ = this.store.select(selectCropSpecializations());

  constructor(private store: Store, private fb: FormBuilder) {}

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

    this.selectCropSpecializations$.subscribe({
      next: (data) => {
        this.cropTypes = data;
      },
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

  addOfferSubmit() {}

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
