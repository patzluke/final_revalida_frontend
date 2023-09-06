import { Component, OnInit } from '@angular/core';
import { FarmingTipState } from '../../states/farmingtip-state/farmingtip.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaints } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { FileDetails } from 'src/app/modules/registration/models/fileDetails';
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

  complaintStatus = [
    { status: 'Resolved', value: true },
    { status: 'Not yet Resolved', value: false },
  ];

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

  selectedImage!: File;
  imagePreviewUrl!: string | ArrayBuffer;

  //image upload
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];
  onImageSelected = (event: any) => {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  selectFarmerComplaint(farmerComplaint: FarmerComplaint) {
    this.imagePreviewUrl = farmerComplaint.image!;
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
        this.selectedReadDate = data.find(
          (complaint) =>
            complaint.farmerComplaintId == farmerComplaint.farmerComplaintId
        )?.readDate;
      },
    });
  }

  isViewComplaint: boolean = false;
  toggleViewModal = () => {
    this.isViewComplaint = !this.isViewComplaint;
  };

  editFarmerComplaintSubmit() {
    if (this.addEditFarmerComplaintForm.valid) {
      this.isViewComplaint = false;
      let addEditFarmerComplaintFormValues =
        this.addEditFarmerComplaintForm.getRawValue();
      let updatedFarmerComplaint: FarmerComplaint = {
        farmerComplaintId: addEditFarmerComplaintFormValues.farmerComplaintId,
        adminReplyMessage: addEditFarmerComplaintFormValues.adminReplyMessage,
        isRead: addEditFarmerComplaintFormValues.isRead,
        isResolved: addEditFarmerComplaintFormValues.isResolved,
      };

      this.store.dispatch({
        type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT,
        farmerComplaint: updatedFarmerComplaint,
      });
    } else {
      Object.keys(this.addEditFarmerComplaintForm.controls).forEach((field) => {
        const control = this.addEditFarmerComplaintForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }
}
