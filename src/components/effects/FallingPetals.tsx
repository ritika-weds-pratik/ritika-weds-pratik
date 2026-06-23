"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  count?: number;
  /** Petal hue — defaults to rose/gold royal petals. */
  color?: string;
  className?: string;
};

/**
 * Rose petals drifting down diagonally with gentle sway — the cinematic
 * flourish for gates reveal, finale and key section transitions.
 * Reduced when there's a lot of them on small screens; static scatter
 * when reduced motion is preferred.
 */
export function FallingPetals({ count = 18, color = "#e8939f", className }: Props) {
  const reduced = usePrefersReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        sway: 30 + Math.random() * 50,
        rotateEnd: 180 + Math.random() * 360,
        opacity: 0.4 + Math.random() * 0.4,
      })),
    [count]
  );

  if (reduced) {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
        {petals.slice(0, 6).map((p) => (
          <span
            key={p.id}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: `${Math.random() * 100}%`,
              width: p.size,
              height: p.size * 0.7,
              background: color,
              borderRadius: "50% 0 50% 50%",
              opacity: p.opacity * 0.5,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.7,
            background: `linear-gradient(135deg, ${color}, #f0d9a8)`,
            borderRadius: "50% 0 50% 50%",
            boxShadow: "0 0 8px rgba(240,217,168,0.25)",
          }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 80 : 900,
            x: [0, p.sway, -p.sway / 2, p.sway / 3, 0],
            rotate: [0, p.rotateEnd],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
