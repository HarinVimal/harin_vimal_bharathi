export type SkillLevel = "expert" | "advanced" | "intermediate" | "familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string;
  yearsOfExperience?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  skills: Skill[];
}
