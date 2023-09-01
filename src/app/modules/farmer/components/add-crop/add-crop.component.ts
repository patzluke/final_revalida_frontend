import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { SellCropDetails } from '../../models/sell-crop-details';

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.scss']
})
export class AddCropComponent implements OnInit {

  addCropForm!: FormGroup
  inputLabel: string = '';
  inputPlaceholder: string = '';

  sellCropDetails: SellCropDetails[] = []

  constructor(private builder: FormBuilder) {
    this.addCropForm = this.builder.group({
      cropName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      mobileNumBankNumber: ['', Validators.required],
      paymentMode: ['', Validators.required]
    })
    this.addCropForm.get('paymentMode')?.valueChanges.subscribe(
      (value) => {
        if (value === 'GCASH') {
          this.inputLabel = 'GCash Number'
          this.inputPlaceholder = 'Enter your GCash Number'
        } else if (value === 'BANK') {
          this.inputLabel = 'Bank Number'
          this.inputPlaceholder = 'Enter your Bank Number'
        } else if (value === 'COD') {
          this.inputLabel = 'Pick Up Location'
          this.inputPlaceholder = 'Enter your Pickup Location'
        }
      }
    )
  }

  ngOnInit() {

  }

  faSave = faSave
  faCancel = faCancel
}
