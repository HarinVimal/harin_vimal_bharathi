"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, CheckCircle2 } from "lucide-react";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

export function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  return (
    <div className="relative flex gap-6 md:gap-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
            experience.current
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-zinc-700 bg-zinc-900",
          )}
          aria-hidden="true"
        >
          {experience.current && (
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
          )}
          {!experience.current && (
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          )}
        </motion.div>
        {!isLast && (
          <div
            className="mt-2 w-px flex-1 bg-gradient-to-b from-zinc-700/80 to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Card content */}
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group mb-12 flex-1 rounded-2xl glass border border-white/[0.06] p-6 hover:border-indigo-500/20 transition-all duration-300"
        aria-label={`${experience.role} at ${experience.company}`}
      >
        {/* Header */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-zinc-100 text-lg">{experience.role}</h3>
              {experience.current && (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" />
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {experience.companyUrl ? (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  aria-label={`${experience.company} website`}
                >
                  {experience.company}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ) : (
                <span className="text-sm font-medium text-indigo-400">{experience.company}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <time className="text-sm text-zinc-400 whitespace-nowrap">
              {experience.startDate} — {experience.endDate}
            </time>
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {experience.location}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-zinc-400 leading-relaxed">{experience.description}</p>

        {/* Responsibilities */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Key Responsibilities
          </h4>
          <ul className="space-y-1.5" aria-label="Responsibilities">
            {experience.responsibilities.slice(0, 5).map((resp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500"
                  aria-hidden="true"
                />
                {resp}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <TechBadge key={tech} label={tech} size="sm" />
            ))}
          </div>
        </div>

        {/* Accent */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${experience.accentColor}06 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}
