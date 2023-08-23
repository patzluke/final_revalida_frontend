import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPostAdvertisement } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { ActivatedRoute } from '@angular/router';
import { PostAdvertisement } from '../../models/post-advertisement';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';

@Component({
  selector: 'app-post-advertisement-response-list',
  templateUrl: './post-advertisement-response-list.component.html',
  styleUrls: ['./post-advertisement-response-list.component.scss'],
})
export class PostAdvertisementResponseListComponent implements OnInit {
  selectedPostId!: number;
  selectedPostAdvertisement?: PostAdvertisement;
  //selectors


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
      this.store.select(selectPostAdvertisement(this.selectedPostId)).subscribe(data => {
        this.selectedPostAdvertisement = data;
        console.log(this.selectedPostAdvertisement, data);

      })
    });
  }
}
