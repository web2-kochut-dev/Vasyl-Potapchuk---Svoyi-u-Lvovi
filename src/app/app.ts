import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CONTACTS, FOOTER } from './data/site-content';
import { TrafficSource } from './services/traffic-source';
import { Logo } from './components/logo/logo';

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
}
