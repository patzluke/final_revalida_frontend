import { Component, OnInit } from '@angular/core';
import { FarmingTipState } from '../../states/farmingtip-state/farmingtip.reducer';
import { Store } from '@ngrx/store';
import { FarmingTipActions } from '../../states/farmingtip-state/farmingtip.actions';
import { FarmingTip } from '../../models/farmingTip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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

  addFarmingTipSubmit() {
    let addEditFarmingTipFormValues =
      this.addEditFarmerComplaintForm.getRawValue();
    let addFarmingTip: FarmingTip = {
      farmingTipId: addEditFarmingTipFormValues.farmingTipId,
      tipMessage: addEditFarmingTipFormValues.tipMessage,
    };
    this.store.dispatch({
      type: FarmingTipActions.ADD_FARMINGTIP,
      farmingTip: addFarmingTip,
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