import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  selectSuppliersNotValidated,
  selectSuppliersValidated,
} from '../../states/supplier-state/supplier.selectors';
import { Store } from '@ngrx/store';
import { SupplierActions } from '../../states/supplier-state/supplier.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
  statuses!: any[];

  loading: boolean = true;

  suppliers: Supplier[] = [];

  selectedReadDate: string | undefined = '';
  selectedSupplierToVerify?: Supplier;

  //Formgroups

  //selectors
  selectSuppliersValidated$ = this.store.select(selectSuppliersValidated());
  selectSuppliersNotValidated$ = this.store.select(
    selectSuppliersNotValidated()
  );

  //ElementRefs
  @ViewChild('verifySupplierClose') modalElement!: ElementRef;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch({ type: SupplierActions.GET_SUPPLIER });
    this.selectSuppliersValidated$.subscribe({
      next: (data) => {
        console.log(data);

        this.loading = false;
      },
    });
  }

  selectSupplierToVerify(supplier: Supplier) {
    this.selectedSupplierToVerify = supplier;
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
        let updatedUser = { ...this.selectedSupplierToVerify?.user };
        updatedUser.isValidated = true;
        let updatedSupplierToVerify: Supplier = {
          ...this.selectedSupplierToVerify,
          user: updatedUser,
        };
        this.store.dispatch({
          type: SupplierActions.UPDATE_SUPPLIER_STATUS,
          supplier: updatedSupplierToVerify,
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
      title: 'Ask Supplier to re-Submit a valid ID?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save changes',
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedUser = { ...this.selectedSupplierToVerify?.user };
        updatedUser.isValidated = false;
        updatedUser.validIdPicture = '';
        updatedUser.validIdNumber = '';
        updatedUser.validIdType = '';
        let updatedSupplierToVerify: Supplier = {
          ...this.selectedSupplierToVerify,
          user: updatedUser,
        };
        this.store.dispatch({
          type: SupplierActions.UPDATE_SUPPLIER_STATUS,
          supplier: updatedSupplierToVerify,
        });
        const nativeModal = this.modalElement.nativeElement;
        nativeModal.click();
        Swal.fire('Success', 'Message sent to Supplier', 'success');
      }
    });
  }

  active?: boolean;

  activeStatusLabel: string = 'Active'

  toggleActiveSwitch(){
    if (this.activeStatusLabel === 'Active') {
      this.activeStatusLabel = 'Deactive';
    } else if (this.activeStatusLabel === 'Deactive') {
      this.activeStatusLabel = 'Active';
    }
  }
}
