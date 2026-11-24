import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  PLATFORM_ID,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { NAVBAR_ASSETS, NAVBAR_METRICS } from '../../core/config/navigation.config';
import { ThemeService } from '../../core/services/theme.service';
import { prefersReducedMotion, scrollToSection } from '../../core/utils/scroll.util';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [NgTemplateOutlet, Navigation],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  private readonly mobileNavigation = viewChild<Navigation>('mobileNavigation');

  private scrollFrameId = 0;
  private focusFrameId = 0;
  private previousBodyOverflow: string | null = null;
  private stopScrollListening: (() => void) | null = null;

  readonly themeService = inject(ThemeService);
  readonly cvUrl = NAVBAR_ASSETS.resumeUrl;
  readonly cvFileName = NAVBAR_ASSETS.resumeFileName;
  readonly logoUrl = NAVBAR_ASSETS.logoSource;

  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);
  readonly magneticOffset = signal({ x: 0, y: 0 });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeScrollState();
    }

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.scrollFrameId);
      cancelAnimationFrame(this.focusFrameId);
      this.stopScrollListening?.();
      this.restoreBodyScroll();
    });
  }

  onHomeClick(event: Event): void {
    event.preventDefault();
    this.closeMenu();
    scrollToSection('home');
  }

  onTalkClick(): void {
    this.closeMenu();
    scrollToSection('contact');
  }

  toggleMenu(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
      return;
    }

    this.isMenuOpen.set(true);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.previousBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.focusFrameId = requestAnimationFrame(() => this.mobileNavigation()?.focusFirstLink());
  }

  closeMenu(): void {
    if (!this.isMenuOpen()) {
      return;
    }
    this.isMenuOpen.set(false);
    this.restoreBodyScroll();
  }

  onMenuKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const panel = event.currentTarget;
    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const focusableElements = [
      ...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ].filter((element) => element.getClientRects().length > 0);
    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && this.document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && this.document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  onCtaPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) {
      return;
    }

    const button = event.currentTarget;
    if (!(button instanceof HTMLElement)) {
      return;
    }

    const bounds = button.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;

    this.magneticOffset.set({
      x: this.clampMagneticOffset(offsetX),
      y: this.clampMagneticOffset(offsetY),
    });
  }

  onCtaPointerLeave(): void {
    this.magneticOffset.set({ x: 0, y: 0 });
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.isMenuOpen()) {
      return;
    }

    event.preventDefault();
    this.closeMenu();
    this.focusFrameId = requestAnimationFrame(() => this.menuToggle()?.nativeElement.focus());
  }

  private initializeScrollState(): void {
    const updateScrollState = () => {
      if (this.scrollFrameId) {
        return;
      }
      this.scrollFrameId = requestAnimationFrame(() => {
        this.scrollFrameId = 0;
        this.isScrolled.set(window.scrollY > NAVBAR_METRICS.scrollThreshold);
      });
    };

    updateScrollState();
    this.stopScrollListening = this.renderer.listen('window', 'scroll', updateScrollState, {
      passive: true,
    });
  }

  private restoreBodyScroll(): void {
    if (this.previousBodyOverflow === null) {
      return;
    }
    this.document.body.style.overflow = this.previousBodyOverflow;
    this.previousBodyOverflow = null;
  }

  private clampMagneticOffset(value: number): number {
    return Math.min(6, Math.max(-6, value));
  }
}
