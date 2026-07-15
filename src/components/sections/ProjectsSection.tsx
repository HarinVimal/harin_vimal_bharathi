import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export function ProjectsSection() {
  const projects = (projectsData as Project[]).filter((p) => p.type === "enterprise");

  return (
    <section id="projects" className="section relative" aria-label="Enterprise projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Enterprise Projects"
          title="Systems I've"
          titleHighlight="engineered"
          description="Production-grade enterprise applications I've architected and shipped — each solving real business challenges at scale."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
