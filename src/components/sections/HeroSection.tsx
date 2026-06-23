"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PremiumButton } from "@/components/shared/PremiumButton";
import { GoldenParticles } from "@/components/effects/GoldenParticles";

/**
 * Hero — the landing view guests arrive at after the entry experience.
 * The sacred Ganesha artwork lives at /royal/ganesh.png (645KB, lazy-safe)
 * instead of an ~860KB inline base64 blob that used to ship in the JS bundle.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060914]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.12),transparent_18%),linear-gradient(180deg,#060914_0%,#0b1027_50%,#120f2a_100%)]" />
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-1/2 top-[22%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[#d4af7a]/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-[18rem] bg-gradient-to-t from-[#020611] via-[#060914]/50 to-transparent" />
        <div className="absolute left-0 top-[58%] h-[18rem] w-[18rem] rounded-full border border-[#d4af7a]/5" />
        <div className="absolute right-0 top-[38%] h-[22rem] w-[22rem] rounded-full border border-[#d4af7a]/5" />
      </div>

      {/* Ambient golden particles */}
      <GoldenParticles count={26} className="opacity-70" />

      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-24 text-center sm:px-8"
      >
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative mb-6 flex items-center justify-center"
          >
            <div className="absolute h-[310px] w-[310px] rounded-full border border-[#d4af7a]/15 animate-[spinSlow_18s_linear_infinite]" />
            <div className="absolute h-[245px] w-[245px] rounded-full border border-[#d4af7a]/10 animate-[spinSlow_12s_linear_infinite_reverse]" />
            <div className="absolute h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.09),transparent_68%)] animate-[pulseGlow_4.5s_ease-in-out_infinite]" />
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="relative z-10 flex h-[180px] w-[180px] items-center justify-center sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px]"
            >
              <Image
                src="/royal/ganesh.png"
                alt="भगवान गणेश — शुभ कार्य का आरंभ"
                width={240}
                height={240}
                priority
                className="h-full w-full object-contain drop-shadow-[0_0_45px_rgba(212,175,122,0.35)]"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="hindi-text mb-3 text-[0.7rem] uppercase tracking-[0.7em] text-[#f0d9a8]"
          >
            ।। श्री गणेशाय नमः ।।
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-4 text-xs uppercase tracking-[0.65em] text-[#f0d9a8]"
          >
            Ek Shubh Aarambh
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="hindi-text bg-gradient-to-r from-[#f5efe0] via-[#f0d9a8] to-[#c9a24a] bg-[length:200%_100%] bg-clip-text text-[clamp(3.8rem,6vw,5.8rem)] uppercase tracking-[0.35em] animate-[shine_5s_linear_infinite] text-transparent"
          >
            शुभ विवाह
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="mt-8 flex flex-col gap-2 text-[#f0d9a8]"
          >
            <p className="hindi-text text-2xl md:text-4xl">आयुष्मती कुमारी रीतिका</p>
            <p className="text-sm uppercase tracking-[0.6em] text-[#f5efe0]/70">WITH</p>
            <p className="hindi-text text-2xl md:text-4xl">आयुष्मान कुमार प्रतीक</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <PremiumButton asChild>
              <Link href="#countdown">Save The Date</Link>
            </PremiumButton>
            <Link
              href="#events"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af7a]/25 bg-[#0b1027]/60 px-6 py-3 text-sm uppercase tracking-[0.35em] text-[#f5efe0] backdrop-blur-sm transition hover:bg-[#0b1027]/80"
            >
              Explore Events
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
