import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SOURCE_LABELS } from '../data/site-content';

const STORAGE_KEY = 'svoyi_attribution';

/** Повна атрибуція переходу (для реклами й звітності). */
export interface Attribution {
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
  capturedAt?: string;
}

/**
 * Визначає й запамʼятовує джерело переходу.
 *
 * Підтримує як простий `?source=...`, так і повні рекламні мітки
 * `utm_source/medium/campaign/term/content`, а також ідентифікатори кліку
 * `gclid` (Google Ads) та `fbclid` (Meta). Використовує модель first-touch:
 * перша поява міток фіксується в localStorage і зберігається до конверсії,
 * навіть якщо людина погуляла сайтом і повернулась іншим шляхом.
 */
@Injectable({ providedIn: 'root' })
export class TrafficSource {
  private readonly platformId = inject(PLATFORM_ID);

  /** Сире значення джерела, напр. "instagram". */
  readonly source = signal<string>('direct');

  private attributionData: Attribution = { source: 'direct' };

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.attributionData = this.resolve();
    this.source.set(this.attributionData.source);
  }

  /** Повна атрибуція (для payload заявки). */
  get attribution(): Attribution {
    return this.attributionData;
  }

  /** Людська назва джерела для повідомлення майстру. */
  get label(): string {
    const value = this.source();
    return SOURCE_LABELS[value] ?? `Інше (${value})`;
  }

  private resolve(): Attribution {
    const params = new URLSearchParams(window.location.search);
    const get = (key: string) => params.get(key)?.trim() || undefined;

    const explicitSource = get('source')?.toLowerCase();
    const utmSource = get('utm_source');
    const gclid = get('gclid');
    const fbclid = get('fbclid');

    const hasCampaignData = Boolean(
      explicitSource || utmSource || get('utm_medium') || get('utm_campaign') || gclid || fbclid,
    );

    // Є свіжі мітки — фіксуємо їх (first-touch перезаписуємо лише при новій кампанії).
    if (hasCampaignData) {
      const fresh: Attribution = {
        source: (explicitSource || utmSource || 'direct').toLowerCase(),
        utmSource,
        utmMedium: get('utm_medium'),
        utmCampaign: get('utm_campaign'),
        utmTerm: get('utm_term'),
        utmContent: get('utm_content'),
        gclid,
        fbclid,
        referrer: document.referrer || undefined,
        landingPage: window.location.href,
        capturedAt: new Date().toISOString(),
      };
      this.store(fresh);
      return fresh;
    }

    // Міток немає — беремо збережену атрибуцію, якщо є.
    const stored = this.load();
    if (stored) {
      return stored;
    }

    // Перший візит без міток — прямий перехід.
    const direct: Attribution = {
      source: 'direct',
      referrer: document.referrer || undefined,
      landingPage: window.location.href,
      capturedAt: new Date().toISOString(),
    };
    this.store(direct);
    return direct;
  }

  private load(): Attribution | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Attribution) : null;
    } catch {
      return null;
    }
  }

  private store(data: Attribution): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* localStorage може бути недоступний — не критично */
    }
  }
}
