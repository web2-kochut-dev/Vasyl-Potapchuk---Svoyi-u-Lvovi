import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SOURCE_LABELS } from '../data/site-content';

const STORAGE_KEY = 'svoyi_source';

/**
 * Читає джерело переходу з query-параметра `?source=...`
 * (напр. /?source=instagram) і запамʼятовує його на час сесії,
 * щоб воно не загубилось під час навігації по сайту.
 */
@Injectable({ providedIn: 'root' })
export class TrafficSource {
  private readonly platformId = inject(PLATFORM_ID);

  /** Сире значення джерела, напр. "instagram". */
  readonly source = signal<string>('direct');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const fromUrl = new URLSearchParams(window.location.search).get('source')?.toLowerCase().trim();
    const stored = sessionStorage.getItem(STORAGE_KEY);

    const value = fromUrl || stored || 'direct';
    this.source.set(value);
    sessionStorage.setItem(STORAGE_KEY, value);
  }

  /** Людська назва джерела для повідомлення майстру. */
  get label(): string {
    const value = this.source();
    return SOURCE_LABELS[value] ?? `Інше (${value})`;
  }
}
