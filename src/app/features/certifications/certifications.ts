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
import { ChevronDown, ChevronUp, LucideAngularModule, Sparkles } from 'lucide-angular';
import { prefersReducedMotion } from '../../core/utils/scroll.util';
import {
  CERTIFICATIONS_DATA,
  CERTIFICATION_CATEGORIES,
  Certification,
  CertificationFilterId,
} from '../../data/certifications.data';
import { CertificatePreviewModal } from './certificate-preview-modal/certificate-preview-modal';
import { CertificationCard } from './certification-card/certification-card';
import {
  CertificationFilter,
  CertificationFilters,
} from './certification-filters/certification-filters';

const INITIAL_VISIBLE_COUNT = 6;

@Component({
  selector: 'app-certifications',
  imports: [LucideAngularModule, CertificationFilters, CertificationCard, CertificatePreviewModal],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Certifications implements AfterViewInit, AfterViewChecked {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly certificationsRoot =
    viewChild.required<ElementRef<HTMLElement>>('certificationsRoot');

  private animationContext?: gsap.Context;
  private pendingGridAnimation = false;

  readonly sparkleIcon = Sparkles;
  readonly chevronDownIcon = ChevronDown;
  readonly chevronUpIcon = ChevronUp;

  readonly activeFilter = signal<CertificationFilterId>('all');
  readonly showAll = signal(false);
  readonly selectedCertification = signal<Certification | null>(null);

  readonly filters = computed<readonly CertificationFilter[]>(() => [
    { id: 'all', label: 'All' },
    ...CERTIFICATION_CATEGORIES.map((category) => ({
      id: category.id as CertificationFilterId,
      label: category.label,
    })),
  ]);

  readonly filteredCertifications = computed(() => {
    const filter = this.activeFilter();
    return CERTIFICATIONS_DATA.filter(
      (certification) => filter === 'all' || certification.category === filter,
    );
  });

  readonly visibleCertifications = computed(() =>
    this.showAll()
      ? this.filteredCertifications()
      : this.filteredCertifications().slice(0, INITIAL_VISIBLE_COUNT),
  );

  readonly hasMore = computed(() => this.filteredCertifications().length > INITIAL_VISIBLE_COUNT);
  readonly activeFilterLabel = computed(
    () => this.filters().find((filter) => filter.id === this.activeFilter())?.label ?? 'All',
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = this.certificationsRoot().nativeElement;

    this.animationContext = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            once: true,
          },
        })
        .from('.certifications__eyebrow', { autoAlpha: 0, y: 10, duration: 0.45 })
        .from('.certifications__heading', { autoAlpha: 0, y: 18, duration: 0.6 }, '-=0.25')
        .from('.certifications__intro', { autoAlpha: 0, y: 12, duration: 0.5 }, '-=0.35')
        .from(
          'app-certification-filters button',
          { autoAlpha: 0, y: 8, duration: 0.35, stagger: 0.05 },
          '-=0.25',
        )
        .from(
          'app-certification-card',
          {
            autoAlpha: 0,
            y: 18,
            scale: 0.97,
            duration: 0.5,
            stagger: 0.08,
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.2',
        );
    }, root);
  }

  ngAfterViewChecked(): void {
    if (!this.pendingGridAnimation) {
      return;
    }

    this.pendingGridAnimation = false;

    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    const cards =
      this.certificationsRoot().nativeElement.querySelectorAll('app-certification-card');
    if (!cards.length) {
      return;
    }

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 14, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'opacity,visibility,transform',
      },
    );
  }

  onFilterChange(filter: CertificationFilterId): void {
    if (filter === this.activeFilter()) {
      return;
    }

    this.activeFilter.set(filter);
    this.showAll.set(false);
    this.pendingGridAnimation = true;
  }

  toggleShowAll(): void {
    this.showAll.update((value) => !value);
    this.pendingGridAnimation = true;
  }

  openPreview(certification: Certification): void {
    this.selectedCertification.set(certification);
  }

  closePreview(): void {
    this.selectedCertification.set(null);
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
