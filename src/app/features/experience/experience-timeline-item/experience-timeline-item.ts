import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  LucideAngularModule,
  LucideIconData,
} from 'lucide-angular';
import { ExperienceEntry, ExperienceIcon } from '../../../data/experience.data';

@Component({
  selector: 'app-experience-timeline-item',
  imports: [LucideAngularModule],
  templateUrl: './experience-timeline-item.html',
  styleUrl: './experience-timeline-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimelineItem {
  readonly entry = input.required<ExperienceEntry>();

  private readonly iconMap: Record<ExperienceIcon, LucideIconData> = {
    briefcase: BriefcaseBusiness,
    building: Building2,
    calendar: CalendarDays,
  };

  readonly entryIcon = computed(() => this.iconMap[this.entry().icon]);
  readonly dateLabel = computed(() => `${this.entry().startDate} – ${this.entry().endDate}`);
  readonly technologyLabel = computed(() => this.entry().technologies.join('  ·  '));
}
