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
import { Github, Linkedin, LucideAngularModule, Mail, MapPin } from 'lucide-angular';
import { prefersReducedMotion } from '../../core/utils/scroll.util';

interface ContactItem {
  readonly label: string;
  readonly value: string;
  readonly href?: string;
  readonly external?: boolean;
  readonly icon: typeof Mail;
}

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly contactRoot = viewChild.required<ElementRef<HTMLElement>>('contactRoot');

  private animationContext?: gsap.Context;

  readonly contactItems: readonly ContactItem[] = [
    {
      label: 'Email',
      value: 'harinvimalbharathi@gmail.com',
      href: 'mailto:harinvimalbharathi@gmail.com',
      icon: Mail,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/harinvimal',
      href: 'https://www.linkedin.com/in/harinvimal',
      external: true,
      icon: Linkedin,
    },
    {
      label: 'GitHub',
      value: 'github.com/HarinVimal',
      href: 'https://github.com/HarinVimal',
      external: true,
      icon: Github,
    },
    {
      label: 'Location',
      value: 'India',
      icon: MapPin,
    },
  ];

  constructor() {
    this.destroyRef.onDestroy(() => this.dispose());
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || prefersReducedMotion()) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const root = this.contactRoot().nativeElement;

    this.animationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });

      timeline
        .from('.contact-intro', { autoAlpha: 0, x: -28, duration: 0.7 })
        .from(
          '.contact-item',
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.12,
            clearProps: 'opacity,visibility,transform',
          },
          '-=0.35',
        )
        .from('.contact-divider', { scaleY: 0, transformOrigin: 'top center', duration: 0.6 }, 0.1);
    }, root);
  }

  private dispose(): void {
    this.animationContext?.revert();
    this.animationContext = undefined;
  }
}
