import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierComplaint } from '../../models/suppliercomplaint';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SupplierService } from '../../services/supplier.service';
import { SupplierComplaintState } from '../../states/suppliercomplaint-state/suppliercomplaint.reducer';
import {
  selectSupplierComplaint,
  selectSupplierComplaints,
} from '../../states/suppliercomplaint-state/suppliercomplaint.selectors';
import { SupplierComplaintActions } from '../../states/suppliercomplaint-state/suppliercomplaint.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-complaint',
  templateUrl: './supplier-complaint.component.html',
  styleUrls: ['./supplier-complaint.component.scss'],
})
export class SupplierComplaintComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 8;
  complaintForm!: FormGroup;
  viewComplaintForm!: FormGroup;

  supplierComplaints: SupplierComplaint[] = [];

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

  imageUrl!: string | ArrayBuffer;
  selectedImage!: File;

  complaintTypes = [
    { type: 'Payment issue' },
    { type: 'Technical issue' },
    { type: 'Others' },
  ];

  //selectors
  selectSupplierComplaints$ = this.store.select(selectSupplierComplaints());

  constructor(
    private store: Store<SupplierComplaintState>,
    private _router: Router,
    private builder: FormBuilder,
    private http: HttpClient,
    private supplierService: SupplierService
  ) {
    this.complaintForm = builder.group({
      complaintTitle: ['', Validators.required],
      complaintType: ['', Validators.required],
      complaintMessage: ['', Validators.required],
      image: [],
      supplierId: [''],
    });

    this.viewComplaintForm = builder.group({
      complaintTitle: [{ value: '', disabled: true }],
      complaintType: [{ value: '', disabled: true }],
      complaintMessage: [{ value: '', disabled: true }],
      isResolved: [{ value: '', disabled: true }],

      image: [],
      supplierId: [''],
      adminReplyMessage: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: SupplierComplaintActions.GET_SINGLE_SUPPLIERCOMPLAINTS,
      supplierId: localStorage.getItem('userNo'),
    });

    this.selectSupplierComplaints$.subscribe((data) => {
      this.supplierComplaints = data;
      this.loading = false;
      console.log(this.supplierComplaints);
    });
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

  addSupplierComplaint() {
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
          this.supplierService.upload(this.selectedImage).subscribe({
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
            supplierId: localStorage.getItem('userNo') as any,
          };

          this.store.dispatch({
            type: SupplierComplaintActions.ADD_SUPPLIERCOMPLAINT,
            supplierComplaint: newComplaintFormValues,
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

  cancelComplaint(supplierComplaintId: any) {
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
          type: SupplierComplaintActions.UPDATE_SUPPLIERCOMPLAINT_STATUS,
          supplierComplaintId: supplierComplaintId,
        });
        Swal.fire('Saved!', 'Successfully deleted', 'success');
      }
    });
  }

  selectedSupplierComplaint?: SupplierComplaint;

  selectComplaint(complaintId: any) {
    this.store
      .select(selectSupplierComplaint(complaintId))
      .subscribe((data) => {
        this.selectedSupplierComplaint = data as SupplierComplaint;
        this.viewComplaintForm.patchValue({
          ...data,
          complaintTitle: data?.complaintTitle,
          complaintType: data?.complaintType,
          complaintMessage: data?.complaintMessage,
          supplierId: data?.supplierId,
          adminReplyMessage: data?.adminReplyMessage,
        });
      });
  }

  isViewComplaint: boolean = false;
  toggleViewComplaint = () => {
    this.isViewComplaint = !this.isViewComplaint;
  };
}
