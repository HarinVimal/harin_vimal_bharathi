"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp, Code2, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/config/site";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-zinc-950" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Code2 className="h-4 w-4 text-indigo-400" aria-hidden="true" />
              </div>
              <span className="font-semibold text-zinc-100">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Senior Full Stack .NET Developer building scalable enterprise applications.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
                aria-label="GitHub profile"
              >
                <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
                aria-label="Send email"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-2" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-zinc-500 hover:text-zinc-100 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Get In Touch
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="block text-sm text-zinc-500 hover:text-zinc-100 transition-colors"
              >
                {siteConfig.links.email}
              </a>
              <p className="text-sm text-zinc-500">{siteConfig.location}</p>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                )}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
                Available for freelance
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-zinc-600">
            Built with
            <Heart className="h-3 w-3 text-red-400" aria-hidden="true" />
            using Next.js &amp; Tailwind CSS
          </p>
          <motion.button
            onClick={scrollToTop}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-100 hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
