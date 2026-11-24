import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProjectTechnology } from '../../../data/projects.data';

@Component({
  selector: 'app-technology-badge',
  imports: [],
  templateUrl: './technology-badge.html',
  styleUrl: './technology-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyBadge {
  readonly technology = input.required<ProjectTechnology>();
  readonly compact = input(false);

  readonly logoUrl = computed(() => {
    const icon = this.technology().icon;
    return icon ? `/icons/technologies/${icon}.svg` : null;
  });

  readonly monogram = computed(
    () => this.technology().monogram ?? this.technology().name.slice(0, 2).toUpperCase(),
  );
}
