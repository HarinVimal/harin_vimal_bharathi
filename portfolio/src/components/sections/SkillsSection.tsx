import { SectionHeader } from "@/components/shared/SectionHeader";
import { SkillCard } from "@/components/cards/SkillCard";
import type { SkillCategory } from "@/types/skill";
import skillsData from "@/data/skills.json";

export function SkillsSection() {
  const skills = skillsData as SkillCategory[];

  return (
    <section id="skills" className="section relative" aria-label="Technical skills">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical Skills"
          title="Technologies I"
          titleHighlight="work with"
          description="A curated set of tools and technologies I use daily to build scalable, maintainable enterprise applications."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
