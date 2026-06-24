"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { PalaceSilhouette } from "@/components/effects/PalaceSilhouette";
import { couple } from "@/data/wedding";

/**
 * Stage 1 of the entry experience — a full-screen cinematic splash.
 * Golden particles, a royal palace silhouette, the Lord Ganesha artwork
 * (sacred opener), the couple monogram and a personalized welcome. Tapping
 * "Begin" unlocks the ambient music and advances to the palace gates.
 *
 * Visual hierarchy: Lord Ganesha → sacred text → R&P monogram.
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(212,175,122,0.18),transparent_42%),linear-gradient(180deg,#050a1f_0%,#0b173f_50%,#050a1f_100%)]" />

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
        {/* ===== Lord Ganesha — the divine opener (first thing noticed) ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6 flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52"
        >
          {/* Rotating gold halo rings */}
          <div className="absolute inset-0 rounded-full border border-[#d4af7a]/25 animate-[spinSlow_26s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-[#d4af7a]/15 animate-[spinSlow_18s_linear_infinite_reverse]" />
          {/* Soft golden glow behind the deity */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.28),rgba(212,175,122,0.08)_55%,transparent_72%)] animate-[pulseGlow_4.5s_ease-in-out_infinite]" />
          {/* Soft particle scatter hugging the artwork */}
          <GoldenParticles count={14} className="scale-150 opacity-80" />
          {/* The artwork floats gently */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-32 w-32 sm:h-40 sm:w-40"
          >
            <Image
              src="/royal/ganesh.png"
              alt="भगवान गणेश का आशीर्वाद"
              width={160}
              height={160}
              priority
              className="h-full w-full object-contain drop-shadow-[0_0_38px_rgba(212,175,122,0.5)]"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* ===== Sacred text (second in hierarchy) ===== */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="hindi-text text-sm font-semibold tracking-normal text-[#f0d9a8] select-none"
          style={{ wordSpacing: "0.25em" }}
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        {/* ===== R&P monogram medallion (third in hierarchy) ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-7 flex h-24 w-24 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-[#d4af7a]/30 animate-[spinSlow_24s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border border-[#d4af7a]/15" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.16),transparent_70%)] animate-[pulseGlow_4s_ease-in-out_infinite]" />
          <span className="hindi-text bg-gradient-to-br from-[#fff7d9] via-[#f0d9a8] to-[#c9a24a] bg-clip-text text-3xl font-semibold text-transparent">
            {couple.monogram}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="hindi-text text-lg leading-8 text-[#f5efe0]/90 md:text-2xl"
        >
          सादर निवेदन
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
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
          whileHover={{ scale: 1.04, backgroundColor: "rgba(212,175,122,0.25)" }}
          whileTap={{ scale: 0.97 }}
          className="mt-12 rounded-full border border-[#d4af7a]/50 bg-[#d4af7a]/15 px-10 py-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#f0d9a8] backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,122,0.2)] transition-all"
        >
          Begin Journey
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ delay: 2.6, duration: 2.4, repeat: Infinity }}
          className="mt-5 text-[10px] uppercase tracking-[0.4em] text-[#f0d9a8]/50"
        >
          a royal celebration awaits
        </motion.p>
      </div>
    </motion.div>
  );
}
