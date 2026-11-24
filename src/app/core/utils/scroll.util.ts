import { HOME_SECTION_FALLBACK_ID, NAVBAR_METRICS } from '../config/navigation.config';

/** True when the visitor asked the OS to minimise non-essential motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Resolves a public navigation id to a real DOM section. */
export function resolveSectionElement(sectionId: string): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const directMatch = document.getElementById(sectionId);
  if (directMatch) {
    return directMatch;
  }

  return sectionId === 'home' ? document.getElementById(HOME_SECTION_FALLBACK_ID) : null;
}

/** Reads the live navbar height so anchor offsets stay correct when it shrinks. */
export function getNavbarHeight(): number {
  if (typeof document === 'undefined') {
    return NAVBAR_METRICS.defaultHeight;
  }

  const header = document.querySelector('.site-header');
  return header instanceof HTMLElement
    ? header.getBoundingClientRect().height
    : NAVBAR_METRICS.defaultHeight;
}

/** Smoothly scrolls to a section while keeping it clear of the fixed navbar. */
export function scrollToSection(sectionId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const target = resolveSectionElement(sectionId);
  if (!target) {
    return;
  }

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - getNavbarHeight());

  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  window.history.replaceState(null, '', `#${sectionId}`);
}
