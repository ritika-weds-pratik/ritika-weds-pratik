"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMounted } from "@/hooks/useMounted";

type Props = {
  count?: number;
  /** Petal hue — defaults to rose/gold royal petals. */
  color?: string;
  className?: string;
};

type Petal = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  rotateEnd: number;
  opacity: number;
};

/**
 * Rose petals drifting down diagonally with gentle sway — the cinematic
 * flourish for gates reveal, finale and key section transitions.
 * Static scatter when reduced motion is preferred.
 *
 * Randomized values are generated client-side only (mount gate) so server
 * and first client render match — no hydration mismatch.
 */
export function FallingPetals({ count = 18, color = "#e8939f", className }: Props) {
  const reduced = usePrefersReducedMotion();
  const mounted = useMounted();

  // Randomized once via a lazy state initializer (allowed to be impure,
  // runs only on the client after the mount gate).
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 8,
      duration: 9 + Math.random() * 8,
      sway: 30 + Math.random() * 50,
      rotateEnd: 180 + Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.4,
    }))
  );

  const wrapper = `pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`;

  // Fall distance is the viewport height; only safe to read after mount.
  const fallDistance = mounted ? window.innerHeight + 80 : 1000;

  if (!mounted || reduced) {
    // Static scatter (or empty pre-hydration).
    return (
      <div className={wrapper} aria-hidden>
        {mounted &&
          petals.slice(0, 6).map((p) => (
            <span
              key={p.id}
              className="absolute"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
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
    <div className={wrapper} aria-hidden>
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
            y: fallDistance,
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
