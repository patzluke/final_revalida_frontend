import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('inAnimation1', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(-0.10px)' })
        ),
      ]),
    ]),
    trigger('inAnimation2', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.7s ease-in',
          style({ opacity: 1, transform: 'translateY(-0.10px)' })
        ),
      ]),
    ]),
    trigger('inAnimation3', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '1s ease-in',
          style({ opacity: 1, transform: 'translateY(-0.10px)' })
        ),
      ]),
    ]),
    trigger('inAnimation4', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '1.1s ease-in',
          style({ opacity: 1, transform: 'translateY(-0.10px)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  items: HTMLElement[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.observeItems();
  }

  observeItems(): void {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    ); // Adjust the rootMargin as needed

    this.items = Array.from(
      document.querySelectorAll('.link-text h1')
    ) as HTMLElement[];

    this.items.forEach((item) => {
      observer.observe(item);
    });
  }


}
