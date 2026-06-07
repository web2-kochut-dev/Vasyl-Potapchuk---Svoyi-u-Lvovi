import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import {
  CONTACTS,
  FOOTER,
  HERO,
  PROMO,
  REVIEWS,
  REVIEWS_SECTION,
  SERVICES,
  SERVICES_SECTION,
} from './data/site-content';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CardModule, TagModule, RatingModule, DividerModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly hero = HERO;
  protected readonly servicesSection = SERVICES_SECTION;
  protected readonly services = SERVICES;
  protected readonly promo = PROMO;
  protected readonly reviewsSection = REVIEWS_SECTION;
  protected readonly reviews = REVIEWS;
  protected readonly contacts = CONTACTS;
  protected readonly footer = FOOTER;

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
