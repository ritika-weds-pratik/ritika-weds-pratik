"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Luxury button with a magnetic cursor-follow hover: the button drifts
 * toward the pointer and springs back on leave. Keeps the gold gradient
 * styling. Magnetic motion is disabled under reduced-motion (plain lift).
 */
export function PremiumButton({
  children,
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof Button>) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const strength = 0.25;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { x: springX, y: springY }}
      whileHover={reduced ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    >
      <Button
        asChild={asChild}
        className={`group rounded-full border border-[#d4af7a]/35 bg-gradient-to-r from-[#d4af7a] via-[#f0d9a8] to-[#c9a24a] px-6 py-3 text-[#0b1027] shadow-[0_10px_30px_rgba(201,162,74,0.28)] transition-shadow hover:shadow-[0_16px_44px_rgba(201,162,74,0.42)] ${className ?? ""}`}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </motion.div>
  );
}
