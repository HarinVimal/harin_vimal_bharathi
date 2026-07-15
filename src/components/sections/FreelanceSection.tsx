"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FreelanceCard } from "@/components/cards/FreelanceCard";
import type { FreelanceProject, ProjectCategory } from "@/types/project";
import freelanceData from "@/data/freelance-projects.json";

const CATEGORY_FILTERS: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Web App", value: "web-app" },
  { label: "Finance", value: "finance" },
  { label: "Enterprise", value: "enterprise" },
  { label: "eCommerce", value: "ecommerce" },
];

export function FreelanceSection() {
  const projects = freelanceData as FreelanceProject[];
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="freelance" className="section relative" aria-label="Freelance projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Freelance Work"
          title="Projects I've"
          titleHighlight="delivered"
          description="Client projects built independently — from concept through deployment. Each one is data-driven: add a project by editing one JSON object."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {CATEGORY_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeFilter === value
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "glass border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:border-indigo-500/30"
              }`}
              aria-pressed={activeFilter === value}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <FreelanceCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center text-zinc-500"
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
}
