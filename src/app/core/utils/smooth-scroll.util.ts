import { prefersReducedMotion } from './scroll.util';

const LINE_HEIGHT_PX = 18;
const PAGE_HEIGHT_RATIO = 0.9;
const LERP_FACTOR = 0.14;
const MIN_DELTA_PX = 0.5;
const PROGRAMMATIC_SCROLL_GRACE_MS = 120;

/** True when the event target sits inside a scrollable area that should keep native scrolling. */
function hasScrollableAncestor(doc: Document, target: EventTarget | null, deltaY: number): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  let element: HTMLElement | null = target instanceof HTMLElement ? target : target.parentElement;
  while (element && element !== doc.documentElement) {
    const overflowY = getComputedStyle(element).overflowY;
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      element.scrollHeight > element.clientHeight
    ) {
      const atTop = element.scrollTop <= 0;
      const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
        return true;
      }
    }
    element = element.parentElement;
  }

  return false;
}

/**
 * Eases wheel/trackpad scrolling for the document while leaving touch scrolling,
 * zoom, nested scroll areas and reduced-motion users on native behaviour.
 */
export function enableSmoothScroll(doc: Document, win: Window): () => void {
  let targetScroll = win.scrollY;
  let frame = 0;
  let isAnimating = false;
  let lastProgrammaticScrollAt = 0;

  const maxScroll = (): number => Math.max(0, doc.documentElement.scrollHeight - win.innerHeight);

  const tick = (): void => {
    const current = win.scrollY;
    const distance = targetScroll - current;

    lastProgrammaticScrollAt = win.performance.now();

    if (Math.abs(distance) < MIN_DELTA_PX) {
      win.scrollTo(0, targetScroll);
      isAnimating = false;
      frame = 0;
      return;
    }

    win.scrollTo(0, current + distance * LERP_FACTOR);
    frame = win.requestAnimationFrame(tick);
  };

  const onWheel = (event: WheelEvent): void => {
    if (
      prefersReducedMotion() ||
      doc.body.style.overflow === 'hidden' ||
      event.ctrlKey ||
      event.defaultPrevented ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ) {
      return;
    }

    if (hasScrollableAncestor(doc, event.target, event.deltaY)) {
      return;
    }

    let delta = event.deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
      delta *= LINE_HEIGHT_PX;
    } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
      delta *= win.innerHeight * PAGE_HEIGHT_RATIO;
    }

    if (!delta) {
      return;
    }

    event.preventDefault();

    if (!isAnimating) {
      targetScroll = win.scrollY;
      isAnimating = true;
    }

    targetScroll = Math.min(Math.max(targetScroll + delta, 0), maxScroll());

    if (!frame) {
      frame = win.requestAnimationFrame(tick);
    }
  };

  const onScroll = (): void => {
    if (win.performance.now() - lastProgrammaticScrollAt < PROGRAMMATIC_SCROLL_GRACE_MS) {
      return;
    }

    // A scroll from the scrollbar, keyboard or navigation should take over.
    targetScroll = win.scrollY;
    isAnimating = false;
    if (frame) {
      win.cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  win.addEventListener('wheel', onWheel, { passive: false });
  win.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    win.removeEventListener('wheel', onWheel);
    win.removeEventListener('scroll', onScroll);
    if (frame) {
      win.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
