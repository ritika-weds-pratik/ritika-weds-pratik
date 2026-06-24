"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Scroll-driven parallax layer. The y-offset is derived from how far its
 * parent section has scrolled through the viewport, giving genuine depth
 * without a global scroll listener. Disabled (identity) under reduced-motion.
 *
 * `speed` > 0 moves slower than scroll (recedes); < 0 moves faster (advances).
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  /** 0 = static, 0.3 = gentle, 0.6 = strong. Negative inverts direction. */
  speed?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
