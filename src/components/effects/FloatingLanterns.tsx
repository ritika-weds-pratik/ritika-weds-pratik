"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMounted } from "@/hooks/useMounted";

/**
 * Sky lanterns (आकाश कंदील) gently rising with sway — for the grand finale.
 * Pure CSS/Framer Motion. Static when reduced motion is preferred.
 *
 * Randomized values are generated client-side only (mount gate) so server
 * and first client render match — no hydration mismatch.
 */
export function FloatingLanterns({ count = 9 }: { count?: number }) {
  const reduced = usePrefersReducedMotion();
  const mounted = useMounted();

  const lanterns = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        size: 26 + Math.random() * 22,
        delay: Math.random() * 6,
        duration: 14 + Math.random() * 10,
        sway: 20 + Math.random() * 30,
      })),
    [count]
  );

  // Pre-hydration: empty wrapper (matches server HTML).
  if (!mounted) {
    return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: `${l.left}%`, bottom: -60 }}
          initial={reduced ? { opacity: 0.5, y: -200 } : { opacity: 0, y: 0 }}
          animate={
            reduced
              ? { opacity: 0.5, y: -200 }
              : { opacity: [0, 0.85, 0.85, 0], y: [0, -800], x: [0, l.sway, -l.sway / 2, l.sway / 3, 0] }
          }
          transition={
            reduced
              ? undefined
              : { duration: l.duration, delay: l.delay, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {/* Lantern body */}
          <div className="relative" style={{ width: l.size, height: l.size * 1.4 }}>
            <div
              className="absolute inset-0 rounded-[40%_40%_45%_45%]"
              style={{
                background:
                  "radial-gradient(circle at 50% 70%, rgba(255,220,150,0.95), rgba(212,120,40,0.7) 60%, rgba(120,50,10,0.5))",
                boxShadow: "0 0 24px rgba(255,180,80,0.7)",
              }}
            />
            {/* Top cap */}
            <div
              className="absolute left-1/2 top-0 h-2 w-2/3 -translate-x-1/2 -translate-y-1 rounded-sm"
              style={{ background: "#5a3f18" }}
            />
            {/* Flame glow */}
            <div
              className="absolute left-1/2 top-[60%] h-3 w-3 -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(circle,#fff7d9,#f0d9a8)", filter: "blur(2px)" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
