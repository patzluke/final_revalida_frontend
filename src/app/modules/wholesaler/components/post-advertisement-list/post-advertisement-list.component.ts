import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FarmingTip } from 'src/app/modules/administrator/models/farmingTip';
import { FarmerComplaintActions } from 'src/app/modules/administrator/states/farmercomplaint-state/farmercomplaint.actions';
import { FarmingTipActions } from 'src/app/modules/administrator/states/farmingtip-state/farmingtip.actions';
import { FarmingTipState } from 'src/app/modules/administrator/states/farmingtip-state/farmingtip.reducer';
import { FarmerComplaint } from 'src/app/modules/farmer/models/farmercomplaint';
import { selectFarmerComplaints } from 'src/app/modules/farmer/states/farmercomplaint-state/farmercomplaint.selectors';
import { PostAdvertisementActions } from '../../states/postadvertisement-state/postadvertisement.actions';
import { selectPostAdvertisements } from '../../states/postadvertisement-state/postadvertisement.selectors';
import { PostAdvertisement } from '../../models/post-advertisement';

@Component({
  selector: 'app-post-advertisement-list',
  templateUrl: './post-advertisement-list.component.html',
  styleUrls: ['./post-advertisement-list.component.scss'],
})
export class PostAdvertisementListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  postAdvertisements: PostAdvertisement[] = [];
  selectedReadDate: string | undefined = '';

  //Formgroups
  addEditFarmerComplaintForm: FormGroup;

  //selectors
  selectPostAdvertisements$ = this.store.select(selectPostAdvertisements());

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
    this.store.dispatch({
      type: PostAdvertisementActions.GET_POSTADVERTISEMENT,
      supplierId: localStorage.getItem('userNo'),
    });
    this.selectPostAdvertisements$.subscribe({
      next: (data) => {
        this.postAdvertisements = data;
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

  selectFarmerComplaint(farmerComplaint: FarmerComplaint) {}

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
