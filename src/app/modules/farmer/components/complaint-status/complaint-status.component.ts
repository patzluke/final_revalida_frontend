import { addFarmerComplaintState } from './../../states/farmercomplaint-state/farmercomplaint.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FarmerComplaintState } from '../../states/farmercomplaint-state/farmercomplaint.reducer';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { selectFarmerComplaints } from '../../states/farmercomplaint-state/farmercomplaint.selectors';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { Router } from '@angular/router';
import { faSave, faCancel, faAdd, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.scss'],
})
export class ComplaintStatusComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 8; // Number of items to show per page

  complaintForm!: FormGroup

  farmerComplaints: FarmerComplaint[] = []

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


  imageUrl: string | ArrayBuffer | null = null;

  onImageSelect(event: any): void {

    const file = event.target.files[0];
    if (file) {
      // Read the file and generate a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addFarmerComplaint() {
    if (this.complaintForm.valid) {
      let complaintFormValues = this.complaintForm.value;
      let newComplaintFormValues: FarmerComplaint = {
        complaintTitle: complaintFormValues.complaintTitle,
        complaintMessage: complaintFormValues.complaintMessage,
        image: complaintFormValues.image,
        farmerId: localStorage.getItem('userId') as any
      }
      Swal.fire({
        title: 'Are you sure you want to file this complaint?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Send offer',
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.store.dispatch({
              type: FarmerComplaintActions.ADD_FARMERCOMPLAINT,
              addFarmerComplaint: newComplaintFormValues
            })
          }
        }
      )
      this.complaintForm.reset()
    }
  }

  //selectors
  selectFarmerComplaints$ = this.store.select(selectFarmerComplaints());

  constructor(
    private store: Store<FarmerComplaintState>,
    private _router: Router,
    private builder: FormBuilder
  ) {
    this.complaintForm = builder.group({
      complaintTitle: ['', Validators.required],
      complaintMessage: ['', Validators.required],
      image: [null],
      farmerId: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.store.dispatch({
      type: FarmerComplaintActions.GET_SINGLE_FARMERCOMPLAINTS,
      farmerId: localStorage.getItem('userNo'),
    });

    this.selectFarmerComplaints$.subscribe((data) => {
      this.farmerComplaints = data;
      this.loading = false
    });
  }

  navigateToAddComplaint() {
    this._router.navigateByUrl('/farmer/complaints/add');
  }

  navigateToEditComplaint(farmerComplaintId: any) {
    this._router.navigateByUrl(`/farmer/complaints/edit/${farmerComplaintId}`);
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
}
