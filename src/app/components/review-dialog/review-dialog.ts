import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RatingModule } from 'primeng/rating';
import { REVIEW_FORM, SERVICES } from '../../data/site-content';
import { ReviewsStore } from '../../services/reviews';

@Component({
  selector: 'app-review-dialog',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RatingModule,
  ],
  templateUrl: './review-dialog.html',
  styleUrl: './review-dialog.scss',
})
export class ReviewDialog {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(ReviewsStore);

  /** Двостороннє звʼязування видимості діалогу: [(visible)] */
  readonly visible = model(false);

  protected readonly copy = REVIEW_FORM;
  protected readonly serviceOptions = SERVICES.map((s) => ({ label: s.title, value: s.title }));

  protected readonly submitting = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    author: ['', [Validators.required, Validators.minLength(2)]],
    district: [''],
    service: ['', Validators.required],
    rating: [5, [Validators.required, Validators.min(1)]],
    text: ['', [Validators.required, Validators.minLength(5)]],
  });

  protected invalid(controlName: 'author' | 'service' | 'text'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  protected close(): void {
    this.visible.set(false);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const value = this.form.getRawValue();
    this.store.add({
      author: value.author.trim(),
      district: value.district.trim() || 'Львів',
      service: value.service,
      text: value.text.trim(),
      rating: value.rating,
    });
    this.submitting.set(false);
    this.visible.set(false);
    this.form.reset({ author: '', district: '', service: '', rating: 5, text: '' });
  }
}
