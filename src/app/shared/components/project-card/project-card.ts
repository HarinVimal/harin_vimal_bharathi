import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ArrowUpRight, LucideAngularModule } from 'lucide-angular';
import { ProjectData } from '../../../data/projects.data';
import { TechnologyBadge } from '../technology-badge/technology-badge';

const VISIBLE_TECHNOLOGY_COUNT = 5;

@Component({
  selector: 'app-project-card',
  imports: [LucideAngularModule, TechnologyBadge],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<ProjectData>();
  readonly projectOpened = output<ProjectData>();

  readonly viewIcon = ArrowUpRight;

  readonly visibleTechnologies = computed(() =>
    this.project().technologies.slice(0, VISIBLE_TECHNOLOGY_COUNT),
  );
  readonly hiddenTechnologyCount = computed(() =>
    Math.max(0, this.project().technologies.length - VISIBLE_TECHNOLOGY_COUNT),
  );
  readonly coverAlt = computed(() => `Illustrative cover artwork for ${this.project().title}`);
}
