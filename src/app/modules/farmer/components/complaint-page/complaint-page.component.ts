import { Component, OnInit } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { FarmerComplaintState } from '../../states/farmercomplaint-state/farmercomplaint.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaint } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-page',
  templateUrl: './complaint-page.component.html',
  styleUrls: ['./complaint-page.component.scss'],
})
export class ComplaintPageComponent implements OnInit {
  faRightToBracket = faRightToBracket;

  addEditFarmerComplaintForm: FormGroup;
  selectedComplaint?: FarmerComplaint;
  isEdit = false;

  constructor(
    private store: Store<FarmerComplaintState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.addEditFarmerComplaintForm = fb.group({
      farmerComplaintId: [null],
      complaintTitle: ['', Validators.required],
      complaintMessage: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: FarmerComplaintActions.GET_SINGLE_FARMERCOMPLAINTS,
      farmerId: localStorage.getItem('userNo'),
    });

    this.activatedRoute.params.subscribe((id) => {
      if (Object.keys(id).length != 0) {
        this.isEdit = true;
        this.store
          .select(selectFarmerComplaint(id['farmerComplaintId'] as any))
          .subscribe({
            next: (data) => {
              this.selectedComplaint = data;
              this.addEditFarmerComplaintForm.patchValue({ ...data });
              console.log(this.addEditFarmerComplaintForm.getRawValue());
            },
          });
      }
    });
  }

  addEditFarmerComplaintSubmit() {
    let addEditFarmerComplaintFormValues =
      this.addEditFarmerComplaintForm.getRawValue();
    console.log(addEditFarmerComplaintFormValues);

    let addFarmerComplaint: FarmerComplaint = {
      farmerComplaintId: addEditFarmerComplaintFormValues.farmerComplaintId,
      complaintTitle: addEditFarmerComplaintFormValues.complaintTitle,
      complaintMessage: addEditFarmerComplaintFormValues.complaintMessage,
      farmerId: localStorage.getItem('userNo') as any,
    };
    if (this.isEdit) {
      Swal.fire({
        title: 'Are you sure you want to edit your complaint?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save changes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch({
            type: FarmerComplaintActions.UPDATE_SINGLE_FARMERCOMPLAINT,
            farmerComplaint: addFarmerComplaint,
          });
          this._router.navigateByUrl('/farmer/complaint-status');
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to submit a complaint?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save changes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch({
            type: FarmerComplaintActions.ADD_FARMERCOMPLAINT,
            farmerComplaint: addFarmerComplaint,
          });
          this._router.navigateByUrl('/farmer/complaint-status');
        }
      });
    }
  }
}
