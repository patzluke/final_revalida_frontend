import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectSuppliers } from '../../states/supplier-state/supplier.selectors';
import { Store } from '@ngrx/store';
import { SupplierActions } from '../../states/supplier-state/supplier.actions';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  suppliers: Supplier[] = [];
  selectedReadDate: string | undefined = '';

  //Formgroups
  editFarmerForm: FormGroup;

  //selectors
  selectSuppliers$ = this.store.select(selectSuppliers());

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
    this.store.dispatch({ type: SupplierActions.GET_SUPPLIER });
    this.selectSuppliers$.subscribe({
      next: (data) => {
        this.suppliers = data;
        this.loading = false;
      },
    });
  }

  selectFarmer(supplier: Supplier) {
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
    // let addEditFarmerComplaintFormValues =
    //   this.editFarmerForm.getRawValue();
    // let updatedFarmerComplaint: FarmerComplaint = {
    //   farmerComplaintId: addEditFarmerComplaintFormValues.farmerComplaintId,
    //   adminReplyMessage: addEditFarmerComplaintFormValues.adminReplyMessage,
    //   isRead: addEditFarmerComplaintFormValues.isRead,
    // };

    // this.store.dispatch({
    //   type: FarmerComplaintActions.UPDATE_FARMERCOMPLAINT,
    //   farmerComplaint: updatedFarmerComplaint,
    // });
  }
}
