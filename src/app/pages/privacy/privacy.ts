import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRIVACY } from '../../data/site-content';

@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="section privacy">
      <div class="container privacy-inner">
        <h1>{{ copy.title }}</h1>
        <p class="privacy-updated">{{ copy.updated }}</p>
        <p class="privacy-intro">{{ copy.intro }}</p>

        @for (s of copy.sections; track s.h) {
          <h2>{{ s.h }}</h2>
          <p>{{ s.p }}</p>
        }

        <a routerLink="/" class="privacy-back">← {{ copy.back }}</a>
      </div>
    </section>
  `,
  styles: [
    `
      .privacy {
        padding: 3rem 0 4rem;
      }
      .privacy-inner {
        max-width: 760px;
      }
      h1 {
        margin: 0 0 0.4rem;
        color: var(--brand-navy-900);
      }
      .privacy-updated {
        margin: 0 0 1.5rem;
        color: var(--brand-muted);
        font-size: 0.9rem;
      }
      .privacy-intro {
        font-size: 1.05rem;
        margin: 0 0 2rem;
      }
      h2 {
        margin: 1.75rem 0 0.5rem;
        font-size: 1.2rem;
        color: var(--brand-navy);
      }
      p {
        margin: 0;
        color: var(--brand-fg);
        line-height: 1.7;
      }
      .privacy-back {
        display: inline-block;
        margin-top: 2.5rem;
        font-weight: 700;
        color: var(--brand-navy);
        text-decoration: none;
      }
      .privacy-back:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class Privacy {
  protected readonly copy = PRIVACY;
}
