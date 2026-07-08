import {
  Component,
  DOCUMENT,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CONTACTS, FOOTER } from './data/site-content';
import { TrafficSource } from './services/traffic-source';
import { Logo } from './components/logo/logo';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Logo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Ініціалізуємо одразу, щоб ?source=... зчитався при першому завантаженні
  private readonly trafficSource = inject(TrafficSource);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  protected readonly contacts = CONTACTS;
  protected readonly footer = FOOTER;
  protected readonly year = new Date().getFullYear();

  /** Пункти навігації (десктоп-меню та мобільне «гамбургер»-меню). */
  protected readonly navItems: NavItem[] = [
    { id: 'services', label: 'Послуги' },
    { id: 'process', label: 'Як працюємо' },
    { id: 'pricing', label: 'Ціни' },
    { id: 'why', label: 'Чому ми' },
    { id: 'reviews', label: 'Відгуки' },
    { id: 'contacts', label: 'Контакти' },
  ];

  /** Стан мобільного меню. */
  protected readonly menuOpen = signal(false);
  /** Активна секція (scrollspy) — підсвічує відповідну лінку. */
  protected readonly activeSection = signal('');

  constructor() {
    afterNextRender(() => this.setupScrollSpy());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Плавний скрол до секції з коректним урахуванням липкої шапки. */
  protected goTo(event: Event, id: string): void {
    event.preventDefault();
    const wasOpen = this.menuOpen();
    this.closeMenu();
    const scroll = () => {
      const el = this.document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // Якщо було відкрите мобільне меню — чекаємо, поки згорнеться панель,
    // інакше висота сторінки зміниться під час скролу і ціль «поїде».
    if (wasOpen) {
      setTimeout(scroll, 320);
    } else {
      scroll();
    }
  }

  private setupScrollSpy(attempt = 0): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sections = this.navItems
      .map((item) => this.document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // Секції рендерить лінива home-сторінка через <router-outlet>, тож на момент
    // першого afterNextRender їх ще немає в DOM. Чекаємо, поки зʼявляться.
    if (sections.length === 0) {
      if (attempt < 40) {
        setTimeout(() => this.setupScrollSpy(attempt + 1), 100);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      // Активною стає секція, що перетинає верхню третину екрана.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
  }
}
