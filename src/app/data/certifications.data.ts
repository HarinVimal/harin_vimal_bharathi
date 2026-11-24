export type CertificationCategoryId =
  'cloud-devops' | 'backend' | 'database' | 'ai-learning' | 'frontend' | 'other';

export type CertificationFilterId = 'all' | CertificationCategoryId;

export interface CertificationCategory {
  readonly id: CertificationCategoryId;
  readonly label: string;
}

export interface Certification {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly issueDate?: string;
  readonly category: CertificationCategoryId;
  readonly imagePath?: string;
  readonly pdfPath?: string;
  readonly credentialId?: string;
  readonly verificationUrl?: string;
  readonly issuerLogo?: string;
  readonly isFeatured?: boolean;
  readonly description?: string;
}

const CATEGORY_LABELS: Record<CertificationCategoryId, string> = {
  'cloud-devops': 'Cloud & DevOps',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  'ai-learning': 'AI & Learning',
  other: 'Other',
};

/** Credentials are taken directly from the resume's Certifications section. */
export const CERTIFICATIONS_DATA: readonly Certification[] = [
  {
    id: 'android-development',
    title: 'Android Development Certification',
    issuer: 'Gateway Software Solutions',
    category: 'other',
    isFeatured: false,
  },
  {
    id: 'research-trends-conference',
    title: 'International Conference on Research Trends in Computing Technologies',
    issuer: 'Conference Participation',
    category: 'other',
    isFeatured: false,
    description:
      'Participated in the International Conference on Research Trends in Computing Technologies.',
  },
];

/** Filters are derived from the data so empty categories are never rendered. */
export const CERTIFICATION_CATEGORIES: readonly CertificationCategory[] = [
  ...new Set(CERTIFICATIONS_DATA.map((certification) => certification.category)),
].map((id) => ({ id, label: CATEGORY_LABELS[id] }));
