import { Component, OnDestroy, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-view-page',
  templateUrl: './report-view-page.component.html',
  styleUrls: ['./report-view-page.component.scss'],
})
export class ReportViewPageComponent implements OnInit, OnDestroy {
  lineData: any;
  lineOptions: any;

  barData: any;
  barOptions: any;

  totalSales: any;
  customerCount: number = 0;
  salesPerMonth!: [];
  threeRecentOrders!: [];

  currentYear!: number;
  constructor(private supplierService: SupplierService) {}

  farmerSub!: Subscription;

  ngOnInit() {
    const farmerId = Number(localStorage.getItem('userNo'));
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    this.farmerSub = this.supplierService
      .getTotalSales(farmerId)
      .subscribe((data) => {
        this.totalSales = data;
        //console.log('Your total sales: ', Number(this.totalSales));
      });

    this.farmerSub = this.supplierService
      .getCustomerCount(farmerId)
      .subscribe((data) => {
        this.customerCount = data;
      });

    this.farmerSub = this.supplierService
      .getSalesPerMonth(farmerId)
      .subscribe((data) => {
        this.salesPerMonth = data;
        //console.log('sales per month', this.salesPerMonth);

        this.lineData = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              //label: `${this.currentYear} Sale`,
              data: this.salesPerMonth,
              fill: true,
              borderColor: documentStyle.getPropertyValue('--red-300'),
              tension: 0.4,
              backgroundColor: 'rgb(240,128,128,0.2)',
            },
          ],
        };

        this.barData = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              data: this.salesPerMonth,
              backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(220,20,60, 0.2)',
                'rgba(255,215,0, 0.2)',
                'rgba(245,245,220, 0.2)',
                'rgba(205,133,63, 0.2)',
                'rgba(112,128,144, 0.2)',
                'rgba(139,0,139, 0.2)',
                'rgba(0,100,0, 0.2)',
                'rgba(255,255,0, 0.2)',
              ],
              borderColor: [
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(220,20,60)',
                'rgb(255,215,0)',
                'rgb(245,245,220)',
                'rgb(205,133,63)',
                'rgb(112,128,144)',
                'rgb(139,0,139)',
                'rgb(0,100,0)',
                'rgb(255,255,0)',
              ],
              borderWidth: 1,
            },
          ],
        };
      });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // line graph
    this.lineOptions = {
      responsive: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor,
            display: false,
            fontSize: 0,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            display: false,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            display: false,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
            display: false,
          },
        },
      },
    };

    // bar graph
    this.barOptions = {
      responsive: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.farmerSub = this.supplierService
      .getThreeRecentOrders(farmerId)
      .subscribe((data) => {
        this.threeRecentOrders = data;
        //console.log('3 recent', this.threeRecentOrders);
      });
  }

  ngOnDestroy(): void {
    this.farmerSub.unsubscribe();
  }
}
