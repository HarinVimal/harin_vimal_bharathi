"use client";

import { motion, type Variants } from "framer-motion";
import { FADE_UP, FADE_IN, FADE_LEFT, FADE_RIGHT, SCALE_UP } from "@/constants/animations";

type AnimationVariant = "up" | "in" | "left" | "right" | "scale";

interface FadeInProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
  once?: boolean;
}

const variantMap: Record<AnimationVariant, Variants> = {
  up: FADE_UP,
  in: FADE_IN,
  left: FADE_LEFT,
  right: FADE_RIGHT,
  scale: SCALE_UP,
};

export function FadeIn({
  children,
  variant = "up",
  delay = 0,
  className,
  once = true,
}: FadeInProps) {
  const base = variantMap[variant];

  const variants: Variants = delay
    ? {
        hidden: base.hidden,
        visible: {
          ...(base.visible as object),
          transition: {
            ...((base.visible as Record<string, unknown>)?.transition as object),
            delay,
          },
        },
      }
    : base;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
