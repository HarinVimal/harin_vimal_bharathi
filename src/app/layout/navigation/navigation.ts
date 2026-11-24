import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  input,
  output,
  PLATFORM_ID,
  Renderer2,
  signal,
} from '@angular/core';
import {
  HOME_SECTION_FALLBACK_ID,
  NAVIGATION_ITEMS,
  type NavigationItem,
} from '../../core/config/navigation.config';
import {
  getNavbarHeight,
  resolveSectionElement,
  scrollToSection,
} from '../../core/utils/scroll.util';

export type NavigationVariant = 'desktop' | 'mobile';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly sectionElements = new Map<string, HTMLElement>();
  private readonly visibleSections = new Map<string, IntersectionObserverEntry>();
  private observer: IntersectionObserver | null = null;
  private sectionDomObserver: MutationObserver | null = null;
  private frameId = 0;
  private stopScrollListening: (() => void) | null = null;

  readonly variant = input<NavigationVariant>('desktop');
  readonly linkSelected = output<void>();

  @HostBinding('class.navigation-mobile')
  get isMobileVariant(): boolean {
    return this.variant() === 'mobile';
  }

  readonly navigationItems = NAVIGATION_ITEMS;
  readonly activeSectionId = signal<string>(NAVIGATION_ITEMS[0]?.sectionId ?? 'home');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.stopScrollListening = this.renderer.listen(
        'window',
        'scroll',
        () => this.scheduleActiveUpdate(),
        { passive: true },
      );
      afterNextRender(() => this.initializeActiveTracking());
    }

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
      this.sectionDomObserver?.disconnect();
      this.stopScrollListening?.();
      cancelAnimationFrame(this.frameId);
    });
  }

  onLinkClick(event: Event, item: NavigationItem): void {
    event.preventDefault();
    this.activeSectionId.set(item.sectionId);
    this.linkSelected.emit();
    scrollToSection(item.sectionId);
  }

  focusFirstLink(): void {
    this.host.nativeElement.querySelector<HTMLAnchorElement>('.navigation-link')?.focus();
  }

  entranceDelay(index: number): string {
    const delay = this.variant() === 'mobile' ? 0.07 + index * 0.045 : 0.16 + index * 0.055;
    return `${delay.toFixed(3)}s`;
  }

  private initializeActiveTracking(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.collectSectionElements();

    // The routed Home component renders after this layout component, so wait
    // for its sections to land in the DOM before wiring the observers.
    if (this.sectionElements.size === 0) {
      if (typeof MutationObserver !== 'undefined' && !this.sectionDomObserver) {
        this.sectionDomObserver = new MutationObserver(() => {
          this.collectSectionElements();
          if (this.sectionElements.size > 0) {
            this.sectionDomObserver?.disconnect();
            this.sectionDomObserver = null;
            this.initializeActiveTracking();
          }
        });
        this.sectionDomObserver.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }
      return;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const sectionId = this.sectionIdForElement(entry.target);
            if (!sectionId) {
              continue;
            }
            if (entry.isIntersecting) {
              this.visibleSections.set(sectionId, entry);
            } else {
              this.visibleSections.delete(sectionId);
            }
          }
          this.updateActiveSection();
        },
        {
          root: null,
          rootMargin: `-${getNavbarHeight()}px 0px -55% 0px`,
          threshold: [0, 0.15, 0.5, 1],
        },
      );
      this.sectionElements.forEach((element) => this.observer?.observe(element));
    }

    this.updateActiveSection();
    this.restoreHashTarget();
  }

  private collectSectionElements(): void {
    for (const item of NAVIGATION_ITEMS) {
      const element = resolveSectionElement(item.sectionId);
      if (element) {
        this.sectionElements.set(item.sectionId, element);
      }
    }
  }

  private restoreHashTarget(): void {
    const hash = window.location.hash.replace('#', '');
    const isKnownSection = NAVIGATION_ITEMS.some((item) => item.sectionId === hash);
    if (isKnownSection) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }

  private scheduleActiveUpdate(): void {
    if (this.frameId) {
      return;
    }
    this.frameId = requestAnimationFrame(() => {
      this.frameId = 0;
      this.updateActiveSection();
    });
  }

  private updateActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const firstId = NAVIGATION_ITEMS[0]?.sectionId ?? 'home';
    const lastId = NAVIGATION_ITEMS.at(-1)?.sectionId ?? 'contact';
    const viewportHeight = window.innerHeight;

    const pageIsScrollable = document.documentElement.scrollHeight > viewportHeight + 8;
    const atPageEnd =
      pageIsScrollable &&
      window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 4;
    if (atPageEnd) {
      this.activeSectionId.set(lastId);
      return;
    }

    const activationLine = getNavbarHeight() + viewportHeight * 0.3;
    const intersectingIds = new Set(
      [...this.visibleSections.entries()]
        .filter(([, entry]) => entry.isIntersecting)
        .map(([sectionId]) => sectionId),
    );

    const sections = NAVIGATION_ITEMS.flatMap((item) => {
      const element = this.sectionElements.get(item.sectionId);
      return element ? [{ id: item.sectionId, top: element.getBoundingClientRect().top }] : [];
    });
    const candidates =
      intersectingIds.size > 0
        ? sections.filter((section) => intersectingIds.has(section.id))
        : sections;

    if (candidates.length === 0) {
      this.activeSectionId.set(firstId);
      return;
    }

    // The deepest section above the activation line is the one being read.
    let activeId = candidates.filter((section) => section.top <= activationLine).at(-1)?.id;
    activeId ??= [...candidates].sort((first, second) => first.top - second.top)[0]?.id;

    this.activeSectionId.set(activeId ?? firstId);
  }

  private sectionIdForElement(element: Element): string | null {
    return (
      NAVIGATION_ITEMS.find(
        (item) =>
          item.sectionId === element.id ||
          (item.sectionId === 'home' && element.id === HOME_SECTION_FALLBACK_ID),
      )?.sectionId ?? null
    );
  }
}
