import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CONTACTS, THANKS } from '../../data/site-content';
import { LeadService } from '../../services/lead';

@Component({
  selector: 'app-thanks',
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './thanks.html',
  styleUrl: './thanks.scss',
})
export class Thanks {
  private readonly leadService = inject(LeadService);

  protected readonly copy = THANKS;
  protected readonly contacts = CONTACTS;

  protected readonly title = computed(() => {
    const lead = this.leadService.lastLead();
    return lead ? this.copy.titleNamed.replace('{name}', lead.name) : this.copy.title;
  });
}
