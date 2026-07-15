"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "freelance",
  "resume",
  "contact",
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ─── Floating island wrapper — centres the pill, no pointer events on dead space ─── */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          role="banner"
          /* max-w-5xl ≈ 1024 px — longer than the previous max-w-3xl (768 px)
             but still clearly detached from both screen edges on large monitors  */
          className={cn(
            "pointer-events-auto w-full max-w-5xl",
            "rounded-2xl border",
            "backdrop-blur-2xl transition-all duration-500",
            scrolled
              ? "bg-zinc-950/75 border-white/[0.09] shadow-2xl shadow-black/40"
              : "bg-zinc-950/45 border-white/[0.06] shadow-lg shadow-black/20",
          )}
          style={{
            boxShadow: scrolled
              ? "0 8px 32px -4px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(99,102,241,0.14)"
              : "0 4px 20px -4px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          <nav
            className="flex h-14 items-center justify-between px-4 sm:px-5"
            aria-label="Main navigation"
          >
            {/* ── Avatar + name ── */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="flex shrink-0 items-center gap-2.5 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Harin Vimal Bharathi — Home"
            >
              {/* Clean circular avatar, no spinning ring */}
              <div className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/images/avatar.png"
                  alt="Harin Vimal Bharathi"
                  fill
                  sizes="36px"
                  className="object-cover object-top scale-[1.2] translate-y-[2px]"
                  priority
                />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-zinc-100 tracking-tight group-hover:text-indigo-400 transition-colors duration-200">
                Harin Vimal
              </span>
            </motion.a>

            {/* ── Desktop nav links ── */}
            <ul className="hidden md:flex items-center gap-0.5" role="list">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative px-3.5 py-1.5 text-sm font-medium rounded-lg",
                        "transition-colors duration-200 outline-none",
                        "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
                        isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100",
                      )}
                    >
                      {/* Animated sliding pill indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.16) 100%)",
                            border: "1px solid rgba(99,102,241,0.35)",
                            boxShadow:
                              "0 0 14px -3px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ── Mobile hamburger ── */}
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg md:hidden",
                "text-zinc-400 hover:text-zinc-100",
                "hover:bg-white/[0.07] transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              )}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </motion.header>
      </div>

      {/* ─── Mobile dropdown — anchored below the island ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed top-[4.75rem] inset-x-4 z-40 md:hidden",
              "rounded-2xl border border-white/[0.08]",
              "bg-zinc-950/90 backdrop-blur-2xl",
              "shadow-2xl shadow-black/50",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col p-2 gap-0.5">
              {NAV_ITEMS.map((item, i) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium",
                      "transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                      isActive
                        ? "text-white"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobile-active-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.12) 100%)",
                          border: "1px solid rgba(99,102,241,0.28)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-between">
                      {item.label}
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)]"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
