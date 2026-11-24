import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownToLine, FileText, LucideAngularModule } from 'lucide-angular';
import { NAVBAR_ASSETS } from '../../core/config/navigation.config';
import { prefersReducedMotion } from '../../core/utils/scroll.util';

@Component({
  selector: 'app-resume',
  imports: [LucideAngularModule],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resume implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly resumeRoot = viewChild.required<ElementRef<HTMLElement>>('resumeRoot');

  private animationContext?: gsap.Context;

  readonly fileTextIcon = FileText;
  readonly downloadIcon = ArrowDownToLine;
  readonly resumeUrl = NAVBAR_ASSETS.resumeUrl;
  readonly resumeFileName = NAVBAR_ASSETS.resumeFileName;
  readonly backgroundImageUrl = '/images/background/resume_background.png';

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = this.resumeRoot().nativeElement;

    this.animationContext = gsap.context(() => {
      gsap.from('.resume-banner', {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          once: true,
        },
      });
    }, root);
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
