import { Observable } from 'rxjs';
import { addSingleFarmerComplaintState } from './../../states/farmercomplaint-state/farmercomplaint.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FarmerComplaintState } from '../../states/farmercomplaint-state/farmercomplaint.reducer';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import {
  selectFarmerComplaint,
  selectFarmerComplaints,
} from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { Router } from '@angular/router';
import {
  faSave,
  faCancel,
  faAdd,
  faEye,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { FarmerService } from '../../services/farmer.service';
import { Farmer } from '../../models/farmer';

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.scss'],
})
export class ComplaintStatusComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 8; // Number of items to show per page

  complaintForm!: FormGroup;
  viewComplaintForm!: FormGroup;

  farmerComplaints: FarmerComplaint[] = [];

  loading: boolean = true;

  startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  endIndex(): number {
    return this.startIndex() + this.itemsPerPage;
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  faCancel = faCancel;
  faAdd = faAdd;
  faEye = faEye;
  imageUrl!: string | ArrayBuffer;
  selectedImage!: File;

  complaintTypes = [
    { type: 'Payment issue' },
    { type: 'Technical issue' },
    { type: 'Others' },
  ];

  //selectors
  selectFarmerComplaints$ = this.store.select(selectFarmerComplaints());

  constructor(
    private store: Store<FarmerComplaintState>,
    private _router: Router,
    private builder: FormBuilder,
    private farmerService: FarmerService
  ) {
    this.complaintForm = builder.group({
      complaintTitle: ['', Validators.required],
      complaintType: ['', Validators.required],
      complaintMessage: ['', Validators.required],
      image: [],
      farmerId: [''],
    });

    this.viewComplaintForm = builder.group({
      complaintTitle: [{ value: '', disabled: true }],
      complaintType: [{ value: '', disabled: true }],
      complaintMessage: [{ value: '', disabled: true }],
      isResolved: [{ value: '', disabled: true }],

      image: [],
      farmerId: [''],
      adminReplyMessage: [{ value: '', disabled: true }],
    });
  }

  

  ngOnInit() {
    this.store.dispatch({
      type: FarmerComplaintActions.GET_SINGLE_FARMERCOMPLAINTS,
      farmerId: localStorage.getItem('userId'),
    });

    this.selectFarmerComplaints$.subscribe((data) => {
      this.farmerComplaints = data;
      this.loading = false;
      console.log(this.farmerComplaints);
    });

    
  }

  

  navigateToAddComplaint() {
    this._router.navigateByUrl('/farmer/complaints/add');
  }

  navigateToEditComplaint(farmerComplaintId: any) {
    this._router.navigateByUrl(`/farmer/complaints/edit/${farmerComplaintId}`);
  }

  onImageSelect(event: any): void {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }

  isAdd: boolean = false;

  toggleAddComplaint = () => {
    this.isAdd = !this.isAdd;
    this.imageUrl = '';
  };

  addFarmerComplaint() {
    if (this.complaintForm.valid) {
      this.isAdd = false;

      Swal.fire({
        title: 'Are you sure you want to file this complaint?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Submit compliant',
      }).then((result) => {
        if (result.isConfirmed) {
          this.farmerService.upload(this.selectedImage).subscribe({
            next: (data) => {
              this.imageUrl = `${data.fileUri.concat(data.fileName)}`;
            },
          });

          const newComplaintFormValues = {
            complaintTitle:
              this.complaintForm.controls['complaintTitle'].getRawValue(),
            complaintType:
              this.complaintForm.controls['complaintType'].getRawValue(),
            complaintMessage:
              this.complaintForm.controls['complaintMessage'].getRawValue(),
            complaintImage: this.imageUrl,
            farmerId: localStorage.getItem('userId') as any,
          };

          this.store.dispatch({
            type: FarmerComplaintActions.ADD_FARMERCOMPLAINT,
            farmerComplaint: newComplaintFormValues,
          });

          this.complaintForm.reset();
          this.imageUrl = '';
        } else if (result.isDenied) {
          this.isAdd = true;
        } else if (result.isDismissed) {
          this.complaintForm.reset();
          this.isAdd = false;
          this.imageUrl = '';
        }
      });
    } else {
      Object.keys(this.complaintForm.controls).forEach((field) => {
        const control = this.complaintForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
          control?.setErrors({ invalid: true });
        }
      });
    }
  }

  cancelComplaint(farmerComplaintId: any) {
    Swal.fire({
      title: 'Are you sure you want to cancel your complaint?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT_STATUS,
          farmerComplaintId: farmerComplaintId,
        });
        Swal.fire('Saved!', 'Successfully deleted', 'success');
      }
    });
  }

  selectedFarmerComplaint?: FarmerComplaint;

  selectComplaint(complaintId: any) {
    this.store.select(selectFarmerComplaint(complaintId)).subscribe((data) => {
      this.selectedFarmerComplaint = data as FarmerComplaint;
      this.viewComplaintForm.patchValue({
        ...data,
        complaintTitle: data?.complaintTitle,
        complaintType: data?.complaintType,
        complaintMessage: data?.complaintMessage,
        farmerId: data?.farmerId,
        adminReplyMessage: data?.adminReplyMessage,
      });
    });
  }

  isViewComplaint: boolean = false;
  toggleViewComplaint = () => {
    this.isViewComplaint = !this.isViewComplaint;
  };
}
