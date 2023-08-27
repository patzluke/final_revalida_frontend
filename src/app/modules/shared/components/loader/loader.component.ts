import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(private el: ElementRef) {}
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
