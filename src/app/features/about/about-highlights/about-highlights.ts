import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Coffee, Globe, LucideAngularModule, LucideIconData, MapPin } from 'lucide-angular';
import { AboutHighlight, AboutHighlightIcon } from '../../../data/about.data';

@Component({
  selector: 'app-about-highlights',
  imports: [LucideAngularModule],
  templateUrl: './about-highlights.html',
  styleUrl: './about-highlights.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutHighlights {
  readonly highlights = input.required<readonly AboutHighlight[]>();

  private readonly iconMap: Record<AboutHighlightIcon, LucideIconData> = {
    location: MapPin,
    remote: Globe,
    coffee: Coffee,
  };

  iconFor(icon: AboutHighlightIcon): LucideIconData {
    return this.iconMap[icon];
  }
}
