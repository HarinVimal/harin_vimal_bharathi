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
import { ChevronDown, ChevronUp, LucideAngularModule } from 'lucide-angular';
import { getNavbarHeight, prefersReducedMotion } from '../../core/utils/scroll.util';
import { PROJECTS_DATA, ProjectData } from '../../data/projects.data';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { ProjectDetailsModal } from './project-details-modal/project-details-modal';

const FEATURED_PROJECT_COUNT = 3;

const SORTED_PROJECTS: readonly ProjectData[] = [...PROJECTS_DATA].sort(
  (first, second) => first.displayOrder - second.displayOrder,
);

const FEATURED_PROJECT_IDS = new Set(
  SORTED_PROJECTS.filter((project) => project.featured)
    .slice(0, FEATURED_PROJECT_COUNT)
    .map((project) => project.id),
);

@Component({
  selector: 'app-projects',
  imports: [LucideAngularModule, ProjectCard, ProjectDetailsModal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects implements AfterViewInit, AfterViewChecked {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly projectsRoot = viewChild.required<ElementRef<HTMLElement>>('projectsRoot');

  private animationContext?: gsap.Context;
  private pendingExpansionAnimation = false;

  readonly chevronDownIcon = ChevronDown;
  readonly chevronUpIcon = ChevronUp;

  readonly showAll = signal(false);
  readonly selectedProject = signal<ProjectData | null>(null);

  readonly featuredProjects = computed(() =>
    SORTED_PROJECTS.filter((project) => FEATURED_PROJECT_IDS.has(project.id)),
  );
  readonly additionalProjects = computed(() =>
    SORTED_PROJECTS.filter((project) => !FEATURED_PROJECT_IDS.has(project.id)),
  );
  readonly totalProjectCount = SORTED_PROJECTS.length;
  readonly visibleProjectCount = computed(() =>
    this.showAll() ? this.totalProjectCount : this.featuredProjects().length,
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = this.projectsRoot().nativeElement;

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
        .from('.projects__eyebrow', { autoAlpha: 0, y: 10, duration: 0.45 })
        .from('.projects__heading', { autoAlpha: 0, y: 18, duration: 0.6 }, '-=0.25')
        .from('.projects__intro', { autoAlpha: 0, y: 12, duration: 0.5 }, '-=0.35')
        .from('.projects__toggle', { autoAlpha: 0, y: 10, duration: 0.45 }, '-=0.3')
        .from(
          '.projects__featured-grid app-project-card',
          {
            autoAlpha: 0,
            y: 22,
            scale: 0.97,
            duration: 0.55,
            stagger: 0.1,
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.2',
        );
    }, root);
  }

  ngAfterViewChecked(): void {
    if (!this.pendingExpansionAnimation) {
      return;
    }

    this.pendingExpansionAnimation = false;

    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    const cards = this.projectsRoot().nativeElement.querySelectorAll(
      '.projects__expanded-grid app-project-card',
    );
    if (!cards.length) {
      return;
    }

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 18, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.09,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'opacity,visibility,transform',
      },
    );
  }

  onProjectOpened(project: ProjectData): void {
    this.selectedProject.set(project);
  }

  closeModal(): void {
    this.selectedProject.set(null);
  }

  toggleProjects(): void {
    const expanding = !this.showAll();

    if (!expanding && isPlatformBrowser(this.platformId)) {
      this.keepSectionInView();
    }

    this.showAll.set(expanding);
    this.pendingExpansionAnimation = expanding;
  }

  private keepSectionInView(): void {
    const section = this.projectsRoot().nativeElement;
    const sectionTop = Math.max(
      0,
      section.getBoundingClientRect().top + window.scrollY - getNavbarHeight() - 12,
    );

    if (window.scrollY > sectionTop) {
      window.scrollTo({
        top: sectionTop,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    }
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
