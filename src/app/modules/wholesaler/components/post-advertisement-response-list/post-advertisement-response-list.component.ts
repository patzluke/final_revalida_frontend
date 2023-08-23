import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPostAdvertisement } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { ActivatedRoute } from '@angular/router';
import { PostAdvertisement } from '../../models/post-advertisement';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { PostAdvertisementResponsesActions } from '../../states/postadvertisement-responses-state/postadvertisement-responses.actions';
import { selectPostAdvertisementResponses } from '../../states/postadvertisement-responses-state/postadvertisement-responses.selectors';

@Component({
  selector: 'app-post-advertisement-response-list',
  templateUrl: './post-advertisement-response-list.component.html',
  styleUrls: ['./post-advertisement-response-list.component.scss'],
})
export class PostAdvertisementResponseListComponent implements OnInit {
  selectedPostId!: number;
  selectedPostAdvertisement?: PostAdvertisement;

  //selectors
  selectPostAdvertisementResponses$ = this.store.select(
    selectPostAdvertisementResponses()
  );

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
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
    });
  }
}