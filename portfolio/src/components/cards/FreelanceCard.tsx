"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Clock, User } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { TechBadge } from "@/components/ui/TechBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import type { FreelanceProject } from "@/types/project";

const CATEGORY_GRADIENTS: Record<string, string> = {
  saas: "from-indigo-600/20 to-purple-600/20",
  hrms: "from-violet-600/20 to-purple-600/20",
  finance: "from-cyan-600/20 to-blue-600/20",
  ecommerce: "from-orange-600/20 to-rose-600/20",
  enterprise: "from-teal-600/20 to-emerald-600/20",
  healthcare: "from-green-600/20 to-teal-600/20",
  "web-app": "from-indigo-600/20 to-cyan-600/20",
  "mobile-web": "from-pink-600/20 to-rose-600/20",
};

interface FreelanceCardProps {
  project: FreelanceProject;
  index: number;
}

export function FreelanceCard({ project, index }: FreelanceCardProps) {
  const gradient = CATEGORY_GRADIENTS[project.category] ?? "from-indigo-600/20 to-purple-600/20";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl glass border border-white/[0.06] hover:border-indigo-500/20 transition-all duration-300 flex flex-col h-full"
      aria-label={project.title}
    >
      {/* Top gradient stripe */}
      <div className={cn("h-1 w-full bg-gradient-to-r", gradient.replace("/20", ""))} />

      {/* Image placeholder */}
      <div
        className={cn("relative flex h-36 items-center justify-center bg-gradient-to-br", gradient)}
      >
        <span className="text-4xl font-bold text-white/10 select-none">
          {project.title.charAt(0)}
        </span>
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-black/30 backdrop-blur-sm px-2 py-0.5 text-xs text-white/70 font-medium capitalize">
            {project.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-semibold text-zinc-100 leading-snug group-hover:text-indigo-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-500 leading-relaxed flex-1">{project.shortDescription}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <User className="h-3 w-3 text-zinc-600" aria-hidden="true" />
            <span className="truncate">{project.client}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="h-3 w-3 text-zinc-600" aria-hidden="true" />
            {project.duration}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag) => (
            <TechBadge key={tag} label={tag} size="sm" />
          ))}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs text-zinc-600">
              {tech}
              {project.technologies.indexOf(tech) < Math.min(project.technologies.length, 4) - 1
                ? " ·"
                : ""}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
              whileHover={{ scale: 1.1 }}
              aria-label={`${project.title} GitHub repository`}
            >
              <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
              whileHover={{ scale: 1.1 }}
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.a>
          )}
          {project.caseStudyUrl && (
            <motion.a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
              whileHover={{ scale: 1.1 }}
              aria-label={`${project.title} case study`}
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.a>
          )}
          <span className="ml-auto text-xs text-zinc-600">{project.year}</span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
