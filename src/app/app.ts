import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CONTACTS, FOOTER } from './data/site-content';
import { TrafficSource } from './services/traffic-source';
import { Logo } from './components/logo/logo';

interface NavItem {
  href: string;
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

  protected readonly contacts = CONTACTS;
  protected readonly footer = FOOTER;

  /** Пункти навігації (десктоп-меню та мобільне «гамбургер»-меню). */
  protected readonly navItems: NavItem[] = [
    { href: '#services', label: 'Послуги' },
    { href: '#process', label: 'Як працюємо' },
    { href: '#pricing', label: 'Ціни' },
    { href: '#why', label: 'Чому ми' },
    { href: '#reviews', label: 'Відгуки' },
    { href: '#contacts', label: 'Контакти' },
  ];

  /** Стан мобільного меню. */
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
