import { SectionHeader } from "@/components/shared/SectionHeader";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import type { Experience } from "@/types/experience";
import experienceData from "@/data/experience.json";

export function ExperienceSection() {
  const experiences = experienceData as Experience[];

  return (
    <section id="experience" className="section relative" aria-label="Work experience">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've"
          titleHighlight="worked"
          description="My professional journey building enterprise software that delivers real business value."
        />

        <div className="mt-14" role="list" aria-label="Work experience timeline">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
