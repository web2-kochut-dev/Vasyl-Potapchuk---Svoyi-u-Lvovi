import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Логотип «Свої у Львові» — емблема (кольорова дуга напрямків + будинок)
 * з підписом. Кольори сегментів дуги повторюють палітру категорій послуг.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo" [class.logo--stacked]="stacked()">
      <svg class="logo__emblem" viewBox="0 0 100 78" [attr.height]="emblemSize()" aria-hidden="true">
        <!-- дуга напрямків -->
        <g fill="none" stroke-width="12" stroke-linecap="round">
          <path d="M14.02 52.74 A36 36 0 0 1 20.15 33.87" stroke="#2D9CDB" />
          <path d="M21.63 31.84 A36 36 0 0 1 37.69 20.17" stroke="#F2C94C" />
          <path d="M40.08 19.39 A36 36 0 0 1 59.92 19.39" stroke="#F2994A" />
          <path d="M62.31 20.17 A36 36 0 0 1 78.37 31.84" stroke="#27AE60" />
          <path d="M79.85 33.87 A36 36 0 0 1 85.98 52.74" stroke="#6C5CE7" />
        </g>
        <!-- будинок -->
        <path
          d="M50 33 L66 46 L66 66 L34 66 L34 46 Z"
          fill="#1B3A5B"
        />
        <rect x="45" y="52" width="10" height="14" rx="1" fill="#fff" />
        <rect x="52.5" y="57" width="1.6" height="3" rx="0.8" fill="#1B3A5B" />
      </svg>
      @if (showText()) {
        <span class="logo__text">
          <span class="logo__name">Свої у Львові</span>
          <span class="logo__tag">Допоміжна служба · Львів</span>
        </span>
      }
    </span>
  `,
  styles: [
    `
      .logo {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
      }
      .logo--stacked {
        flex-direction: column;
        gap: 0.4rem;
        text-align: center;
      }
      .logo__emblem {
        display: block;
        width: auto;
      }
      .logo__text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }
      .logo__name {
        font-weight: 800;
        font-size: 1.15rem;
        letter-spacing: 0.2px;
        color: #1b3a5b;
      }
      .logo__tag {
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.3px;
        text-transform: uppercase;
        color: var(--p-text-muted-color, #64748b);
      }
    `,
  ],
})
export class Logo {
  /** Висота емблеми у px. */
  readonly emblemSize = input(40);
  /** Показувати текстову частину логотипа. */
  readonly showText = input(true);
  /** Вертикальне компонування (емблема над текстом). */
  readonly stacked = input(false);
}
