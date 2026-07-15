export type ProjectStatus = "live" | "in-progress" | "completed" | "archived";
export type ProjectCategory =
  | "saas"
  | "hrms"
  | "finance"
  | "ecommerce"
  | "healthcare"
  | "enterprise"
  | "web-app"
  | "mobile-web";

export interface ProjectTechnology {
  name: string;
  category: "backend" | "frontend" | "database" | "cloud" | "devops";
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  company: string;
  type: "enterprise" | "freelance";
  status: ProjectStatus;
  category: ProjectCategory;
  shortDescription: string;
  description: string;
  problem: string;
  responsibilities: string[];
  architecture: string;
  technologies: ProjectTechnology[];
  features: ProjectFeature[];
  challenges: string[];
  businessImpact: string;
  bannerColor: string;
  icon: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  year: string;
  duration: string;
}

export interface FreelanceProject {
  id: string;
  title: string;
  shortDescription: string;
  client: string;
  duration: string;
  technologies: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  year: string;
}
