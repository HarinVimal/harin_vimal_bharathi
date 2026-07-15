"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Download, ArrowDown, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { TypingText } from "@/components/animations/TypingText";
import { GlowButton } from "@/components/buttons/GlowButton";
import { siteConfig } from "@/config/site";

/* ─────────────────────────────────────────────────────────
   Background marquee
   3 double-line bands, each band = two rows that share
   the same direction so they feel like a single thick stripe.
   Alternating band directions give visual depth.
───────────────────────────────────────────────────────── */
interface BgBand {
  rowA: string[];
  rowB: string[];
  dir: "left" | "right";
  speedA: number;   // slightly different speeds = natural drift between lines
  speedB: number;
  opacity: number;
  top: string;      // top of the band (rowB sits ~1 line-height below rowA)
}

const BG_BANDS: BgBand[] = [
  {
    rowA: ["ASP.NET Core", "C#", "CQRS", "Entity Framework", "Web API", "SQL Server", "JWT"],
    rowB: ["SignalR", "Clean Architecture", "REST APIs", "Dependency Injection", "Repository Pattern"],
    dir: "left",
    speedA: 55,
    speedB: 68,
    opacity: 0.055,
    top: "6%",
  },
  {
    rowA: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "jQuery"],
    rowB: ["HTML5", "CSS3", "AJAX", "Responsive Design", "ASP.NET MVC", "Razor Views"],
    dir: "right",
    speedA: 50,
    speedB: 62,
    opacity: 0.045,
    top: "38%",
  },
  {
    rowA: ["Multi-tenant SaaS", "Microservices", "MySQL", "LINQ", "Stored Procedures", "Docker"],
    rowB: ["Git", "DigitalOcean", "IIS", "Postman", "Swagger", "Visual Studio", "VS Code", "GitHub"],
    dir: "left",
    speedA: 72,
    speedB: 58,
    opacity: 0.05,
    top: "70%",
  },
];

const TYPING_ROLES = [
  "Senior .NET Developer",
  "ASP.NET Core Expert",
  "Full Stack Engineer",
  "SaaS Architect",
  "API Developer",
];

const SOCIAL_LINKS = [
  { label: "GitHub",   href: siteConfig.links.github,            icon: GitHubIcon,   ariaLabel: "Visit GitHub profile" },
  { label: "LinkedIn", href: siteConfig.links.linkedin,          icon: LinkedInIcon, ariaLabel: "Visit LinkedIn profile" },
  { label: "Email",    href: `mailto:${siteConfig.links.email}`, icon: Mail,         ariaLabel: "Send an email" },
];

const STATS = [
  { value: "4+",  label: "Years Exp." },
  { value: "10+", label: "Projects" },
  { value: "2",   label: "Companies" },
  { value: "∞",   label: "Lines of C#" },
];

/* ─── Single marquee line inside a band ─── */
function MarqueeLine({
  words,
  dir,
  speed,
  opacity,
  fontSize,
}: {
  words: string[];
  dir: "left" | "right";
  speed: number;
  opacity: number;
  fontSize: string;
}) {
  const items = [...words, ...words, ...words, ...words];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex items-center w-max"
        style={{ gap: "clamp(2rem, 4vw, 5rem)" }}
        animate={{ x: dir === "left" ? ["0%", "-25%"] : ["-25%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-flex items-center shrink-0">
            {/* Word — alternates between filled and outline style for visual variety */}
            <span
              className="whitespace-nowrap font-black uppercase select-none"
              style={{
                fontSize,
                letterSpacing: "0.08em",
                /* Every even item is solid text, odd item is outline (stroke only) */
                color: i % 2 === 0
                  ? `rgba(255,255,255,${opacity})`
                  : "transparent",
                WebkitTextStroke: i % 2 !== 0
                  ? `1px rgba(255,255,255,${opacity * 0.9})`
                  : "none",
              }}
            >
              {word}
            </span>
            {/* Separator — a small rotated diamond */}
            <span
              className="shrink-0 mx-[clamp(1rem,2vw,2.5rem)]"
              style={{
                display: "inline-block",
                width: "clamp(6px, 0.7vw, 10px)",
                height: "clamp(6px, 0.7vw, 10px)",
                background: `rgba(99,102,241,${opacity * 1.8})`,
                transform: "rotate(45deg)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Double-line band ─── */
function BgBandBlock({
  rowA,
  rowB,
  dir,
  speedA,
  speedB,
  opacity,
  top,
}: BgBand) {
  const SIZE = "clamp(2.4rem, 4.8vw, 5.5rem)";

  return (
    <div
      className="absolute left-0 right-0 pointer-events-none select-none"
      style={{ top }}
      aria-hidden="true"
    >
      {/* Line A */}
      <MarqueeLine words={rowA} dir={dir}               speed={speedA} opacity={opacity} fontSize={SIZE} />
      {/* Line B — tiny gap between the two lines */}
      <div style={{ marginTop: "clamp(0.5rem, 1vw, 1.2rem)" }}>
        <MarqueeLine words={rowB} dir={dir === "left" ? "right" : "left"} speed={speedB} opacity={opacity * 0.75} fontSize={SIZE} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main HeroSection
───────────────────────────────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Static grid ── */}
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />

      {/* ── Parallax ambient orbs ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: parallaxY }}
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-1/3  h-[520px] w-[520px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute -right-24 top-1/4 h-[440px] w-[440px] rounded-full bg-violet-600/[0.06] blur-[110px]" />
        <div className="absolute left-1/2 bottom-1/4 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[90px]" />
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          BACKGROUND MARQUEE — 3 double-line bands
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {BG_BANDS.map((band, i) => (
          <BgBandBlock key={i} {...band} />
        ))}
      </div>

      {/* ── Left + right edge vignette so text fades at edges ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,9,11,0.85) 0%, transparent 28%, transparent 72%, rgba(9,9,11,0.85) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Top + bottom vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.6) 0%, transparent 20%, transparent 80%, rgba(9,9,11,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════
          FOREGROUND CONTENT — fades on scroll
      ══════════════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: fadeOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-32 pb-20 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ╔══════════════════════════════╗
              LEFT — text content
          ╚══════════════════════════════╝ */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.13 }}
              className="text-4xl font-bold tracking-tight sm:text-4xl xl:text-4xl"
            >
              <span className="gradient-text leading-tight">{siteConfig.name}</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex items-center gap-2 text-lg sm:text-xl"
            >
              <span className="font-mono text-indigo-600/80 text-sm">&lt;</span>
              <TypingText
                words={TYPING_ROLES}
                className="text-indigo-400 font-semibold min-w-[210px]"
              />
              <span className="font-mono text-indigo-600/80 text-sm">/&gt;</span>
            </motion.div>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                <MapPin className="h-3.5 w-3.5 text-indigo-500/60" aria-hidden="true" />
                {siteConfig.location}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                <Briefcase className="h-3.5 w-3.5 text-indigo-500/60" aria-hidden="true" />
                {siteConfig.currentCompany}
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="max-w-lg text-base text-zinc-400 leading-relaxed"
            >
              Senior Software Engineer with{" "}
              <span className="font-semibold text-zinc-200">4+ years</span> building
              scalable enterprise applications using{" "}
              <span className="font-medium text-indigo-400">ASP.NET Core</span>,{" "}
              <span className="font-medium text-indigo-400">C#</span>, and{" "}
              <span className="font-medium text-indigo-400">CQRS</span>. Currently
              crafting multi-tenant SaaS at{" "}
              <span className="font-semibold text-zinc-200">{siteConfig.currentCompany}</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.46 }}
              className="flex flex-wrap gap-3"
            >
              <GlowButton
                href="/resume/Harin_Vimal_Bharathi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                icon={<Download className="h-4 w-4" />}
                aria-label="Download resume PDF"
              >
                Download Resume
              </GlowButton>
              <GlowButton
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                size="lg"
                aria-label="View my projects"
              >
                View Projects
              </GlowButton>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54 }}
              className="flex items-center gap-2"
            >
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, ariaLabel }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex h-9 w-9 items-center justify-center rounded-xl glass border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:border-indigo-500/30 transition-all duration-200"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={ariaLabel}
                >
                  <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="mt-1 grid grid-cols-4 gap-4 rounded-2xl glass border border-white/[0.06] p-4"
            >
              {STATS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.68 + i * 0.07, type: "spring", stiffness: 260, damping: 22 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold gradient-text-indigo sm:text-2xl">{value}</div>
                  <div className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ╔══════════════════════════════╗
              RIGHT — transparent image only
          ╚══════════════════════════════╝ */}
          <div className="relative order-1 flex items-center justify-center lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, type: "spring", stiffness: 140, damping: 18 }}
              className="relative"
            >
              {/*
                Soft indigo glow blob behind the image
                — gives the transparent PNG a sense of depth without any frame
              */}
              <div
                className="absolute inset-0 rounded-full blur-[80px] opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.3) 45%, transparent 70%)",
                  transform: "scale(1.1)",
                }}
                aria-hidden="true"
              />

              {/* Transparent image — mix-blend-mode:luminosity blends it into the dark bg */}
              <div className="relative h-[380px] w-[320px] sm:h-[460px] sm:w-[390px] lg:h-[520px] lg:w-[440px]">
                <Image
                  src="/images/avatar.png"
                  alt="Harin Vimal Bharathi"
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 390px, 440px"
                  className="object-contain object-bottom"
                  style={{ mixBlendMode: "luminosity", opacity: 0.92 }}
                  priority
                />
              </div>

              {/* Floating name chip — sits just below the image */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 whitespace-nowrap rounded-2xl border border-white/[0.09] bg-zinc-950/70 px-4 py-2.5 backdrop-blur-xl shadow-xl"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-zinc-100 leading-none">Harin Vimal Bharathi J</p>
                  <p className="mt-0.5 text-[10px] text-indigo-400">Senior .NET Developer</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mx-auto mt-16 flex flex-col items-center gap-1.5 text-zinc-600 hover:text-zinc-400 transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] tracking-[0.22em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
