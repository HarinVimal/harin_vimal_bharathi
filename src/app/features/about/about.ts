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
import { CircleCheck, LucideAngularModule } from 'lucide-angular';
import { ABOUT_CONTENT } from '../../data/about.data';
import { prefersReducedMotion } from '../../core/utils/scroll.util';
import { AboutHighlights } from './about-highlights/about-highlights';
import { WorkspaceVisual } from './workspace-visual/workspace-visual';

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule, WorkspaceVisual, AboutHighlights],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly aboutRoot = viewChild.required<ElementRef<HTMLElement>>('aboutRoot');

  private animationContext?: gsap.Context;

  readonly content = ABOUT_CONTENT;
  readonly checkIcon = CircleCheck;

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: this.aboutRoot().nativeElement,
            start: 'top 78%',
            once: true,
          },
        })
        .from('.workspace__frame', { autoAlpha: 0, x: -38, duration: 0.8 })
        .from('.workspace__card', { autoAlpha: 0, duration: 0.55 }, '-=0.42')
        .from('.about__eyebrow', { autoAlpha: 0, y: 12, duration: 0.5 }, '-=0.5')
        .from(
          '.about__heading-line',
          { autoAlpha: 0, y: 22, duration: 0.6, stagger: 0.12 },
          '-=0.3',
        )
        .from('.about__intro', { autoAlpha: 0, y: 16, duration: 0.55 }, '-=0.35')
        .from('.about__strength', { autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.08 }, '-=0.3')
        .from('.about-check', { scale: 0.5, autoAlpha: 0, duration: 0.35, stagger: 0.08 }, '-=0.4')
        .from('.about-highlight', { autoAlpha: 0, x: 14, duration: 0.45, stagger: 0.08 }, '-=0.35');
    }, this.aboutRoot().nativeElement);
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
