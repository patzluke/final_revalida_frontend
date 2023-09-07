import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FarmerComplaint } from '../../models/farmercomplaint';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmerComplaintActions } from '../../states/farmercomplaint-state/farmercomplaint.actions';
import { FarmerActions } from '../../states/farmer-state/farmer.actions';
import { Farmer } from '../../models/farmer';
import {
  selectFarmersNotValidated,
  selectFarmersValidated,
} from '../../states/farmer-state/farmer.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.scss'],
})
export class FarmerListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  farmers: Farmer[] = [];
  verifiedFarmers: Farmer[] = [];

  selectedReadDate: string | undefined = '';
  selectedFarmerToVerify?: Farmer;

  //Formgroups
  editFarmerForm: FormGroup;

  //selectors
  selectFarmersValidated$ = this.store.select(selectFarmersValidated());
  selectFarmersNotValidated$ = this.store.select(selectFarmersNotValidated());

  //ElementRefs
  @ViewChild('verifyFarmerClose') modalElement!: ElementRef;

  constructor(private store: Store, private fb: FormBuilder) {
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
    this.store.dispatch({ type: FarmerActions.GET_FARMER });
    this.selectFarmersValidated$.subscribe({
      next: (data) => {
        this.farmers = data;
        this.loading = false;
        console.log(data);
      },
    });

    this.selectFarmersValidated$.subscribe({
      next: (data) => {
        this.verifiedFarmers = data;
        this.loading = false;
        console.log(data);
      },
    });
  }

  selectFarmer(farmer: Farmer) {
    this.selectedFarmerToVerify = farmer;
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
    let addEditFarmerComplaintFormValues = this.editFarmerForm.getRawValue();
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

  selectFarmerToVerify(farmer: Farmer) {
    this.selectedFarmerToVerify = farmer;
  }

  isViewToggle: boolean = false;
  toggleViewModal = () => {
    this.isViewToggle = !this.isViewToggle;
  };

  isVerfiyToggle: boolean = false;
  toggleVerifyModal = () => {
    this.isVerfiyToggle = !this.isVerfiyToggle;
  };

  verifyAccount() {
    this.isVerfiyToggle = false;
    Swal.fire({
      title: 'Verify Account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedUser = { ...this.selectedFarmerToVerify?.user };
        updatedUser.isValidated = true;
        let updatedFarmerToVerify: Farmer = {
          ...this.selectedFarmerToVerify,
          user: updatedUser,
        };
        this.store.dispatch({
          type: FarmerActions.UPDATE_FARMER_STATUS,
          farmer: updatedFarmerToVerify,
        });
        const nativeModal = this.modalElement.nativeElement;
        nativeModal.click();
        Swal.fire('Success', 'Account Successfully Verified!', 'success');
      }
    });
  }

  refuseSubmittedId() {
    this.isVerfiyToggle = false;
    Swal.fire({
      title: 'Ask Farmer to re-Submit a valid ID?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedUser = { ...this.selectedFarmerToVerify?.user };
        updatedUser.isValidated = false;
        updatedUser.validIdPicture = '';
        updatedUser.validIdNumber = '';
        updatedUser.validIdType = '';
        let updatedFarmerToVerify: Farmer = {
          ...this.selectedFarmerToVerify,
          user: updatedUser,
        };
        this.store.dispatch({
          type: FarmerActions.UPDATE_FARMER_STATUS,
          farmer: updatedFarmerToVerify,
        });
        const nativeModal = this.modalElement.nativeElement;
        nativeModal.click();
        Swal.fire('Success', 'Message sent to Farmer', 'success');
      }
    });
  }
  active?: boolean;

  activeStatusLabel: string = 'Active'

  toggleActiveSwitch() {
    if (this.activeStatusLabel === 'Active') {
      this.activeStatusLabel = 'Deactive';
    } else if (this.activeStatusLabel === 'Deactive') {
      this.activeStatusLabel = 'Active';
    }
  }
}
