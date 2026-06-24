"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Rotating conic-gradient god-rays — the divine light emanating from behind
 * the deity in the Hero and Divine Blessings sections. Pure CSS, no canvas.
 * Static (no rotation) under reduced-motion.
 */
export function LightRays({
  className,
  /** Ray color, defaults to warm gold. */
  color = "rgba(240,217,168,0.10)",
  rotateDuration = 60,
}: {
  className?: string;
  color?: string;
  rotateDuration?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      style={{
        background: `conic-gradient(from 180deg at 50% 50%, transparent 0deg, ${color} 8deg, transparent 16deg, ${color} 26deg, transparent 34deg, ${color.replace(/[\d.]+\)$/, "0.07)")} 46deg, transparent 54deg)`,
        filter: "blur(8px)",
      }}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={reduced ? undefined : { duration: rotateDuration, repeat: Infinity, ease: "linear" }}
      aria-hidden
    />
  );
}
