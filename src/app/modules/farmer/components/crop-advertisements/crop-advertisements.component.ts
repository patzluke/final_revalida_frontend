import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { selectPostAdvertisements } from '../../states/postadvertisement-state/postadvertisement.selectors';

@Component({
  selector: 'app-crop-advertisements',
  templateUrl: './crop-advertisements.component.html',
  styleUrls: ['./crop-advertisements.component.scss'],
})
export class CropAdvertisementsComponent implements OnInit {

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: PostAdvertisementActions.GET_POSTADVERTISEMENT,
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
  toggleDescription(post: any): void {
    post.showFullDescription = !post.showFullDescription;
  }
}
