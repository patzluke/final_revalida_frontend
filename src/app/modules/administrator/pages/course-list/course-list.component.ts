import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Course } from '../../models/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectFarmingTips } from '../../states/farmingtip-state/farmingtip.selectors';
import { FarmingTip } from '../../models/farmingTip';
import { Store } from '@ngrx/store';
import { FarmingTipActions } from '../../states/farmingtip-state/farmingtip.actions';
import { FileDetails } from 'src/app/modules/wholesaler/models/fileDetails';
import { AdminService } from '../../services/administrator.service';
import Swal from 'sweetalert2';
import { selectCourses } from '../../states/course-state/course.selectors';
import { CourseActions } from '../../states/course-state/course.actions';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  courses: Course[] = [];

  //Formgroups
  addEditFarmingTipForm: FormGroup;

  //selectors
  selectCourses$ = this.store.select(selectCourses());

  constructor(private store: Store, private fb: FormBuilder, private adminService: AdminService) {
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
    this.store.dispatch({ type: CourseActions.GET_COURSE });
    this.adminService.selectAllCourses().subscribe(data => { console.log(data);
    })
    this.selectCourses$.subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);

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
