import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FarmerComplaintState } from '../../states/farmercomplaint-state/farmercomplaint.reducer';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaints } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { Router } from '@angular/router';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.scss'],
})
export class ComplaintStatusComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 8; // Number of items to show per page

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  faCancel = faCancel

  farmerComplaints: FarmerComplaint[] = [];

  //selectores
  selectFarmerComplaints$ = this.store.select(selectFarmerComplaints());

  constructor(
    private store: Store<FarmerComplaintState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch({
      type: FarmerComplaintActions.GET_SINGLE_FARMERCOMPLAINTS,
      farmerId: 1,
    });

    this.selectFarmerComplaints$.subscribe((data) => {
      this.farmerComplaints = data;
    });
  }

  navigateToAddComplaint() {
    this._router.navigateByUrl('/farmer/complaints');
  }
}
