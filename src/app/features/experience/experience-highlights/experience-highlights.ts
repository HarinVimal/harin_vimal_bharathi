import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, Sparkles } from 'lucide-angular';
import { ExperienceHighlight } from '../../../data/experience.data';
import { ExperienceHighlightItem } from '../experience-highlight-item/experience-highlight-item';

@Component({
  selector: 'app-experience-highlights',
  imports: [LucideAngularModule, ExperienceHighlightItem],
  templateUrl: './experience-highlights.html',
  styleUrl: './experience-highlights.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceHighlights {
  readonly highlights = input.required<readonly ExperienceHighlight[]>();
  readonly sparkleIcon = Sparkles;
}
