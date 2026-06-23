"use client";

import { motion } from "framer-motion";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { PalaceSilhouette } from "@/components/effects/PalaceSilhouette";
import { couple } from "@/data/wedding";

/**
 * Stage 1 of the entry experience — a full-screen cinematic splash.
 * Golden particles, a royal palace silhouette, the couple monogram and a
 * personalized welcome. Fades out to reveal the wax-sealed envelope.
 */
export function SplashLoader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050a1f]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      {/* Layered sky gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,122,0.18),transparent_40%),linear-gradient(180deg,#050a1f_0%,#0b173f_50%,#050a1f_100%)]" />

      {/* Light rays from behind the palace */}
      <motion.div
        className="absolute left-1/2 top-[42%] h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(240,217,168,0.10) 8deg, transparent 16deg, rgba(240,217,168,0.07) 26deg, transparent 34deg, rgba(240,217,168,0.09) 46deg, transparent 54deg)",
          filter: "blur(8px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <GoldenParticles count={40} className="opacity-90" />

      {/* Palace silhouette anchored to the bottom */}
      <PalaceSilhouette className="absolute inset-x-0 bottom-0 h-[42vh] w-full text-[#0a0814]" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-xs uppercase tracking-[0.65em] text-[#f0d9a8]"
        >
          ।। श्री गणेशाय नमः ।।
        </motion.p>

        {/* Monogram medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-8 flex h-32 w-32 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-[#d4af7a]/30 animate-[spinSlow_24s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border border-[#d4af7a]/15" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.16),transparent_70%)] animate-[pulseGlow_4s_ease-in-out_infinite]" />
          <span className="hindi-text bg-gradient-to-br from-[#fff7d9] via-[#f0d9a8] to-[#c9a24a] bg-clip-text text-4xl font-semibold text-transparent">
            {couple.monogram}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="hindi-text text-lg leading-8 text-[#f5efe0]/90 md:text-2xl"
        >
          सादर निवेदन
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-3 max-w-md text-sm leading-7 text-[#f5efe0]/70 md:text-base"
        >
          You are cordially invited to step into a royal celebration of love.
        </motion.p>

        <motion.button
          type="button"
          onClick={onComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 rounded-full border border-[#d4af7a]/40 bg-[#d4af7a]/10 px-8 py-3 text-xs uppercase tracking-[0.4em] text-[#f0d9a8] backdrop-blur-sm transition hover:bg-[#d4af7a]/20"
        >
          Begin
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ delay: 2.6, duration: 2.4, repeat: Infinity }}
          className="mt-5 text-[10px] uppercase tracking-[0.4em] text-[#f0d9a8]/50"
        >
          a royal invitation awaits
        </motion.p>
      </div>
    </motion.div>
  );
}
