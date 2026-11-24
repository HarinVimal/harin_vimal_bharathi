import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-animated-text',
  imports: [],
  templateUrl: './animated-text.html',
  styleUrl: './animated-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedText {}
