"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, Calendar, Code2, Zap, Heart, Target } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { TechBadge } from "@/components/ui/TechBadge";
import { siteConfig } from "@/config/site";

const CORE_TECHNOLOGIES = [
  "ASP.NET Core", "C#", "CQRS", "Entity Framework Core",
  "SQL Server", "REST APIs", "Bootstrap", "jQuery",
];

const TIMELINE_EVENTS = [
  {
    year: "2022",
    title: "Joined RND Softech",
    description: "Started career as Software Developer L2, building HRMS and Finance applications.",
  },
  {
    year: "2023",
    title: "Led Finance Module",
    description: "Took ownership of the Finance Management System with MEPZ compliance features.",
  },
  {
    year: "2024",
    title: "Expanded into Freelancing",
    description: "Started delivering freelance projects alongside full-time role.",
  },
  {
    year: "2025",
    title: "Senior Engineer at Techcedence",
    description: "Promoted to Senior Software Engineer, leading Jimani SaaS platform development.",
  },
];

const VALUES = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Readable, maintainable, and well-structured code is non-negotiable.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Every query, every API, every component should be optimized.",
  },
  {
    icon: Target,
    title: "Business Value",
    description: "Features that solve real problems and deliver measurable impact.",
  },
  {
    icon: Heart,
    title: "Craft",
    description: "Taking pride in the quality of every system I build.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section relative" aria-label="About me">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="The engineer behind"
          titleHighlight="the code"
          description="Passionate about building software that scales, performs, and makes a real difference to businesses and their users."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {/* Left — Bio + meta */}
          <div className="space-y-8">
            <FadeIn variant="left">
              <div className="rounded-2xl glass border border-white/[0.06] p-6 space-y-4">
                <p className="text-zinc-300 leading-relaxed">
                  I&apos;m a Senior Software Engineer specializing in the{" "}
                  <span className="text-indigo-400 font-medium">.NET ecosystem</span>. Over the past
                  4+ years I&apos;ve designed and shipped enterprise web applications across HRMS,
                  finance, SaaS, and POS domains.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  My day-to-day is building multi-tenant platforms with{" "}
                  <span className="text-zinc-200 font-medium">ASP.NET Core</span>,{" "}
                  <span className="text-zinc-200 font-medium">CQRS</span>, and{" "}
                  <span className="text-zinc-200 font-medium">Entity Framework Core</span>
                  — writing systems that scale cleanly and are a pleasure to maintain.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Outside of my primary stack, I explore the modern frontend world with{" "}
                  <span className="text-zinc-200 font-medium">React</span> and{" "}
                  <span className="text-zinc-200 font-medium">Next.js</span> — like
                  this portfolio itself.
                </p>
              </div>
            </FadeIn>

            {/* Meta info */}
            <FadeIn variant="left" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Building2, label: "Current Company", value: siteConfig.currentCompany },
                  { icon: MapPin, label: "Location", value: siteConfig.location },
                  { icon: Calendar, label: "Experience", value: `${siteConfig.yearsOfExperience}+ Years` },
                  { icon: Code2, label: "Primary Stack", value: "ASP.NET Core / C#" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-xl bg-zinc-900/50 border border-white/[0.04] p-3"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                      <Icon className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">{label}</p>
                      <p className="text-sm font-medium text-zinc-200">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Core tech */}
            <FadeIn variant="left" delay={0.2}>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Core Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {CORE_TECHNOLOGIES.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — Timeline + values */}
          <div className="space-y-8">
            {/* Career timeline */}
            <FadeIn variant="right">
              <div className="rounded-2xl glass border border-white/[0.06] p-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                  Career Timeline
                </h3>
                <div className="space-y-1">
                  {TIMELINE_EVENTS.map((event, i) => (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {/* Line */}
                      {i < TIMELINE_EVENTS.length - 1 && (
                        <div
                          className="absolute left-[19px] top-8 bottom-0 w-px bg-zinc-800"
                          aria-hidden="true"
                        />
                      )}
                      {/* Dot */}
                      <div
                        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20"
                        aria-hidden="true"
                      >
                        <span className="text-xs font-bold text-indigo-400">{event.year.slice(-2)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{event.title}</p>
                        <p className="mt-0.5 text-sm text-zinc-500">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Values */}
            <FadeIn variant="right" delay={0.1}>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Professional Values
                </p>
                <StaggerContainer className="grid grid-cols-2 gap-3" staggerDelay={0.08}>
                  {VALUES.map(({ icon: Icon, title, description }) => (
                    <StaggerItem key={title}>
                      <div className="rounded-xl bg-zinc-900/50 border border-white/[0.04] p-4 hover:border-indigo-500/20 transition-colors group">
                        <Icon className="mb-2 h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                        <p className="text-sm font-medium text-zinc-200">{title}</p>
                        <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
