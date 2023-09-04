import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {


  ngOnInit() {

    const farmerId = Number(localStorage.getItem('userNo'))

    this.getTotalSales(farmerId).subscribe(
      (data: number) => {
        this.totalSales = data
        console.log('Your total sales: ', Number(this.totalSales));

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
          labels: ['Total Sales'],
          datasets: [
            {
              label: 'Sales',
              data: [this.totalSales],
              backgroundColor: ['rgba(255, 0, 0, 100)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };

        this.basicOptions = {
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };
      },
      (error) => {
        console.log(error);
      }
    )

    const totalSales = this.totalSales
    console.log(totalSales);


  }

  constructor(private http: HttpClient) {

  }

  basicData: any;

  basicOptions: any;

  totalSales: any;

  private BASE_URL = 'http://localhost:8080/api/farmer'

  getTotalSales(farmerId: number): Observable<any> {
    const newUrl = `${this.BASE_URL}/get/farmer-total-sales-by-id/${farmerId}`
    return this.http.get<any>(newUrl);
  }

}
