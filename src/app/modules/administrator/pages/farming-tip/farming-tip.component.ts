import { Component, OnInit } from '@angular/core';
import { FarmingTipState } from '../../states/farmingtip-state/farmingtip.reducer';
import { Store } from '@ngrx/store';
import { FarmingTipActions } from '../../states/farmingtip-state/farmingtip.actions';
import { selectFarmingTips } from '../../states/farmingtip-state/farmingtip.selectors';
import { FarmingTip } from '../../models/farmingTip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/administrator.service';
import { FileDetails } from 'src/app/modules/registration/models/fileDetails';

@Component({
  selector: 'app-farming-tip',
  templateUrl: './farming-tip.component.html',
  styleUrls: ['./farming-tip.component.scss'],
})
export class FarmingTipComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  farmingTips: FarmingTip[] = [];

  //Formgroups
  addEditFarmingTipForm: FormGroup;

  //selectors
  selectselectFarmingTips$ = this.store.select(selectFarmingTips());

  constructor(private store: Store<FarmingTipState>, private fb: FormBuilder, private adminService: AdminService) {
    this.addEditFarmingTipForm = fb.group({
      farmingTipId: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      link: ['', Validators.required],
      dateCreated: [''],
      dateModified: [''],
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: FarmingTipActions.GET_FARMINGTIPS });
    this.selectselectFarmingTips$.subscribe({
      next: (data) => {
        this.farmingTips = data;
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

  addFarmingTipSubmit() {
    let addEditFarmingTipFormValues = this.addEditFarmingTipForm.getRawValue();
    console.log(addEditFarmingTipFormValues);

    let addFarmingTip: FarmingTip = {
      farmingTipId: addEditFarmingTipFormValues.farmingTipId,
      title: addEditFarmingTipFormValues.title,
      description: addEditFarmingTipFormValues.description,
      image: '',
      link: addEditFarmingTipFormValues.link,
    };
    this.adminService.upload(this.selectedImage).forEach(data => {
      addFarmingTip.image = `${data.fileUri.concat(data.fileName)}`;
    }).then(() => {
      this.store.dispatch({
        type: FarmingTipActions.ADD_FARMINGTIP,
        farmingTip: addFarmingTip,
      });
      Swal.fire('Success', 'Farming Tip Added!', 'success');
    }).catch(() => {
      Swal.fire(
        'Failed to Change Picture!',
        `Something went wrong.`,
        'error'
      );
    })
  }

  selectFarmingTip(farmingTip: FarmingTip) {
    this.imagePreviewUrl = farmingTip.image;
    this.addEditFarmingTipForm.patchValue({ ...farmingTip });
  }

  editFarmingTipSubmit() {
    let addEditFarmingTipFormValues = this.addEditFarmingTipForm.getRawValue();
    let updatedFarmingTip: FarmingTip = {
      farmingTipId: addEditFarmingTipFormValues.farmingTipId,
      title: addEditFarmingTipFormValues.title,
      description: addEditFarmingTipFormValues.description,
      image: addEditFarmingTipFormValues.image,
      link: addEditFarmingTipFormValues.link,
    };

    this.store.dispatch({
      type: FarmingTipActions.UPDATE_FARMINGTIP,
      farmingTip: updatedFarmingTip,
    });
  }

  deleteFarmingTip(farmingTip: FarmingTip) {
    Swal.fire({
      title: 'Delete Farming Tip?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch({
          type: FarmingTipActions.DELETE_FARMINGTIP,
          farmingTipId: farmingTip.farmingTipId,
        });
      }
    });
  }
}
