import { Injectable, inject, signal } from '@angular/core';
import { CALL_TIMES } from '../data/site-content';
import { SITE_CONFIG } from '../config/site-config';
import { TrafficSource, type Attribution } from './traffic-source';
import { Analytics } from './analytics';

export interface Lead {
  name: string;
  phone: string;
  service: string;
  details?: string;
  callTime?: string;
}

/** Повний JSON, який іде на вебхук автоматизації (Google Sheets + Telegram). */
export interface LeadPayload extends Lead {
  message: string;
  source: string;
  sourceLabel: string;
  attribution: Attribution;
  pageUrl: string;
  submittedAt: string;
}

/**
 * Сервіс відправки заявок.
 *
 * Відправляє структурований JSON на вебхук `SITE_CONFIG.leadWebhookUrl`
 * (автоматизація клієнта: запис у Google Sheets + повідомлення в Telegram)
 * і фіксує конверсію в аналітиці. Поки вебхук не задано — заявка виводиться
 * в консоль (fallback), щоб на етапі підготовки нічого не губилось.
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly trafficSource = inject(TrafficSource);
  private readonly analytics = inject(Analytics);

  /** Остання надіслана заявка — для сторінки подяки. */
  readonly lastLead = signal<Lead | null>(null);

  async submit(lead: Lead): Promise<void> {
    const attribution = this.trafficSource.attribution;
    const payload: LeadPayload = {
      ...lead,
      message: this.composeMessage(lead),
      source: attribution.source,
      sourceLabel: this.trafficSource.label,
      attribution,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      submittedAt: new Date().toISOString(),
    };

    await this.deliver(payload);

    // Конверсія для реклами (GA4 / Meta Pixel / Google Ads через GTM).
    this.analytics.trackLead({
      service: lead.service,
      source: attribution.source,
      utm_campaign: attribution.utmCampaign,
      value: 1,
    });

    this.lastLead.set(lead);
  }

  /** Текст повідомлення, яке отримає майстер. */
  composeMessage(lead: Lead): string {
    const callTime = CALL_TIMES.find((t) => t.value === lead.callTime)?.label;
    const attr = this.trafficSource.attribution;

    const lines = [
      '🛠 Нова заявка із сайту «Свій майстер»',
      `Імʼя: ${lead.name}`,
      `Телефон: ${lead.phone}`,
      `Послуга: ${lead.service}`,
      lead.details ? `Уточнення: ${lead.details}` : null,
      callTime ? `Зручний час дзвінка: ${callTime}` : null,
      `Джерело переходу: ${this.trafficSource.label}`,
      attr.utmCampaign ? `Кампанія: ${attr.utmCampaign}` : null,
    ];

    return lines.filter(Boolean).join('\n');
  }

  /**
   * Доставка на вебхук. Використовуємо `text/plain` + `no-cors`: це «простий»
   * запит без preflight, який приймають Google Apps Script, n8n, Make тощо.
   * Відповідь непрозора (opaque) — тому успіх визначаємо за фактом відправки;
   * форму все одно ведемо до сторінки подяки, а помилки логуємо.
   */
  private async deliver(payload: LeadPayload): Promise<void> {
    const url = SITE_CONFIG.leadWebhookUrl;
    if (!url) {
      console.info('[LeadService] Вебхук не задано — заявка (fallback):\n', payload);
      await new Promise((resolve) => setTimeout(resolve, 600));
      return;
    }

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (error) {
      console.error('[LeadService] Не вдалося надіслати заявку на вебхук:', error);
    }
  }
}
