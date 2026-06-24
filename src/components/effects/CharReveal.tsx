"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Reveals text one character at a time. Two modes:
 *  - `mode="stroke"`: each char wipes in left-to-right (clip-path) — ideal for
 *    the calligraphy name stroke effect.
 *  - `mode="fade"`: each char fades + rises in sequence — ideal for the
 *    Sanskrit shloka character-by-character reveal.
 *
 * Whitespace is preserved as a gap (not animated).
 */
export function CharReveal({
  text,
  mode = "fade",
  className,
  delay = 0,
  stagger = 0.045,
  duration = 0.5,
}: {
  text: string;
  mode?: "stroke" | "fade";
  className?: string;
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const chars = Array.from(text);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => {
        if (ch === " ") return <span key={i}> </span>;
        const charDelay = delay + i * stagger;
        return (
          <motion.span
            key={i}
            aria-hidden
            initial={
              mode === "stroke"
                ? { clipPath: "inset(0 100% 0 0)", opacity: 0 }
                : { opacity: 0, y: 12 }
            }
            whileInView={
              mode === "stroke"
                ? { clipPath: "inset(0 0 0 0)", opacity: 1 }
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration, delay: charDelay, ease: [0.22, 1, 0.36, 1] }}
            style={mode === "stroke" ? { display: "inline-block" } : { display: "inline-block" }}
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}
