import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REVIEWS, Review } from '../data/site-content';

const STORAGE_KEY = 'svoyi-reviews-v1';

/**
 * Сховище відгуків.
 *
 * Базові (демо) відгуки беруться з `site-content`, а відгуки відвідувачів
 * зберігаються локально в `localStorage` браузера — без бекенду. На сервері
 * (SSR) localStorage недоступний, тож там показуються лише базові відгуки.
 */
@Injectable({ providedIn: 'root' })
export class ReviewsStore {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly userReviews = signal<Review[]>(this.load());

  /** Усі відгуки: спочатку нові від відвідувачів, потім базові. */
  readonly reviews = computed<Review[]>(() => [...this.userReviews(), ...REVIEWS]);

  /** Додати новий відгук і зберегти його в браузері. */
  add(review: Review): void {
    const next = [review, ...this.userReviews()];
    this.userReviews.set(next);
    this.persist(next);
  }

  private load(): Review[] {
    if (!this.isBrowser) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Review[]) : [];
    } catch {
      return [];
    }
  }

  private persist(reviews: Review[]): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // localStorage може бути недоступний (приватний режим) — тихо ігноруємо.
    }
  }
}
