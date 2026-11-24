import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { enableSmoothScroll } from './core/utils/smooth-scroll.util';
import { PageLayout } from './layout/page-layout/page-layout';

@Component({
  selector: 'app-root',
  imports: [PageLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly disposeSmoothScroll =
    isPlatformBrowser(this.platformId) && this.document.defaultView
      ? enableSmoothScroll(this.document, this.document.defaultView)
      : undefined;

  ngOnDestroy(): void {
    this.disposeSmoothScroll?.();
  }
}
