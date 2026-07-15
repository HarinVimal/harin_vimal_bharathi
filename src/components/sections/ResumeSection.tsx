"use client";

import { motion } from "framer-motion";
import { Download, Printer, FileText, Eye } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowButton } from "@/components/buttons/GlowButton";
import { FadeIn } from "@/components/animations/FadeIn";

export function ResumeSection() {
  const handlePrint = () => window.print();

  return (
    <section id="resume" className="section relative" aria-label="Resume">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Resume"
          title="My professional"
          titleHighlight="resume"
          description="Download or preview my full resume. Updated with my latest experience and skills."
        />

        <div className="mt-14 space-y-6">
          {/* Action buttons */}
          <FadeIn variant="up">
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                icon={<Download className="h-4 w-4" />}
                aria-label="Download resume as PDF"
              >
                Download PDF
              </GlowButton>
              <GlowButton
                onClick={handlePrint}
                variant="secondary"
                size="lg"
                icon={<Printer className="h-4 w-4" />}
                aria-label="Print resume"
              >
                Print
              </GlowButton>
            </div>
          </FadeIn>

          {/* Resume preview card */}
          <FadeIn variant="up" delay={0.15}>
            <motion.div
              className="relative overflow-hidden rounded-2xl glass border border-white/[0.06] hover:border-indigo-500/20 transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              {/* Preview header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <FileText className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">resume.pdf</p>
                    <p className="text-xs text-zinc-500">Senior Full Stack .NET Developer</p>
                  </div>
                </div>
                <GlowButton
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  icon={<Eye className="h-3.5 w-3.5" />}
                  aria-label="Preview resume"
                >
                  Preview
                </GlowButton>
              </div>

              {/* Mock resume content */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="text-center pb-4 border-b border-white/[0.06]">
                  <div className="text-xl font-bold gradient-text">Harin Vimal Bharathi J</div>
                  <div className="text-sm text-indigo-400 mt-1">Senior Full Stack .NET Developer</div>
                  <div className="flex justify-center gap-4 mt-2 text-xs text-zinc-500 flex-wrap">
                    <span>harinvimalbharathi@gmail.com</span>
                    <span>+91 98432 83119</span>
                    <span>Coimbatore, Tamil Nadu</span>
                    <span>github.com/HarinVimal</span>
                  </div>
                </div>

                {/* Simulated sections */}
                {[
                  { title: "Professional Summary", lines: 2 },
                  { title: "Technical Skills", lines: 3 },
                  { title: "Experience", lines: 4 },
                  { title: "Projects", lines: 3 },
                ].map(({ title, lines }) => (
                  <div key={title}>
                    <div className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-white/[0.06] pb-1">
                      {title}
                    </div>
                    <div className="space-y-1.5">
                      {Array.from({ length: lines }).map((_, i) => (
                        <div
                          key={i}
                          className="h-2 rounded-full bg-zinc-800"
                          style={{ width: `${85 - i * 10}%` }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-end justify-center pb-8 bg-gradient-to-t from-zinc-950/80 via-transparent">
                <GlowButton
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  icon={<Download className="h-4 w-4" />}
                  aria-label="Download full resume"
                >
                  Download Full Resume
                </GlowButton>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
