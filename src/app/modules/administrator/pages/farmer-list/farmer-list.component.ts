import { Component, OnInit } from '@angular/core';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { FarmerActions } from '../../states/farmer-state/farmer.actions';
import { selectFarmers } from '../../states/farmer-state/farmer.selectors';
import { Farmer } from '../../models/farmer';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.scss'],
})
export class FarmerListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  farmers: Farmer[] = [];
  selectedReadDate: string | undefined = '';

  //Formgroups
  editFarmerForm: FormGroup;

  //selectors
  selectFarmers$ = this.store.select(selectFarmers());

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.editFarmerForm = fb.group({
      farmerComplaintId: [0, Validators.required],
      adminReplyMessage: ['', Validators.required],
      complaintMessage: ['', Validators.required],
      isRead: [false],
      isResolved: [false],
      readDate: [''],
      dateSubmitted: [''],
      farmer: [{}],
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: FarmerActions.GET_FARMER });
    this.selectFarmers$.subscribe({
      next: (data) => {
        this.farmers = data;
        this.loading = false;
      },
    });
  }

  selectFarmer(farmer: Farmer) {
    // let updatedFarmerComplaint = { ...farmer };
    // updatedFarmerComplaint.adminReplyMessage =
    //   updatedFarmerComplaint.adminReplyMessage != null
    //     ? updatedFarmerComplaint.adminReplyMessage
    //     : '';
    // updatedFarmerComplaint.isRead = true;
    // this.store.dispatch({
    //   type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS,
    //   farmerComplaint: updatedFarmerComplaint,
    // });
    // this.editFarmerForm.patchValue({ ...updatedFarmerComplaint });
    // this.editFarmerForm.get('complaintMessage')?.disable();
    // this.selectFarmerComplaints$.subscribe({
    //   next: (data) => {
    //     this.selectedReadDate = data.find(
    //       (complaint) =>
    //         complaint.farmerComplaintId == farmerComplaint.farmerComplaintId
    //     )?.readDate;
    //   },
    // });
  }

  editFarmerSubmit() {
    let addEditFarmerComplaintFormValues =
      this.editFarmerForm.getRawValue();
    let updatedFarmerComplaint: FarmerComplaint = {
      farmerComplaintId: addEditFarmerComplaintFormValues.farmerComplaintId,
      adminReplyMessage: addEditFarmerComplaintFormValues.adminReplyMessage,
      isRead: addEditFarmerComplaintFormValues.isRead,
    };

    this.store.dispatch({
      type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT,
      farmerComplaint: updatedFarmerComplaint,
    });
  }
}
