import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Логотип «Свій майстер» — емблема (кольорова дуга напрямків + будинок)
 * з підписом. Кольори сегментів дуги повторюють палітру категорій послуг.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo" [class.logo--stacked]="stacked()">
      <img
        class="logo__emblem"
        src="img/logo-emblem.webp"
        [attr.height]="emblemSize()"
        width="300"
        height="260"
        alt=""
        aria-hidden="true"
      />
      @if (showText()) {
        <span class="logo__text">
          <span class="logo__name">Свій майстер</span>
          <span class="logo__tag">Сервіс допомоги по дому · Львів</span>
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
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.2px;
        text-transform: uppercase;
        white-space: nowrap;
        color: var(--p-text-muted-color, #64748b);
      }
      .logo--stacked .logo__tag {
        white-space: normal;
      }
      @media (max-width: 480px) {
        .logo__name {
          font-size: 1.05rem;
        }
        .logo__tag {
          font-size: 0.58rem;
          letter-spacing: 0.15px;
        }
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
