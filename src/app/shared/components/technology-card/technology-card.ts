import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TechnologyItem } from '../../../data/technologies.data';

@Component({
  selector: 'app-technology-card',
  imports: [],
  templateUrl: './technology-card.html',
  styleUrl: './technology-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyCard {
  readonly technology = input.required<TechnologyItem>();

  readonly logoUrl = computed(() => `/icons/technologies/${this.technology().icon}.svg`);
}
