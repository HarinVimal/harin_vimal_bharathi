import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { CertificationFilterId } from '../../../data/certifications.data';

export interface CertificationFilter {
  readonly id: CertificationFilterId;
  readonly label: string;
}

@Component({
  selector: 'app-certification-filters',
  imports: [],
  templateUrl: './certification-filters.html',
  styleUrl: './certification-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationFilters {
  readonly filters = input.required<readonly CertificationFilter[]>();
  readonly activeFilter = model.required<CertificationFilterId>();

  readonly activeClasses =
    'certification-filter--active rounded-full border border-copper-accent/60 bg-espresso-brown px-4 py-2 text-[0.74rem] font-semibold tracking-wide text-primary-background shadow-[0_12px_26px_-16px_rgba(195,106,61,0.95)] transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background';
  readonly inactiveClasses =
    'rounded-full border border-secondary-background/80 bg-primary-background/60 px-4 py-2 text-[0.74rem] font-semibold tracking-wide text-espresso-brown transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-copper-accent/60 hover:text-copper-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background';

  select(filterId: CertificationFilterId): void {
    this.activeFilter.set(filterId);
  }
}
