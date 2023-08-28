import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { selectPostAdvertisements } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { PostAdvertisement } from '../../models/post-advertisement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostAdvertisementResponsesActions } from '../../states/postadvertisement-responses-state/postadvertisement-responses.actions';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crop-advertisements',
  templateUrl: './crop-advertisements.component.html',
  styleUrls: ['./crop-advertisements.component.scss'],
})
export class CropAdvertisementsComponent implements OnInit {
  advertisements: PostAdvertisement[] = [];

  //formGroups
  addAdvertisementResponseForm: FormGroup;

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());

  constructor(private store: Store, private fb: FormBuilder) {
    this.addAdvertisementResponseForm = fb.group({
      postResponseId: [0, Validators.required],
      price: [0, Validators.required],
      quantity: [''],
      dateCreated: [''],
      dateModified: [''],
      message: [''],
      preferredPaymentMode: ['', Validators.required],

      measurement: [''],

      postId: [0],
      farmerId: [0],
    });
  }

  ngOnInit(): void {
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
  }

  currentPage: number = 1;
  itemsPerPage: number = 2; // Number of items to show per page

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

  selectAdvertisement(post: PostAdvertisement) {
    this.addAdvertisementResponseForm.get('postId')?.patchValue(post.postId);
  }

  addOfferSubmit() {
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
      title: 'Are you sure you want to edit your complaint?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: PostAdvertisementResponsesActions.ADD_POSTADVERTISEMENTRESPONSES,
          postAdvertisementResponse: newAdvertisementResponse,
        });
      }
    });
    this.addAdvertisementResponseForm.reset();
  }
}
