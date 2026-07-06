import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { LeadDialog } from '../../components/lead-dialog/lead-dialog';
import { ReviewDialog } from '../../components/review-dialog/review-dialog';
import { BrandIcon } from '../../components/brand-icon/brand-icon';
import { ReviewsStore } from '../../services/reviews';
import {
  CONTACTS,
  HERO,
  HERO_STATS,
  PROMO,
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
    ReviewDialog,
    BrandIcon,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly reviewsStore = inject(ReviewsStore);

  protected readonly hero = HERO;
  protected readonly heroStats = HERO_STATS;
  protected readonly servicesSection = SERVICES_SECTION;
  protected readonly services = SERVICES;
  protected readonly promo = PROMO;
  protected readonly reviewsSection = REVIEWS_SECTION;
  protected readonly reviews = this.reviewsStore.reviews;
  protected readonly contacts = CONTACTS;

  protected readonly leadDialogVisible = signal(false);
  protected readonly reviewDialogVisible = signal(false);

  protected openLeadDialog(): void {
    this.leadDialogVisible.set(true);
  }

  protected openReviewDialog(): void {
    this.reviewDialogVisible.set(true);
  }

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
