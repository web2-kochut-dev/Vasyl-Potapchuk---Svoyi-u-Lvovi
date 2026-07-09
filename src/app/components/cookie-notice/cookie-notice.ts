import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { COOKIE_NOTICE } from '../../data/site-content';

const STORAGE_KEY = 'svoyi_cookie_ok';

/** Легкий, ненавʼязливий банер про cookie з посиланням на політику. */
@Component({
  selector: 'app-cookie-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (visible()) {
      <div class="cookie" role="region" aria-label="Повідомлення про cookie">
        <p class="cookie__text">
          {{ copy.text }}
          <a routerLink="/polityka-konfidentsiynosti">{{ copy.more }}</a>
        </p>
        <button type="button" class="cookie__btn" (click)="accept()">{{ copy.accept }}</button>
      </div>
    }
  `,
  styles: [
    `
      .cookie {
        position: fixed;
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
        z-index: 1000;
        max-width: 640px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1.1rem;
        background: var(--brand-navy-900, #131f42);
        color: #fff;
        border-radius: var(--radius-md, 16px);
        box-shadow: var(--shadow-lg, 0 24px 48px -24px rgba(15, 23, 42, 0.5));
      }
      .cookie__text {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.45;
      }
      .cookie__text a {
        color: #fff;
        text-decoration: underline;
        white-space: nowrap;
      }
      .cookie__btn {
        flex-shrink: 0;
        padding: 0.5rem 1.1rem;
        border: 0;
        border-radius: 10px;
        background: #fff;
        color: var(--brand-navy-900, #131f42);
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
      }
      .cookie__btn:hover {
        background: #eef3fc;
      }
      @media (max-width: 560px) {
        .cookie {
          flex-direction: column;
          align-items: stretch;
          text-align: center;
        }
        .cookie__btn {
          width: 100%;
        }
      }
    `,
  ],
})
export class CookieNotice {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly copy = COOKIE_NOTICE;
  protected readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      try {
        if (localStorage.getItem(STORAGE_KEY) !== '1') {
          this.visible.set(true);
        }
      } catch {
        this.visible.set(true);
      }
    });
  }

  protected accept(): void {
    this.visible.set(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* localStorage може бути недоступний */
    }
  }
}
