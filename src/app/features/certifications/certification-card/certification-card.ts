import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  FileText,
  LucideAngularModule,
} from 'lucide-angular';
import { Certification } from '../../../data/certifications.data';

@Component({
  selector: 'app-certification-card',
  imports: [LucideAngularModule],
  templateUrl: './certification-card.html',
  styleUrl: './certification-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationCard {
  readonly certification = input.required<Certification>();
  readonly view = output<Certification>();

  readonly imageFailed = signal(false);

  readonly arrowIcon = ArrowUpRight;
  readonly awardIcon = Award;
  readonly badgeCheckIcon = BadgeCheck;
  readonly calendarIcon = CalendarDays;
  readonly externalIcon = ExternalLink;
  readonly fileIcon = FileText;

  readonly issuerInitial = computed(() => this.certification().issuer.charAt(0).toUpperCase());
  readonly imageAlt = computed(
    () =>
      `Certificate preview for ${this.certification().title} issued by ${this.certification().issuer}`,
  );
  readonly hasVerification = computed(() => Boolean(this.certification().verificationUrl));

  onImageError(): void {
    this.imageFailed.set(true);
  }
}
