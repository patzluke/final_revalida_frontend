import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FarmerComplaintState } from '../../states/farmercomplaint-state/farmercomplaint.reducer';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaints } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.scss'],
})
export class ComplaintStatusComponent implements OnInit {
  complaints: {
    complaintTicketId: string;
    complainedFor: string;
    reason: string;
    status: string;
  }[] = [
    {
      complaintTicketId: 'COMTIC0000000000001',
      complainedFor: 'IBIZA VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
    {
      complaintTicketId: 'COMTIC0000000000002',
      complainedFor: 'REYES VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'READ',
    },
    {
      complaintTicketId: 'COMTIC0000000000003',
      complainedFor: 'CRUZ VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
    {
      complaintTicketId: 'COMTIC0000000000004',
      complainedFor: 'PAMILIHANG BAYAN VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'READ',
    },
    {
      complaintTicketId: 'COMTIC0000000000005',
      complainedFor: 'ASTRERO FRUIT WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
    {
      complaintTicketId: 'COMTIC0000000000006',
      complainedFor: 'TIANGCO VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'READ',
    },
    {
      complaintTicketId: 'COMTIC0000000000007',
      complainedFor: 'BENNY VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },

    {
      complaintTicketId: 'COMTIC0000000000008',
      complainedFor: 'IBIZA VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
    {
      complaintTicketId: 'COMTIC0000000000009',
      complainedFor: 'REYES VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'READ',
    },
    {
      complaintTicketId: 'COMTIC0000000000010',
      complainedFor: 'CRUZ VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
    {
      complaintTicketId: 'COMTIC0000000000011',
      complainedFor: 'PAMILIHANG BAYAN VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'READ',
    },
    {
      complaintTicketId: 'COMTIC0000000000012',
      complainedFor: 'ASTRERO FRUIT WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
    {
      complaintTicketId: 'COMTIC0000000000013',
      complainedFor: 'TIANGCO VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'READ',
    },
    {
      complaintTicketId: 'COMTIC0000000000014',
      complainedFor: 'BENNY VEGETABLE WHOLESALER',
      reason: 'They have sent the wrong item',
      status: 'UNREAD',
    },
  ];

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
