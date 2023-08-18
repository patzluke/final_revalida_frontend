import { Component, OnInit } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { FarmerComplaintState } from '../../states/farmercomplaint-state/farmercomplaint.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';

@Component({
  selector: 'app-complaint-page',
  templateUrl: './complaint-page.component.html',
  styleUrls: ['./complaint-page.component.scss'],
})
export class ComplaintPageComponent implements OnInit {
  faRightToBracket = faRightToBracket;

  addEditFarmerComplaintForm: FormGroup;

  constructor(
    private store: Store<FarmerComplaintState>,
    private fb: FormBuilder
  ) {
    this.addEditFarmerComplaintForm = fb.group({
      farmerComplaintId: [0],
      complaintTitle: ['', Validators.required],
      complaintMessage: ['', Validators.required],
    });
  }

  ngOnInit() {}

  addFarmingTipSubmit() {
    let addEditFarmerComplaintFormValues =
      this.addEditFarmerComplaintForm.getRawValue();
    let addFarmerComplaint: FarmerComplaint = {
      complaintTitle: addEditFarmerComplaintFormValues.complaintTitle,
      complaintMessage: addEditFarmerComplaintFormValues.complaintMessage,
      farmerId: localStorage.getItem('userNo') as any,
    };
    console.log(addFarmerComplaint);

    this.store.dispatch({
      type: FarmerComplaintActions.ADD_FARMERCOMPLAINT,
      farmerComplaint: addFarmerComplaint,
    });
  }
}
