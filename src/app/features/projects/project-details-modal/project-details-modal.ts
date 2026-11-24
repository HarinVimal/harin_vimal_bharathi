import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  Building2,
  Check,
  CircleCheck,
  Cpu,
  Database,
  ExternalLink,
  Github,
  LucideAngularModule,
  LucideIconData,
  PlugZap,
  Sparkles,
  Trophy,
  Workflow,
  X,
} from 'lucide-angular';
import { prefersReducedMotion } from '../../../core/utils/scroll.util';
import { NO_PROJECT_METRICS_NOTE, ProjectData } from '../../../data/projects.data';
import { TechnologyBadge } from '../../../shared/components/technology-badge/technology-badge';

const CLOSE_ANIMATION_MS = 200;

@Component({
  selector: 'app-project-details-modal',
  imports: [LucideAngularModule, TechnologyBadge],
  templateUrl: './project-details-modal.html',
  styleUrl: './project-details-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onBackdropClick($event)',
    '(document:keydown.tab)': 'onTab($event)',
    '[class.project-modal--closing]': 'isClosing()',
  },
})
export class ProjectDetailsModal implements AfterViewInit, OnDestroy {
  readonly project = input.required<ProjectData>();
  readonly closed = output<void>();

  private readonly document = inject(DOCUMENT);
  private readonly overlay = viewChild.required<ElementRef<HTMLDialogElement>>('overlay');
  private readonly dialogPanel = viewChild.required<ElementRef<HTMLElement>>('dialog');
  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');

  private previouslyFocused: HTMLElement | null = null;
  private previousOverflow = '';
  private closeTimer: number | undefined;

  readonly isClosing = signal(false);
  readonly noMetricsNote = NO_PROJECT_METRICS_NOTE;

  readonly closeIcon = X;
  readonly sparkleIcon = Sparkles;
  readonly featureIcon = CircleCheck;
  readonly responsibilityIcon = Check;
  readonly achievementIcon = Trophy;
  readonly companyIcon = Building2;
  readonly liveIcon = ExternalLink;
  readonly repositoryIcon = Github;

  readonly highlightIcons: readonly LucideIconData[] = [Cpu, Sparkles, Database, PlugZap, Workflow];

  readonly independentResponsibilities = computed(() =>
    this.project().responsibilities.filter((item) => item.contribution === 'independent'),
  );
  readonly collaborativeResponsibilities = computed(() =>
    this.project().responsibilities.filter((item) => item.contribution === 'collaborative'),
  );
  readonly hasAchievements = computed(() => this.project().achievements.length > 0);
  readonly coverAlt = computed(
    () => `Illustrative cover artwork for ${this.project().title}; not an application screenshot`,
  );

  ngAfterViewInit(): void {
    this.previouslyFocused =
      this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.overlay().nativeElement.showModal();
    this.closeButton().nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.closeTimer !== undefined) {
      window.clearTimeout(this.closeTimer);
    }
    const overlay = this.overlay().nativeElement;
    if (overlay.open) {
      overlay.close();
    }
    this.document.body.style.overflow = this.previousOverflow;
    this.previouslyFocused?.focus();
  }

  iconForHighlight(index: number): LucideIconData {
    return this.highlightIcons[index % this.highlightIcons.length];
  }

  requestClose(): void {
    if (this.isClosing()) {
      return;
    }

    if (prefersReducedMotion()) {
      this.closed.emit();
      return;
    }

    this.isClosing.set(true);
    this.closeTimer = window.setTimeout(() => this.closed.emit(), CLOSE_ANIMATION_MS);
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.overlay().nativeElement) {
      this.requestClose();
    }
  }

  onTab(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const focusables = Array.from(
      this.dialogPanel().nativeElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);

    if (!focusables.length) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.document.activeElement;

    if (!this.dialogPanel().nativeElement.contains(active)) {
      keyboardEvent.preventDefault();
      first.focus();
      return;
    }

    if (keyboardEvent.shiftKey && active === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && active === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }
}
