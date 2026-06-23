"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const offset = 40;

const build = (direction: Direction, reduced: boolean): Variants => {
  if (reduced) {
    return { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
  }
  const base = { opacity: 0 };
  switch (direction) {
    case "up":
      return { hidden: { ...base, y: offset }, visible: { opacity: 1, y: 0 } };
    case "down":
      return { hidden: { ...base, y: -offset }, visible: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { ...base, x: offset }, visible: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { ...base, x: -offset }, visible: { opacity: 1, x: 0 } };
    case "scale":
      return { hidden: { ...base, scale: 0.92 }, visible: { opacity: 1, scale: 1 } };
    case "fade":
    default:
      return { hidden: base, visible: { opacity: 1 } };
  }
};

type RevealOnScrollProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** 0–1 portion of the element that must be visible to trigger. */
  amount?: number;
  className?: string;
  as?: keyof typeof motion;
};

/**
 * Reusable scroll-triggered reveal. Replaces the repetitive
 * `initial/whileInView/viewport` boilerplate found across the codebase.
 * Honours prefers-reduced-motion (renders instantly).
 */
export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.3,
  className,
}: RevealOnScrollProps) {
  const reduced = usePrefersReducedMotion();
  const variants = build(direction, reduced);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
