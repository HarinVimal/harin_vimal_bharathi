import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
  size?: "sm" | "md";
}

export function TechBadge({ label, className, size = "md" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        "bg-zinc-800/80 text-zinc-300 border border-zinc-700/50",
        "hover:border-indigo-500/40 hover:text-indigo-300 transition-colors duration-200",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs",
        className,
      )}
    >
      {label}
    </span>
  );
}
