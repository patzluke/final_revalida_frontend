import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPostAdvertisement } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { ActivatedRoute } from '@angular/router';
import { PostAdvertisement } from '../../models/post-advertisement';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { PostAdvertisementResponsesActions } from '../../states/postadvertisement-responses-state/postadvertisement-responses.actions';
import { selectPostAdvertisementResponses } from '../../states/postadvertisement-responses-state/postadvertisement-responses.selectors';
import { PostAdvertisementResponse } from '../../models/post-advertisement-response';

@Component({
  selector: 'app-post-advertisement-response-list',
  templateUrl: './post-advertisement-response-list.component.html',
  styleUrls: ['./post-advertisement-response-list.component.scss'],
})
export class PostAdvertisementResponseListComponent implements OnInit {

  selectedPostId!: number;
  selectedPostAdvertisement?: PostAdvertisement;
  postAdvertisementResponses: PostAdvertisementResponse[] = [];
  //selectors
  selectPostAdvertisementResponses$ = this.store.select(
    selectPostAdvertisementResponses()
  );

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.selectedPostId = data['postId'];

      this.store.dispatch({
        type: PostAdvertisementActions.GET_POSTADVERTISEMENT,
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
  }

  updateResponseIsAcceptedStatus(
    advertisementResponse: PostAdvertisementResponse
  ) {
    let updatedAdvertisementResponse = { ...advertisementResponse };
    updatedAdvertisementResponse.isAccepted =
      updatedAdvertisementResponse.isAccepted ? false : true;
    this.store.dispatch({
      type: PostAdvertisementResponsesActions.UPDATE_POSTADVERTISEMENTRESPONSES,
      postAdvertisementResponse: updatedAdvertisementResponse,
    });
  }
}
