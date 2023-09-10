import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPostAdvertisement } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PostAdvertisement } from '../../models/post-advertisement';
import { PostAdvertisementActionsSupplierSide } from '../../states/postadvertisement-state/postadvertisement.actions';
import { PostAdvertisementResponsesActions } from '../../states/postadvertisement-responses-state/postadvertisement-responses.actions';
import { selectPostAdvertisementResponses } from '../../states/postadvertisement-responses-state/postadvertisement-responses.selectors';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';
import { CropPaymentActions } from '../../states/crop-payment-state/crop-payment.actions';
import {
  selectCropPayment,
  selectCropPayments,
} from '../../states/crop-payment-state/crop-payment.selectors';
import { CropPayment } from '../../models/crop-payment';
import { selectSellCropDetailsByFarmerIdAndResponseId } from '../../states/sell-crop-details-state/sell-crop-details.selectors';
import { SellCropDetailsActions } from '../../states/sell-crop-details-state/sell-crop-details.actions';
import { SupplierService } from '../../services/supplier.service';
import { SellCropDetails } from '../../models/sell-crop-details';

@Component({
  selector: 'app-post-advertisement-response-list',
  templateUrl: './post-advertisement-response-list.component.html',
  styleUrls: ['./post-advertisement-response-list.component.scss'],
})
export class PostAdvertisementResponseListComponent implements OnInit {
  supplierId = localStorage.getItem('userNo') as any;
  selectedPostId!: number;
  selectedPostAdvertisement?: PostAdvertisement;
  postAdvertisementResponses: PostAdvertisementResponse[] = [];
  sellCropDetails: SellCropDetails[] = [];
  //selectors
  selectPostAdvertisementResponses$ = this.store.select(
    selectPostAdvertisementResponses()
  );

  selectSellCropDetailsByFarmerIdAndResponseId$ = (
    farmerId: number,
    postResponseId: number
  ) => {
    return this.store.select(
      selectSellCropDetailsByFarmerIdAndResponseId(farmerId, postResponseId)
    );
  };

  selectCropPayment$ = (responseId: number, supplierId: number) => {
    return this.store.select(selectCropPayment(responseId, supplierId));
  };

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.selectedPostId = data['postId'];

      this.store.dispatch({
        type: PostAdvertisementActionsSupplierSide.GET_POSTADVERTISEMENT,
        supplierId: localStorage.getItem('userNo'),
      });

      this.store.dispatch({
        type: PostAdvertisementResponsesActions.GET_POSTADVERTISEMENTRESPONSES,
        postId: data['postId'],
      });

      this.store
        .select(selectPostAdvertisement(this.selectedPostId))
        .subscribe((data) => {
          this.selectedPostAdvertisement = data;
        });

      this.store
        .select(selectPostAdvertisementResponses())
        .subscribe((data) => {
          this.postAdvertisementResponses = data;
        });
    });

    this.store.dispatch({
      type: CropPaymentActions.GET_CROPPAYMENT,
      supplierId: localStorage.getItem('userNo'),
    });

    this.store.dispatch({
      type: SellCropDetailsActions.GET_SELLCROPDETAILS,
    });
  }

  updateResponseIsAcceptedStatus(
    advertisementResponse: PostAdvertisementResponse
  ) {
    let supplier = this.selectedPostAdvertisement?.supplier?.user;
    let updatedAdvertisementResponse = {
      ...advertisementResponse,
      notificationMessage: '',
      notificationTitle: '',
      userId: advertisementResponse.farmer.user.userId,
    };
    updatedAdvertisementResponse.isAccepted =
      updatedAdvertisementResponse.isAccepted ? false : true;
    if (updatedAdvertisementResponse.isAccepted) {
      updatedAdvertisementResponse.notificationTitle = `Offer is Accepted`;
      updatedAdvertisementResponse.notificationMessage =
        `${supplier?.firstName} ${supplier?.middleName} ${supplier?.lastName} `.concat(
          `has accepted your offer in the ${this.selectedPostAdvertisement?.cropName} advertisement.`
        );
    } else {
      updatedAdvertisementResponse.notificationTitle = `Offer is Withdrawn`;
      updatedAdvertisementResponse.notificationMessage =
        `${supplier?.firstName} ${supplier?.middleName} ${supplier?.lastName}, `.concat(
          `has withdrawn from your offer in the ${this.selectedPostAdvertisement?.cropName} advertisement.`
        );
    }
    this.store.dispatch({
      type: PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES,
      postAdvertisementResponse: updatedAdvertisementResponse,
    });
  }

  navigateToOrderSummary(postAdvertisementResponse: PostAdvertisementResponse) {
    let selectedCropPayment = {};
    let supplierId = localStorage.getItem('userNo') as any;
    let responseId = postAdvertisementResponse.postResponseId;
    this.store
      .select(selectCropPayment(responseId, supplierId))
      .forEach((data) => {
        selectedCropPayment = data as CropPayment;
      });
    const obj: NavigationExtras = {
      state: { cropPayment: selectedCropPayment },
    };
    this._router.navigate(['/supplier/order-summary'], obj);
  }

  // Farmers socials accounts
  checkFbSocial(cropPayment: any) {
    return cropPayment?.farmer?.user?.socials.find((social: any) =>
      social.includes('facebook') ? true : false
    )
      ? true
      : false;
  }

  selectFbSocial(cropPayment: any) {
    return (
      (cropPayment?.farmer?.user?.socials.find((social: any) =>
        social.includes('facebook') ? true : false
      ) as string) || 'https://www.facebook.com/'
    );
  }

  checkIGSocial(cropPayment: any) {
    return cropPayment?.farmer?.user?.socials.find((social: any) =>
      social.includes('instagram') ? true : false
    )
      ? true
      : false;
  }

  selectIGSocial(cropPayment: any) {
    return (
      (cropPayment?.farmer?.user?.socials.find((social: any) =>
        social.includes('instagram') ? true : false
      ) as string) || 'https://www.instagram.com/'
    );
  }
}
