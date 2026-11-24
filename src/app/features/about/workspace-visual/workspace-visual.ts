import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Code, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-workspace-visual',
  imports: [LucideAngularModule],
  templateUrl: './workspace-visual.html',
  styleUrl: './workspace-visual.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceVisual {
  readonly imageSrc = input.required<string>();
  readonly imageAlt = input.required<string>();
  readonly roles = input.required<readonly string[]>();

  readonly codeIcon = Code;
}
