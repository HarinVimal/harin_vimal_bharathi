import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { TECHNOLOGY_CATEGORIES, TechnologyCategoryId } from '../../../data/technologies.data';

@Component({
  selector: 'app-technology-filters',
  imports: [],
  templateUrl: './technology-filters.html',
  styleUrl: './technology-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyFilters {
  readonly categories = TECHNOLOGY_CATEGORIES;
  readonly activeCategory = model.required<TechnologyCategoryId>();

  readonly activeClasses =
    'technology-filter--active rounded-full border border-transparent bg-espresso-brown px-4 py-2 text-[0.76rem] font-semibold tracking-wide text-primary-background shadow-[0_12px_24px_-16px_rgba(102,59,45,0.9)] transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background';
  readonly inactiveClasses =
    'rounded-full border border-espresso-brown/15 bg-primary-background/60 px-4 py-2 text-[0.76rem] font-semibold tracking-wide text-espresso-brown transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-copper-accent/50 hover:bg-copper-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background';

  select(categoryId: TechnologyCategoryId): void {
    this.activeCategory.set(categoryId);
  }
}
