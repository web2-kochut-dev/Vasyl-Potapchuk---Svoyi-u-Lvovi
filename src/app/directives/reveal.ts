import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Плавна поява елемента при скролі (fade + slide-up).
 *
 * Використання: `<div reveal></div>` або `<div reveal [revealDelay]="80">`.
 * На сервері (SSR) та при `prefers-reduced-motion` елемент одразу видимий —
 * анімація нічого не приховує, лише додає «оживлення» в браузері.
 */
@Directive({
  selector: '[reveal]',
})
export class Reveal implements AfterViewInit, OnDestroy {
  /** Затримка появи в мс — для каскадного (stagger) ефекту в списках. */
  readonly revealDelay = input(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    if (this.revealDelay()) {
      node.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
