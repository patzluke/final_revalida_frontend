import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/administrator.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  date: Date[] | undefined;
  validatedFarmersCount: number = 0;
  notValidatedFarmersCount: number = 0;
  validatedSuppleirsCount: number = 0;
  notValidatedSuppleirsCount: number = 0;

  farmerComplaintsCount: number = 0;
  supplierComplaintsCount: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.countValidatedFarmers().subscribe((data) => {
      this.validatedFarmersCount = data;
    });

    this.adminService.countNotValidatedFarmers().subscribe((data) => {
      this.notValidatedFarmersCount = data;
    });

    this.adminService.countValidatedSuppliers().subscribe((data) => {
      this.validatedSuppleirsCount = data;
    });

    this.adminService.countNotValidatedSuppliers().subscribe((data) => {
      this.notValidatedSuppleirsCount = data;
    });

    this.adminService.countUnresolvedFarmerComplaints().subscribe((data) => {
      this.farmerComplaintsCount = data;
    });

    this.adminService.countUnresolvedSupplierComplaints().subscribe((data) => {
      this.supplierComplaintsCount = data;
      console.log(data);
    });
  }
}
