import { cn } from "@/lib/utils";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-auto h-px max-w-xs", className)}
      style={{
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
      }}
      aria-hidden="true"
    />
  );
}
