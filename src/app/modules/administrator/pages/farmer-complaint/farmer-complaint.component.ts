import { Component, OnInit } from '@angular/core';
import { FarmingTipState } from '../../states/farmingtip-state/farmingtip.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaints } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
@Component({
  selector: 'app-farmer-complaint',
  templateUrl: './farmer-complaint.component.html',
  styleUrls: ['./farmer-complaint.component.scss'],
})
export class FarmerComplaintComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  farmerComplaints: FarmerComplaint[] = [];
  selectedReadDate: string | undefined = '';

  //Formgroups
  addEditFarmerComplaintForm: FormGroup;

  //selectors
  selectFarmerComplaints$ = this.store.select(selectFarmerComplaints());

  constructor(private store: Store<FarmingTipState>, private fb: FormBuilder) {
    this.addEditFarmerComplaintForm = fb.group({
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
    this.store.dispatch({ type: FarmerComplaintActions.GET_FARMERCOMPLAINTS });
    this.selectFarmerComplaints$.subscribe({
      next: (data) => {
        this.farmerComplaints = data;
        this.loading = false;
      },
    });
  }

  selectFarmerComplaint(farmerComplaint: FarmerComplaint) {
    let updatedFarmerComplaint = { ...farmerComplaint };
    updatedFarmerComplaint.adminReplyMessage =
      updatedFarmerComplaint.adminReplyMessage != null
        ? updatedFarmerComplaint.adminReplyMessage
        : '';
    updatedFarmerComplaint.isRead = true;
    this.store.dispatch({
      type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS,
      farmerComplaint: updatedFarmerComplaint,
    });
    this.addEditFarmerComplaintForm.patchValue({ ...updatedFarmerComplaint });
    this.addEditFarmerComplaintForm.get('complaintMessage')?.disable();
    this.selectFarmerComplaints$.subscribe({
      next: (data) => {
        this.selectedReadDate = data.find(complaint => complaint.farmerComplaintId == farmerComplaint.farmerComplaintId)?.readDate
      },
    });
  }

  editFarmerComplaintSubmit() {
    let addEditFarmerComplaintFormValues =
      this.addEditFarmerComplaintForm.getRawValue();
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
