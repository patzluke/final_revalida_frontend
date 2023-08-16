import { Component, OnInit } from '@angular/core';
import { Customer, Representative } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { FarmingTipState } from '../../states/farmingtip-state/farmingtip.reducer';
import { Store } from '@ngrx/store';
import { FarmingTipActions } from '../../states/farmingtip-state/farmingtip.actions';
import { selectselectFarmingTips } from '../../states/farmingtip-state/farmingtip.selectors';
import { FarmingTip } from '../../models/farmingTip';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farming-tip',
  templateUrl: './farming-tip.component.html',
  styleUrls: ['./farming-tip.component.scss'],
})
export class FarmingTipComponent implements OnInit {
  customers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  farmingTips: FarmingTip[] = [];

  //Formgroups
  addEditFarmingTipForm: FormGroup;

  //selectors
  selectselectFarmingTips$ = this.store.select(selectselectFarmingTips());

  constructor(
    private customerService: CustomerService,
    private store: Store<FarmingTipState>,
    private fb: FormBuilder
  ) {
    this.addEditFarmingTipForm = fb.group({
      farmingTipId: [0, Validators.required],
      tipMessage: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: FarmingTipActions.GET_FARMINGTIPS });
    this.selectselectFarmingTips$.subscribe({
      next: (data) => {
        this.farmingTips = data;
      },
    });

    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(
        (customer) => (customer.date = new Date(<Date>customer.date))
      );
    });
  }

  addFarmingTipSubmit() {
    let addEditFarmingTipFormValues = this.addEditFarmingTipForm.getRawValue();
    let addFarmingTip: FarmingTip = {
      farmingTipId: addEditFarmingTipFormValues.farmingTipId,
      tipMessage: addEditFarmingTipFormValues.tipMessage,
    };
    console.log(addFarmingTip);

    this.store.dispatch({
      type: FarmingTipActions.ADD_FARMINGTIP,
      farmingTip: addFarmingTip,
    });
  }

  selectFarmingTip(farmingTip: FarmingTip) {
    this.addEditFarmingTipForm.patchValue({ ...farmingTip });
  }

  editFarmingTipSubmit() {
    let addEditFarmingTipFormValues = this.addEditFarmingTipForm.getRawValue();
    let updatedFarmingTip: FarmingTip = {
      farmingTipId: addEditFarmingTipFormValues.farmingTipId,
      tipMessage: addEditFarmingTipFormValues.tipMessage,
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
