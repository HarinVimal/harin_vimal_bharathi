"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, CalendarDays } from "lucide-react";
import { TechBadge } from "@/components/ui/TechBadge";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export function CertificateCard({ certificate, index }: CertificateCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl glass border border-white/[0.06] p-6 hover:border-indigo-500/20 transition-all duration-300"
      aria-label={`${certificate.title} from ${certificate.issuer}`}
    >
      {/* Icon + issuer */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <Award className="h-5 w-5 text-indigo-400" aria-hidden="true" />
        </div>
        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <CalendarDays className="h-3 w-3" aria-hidden="true" />
          {certificate.date}
        </div>
      </div>

      {/* Content */}
      <h3 className="mb-1 font-semibold text-zinc-100 leading-snug group-hover:text-indigo-300 transition-colors">
        {certificate.title}
      </h3>
      <p className="mb-3 text-sm font-medium text-indigo-400">{certificate.issuer}</p>

      {certificate.description && (
        <p className="mb-4 text-sm text-zinc-500 leading-relaxed line-clamp-2">
          {certificate.description}
        </p>
      )}

      {/* Skills */}
      <div className="mb-4 flex flex-wrap gap-1">
        {certificate.skills.map((skill) => (
          <TechBadge key={skill} label={skill} size="sm" />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        {certificate.credentialId && (
          <span className="text-xs text-zinc-600 font-mono">
            ID: {certificate.credentialId}
          </span>
        )}
        {certificate.credentialUrl && (
          <motion.a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            aria-label={`Verify ${certificate.title} certificate`}
          >
            Verify
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </motion.a>
        )}
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
