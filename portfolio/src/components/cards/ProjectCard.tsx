"use client";

import { motion } from "framer-motion";
import { ExternalLink, Building2, Users, TrendingUp, MessageSquare, type LucideIcon } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { TechBadge } from "@/components/ui/TechBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GlowButton } from "@/components/buttons/GlowButton";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Users,
  TrendingUp,
  MessageSquare,
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = ICON_MAP[project.icon] ?? Building2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl glass border border-white/[0.06] hover:border-indigo-500/20 transition-all duration-300"
      aria-label={project.title}
    >
      {/* Banner */}
      <div
        className={cn(
          "relative flex items-center justify-between px-6 py-5 bg-gradient-to-r",
          project.bannerColor,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-white leading-tight">{project.title}</h3>
            <p className="text-xs text-white/70">{project.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={project.status} />
          <span className="text-xs text-white/60">{project.year}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed">{project.shortDescription}</p>

        {/* Problem solved */}
        <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Problem Solved
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">{project.problem}</p>
        </div>

        {/* Key features */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Key Features
          </p>
          <ul className="space-y-2" aria-label="Key features">
            {project.features.slice(0, 4).map((feature) => (
              <li key={feature.title} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                <span className="text-sm text-zinc-400">
                  <span className="font-medium text-zinc-300">{feature.title}:</span>{" "}
                  {feature.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture */}
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Architecture
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">{project.architecture}</p>
        </div>

        {/* Business impact */}
        <div className="rounded-xl bg-indigo-500/5 border border-indigo-500/20 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Business Impact
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">{project.businessImpact}</p>
        </div>

        {/* Tech stack */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <TechBadge key={tech.name} label={tech.name} size="sm" />
            ))}
          </div>
        </div>

        {/* Actions */}
        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-3 pt-1">
            {project.githubUrl && (
              <GlowButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                icon={<GitHubIcon className="h-3.5 w-3.5" />}
                aria-label={`View ${project.title} on GitHub`}
              >
                GitHub
              </GlowButton>
            )}
            {project.demoUrl && (
              <GlowButton
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                icon={<ExternalLink className="h-3.5 w-3.5" />}
                aria-label={`View live demo of ${project.title}`}
              >
                Live Demo
              </GlowButton>
            )}
          </div>
        )}
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
