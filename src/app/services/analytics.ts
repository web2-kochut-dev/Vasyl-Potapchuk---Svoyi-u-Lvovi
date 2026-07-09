import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE_CONFIG } from '../config/site-config';

/**
 * Аналітика через Google Tag Manager.
 *
 * GA4, Meta Pixel і Google Ads підключаються всередині GTM (без правок коду).
 * Тут ми лише вантажимо контейнер і кладемо події в `dataLayer` — GTM їх
 * підхоплює й розсилає у потрібні системи. Поки `gtmId` порожній — контейнер
 * не вантажиться, але події все одно акумулюються в dataLayer (нешкідливо).
 */
@Injectable({ providedIn: 'root' })
export class Analytics {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;

  /** Вантажить GTM-контейнер (одноразово, лише в браузері). */
  init(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.initialized = true;

    const id = SITE_CONFIG.gtmId;
    if (!id) {
      return; // Аналітика вимкнена, поки не задано GTM-контейнер.
    }

    this.dataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
    document.head.appendChild(script);
  }

  /** Універсальний виклик події в dataLayer. */
  push(event: string, params: Record<string, unknown> = {}): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.dataLayer().push({ event, ...params });
  }

  /** Віртуальний перегляд сторінки при навігації SPA. */
  trackPageView(path: string): void {
    this.push('spa_page_view', { page_path: path });
  }

  /**
   * Ключова подія-конверсія. У GTM мапиться на:
   * GA4 conversion + Meta Pixel «Lead» + Google Ads conversion.
   */
  trackLead(params: Record<string, unknown> = {}): void {
    this.push('generate_lead', params);
  }

  private dataLayer(): unknown[] {
    const w = window as unknown as { dataLayer?: unknown[] };
    return (w.dataLayer ??= []);
  }
}
