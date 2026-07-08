import { Injectable, inject, signal } from '@angular/core';
import { CALL_TIMES } from '../data/site-content';
import { TrafficSource } from './traffic-source';

export interface Lead {
  name: string;
  phone: string;
  service: string;
  details?: string;
  callTime?: string;
}

/**
 * Сервіс відправки заявок.
 *
 * Зараз працює як заглушка: формує текст повідомлення (з урахуванням
 * джерела переходу) і виводить його в консоль. Щоб підключити реальну
 * відправку (бекенд, Telegram-бот, email) — реалізуйте `deliver()`.
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly trafficSource = inject(TrafficSource);

  /** Остання надіслана заявка — для сторінки подяки. */
  readonly lastLead = signal<Lead | null>(null);

  async submit(lead: Lead): Promise<void> {
    const message = this.composeMessage(lead);
    await this.deliver(message);
    this.lastLead.set(lead);
  }

  /** Текст повідомлення, яке отримає майстер. */
  composeMessage(lead: Lead): string {
    const callTime = CALL_TIMES.find((t) => t.value === lead.callTime)?.label;

    const lines = [
      '🛠 Нова заявка із сайту «Свій майстер»',
      `Імʼя: ${lead.name}`,
      `Телефон: ${lead.phone}`,
      `Послуга: ${lead.service}`,
      lead.details ? `Уточнення: ${lead.details}` : null,
      callTime ? `Зручний час дзвінка: ${callTime}` : null,
      `Джерело переходу: ${this.trafficSource.label}`,
    ];

    return lines.filter(Boolean).join('\n');
  }

  /**
   * TODO: підключити реальний канал доставки.
   * Варіанти: POST на власний бекенд, Telegram Bot API, email-сервіс.
   */
  private async deliver(message: string): Promise<void> {
    console.info('[LeadService] Заявка готова до відправки:\n' + message);
    // Імітація мережевого запиту, щоб UI показував стан «Надсилаємо…»
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
}
