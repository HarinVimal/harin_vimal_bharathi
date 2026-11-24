/** Single source of truth for the footer branding and links. */
export type FooterSocialIcon = 'linkedin' | 'github';

export interface FooterSocialLink {
  readonly label: string;
  readonly icon: FooterSocialIcon;
  readonly url: string;
}

export const FOOTER_BRAND = {
  name: 'Harin Vimal Bharathi',
  designation: 'Full Stack Developer',
  homeSectionId: 'home',
} as const;

export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/harinvimal' },
  { label: 'GitHub', icon: 'github', url: 'https://github.com/HarinVimal' },
];
