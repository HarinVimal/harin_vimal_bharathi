/** Single source of truth for the primary navigation and its assets. */
export interface NavigationItem {
  readonly label: string;
  readonly sectionId: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About', sectionId: 'about' },
  { label: 'Skills', sectionId: 'technologies' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Certifications', sectionId: 'certifications' },
  { label: 'Resume', sectionId: 'resume' },
  { label: 'Contact', sectionId: 'contact' },
];

/** The hero section currently owns the id `hero`; `home` is the public anchor. */
export const HOME_SECTION_FALLBACK_ID = 'hero';

export const NAVBAR_ASSETS = {
  resumeUrl: '/documents/Harin_Vimal_Bharathi_Resume.pdf',
  resumeFileName: 'Harin_Vimal_Bharathi_Resume.pdf',
  // One canonical PNG is shared by the topbar logo and the favicon.
  logoSource: '/images/branding/hvb_portfolio_logo.png',
} as const;

export const NAVBAR_METRICS = {
  defaultHeight: 86,
  scrolledHeight: 76,
  scrollThreshold: 12,
} as const;
