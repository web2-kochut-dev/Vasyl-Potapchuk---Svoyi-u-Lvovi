import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Брендовий набір іконок у стилі логотипа (лінійні, з однаковою товщиною).
 * Використовується в картках послуг та в емблемі логотипа.
 */
@Component({
  selector: 'app-brand-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.9"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name()) {
        @case ('faucet') {
          <path d="M3 13h6" />
          <path d="M9 13V8a2 2 0 0 1 2-2h3" />
          <path d="M14 6h4a2 2 0 0 1 2 2v1h-6" />
          <path d="M6 13v2a2 2 0 0 0 2 2h1" />
          <path d="M12 17v2m0 0-1.2 2.2a1 1 0 0 0 .9 1.4h.6a1 1 0 0 0 .9-1.4z" />
        }
        @case ('bolt') {
          <path d="M13 2 4.5 13.2a.6.6 0 0 0 .5 1H11l-1 8 8.5-11.2a.6.6 0 0 0-.5-1H12z" />
        }
        @case ('hammer') {
          <path d="M15 6.5 17.5 4l2.5 2.5L17.5 9z" />
          <path d="m16.2 7.8-8.5 8.5" />
          <path d="M9.5 14.5 5 19a1.8 1.8 0 0 1-2.5-2.5L7 12z" />
          <path d="m13 5-2 2 2 2 2-2z" />
        }
        @case ('dolly') {
          <path d="M4 4h2l3 11" />
          <path d="M7 13h11l1-6a1 1 0 0 0-1-1.2L8 4" />
          <circle cx="10" cy="19" r="1.6" />
          <circle cx="17" cy="19" r="1.6" />
        }
        @case ('wrench') {
          <path d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.4l-6 6a1.8 1.8 0 0 0 2.5 2.5l6-6a3.5 3.5 0 0 0 4.4-4.6l-2.2 2.2-1.8-.4-.4-1.8z" />
        }
        @case ('truck') {
          <path d="M2 6h10v10H2z" />
          <path d="M12 9h4l3 3v4h-7z" />
          <circle cx="7" cy="18" r="1.6" />
          <circle cx="16" cy="18" r="1.6" />
        }
        @case ('sofa') {
          <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
          <path d="M3 12a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2 2 2 0 0 0-2 2H5a2 2 0 0 0-2-2z" />
          <path d="M5 17v2" />
          <path d="M19 17v2" />
        }
        @case ('plug') {
          <path d="M9 3v5" />
          <path d="M15 3v5" />
          <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" />
          <path d="M12 17v4" />
        }
        @case ('wall') {
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="M3 9.3h18" />
          <path d="M3 14.6h18" />
          <path d="M9 4v5.3" />
          <path d="M15 9.3v5.3" />
          <path d="M9 14.6V20" />
        }
        @case ('roller') {
          <rect x="3" y="4" width="13" height="5" rx="1.5" />
          <path d="M16 6.5h3a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 0-1.5 1.5v1" />
          <rect x="10" y="14.5" width="3" height="6" rx="1" />
        }
        @case ('house') {
          <path d="M4 11 12 4l8 7" />
          <path d="M6 10v9h12v-9" />
          <path d="M10 19v-5h4v5" />
        }
      }
    </svg>
  `,
})
export class BrandIcon {
  readonly name = input.required<string>();
  readonly size = input(24);
}
