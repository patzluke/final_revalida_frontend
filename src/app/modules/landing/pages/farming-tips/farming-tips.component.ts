import { Component, OnInit } from '@angular/core';
import { FarmingTip } from '../../models/farming-tip';
import { Store } from '@ngrx/store';
import { selectFarmingTips } from '../../states/farmingtips-state/farmingtips.selectors';
import { FarmingTipsActions } from '../../states/farmingtips-state/farmingtips.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farming-tips',
  templateUrl: './farming-tips.component.html',
  styleUrls: ['./farming-tips.component.scss'],
})
export class FarmingTipsComponent implements OnInit {
  farmingTips: FarmingTip[] = [];
  filteredFarmingTips: FarmingTip[] = [];
  // selectors
  selectFarmingTips$ = this.store.select(selectFarmingTips());

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.store.dispatch({
      type: FarmingTipsActions.GET_FARMINGTIPS,
    });

    this.selectFarmingTips$.subscribe((data) => {
      data.map((tip) => {
        this.farmingTips.push(tip);
      });
    });

    this.filteredFarmingTips = this.farmingTips;
    //console.log(this.farmingTips);
  }

  currentPage: number = 1;
  itemsPerPage: number = 3;

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  viewTip = (tipId: number) => {
    this.router.navigate([`/farming-tips/view`], {
      queryParams: { tip: tipId },
    });
  };

  isSearchResultEmpty: boolean = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredFarmingTips = this.farmingTips.filter((tip) =>
      tip.title.toLowerCase().includes(filterValue)
    );

    this.isSearchResultEmpty = this.filteredFarmingTips.length === 0;
  }

  sortingOptions = [
    { label: 'Sort A-Z', value: 'asc' },
    { label: 'Sort Z-A', value: 'desc' },
    { label: 'Newest to Oldest', value: 'newest' },
    { label: 'Oldest to Newest', value: 'oldest' },
  ];
  selectedSortingOption: string = '';

  sortFarmingTips(): void {
    if (this.selectedSortingOption === 'asc') {
      this.filteredFarmingTips.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedSortingOption === 'desc') {
      this.filteredFarmingTips.sort((a, b) => b.title.localeCompare(a.title));
    } else if (this.selectedSortingOption === 'newest') {
      this.filteredFarmingTips.sort((a, b) => {
        const aDate = a.dateCreated ? new Date(a.dateCreated).getTime() : 0;
        const bDate = b.dateCreated ? new Date(b.dateCreated).getTime() : 0;
        return bDate - aDate;
      });
    } else if (this.selectedSortingOption === 'oldest') {
      this.filteredFarmingTips.sort((a, b) => {
        const aDate = a.dateCreated ? new Date(a.dateCreated).getTime() : 0;
        const bDate = b.dateCreated ? new Date(b.dateCreated).getTime() : 0;
        return aDate - bDate;
      });
    }
  }
}
