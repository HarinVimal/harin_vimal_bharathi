import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAVBAR_ASSETS } from '../../../core/config/navigation.config';
import { prefersReducedMotion, scrollToSection } from '../../../core/utils/scroll.util';

type HeroStatIcon = 'experience' | 'projects' | 'satisfaction';

interface HeroStat {
  readonly value: string;
  readonly label: string;
  readonly icon: HeroStatIcon;
}

interface HeroContent {
  readonly eyebrow: string;
  readonly rolePhrases: readonly string[];
  readonly description: string;
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
  readonly stats: readonly HeroStat[];
}

/** All editable left-column copy lives here, so the template stays structural. */
const HERO_CONTENT: HeroContent = {
  eyebrow: "HELLO, I'M HARIN",
  rolePhrases: ['Frontend Developer', 'Backend Developer', 'Flutter Developer'],
  description:
    "I'm Harin Vimal Bharathi J, a Full Stack Developer passionate about building scalable, reliable, and user-friendly applications. I specialize in transforming complex business requirements into elegant digital solutions.",
  primaryCtaLabel: 'Explore My Work',
  secondaryCtaLabel: 'Download CV',
  stats: [
    { value: '4.5+', label: 'Years Experience', icon: 'experience' },
    { value: '20+', label: 'Projects Worked', icon: 'projects' },
    { value: '100%', label: 'Client Satisfaction', icon: 'satisfaction' },
  ],
};

const ROLE_START_DELAY_MS = 1200;
const ROLE_HOLD_MS = 1000;
const ROLE_TYPE_MS = 55;
const ROLE_DELETE_MS = 28;

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly heroRoot = viewChild.required<ElementRef<HTMLElement>>('heroRoot');
  private readonly primaryCta = viewChild.required<ElementRef<HTMLButtonElement>>('primaryCta');

  private animationContext?: gsap.Context;
  private roleTimer?: ReturnType<typeof setTimeout>;
  private roleIndex = 0;
  private rolePhase: 'hold' | 'delete' | 'type' = 'hold';

  readonly content = HERO_CONTENT;
  readonly cvUrl = NAVBAR_ASSETS.resumeUrl;
  readonly cvFileName = NAVBAR_ASSETS.resumeFileName;
  readonly typedRole = signal(HERO_CONTENT.rolePhrases[0]);
  readonly roleSummary = HERO_CONTENT.rolePhrases.join(', ');

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    this.runIntroSequence();
    this.roleTimer = setTimeout(() => this.advanceRoleTyping(), ROLE_START_DELAY_MS);
  }

  scrollToWork(): void {
    scrollToSection('projects');
  }

  onPrimaryPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) {
      return;
    }

    const button = this.primaryCta().nativeElement;
    const bounds = button.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;

    button.style.setProperty('--magnetic-x', `${this.clampMagnet(x)}px`);
    button.style.setProperty('--magnetic-y', `${this.clampMagnet(y)}px`);
  }

  onPrimaryPointerLeave(): void {
    const button = this.primaryCta().nativeElement;
    button.style.removeProperty('--magnetic-x');
    button.style.removeProperty('--magnetic-y');
  }

  private runIntroSequence(): void {
    const root = this.heroRoot().nativeElement;
    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 0.6 } })
        .from('.hero__eyebrow-line', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.5,
        })
        .from('.hero__eyebrow-text', { autoAlpha: 0, y: 10, duration: 0.45 }, '-=0.3')
        .from(
          '.hero__heading-text',
          { yPercent: 110, autoAlpha: 0, duration: 0.7, stagger: 0.14 },
          '-=0.35',
        )
        .from('.hero__description', { autoAlpha: 0, y: 16, duration: 0.55 }, '-=0.3')
        .from(
          '.hero__cta',
          {
            autoAlpha: 0,
            y: 14,
            duration: 0.5,
            stagger: 0.09,
            // Hand the buttons back to the CSS magnetic/hover transforms.
            clearProps: 'transform',
          },
          '-=0.42',
        )
        .from('.hero__stat', { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.08 }, '-=0.4');

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .to('.hero__content', { y: -48, autoAlpha: 0.35, ease: 'none' }, 0);
    }, root);
  }

  /** Hold the completed role, delete it, then type the next phrase. */
  private advanceRoleTyping(): void {
    const typed = this.typedRole();

    if (this.rolePhase === 'hold') {
      this.roleTimer = setTimeout(() => {
        this.rolePhase = 'delete';
        this.advanceRoleTyping();
      }, ROLE_HOLD_MS);
      return;
    }

    if (this.rolePhase === 'delete') {
      if (typed.length > 0) {
        this.typedRole.set(typed.slice(0, -1));
        this.roleTimer = setTimeout(() => this.advanceRoleTyping(), ROLE_DELETE_MS);
        return;
      }

      this.roleIndex = (this.roleIndex + 1) % this.content.rolePhrases.length;
      this.rolePhase = 'type';
    }

    const nextPhrase = this.content.rolePhrases[this.roleIndex];
    const nextLength = this.typedRole().length + 1;
    this.typedRole.set(nextPhrase.slice(0, nextLength));

    if (nextLength < nextPhrase.length) {
      this.roleTimer = setTimeout(() => this.advanceRoleTyping(), ROLE_TYPE_MS);
      return;
    }

    this.rolePhase = 'hold';
    this.roleTimer = setTimeout(() => this.advanceRoleTyping(), ROLE_HOLD_MS);
  }

  private clampMagnet(value: number): number {
    return Math.min(6, Math.max(-6, value));
  }

  private dispose(): void {
    if (this.roleTimer !== undefined) {
      clearTimeout(this.roleTimer);
      this.roleTimer = undefined;
    }

    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
