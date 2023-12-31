import { Component, OnInit } from '@angular/core';
import { FarmingTipState } from '../../states/farmingtip-state/farmingtip.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaints } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { FileDetails } from 'src/app/modules/registration/models/fileDetails';
import { SupplierComplaint } from '../../models/supplierComplaint';
import {
  selectSupplierComplaint,
  selectSupplierComplaints,
} from '../../states/suppliercomplaint-state/suppliercomplaint.selectors';
import { SupplierComplaintActions } from '../../states/suppliercomplaint-state/suppliercomplaint.actions';
@Component({
  selector: 'app-farmer-complaint',
  templateUrl: './farmer-complaint.component.html',
  styleUrls: ['./farmer-complaint.component.scss'],
})
export class FarmerComplaintComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  farmerComplaints: FarmerComplaint[] = [];
  filteredFarmerComplaints: FarmerComplaint[] = [];

  selectedReadDate: string | undefined = '';

  supplierComplaints: SupplierComplaint[] = [];
  filteredSupplierComplaints: SupplierComplaint[] = [];

  //Formgroups
  addEditFarmerComplaintForm: FormGroup;
  editSupplierComplaintForm: FormGroup;

  //selectors
  selectFarmerComplaints$ = this.store.select(selectFarmerComplaints());
  selectSupplierComplaints$ = this.store.select(selectSupplierComplaints());

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
      isResolved: [false, Validators.required],
      readDate: [''],
      dateSubmitted: [''],
      farmer: [{}],
    });

    this.editSupplierComplaintForm = fb.group({
      supplierComplaintId: [0, Validators.required],
      adminReplyMessage: ['', Validators.required],
      complaintMessage: ['', Validators.required],
      isRead: [false],
      isResolved: [false, Validators.required],
      readDate: [''],
      dateSubmitted: [''],
      supplier: [{}],
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: FarmerComplaintActions.GET_FARMERCOMPLAINTS });
    this.store.dispatch({
      type: SupplierComplaintActions.GET_SUPPLIERCOMPLAINTS,
    });

    this.selectFarmerComplaints$.subscribe({
      next: (data) => {
        this.farmerComplaints = data;
        this.loading = false;
        this.filteredFarmerComplaints = this.farmerComplaints;
      },
    });

    this.selectSupplierComplaints$.subscribe({
      next: (data) => {
        this.supplierComplaints = data;
        this.loading = false;
        //console.log(this.supplierComplaints);
        this.filteredSupplierComplaints = this.supplierComplaints;
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

  isViewFarmerComplaint: boolean = false;
  toggleViewFarmerModal = () => {
    this.isViewFarmerComplaint = !this.isViewFarmerComplaint;
  };

  editFarmerComplaintSubmit() {
    if (this.addEditFarmerComplaintForm.valid) {
      this.isViewFarmerComplaint = false;
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

  selectedSortingOption: string = '';
  sortingOptions = [
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Not yet resolved', value: 'not resolved' },
  ];

  sortFarmerComplaints(): void {
    switch (this.selectedSortingOption) {
      case 'read':
        this.filteredFarmerComplaints = this.farmerComplaints.filter(
          (complaint) => complaint.isRead
        );
        break;
      case 'unread':
        this.filteredFarmerComplaints = this.farmerComplaints.filter(
          (complaint) => !complaint.isRead
        );
        break;
      case 'resolved':
        this.filteredFarmerComplaints = this.farmerComplaints.filter(
          (complaint) => complaint.isResolved
        );
        break;
      case 'not resolved':
        this.filteredFarmerComplaints = this.farmerComplaints.filter(
          (complaint) => !complaint.isResolved
        );
        break;
      default:
        this.filteredFarmerComplaints = this.farmerComplaints;
        break;
    }
  }

  // Supplier complaints
  selectSupplierComplaint(supplierComplaint: SupplierComplaint) {
    this.imagePreviewUrl = supplierComplaint.image!;
    let updatedSupplierComplaint = { ...supplierComplaint };
    updatedSupplierComplaint.adminReplyMessage =
      updatedSupplierComplaint.adminReplyMessage != null
        ? updatedSupplierComplaint.adminReplyMessage
        : '';
    updatedSupplierComplaint.isRead = true;
    this.store.dispatch({
      type: SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_STATUS,
      supplierComplaint: updatedSupplierComplaint,
    });
    this.editSupplierComplaintForm.patchValue({ ...updatedSupplierComplaint });
    this.editSupplierComplaintForm.get('complaintMessage')?.disable();
    this.selectSupplierComplaints$.subscribe({
      next: (data) => {
        this.selectedReadDate = data.find(
          (complaint) =>
            complaint.supplierComplaintId ==
            supplierComplaint.supplierComplaintId
        )?.readDate;
      },
    });
  }

  isViewSupplierComplaint: boolean = false;
  toggleViewSupplierModal = () => {
    this.isViewSupplierComplaint = !this.isViewSupplierComplaint;
  };

  editSupplierComplaintSubmit() {
    if (this.editSupplierComplaintForm.valid) {
      this.isViewSupplierComplaint = false;
      let editSupplierComplaintFormValues =
        this.editSupplierComplaintForm.getRawValue();
      let updatedSupplierComplaint: SupplierComplaint = {
        supplierComplaintId:
          editSupplierComplaintFormValues.supplierComplaintId,
        adminReplyMessage: editSupplierComplaintFormValues.adminReplyMessage,
        isRead: editSupplierComplaintFormValues.isRead,
        isResolved: editSupplierComplaintFormValues.isResolved,
      };

      this.store.dispatch({
        type: SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT,
        supplierComplaint: updatedSupplierComplaint,
      });
    } else {
      Object.keys(this.editSupplierComplaintForm.controls).forEach((field) => {
        const control = this.editSupplierComplaintForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }

  sortSupplierComplaints(): void {
    switch (this.selectedSortingOption) {
      case 'read':
        this.filteredSupplierComplaints = this.supplierComplaints.filter(
          (complaint) => complaint.isRead
        );
        break;
      case 'unread':
        this.filteredSupplierComplaints = this.supplierComplaints.filter(
          (complaint) => !complaint.isRead
        );
        break;
      case 'resolved':
        this.filteredSupplierComplaints = this.supplierComplaints.filter(
          (complaint) => complaint.isResolved
        );
        break;
      case 'not resolved':
        this.filteredSupplierComplaints = this.supplierComplaints.filter(
          (complaint) => !complaint.isResolved
        );
        break;
      default:
        this.filteredSupplierComplaints = this.supplierComplaints;
        break;
    }
  }
}
