import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  ChartNoAxesCombined,
  Code,
  LucideAngularModule,
  LucideIconData,
  ShieldCheck,
  UsersRound,
} from 'lucide-angular';
import { ExperienceHighlight, ExperienceHighlightIcon } from '../../../data/experience.data';

@Component({
  selector: 'app-experience-highlight-item',
  imports: [LucideAngularModule],
  templateUrl: './experience-highlight-item.html',
  styleUrl: './experience-highlight-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceHighlightItem {
  readonly highlight = input.required<ExperienceHighlight>();

  private readonly iconMap: Record<ExperienceHighlightIcon, LucideIconData> = {
    chart: ChartNoAxesCombined,
    code: Code,
    shield: ShieldCheck,
    users: UsersRound,
  };

  readonly highlightIcon = computed(() => this.iconMap[this.highlight().icon]);
}
