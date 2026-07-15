"use client";

import { motion } from "framer-motion";
import {
  Server,
  Monitor,
  Database,
  Layers,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types/skill";

const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Monitor,
  Database,
  Layers,
  Wrench,
};

const LEVEL_WIDTH: Record<string, string> = {
  expert: "w-full",
  advanced: "w-4/5",
  intermediate: "w-3/5",
  familiar: "w-2/5",
};

const LEVEL_COLOR: Record<string, string> = {
  expert: "bg-indigo-500",
  advanced: "bg-violet-500",
  intermediate: "bg-cyan-500",
  familiar: "bg-zinc-500",
};

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCard({ category, index }: SkillCardProps) {
  const Icon = ICON_MAP[category.icon] ?? Server;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl glass border border-white/[0.06] p-6 hover:border-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] transition-colors duration-300"
          style={{ background: `${category.accentColor}18` }}
        >
          <Icon
            className="h-5 w-5"
            style={{ color: category.accentColor }}
            aria-hidden="true"
          />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-100">{category.title}</h3>
          <p className="text-xs text-zinc-500">{category.description}</p>
        </div>
      </div>

      {/* Skills list */}
      <ul className="space-y-3" aria-label={`${category.title} skills`}>
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm text-zinc-300">{skill.name}</span>
              <span className="text-xs text-zinc-600 capitalize">{skill.level}</span>
            </div>
            <div
              className="h-1 overflow-hidden rounded-full bg-zinc-800"
              role="progressbar"
              aria-label={`${skill.name} proficiency: ${skill.level}`}
              aria-valuenow={
                skill.level === "expert"
                  ? 100
                  : skill.level === "advanced"
                    ? 80
                    : skill.level === "intermediate"
                      ? 60
                      : 40
              }
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className={cn("h-full rounded-full", LEVEL_COLOR[skill.level] ?? "bg-zinc-500")}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{ maxWidth: LEVEL_WIDTH[skill.level] ?? "60%" }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${category.accentColor}08 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
