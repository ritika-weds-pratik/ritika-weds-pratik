"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FallingPetals } from "@/components/effects/FallingPetals";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { couple } from "@/data/wedding";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Stage 3 — the grand reveal behind the opened envelope.
 * Twin palace gates swing open, petals and golden sparkles flood in,
 * the couple monogram emerges and the names reveal via a calligraphy
 * ink-sweep. Then onOpen() hands control to the main invitation site.
 */

function GatePanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className="absolute top-0 h-full w-1/2 overflow-hidden"
      style={{
        left: isLeft ? 0 : "50%",
        transformOrigin: isLeft ? "left center" : "right center",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isLeft ? -110 : 110 }}
      transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* Wood + gold gate body */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #3a2412 0%, #5a3f18 40%, #4a3414 70%, #2e1c0a 100%)",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
        }}
      />
      {/* Gold arch frame */}
      <div
        className={`absolute top-0 h-full w-full ${isLeft ? "" : ""}`}
        style={{
          [isLeft ? "right" : "left"]: 0,
        }}
      >
        {/* Outer gold border on the inner edge */}
        <div
          className={`absolute top-0 h-full w-3 bg-gradient-to-b from-[#f0d9a8] via-[#c9a24a] to-[#8a6a2a] ${
            isLeft ? "right-0" : "left-0"
          }`}
        />
        {/* Top arch */}
        <div
          className={`absolute -top-10 h-40 w-40 rounded-full border-[6px] border-[#c9a24a]/70 ${
            isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          }`}
          style={{ background: "radial-gradient(circle, rgba(240,217,168,0.15), transparent 70%)" }}
        />
      </div>

      {/* Jali lattice panels */}
      <div
        className="absolute inset-6 grid grid-cols-3 gap-3 opacity-50"
        style={{
          gridTemplateRows: "repeat(4, 1fr)",
        }}
        aria-hidden
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md border border-[#f0d9a8]/30"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent 0 6px, rgba(240,217,168,0.08) 6px 7px)",
            }}
          />
        ))}
      </div>

      {/* Gold studs */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 2 }).map((__, c) => (
            <span
              key={`${r}-${c}`}
              className="absolute h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff7d9,#c9a24a)] shadow-[0_0_4px_rgba(240,217,168,0.6)]"
              style={{
                top: `${18 + r * 16}%`,
                left: isLeft ? `${24 + c * 40}%` : `${24 + c * 40}%`,
              }}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

export function PalaceGatesReveal({ onOpen }: { onOpen: () => void }) {
  const reduced = usePrefersReducedMotion();

  // After the reveal sequence, hand off to the main site.
  useEffect(() => {
    const t = window.setTimeout(onOpen, reduced ? 1200 : 4600);
    return () => window.clearTimeout(t);
  }, [onOpen, reduced]);

  return (
    <motion.div
      key="gates"
      className="fixed inset-0 z-[100] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,122,0.2),transparent_50%),linear-gradient(180deg,#06091a_0%,#0b1027_60%,#06091a_100%)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Gates */}
      <div className="absolute inset-0 [perspective:1600px]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          <GatePanel side="left" />
          <GatePanel side="right" />
        </div>
      </div>

      {/* Revealed splendor once gates are parting */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
        {/* Petals + sparkles flood in */}
        <FallingPetals count={reduced ? 0 : 36} />
        <GoldenParticles count={reduced ? 12 : 40} className="opacity-90" />

        {/* Monogram medallion */}
        <motion.div
          className="relative mb-8 flex h-28 w-28 items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 rounded-full border border-[#d4af7a]/40 animate-[spinSlow_30s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-[#d4af7a]/20" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.2),transparent_70%)] animate-[pulseGlow_4s_ease-in-out_infinite]" />
          <span className="hindi-text text-gold-shimmer text-3xl font-semibold">{couple.monogram}</span>
        </motion.div>

        {/* Names reveal via calligraphy ink sweep */}
        <h1 className="flex flex-col items-center gap-1">
          <motion.span
            className="hindi-text text-[clamp(3rem,8vw,6rem)] leading-none text-[#f5efe0]"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
            transition={{ delay: 2, duration: 1.3, ease: "easeInOut" }}
            style={{ textShadow: "0 0 30px rgba(240,217,168,0.4)" }}
          >
            {couple.bride.name}
          </motion.span>
          <motion.span
            className="text-2xl text-[#d4af7a]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.7, duration: 0.6 }}
          >
            ❀ विवाह ❀
          </motion.span>
          <motion.span
            className="hindi-text text-[clamp(3rem,8vw,6rem)] leading-none text-[#f5efe0]"
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
            transition={{ delay: 3, duration: 1.3, ease: "easeInOut" }}
            style={{ textShadow: "0 0 30px rgba(240,217,168,0.4)" }}
          >
            {couple.groom.name}
          </motion.span>
        </h1>

        {/* Family lines fade in */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-2 text-[#f0d9a8]/80"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1 }}
        >
          <p className="hindi-text text-sm tracking-wide md:text-base">
            {couple.bride.parents[0]} {couple.bride.parents[1]}
          </p>
          <p className="text-xs uppercase tracking-[0.5em]">&amp;</p>
          <p className="hindi-text text-sm tracking-wide md:text-base">
            {couple.groom.parents[0]} {couple.groom.parents[1]}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
