"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ornamental golden divider that draws itself when scrolled into view — a
 * line that scales in from the center, flanked by a small motif. Dropped
 * between sections for seamless cinematic transitions instead of hard cuts.
 */
export function SectionDivider({
  motif = "✦",
  className,
}: {
  motif?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={`pointer-events-none relative flex items-center justify-center gap-4 py-6 ${className ?? ""}`}
      aria-hidden
    >
      <motion.span
        className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af7a]/60 sm:w-28"
        initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "right" }}
      />
      <motion.span
        className="text-sm text-[#f0d9a8]"
        initial={reduced ? undefined : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
      >
        {motif}
      </motion.span>
      <motion.span
        className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af7a]/60 sm:w-28"
        initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
