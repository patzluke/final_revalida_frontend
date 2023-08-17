import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    const element = this.elementRef.nativeElement.querySelector('.logo');
    const letters = gsap.utils.toArray('.letter') as HTMLElement[];
    const tweens: any = {};

    element.addEventListener('mouseover', (event: MouseEvent) =>
      onMouseOver(event)
    );

    element.addEventListener('mouseleave', (event: MouseEvent) =>
      onMouseLeave(event)
    );

    letters.forEach((letter, index) => {
      tweens[index] = gsap.to(letter, {
        yPercent: -50,
        yoyo: true,
        repeat: 1,
        duration: 0.3,
        paused: true,
        ease: 'quart.out',
      });

      letter.dataset['tween'] = index.toString();
    });

    function onMouseOver(event: MouseEvent): void {
      const trg = event.target as HTMLElement;

      if (trg.dataset['tween']) {
        const tween = tweens[trg.dataset['tween']];
        console.log('targe', trg.dataset['tween']);

        if (!gsap.isTweening(trg)) {
          tween.play(0);
        }
      }
    }

    const onMouseLeave = (event: MouseEvent) => {
      const trg = event.target as HTMLElement;
      if (trg.dataset['tween']) {
        const tween = tweens[trg.dataset['tween']];
        console.log('targe', trg.dataset['tween']);

        if (!gsap.isTweening(trg)) {
          tween.pause(0);
        }
      }
    };
  }

  isMenuOpen: boolean = false;
  toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };

  scrolled: boolean = false;
  scrolledDown: boolean = false;
  previousScrollPosition: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.scrolled = scrollPosition > 0;
    this.scrolledDown = scrollPosition > this.previousScrollPosition;
    this.previousScrollPosition = scrollPosition;
  }
}
