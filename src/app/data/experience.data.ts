export type ExperienceIcon = 'briefcase' | 'building' | 'calendar';

export interface ExperienceEntry {
  readonly id: string;
  readonly companyName: string;
  readonly jobTitle: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly isCurrent: boolean;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly icon: ExperienceIcon;
}

export type ExperienceHighlightIcon = 'chart' | 'code' | 'shield' | 'users';

export interface ExperienceHighlight {
  readonly title: string;
  readonly description: string;
  readonly icon: ExperienceHighlightIcon;
}

/** Career history is limited to the roles listed on the current resume. */
export const EXPERIENCE_DATA: readonly ExperienceEntry[] = [
  {
    id: 'techcedence',
    companyName: 'Techcedence Infosystems Pvt. Ltd.',
    jobTitle: 'Senior Software Engineer',
    startDate: 'Mar 2025',
    endDate: 'Present',
    isCurrent: true,
    description:
      'Leading enterprise feature development for Jimani, a multi-tenant SaaS platform, and independently delivering an ANPR-based warehouse security system with vehicle tracking, dispute workflows and reporting.',
    technologies: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server', 'CQRS', 'REST APIs'],
    icon: 'briefcase',
  },
  {
    id: 'rnd-softech',
    companyName: 'RND Softech Pvt. Ltd.',
    jobTitle: 'Software Developer L2',
    startDate: 'Jul 2022',
    endDate: 'Mar 2025',
    isCurrent: false,
    description:
      'Built and maintained enterprise finance, HRMS and insurance voice-process applications using ASP.NET MVC, Web Forms, C#, SQL Server and MySQL, with a focus on reliable modules and faster reporting.',
    technologies: ['ASP.NET MVC', 'Web Forms', 'C#', 'SQL Server', 'MySQL', 'Web API'],
    icon: 'building',
  },
];

/** Panel copy stays factual to the technologies and domains on the resume. */
export const EXPERIENCE_HIGHLIGHTS: readonly ExperienceHighlight[] = [
  {
    title: 'Enterprise Applications',
    description: 'Multi-tenant SaaS, warehouse security, finance and HRMS platforms.',
    icon: 'chart',
  },
  {
    title: 'Full Stack Delivery',
    description: 'C# / .NET backends, responsive frontends, SQL Server and MySQL.',
    icon: 'code',
  },
  {
    title: 'System Design',
    description: 'CQRS, REST APIs, EF Core and optimized database design.',
    icon: 'shield',
  },
  {
    title: 'Team Collaboration',
    description: 'Five-member delivery teams, production support and shared ownership.',
    icon: 'users',
  },
];
