export type AboutHighlightIcon = 'location' | 'remote' | 'coffee';

export interface AboutHeadingLine {
  readonly lead: string;
  readonly accent?: string;
}

export interface AboutHighlight {
  readonly label: string;
  readonly icon: AboutHighlightIcon;
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly headingLines: readonly AboutHeadingLine[];
  readonly introduction: string;
  readonly strengths: readonly string[];
  readonly highlights: readonly AboutHighlight[];
  readonly workspaceRoles: readonly string[];
  readonly workspaceImage: string;
  readonly workspaceImageAlt: string;
}

/** Editorial copy is kept here so templates stay structural and easy to maintain. */
export const ABOUT_CONTENT: AboutContent = {
  eyebrow: 'ABOUT ME',
  headingLines: [{ lead: 'The Engineer' }, { lead: 'Behind the ', accent: 'Code' }],
  introduction:
    "I'm a Full Stack Developer with 4+ years of experience building enterprise web applications with C#, ASP.NET Core, SQL Server, and MySQL. I enjoy translating complex business requirements into practical, well-structured solutions — from database design and REST APIs to responsive interfaces built with modern frontend tools. I care about clean code, thoughtful architecture, and experiences that feel effortless to use.",
  strengths: [
    'End-to-end application development',
    'Designing scalable, maintainable architecture',
    'Solving real-world business challenges with technology',
    'Passionate about clean code and great user experiences',
  ],
  highlights: [
    { label: 'Based in India', icon: 'location' },
    { label: 'Open to Remote / Hybrid', icon: 'remote' },
    { label: 'Fueled by Code & Coffee', icon: 'coffee' },
  ],
  workspaceRoles: ['Developer', 'Problem Solver', 'UI Enthusiast'],
  workspaceImage: '/images/about/workspace-illustration.svg',
  workspaceImageAlt:
    'Warm developer workspace with a dark monitor showing code, a wooden desk, a small plant and a glowing desk lamp',
};
