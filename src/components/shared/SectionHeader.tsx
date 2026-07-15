import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <FadeIn variant="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            {eyebrow}
          </span>
        </FadeIn>
      )}
      <FadeIn variant="up" delay={0.1}>
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
            align === "center" && "mx-auto max-w-3xl",
          )}
        >
          {title}{" "}
          {titleHighlight && (
            <span className="gradient-text-indigo">{titleHighlight}</span>
          )}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn variant="up" delay={0.2}>
          <p
            className={cn(
              "text-zinc-400 leading-relaxed",
              align === "center" && "mx-auto max-w-2xl",
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
