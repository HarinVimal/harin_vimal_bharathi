"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  as?: "div" | "article" | "section" | "li";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  as: Tag = "div",
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      // @ts-expect-error - motion polymorphic typing
      as={Tag}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl glass border border-white/[0.06]",
        hover && "card-hover cursor-pointer",
        glow && "hover:glow-indigo",
        className,
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
