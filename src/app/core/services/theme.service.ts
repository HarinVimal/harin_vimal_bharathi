import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type AppTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'hvb-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeState = signal<AppTheme>(this.resolveInitialTheme());

  readonly theme = this.themeState.asReadonly();
  readonly isDark = () => this.themeState() === 'dark';

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const theme = this.themeState();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.document.documentElement.style.colorScheme = theme;

      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch {
        // Storage may be blocked; the in-memory signal still works.
      }
    });
  }

  toggleTheme(): void {
    this.themeState.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: AppTheme): void {
    this.themeState.set(theme);
  }

  private resolveInitialTheme(): AppTheme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    const stored = this.readStoredTheme();
    if (stored) {
      return stored;
    }

    // The inline boot script already set this attribute before Angular started.
    const bootTheme = this.document.documentElement.dataset['theme'];
    if (bootTheme === 'light' || bootTheme === 'dark') {
      return bootTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private readStoredTheme(): AppTheme | null {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
      return null;
    }
  }
}
