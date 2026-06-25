"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { PalaceSilhouette } from "@/components/effects/PalaceSilhouette";
import { couple } from "@/data/wedding";

const HAND_SEEN_KEY = "wedding-splash-hand-seen";

/**
 * Stage 1 of the entry experience — a full-screen cinematic splash.
 * Golden particles, a royal palace silhouette, the Lord Ganesha artwork
 * (sacred opener), the couple monogram and a personalized welcome. Tapping
 * "Begin" unlocks the ambient music and advances to the palace gates.
 *
 * Visual hierarchy: Lord Ganesha → sacred text → R&P monogram.
 */
export function SplashLoader({ onComplete }: { onComplete: () => void }) {
  const [showHand, setShowHand] = useState(false);

  useEffect(() => {
    // Only show if the hand hasn't been clicked/seen in this session
    try {
      if (sessionStorage.getItem(HAND_SEEN_KEY) !== "1") {
        setShowHand(true);
      }
    } catch {
      setShowHand(true);
    }
  }, []);

  const handleStart = () => {
    try {
      sessionStorage.setItem(HAND_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowHand(false);
    onComplete();
  };

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

        {/* Enhanced CTA Button Wrapper */}
        <div className="relative mt-12">
          <motion.button
            type="button"
            onClick={handleStart}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: [1, 1.025, 1],
              boxShadow: [
                "0 0 15px rgba(212,175,122,0.15)",
                "0 0 32px rgba(212,175,122,0.45)",
                "0 0 15px rgba(212,175,122,0.15)",
              ],
              borderColor: [
                "rgba(212,175,122,0.4)",
                "rgba(212,175,122,0.85)",
                "rgba(212,175,122,0.4)",
              ],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 2.2 },
              scale: { repeat: Infinity, duration: 3.0, ease: "easeInOut", delay: 3.0 },
              boxShadow: { repeat: Infinity, duration: 3.0, ease: "easeInOut", delay: 3.0 },
              borderColor: { repeat: Infinity, duration: 3.0, ease: "easeInOut", delay: 3.0 },
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative rounded-full border px-10 py-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#f0d9a8] overflow-hidden cursor-pointer select-none"
          >
            {/* Button Background */}
            <div className="absolute inset-0 -z-20 bg-[#d4af7a]/15 backdrop-blur-sm" />

            {/* Shimmer sweeping light across the button */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#f0d9a8]/35 to-transparent"
              style={{
                skewX: -25,
                width: "45%",
                height: "100%",
                top: 0,
              }}
              animate={{
                left: ["-60%", "140%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 3.8,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10">Begin Journey</span>
          </motion.button>

          {/* Interactive Tap Indicator Hand Animation */}
          <AnimatePresence>
            {showHand && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
                className="absolute -top-[55px] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              >
                {/* Vertical bouncing wrapper pointing down towards the button */}
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center justify-center w-[34px] h-[34px]"
                >
                  {/* Rippling effects at finger tip (positioned at bottom center-right) */}
                  <div className="absolute top-[27px] left-[19px] -translate-x-1/2 -translate-y-1/2">
                    {/* Outer Ripple */}
                    <motion.div
                      className="absolute rounded-full border border-[#f0d9a8]/60 bg-[#f0d9a8]/10"
                      style={{ width: 36, height: 36, x: -18, y: -18 }}
                      animate={{ scale: [0.4, 2.2], opacity: [0.8, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    {/* Inner Ripple */}
                    <motion.div
                      className="absolute rounded-full border border-[#f0d9a8]/40 bg-[#f0d9a8]/5"
                      style={{ width: 36, height: 36, x: -18, y: -18 }}
                      animate={{ scale: [0.4, 2.2], opacity: [0.8, 0] }}
                      transition={{
                        duration: 1.8,
                        delay: 0.9,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    {/* Soft central pulse dot */}
                    <motion.div
                      className="absolute rounded-full bg-[#f0d9a8]/80"
                      style={{ width: 8, height: 8, x: -4, y: -4 }}
                      animate={{ scale: [0.8, 1.3, 0.8] }}
                      transition={{
                        duration: 1.0,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Elegant hand pointing cursor SVG rotated 180deg to point down */}
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f0d9a8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_rgba(212,175,122,0.6)] rotate-180"
                  >
                    <path d="M12 11V4.5a1.5 1.5 0 0 0-3 0V14l-1.5-1.5a1 1 0 0 0-1.4 0l-1.1 1.1a1 1 0 0 0 0 1.4L9 19c2 2 4.5 3 7 3h2a3 3 0 0 0 3-3V12.5a1.5 1.5 0 0 0-3 0V11H12z" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
