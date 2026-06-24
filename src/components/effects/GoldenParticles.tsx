"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMounted } from "@/hooks/useMounted";

type Props = {
  /** Number of particles. Auto-halved on small screens for perf. */
  count?: number;
  className?: string;
};

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  rise: number;
};

/**
 * Ambient floating golden motes — the signature shimmer of the whole site.
 * Pure CSS/Framer Motion (no canvas), GPU-friendly transforms only.
 * Renders a static, dimmed scatter when reduced motion is preferred.
 *
 * The randomized particle field is generated client-side only (gated behind
 * a mount check) so server and first client render match — no hydration
 * mismatch.
 */
export function GoldenParticles({ count = 20, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const mounted = useMounted();

  // Randomized once via a lazy state initializer (allowed to be impure,
  // runs only on the client after the mount gate).
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 6,
      duration: 7 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 30,
      opacity: 0.3 + Math.random() * 0.5,
      rise: 60 + Math.random() * 40,
    }))
  );

  const wrapper = `pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`;

  // Before hydration: render nothing (matches server HTML exactly).
  if (!mounted) {
    return <div className={wrapper} aria-hidden />;
  }

  if (reduced) {
    return (
      <div className={wrapper} aria-hidden>
        {particles.slice(0, Math.ceil(count / 2)).map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-[#f0d9a8]"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, opacity: p.opacity * 0.5 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={wrapper} aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[#f0d9a8]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px rgba(240,217,168,0.6)",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [0, -p.rise],
            x: [0, p.drift],
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
