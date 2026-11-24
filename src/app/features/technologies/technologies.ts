import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../core/utils/scroll.util';
import {
  TECHNOLOGIES_DATA,
  TECHNOLOGY_CATEGORIES,
  TechnologyCategoryId,
} from '../../data/technologies.data';
import { TechnologyCard } from '../../shared/components/technology-card/technology-card';
import { TechnologyFilters } from './technology-filters/technology-filters';

@Component({
  selector: 'app-technologies',
  imports: [TechnologyFilters, TechnologyCard],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Technologies implements AfterViewInit, AfterViewChecked {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly techRoot = viewChild.required<ElementRef<HTMLElement>>('techRoot');

  private animationContext?: gsap.Context;
  private pendingFilterAnimation = false;

  readonly activeCategory = signal<TechnologyCategoryId>('all');
  readonly activeCategoryLabel = computed(
    () =>
      TECHNOLOGY_CATEGORIES.find((category) => category.id === this.activeCategory())?.label ??
      'All',
  );
  readonly visibleTechnologies = computed(() => {
    const category = this.activeCategory();
    return TECHNOLOGIES_DATA.filter(
      (technology) => category === 'all' || technology.category === category,
    ).sort((first, second) => first.displayOrder - second.displayOrder);
  });

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
            trigger: this.techRoot().nativeElement,
            start: 'top 80%',
            once: true,
          },
        })
        .from('.tech-eyebrow', { autoAlpha: 0, y: 10, duration: 0.45 })
        .from('.tech-heading', { autoAlpha: 0, y: 18, duration: 0.6 }, '-=0.25')
        .from('app-technology-filters', { autoAlpha: 0, y: 10, duration: 0.45 }, '-=0.35')
        .from(
          '.technology-card',
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.42,
            stagger: 0.035,
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.2',
        );
    }, this.techRoot().nativeElement);
  }

  ngAfterViewChecked(): void {
    if (!this.pendingFilterAnimation) {
      return;
    }

    this.pendingFilterAnimation = false;

    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    const cards = this.techRoot().nativeElement.querySelectorAll('.technology-card');
    if (!cards.length) {
      return;
    }

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.36,
        stagger: 0.028,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'opacity,visibility,transform',
      },
    );
  }

  onCategoryChange(category: TechnologyCategoryId): void {
    if (category === this.activeCategory()) {
      return;
    }

    this.activeCategory.set(category);
    this.pendingFilterAnimation = true;
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
