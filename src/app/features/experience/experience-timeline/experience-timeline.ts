import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExperienceEntry } from '../../../data/experience.data';
import { ExperienceTimelineItem } from '../experience-timeline-item/experience-timeline-item';

@Component({
  selector: 'app-experience-timeline',
  imports: [ExperienceTimelineItem],
  templateUrl: './experience-timeline.html',
  styleUrl: './experience-timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimeline {
  readonly entries = input.required<readonly ExperienceEntry[]>();
}
