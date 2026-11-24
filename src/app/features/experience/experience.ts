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
import { EXPERIENCE_DATA, EXPERIENCE_HIGHLIGHTS } from '../../data/experience.data';
import { prefersReducedMotion } from '../../core/utils/scroll.util';
import { ExperienceHighlights } from './experience-highlights/experience-highlights';
import { ExperienceTimeline } from './experience-timeline/experience-timeline';

@Component({
  selector: 'app-experience',
  imports: [ExperienceTimeline, ExperienceHighlights],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly experienceRoot = viewChild.required<ElementRef<HTMLElement>>('experienceRoot');

  private animationContext?: gsap.Context;

  readonly entries = EXPERIENCE_DATA;
  readonly highlights = EXPERIENCE_HIGHLIGHTS;

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = this.experienceRoot().nativeElement;

    this.animationContext = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            once: true,
          },
        })
        .from('.experience-eyebrow', { autoAlpha: 0, y: 10, duration: 0.45 })
        .from('.experience-heading', { autoAlpha: 0, y: 18, duration: 0.6 }, '-=0.25')
        .from(
          'app-experience-highlights',
          {
            autoAlpha: 0,
            x: 30,
            duration: 0.65,
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.35',
        )
        .from(
          '.experience-highlight',
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.4,
            stagger: 0.09,
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.42',
        )
        .to(
          '.experience-timeline__rail-fill',
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '-=0.6',
        )
        .from(
          '.experience-entry__marker',
          {
            scale: 0.35,
            autoAlpha: 0,
            duration: 0.42,
            stagger: 0.22,
            ease: 'back.out(2.2)',
          },
          '<0.08',
        )
        .from(
          '.experience-entry',
          {
            autoAlpha: 0,
            y: 15,
            x: 10,
            duration: 0.5,
            stagger: 0.22,
            clearProps: 'opacity,visibility,transform',
          },
          '<0.1',
        )
        .fromTo(
          '.experience-entry__marker-glow',
          { opacity: 0.25 },
          {
            opacity: 0.85,
            duration: 0.55,
            stagger: 0.22,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
            clearProps: 'opacity',
          },
          '<0.12',
        );
    }, root);
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
