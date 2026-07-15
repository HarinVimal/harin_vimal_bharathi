export interface Responsibility {
  text: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
  accentColor: string;
}
