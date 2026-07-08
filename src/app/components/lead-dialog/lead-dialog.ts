import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CALL_TIMES, LEAD_FORM, SERVICES } from '../../data/site-content';
import { LeadService } from '../../services/lead';

@Component({
  selector: 'app-lead-dialog',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputMaskModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './lead-dialog.html',
  styleUrl: './lead-dialog.scss',
})
export class LeadDialog {
  private readonly fb = inject(FormBuilder);
  private readonly leadService = inject(LeadService);
  private readonly router = inject(Router);

  /** Двостороннє звʼязування видимості діалогу: [(visible)] */
  readonly visible = model(false);

  protected readonly copy = LEAD_FORM;
  protected readonly callTimes = [...CALL_TIMES];
  protected readonly serviceOptions = [
    ...SERVICES.map((s) => ({ label: s.title, value: s.title })),
    { label: LEAD_FORM.serviceOther, value: LEAD_FORM.serviceOther },
  ];

  protected readonly submitting = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{2} \d{3} \d{2} \d{2}$/)]],
    service: ['', Validators.required],
    details: [''],
    callTime: [''],
  });

  protected invalid(controlName: 'name' | 'phone' | 'service'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  protected close(): void {
    this.visible.set(false);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    try {
      const value = this.form.getRawValue();
      await this.leadService.submit({
        name: value.name.trim(),
        phone: '+380 ' + value.phone.trim(),
        service: value.service,
        details: value.details.trim() || undefined,
        callTime: value.callTime || undefined,
      });
      this.visible.set(false);
      this.form.reset();
      await this.router.navigate(['/dyakuyemo']);
    } finally {
      this.submitting.set(false);
    }
  }
}
