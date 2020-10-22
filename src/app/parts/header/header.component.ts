import { Component, Renderer2, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  navItems = [{name: 'Home', link: 'home'}, {name: 'Discover', link: 'discover'}, {name: 'Join', link: 'join'}];
  title = 'Savewave';
  setOpacityLevel = false;
  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  constructor(private renderer: Renderer2) {
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$)).subscribe((e: Event) => {
      const header = document.querySelector('header');
      const navbar = document.querySelector('header nav .nav-list');
      const scrollPosition = window.scrollY;
      if (scrollPosition > 80) {
        renderer.setStyle(header, 'background-color', '#feedd6');
        renderer.setStyle(navbar, 'background-color', 'transparent');
      } else {
        renderer.setStyle(header, 'background-color', 'initial');
      }
    });

    console.log(this.navItems[0].link);
  }

  getYPosition(e): number {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  toggleMenu(ev): void {
    this.setOpacityLevel = !this.setOpacityLevel;
    const body = document.querySelector('body');
    const menuToggler = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    body.classList.toggle('open');
    menuToggler.classList.toggle('open');
    nav.classList.toggle('open');
    document.documentElement.style.setProperty('--nav-opacity-level', this.setOpacityLevel ? '0.5' : '0');
    document.documentElement.style.setProperty('--transform-scale', this.setOpacityLevel ? '1' : '0');
  }

}
