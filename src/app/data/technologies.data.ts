export type TechnologyCategoryId = 'all' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

export type TechnologyGroupId = Exclude<TechnologyCategoryId, 'all'>;

export interface TechnologyCategory {
  readonly id: TechnologyCategoryId;
  readonly label: string;
}

export interface TechnologyItem {
  readonly name: string;
  readonly category: TechnologyGroupId;
  /** Stable key used to resolve the official logo in /icons/technologies. */
  readonly icon: string;
  readonly displayOrder: number;
}

export const TECHNOLOGY_CATEGORIES: readonly TechnologyCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
  { id: 'tools', label: 'Tools' },
];

/** Only technologies backed by the current resume or the existing portfolio code. */
export const TECHNOLOGIES_DATA: readonly TechnologyItem[] = [
  { name: 'Angular', category: 'frontend', icon: 'angular', displayOrder: 1 },
  { name: 'TypeScript', category: 'frontend', icon: 'typescript', displayOrder: 2 },
  { name: 'JavaScript', category: 'frontend', icon: 'javascript', displayOrder: 3 },
  { name: 'React', category: 'frontend', icon: 'react', displayOrder: 4 },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwindcss', displayOrder: 5 },
  { name: 'HTML5', category: 'frontend', icon: 'html5', displayOrder: 6 },
  { name: 'CSS3', category: 'frontend', icon: 'css3', displayOrder: 7 },
  { name: 'Bootstrap', category: 'frontend', icon: 'bootstrap', displayOrder: 8 },
  { name: 'jQuery', category: 'frontend', icon: 'jquery', displayOrder: 9 },
  { name: 'Next.js', category: 'frontend', icon: 'nextdotjs', displayOrder: 10 },
  { name: 'C#', category: 'backend', icon: 'csharp', displayOrder: 11 },
  { name: '.NET', category: 'backend', icon: 'dotnet', displayOrder: 12 },
  { name: 'ASP.NET Core', category: 'backend', icon: 'aspnetcore', displayOrder: 13 },
  { name: 'PHP', category: 'backend', icon: 'php', displayOrder: 14 },
  { name: 'Python', category: 'backend', icon: 'python', displayOrder: 15 },
  { name: 'SQL Server', category: 'database', icon: 'sqlserver', displayOrder: 16 },
  { name: 'MySQL', category: 'database', icon: 'mysql', displayOrder: 17 },
  { name: 'Docker', category: 'devops', icon: 'docker', displayOrder: 18 },
  { name: 'Vercel', category: 'devops', icon: 'vercel', displayOrder: 19 },
  { name: 'Git', category: 'devops', icon: 'git', displayOrder: 20 },
  { name: 'VS Code', category: 'tools', icon: 'vscode', displayOrder: 21 },
  { name: 'GitHub', category: 'tools', icon: 'github', displayOrder: 22 },
  { name: 'Postman', category: 'tools', icon: 'postman', displayOrder: 23 },
  { name: 'Visual Studio', category: 'tools', icon: 'visualstudio', displayOrder: 24 },
];
