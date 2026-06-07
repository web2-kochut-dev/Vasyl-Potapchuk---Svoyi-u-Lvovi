import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { LeadDialog } from '../../components/lead-dialog/lead-dialog';
import {
  CONTACTS,
  HERO,
  PROMO,
  REVIEWS,
  REVIEWS_SECTION,
  SERVICES,
  SERVICES_SECTION,
} from '../../data/site-content';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    CardModule,
    TagModule,
    RatingModule,
    DividerModule,
    FormsModule,
    LeadDialog,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly hero = HERO;
  protected readonly servicesSection = SERVICES_SECTION;
  protected readonly services = SERVICES;
  protected readonly promo = PROMO;
  protected readonly reviewsSection = REVIEWS_SECTION;
  protected readonly reviews = REVIEWS;
  protected readonly contacts = CONTACTS;

  protected readonly leadDialogVisible = signal(false);

  protected openLeadDialog(): void {
    this.leadDialogVisible.set(true);
  }

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
