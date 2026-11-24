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
  viewChild,
} from '@angular/core';
import { Award, Download, ExternalLink, LucideAngularModule, X } from 'lucide-angular';
import { Certification } from '../../../data/certifications.data';

@Component({
  selector: 'app-certificate-preview-modal',
  imports: [LucideAngularModule],
  templateUrl: './certificate-preview-modal.html',
  styleUrl: './certificate-preview-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onBackdropClick($event)',
    '(document:keydown.escape)': 'requestClose()',
    '(document:keydown.tab)': 'onTab($event)',
  },
})
export class CertificatePreviewModal implements AfterViewInit, OnDestroy {
  readonly certification = input.required<Certification>();
  readonly closed = output<void>();

  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLElement>>('dialog');
  private readonly closeButton = viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');

  private previouslyFocused: HTMLElement | null = null;
  private previousOverflow = '';

  readonly closeIcon = X;
  readonly downloadIcon = Download;
  readonly externalIcon = ExternalLink;
  readonly awardIcon = Award;

  readonly sourcePath = computed(
    () => this.certification().imagePath ?? this.certification().pdfPath,
  );
  readonly isPdf = computed(
    () => !this.certification().imagePath && Boolean(this.certification().pdfPath),
  );

  ngAfterViewInit(): void {
    this.previouslyFocused =
      this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.closeButton().nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = this.previousOverflow;
    this.previouslyFocused?.focus();
  }

  requestClose(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.requestClose();
    }
  }

  onTab(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const focusables = this.dialog().nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables.length) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.document.activeElement;

    if (keyboardEvent.shiftKey && active === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && active === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }
}
