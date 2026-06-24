"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PremiumButton } from "@/components/shared/PremiumButton";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { FallingPetals } from "@/components/effects/FallingPetals";
import { LightRays } from "@/components/effects/LightRays";
import { Mandala } from "@/components/effects/Mandala";
import { CharReveal } from "@/components/effects/CharReveal";
import { couple } from "@/data/wedding";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060914]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.18),transparent_22%),linear-gradient(180deg,#060914_0%,#0b1027_50%,#120f2a_100%)]" />
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        <div className="absolute left-1/2 top-[22%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#d4af7a]/15 blur-[100px] animate-[pulseGlow_6s_ease-in-out_infinite]" />
        <div className="absolute inset-x-0 bottom-0 h-[20rem] bg-gradient-to-t from-[#020611] via-[#060914]/60 to-transparent" />
      </div>

      {/* Royal Corner Flourishes for luxurious invite card look */}
      <div className="absolute inset-4 border border-[#d4af7a]/15 pointer-events-none z-10 rounded-[2rem]" />
      <div className="absolute inset-6 border border-[#d4af7a]/5 pointer-events-none z-10 rounded-[1.8rem]" />
      
      {/* Corner SVGs */}
      <div className="absolute left-8 top-8 h-10 w-10 border-l border-t border-[#d4af7a]/40 pointer-events-none z-20" />
      <div className="absolute right-8 top-8 h-10 w-10 border-r border-t border-[#d4af7a]/40 pointer-events-none z-20" />
      <div className="absolute left-8 bottom-8 h-10 w-10 border-l border-b border-[#d4af7a]/40 pointer-events-none z-20" />
      <div className="absolute right-8 bottom-8 h-10 w-10 border-r border-b border-[#d4af7a]/40 pointer-events-none z-20" />

      {/* Cinematic light rays behind Lord Ganesha */}
      <LightRays className="absolute top-[8%] left-1/2 h-[45rem] w-[45rem] -translate-x-1/2 opacity-70" color="rgba(240,217,168,0.18)" />

      {/* Floating elements */}
      <FallingPetals count={32} className="z-10" />
      <GoldenParticles count={55} className="opacity-90" />

      {/* Diya / Slow floating ambient lights */}
      <motion.div
        animate={{ y: [-15, 15, -15], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[20%] top-[30%] h-8 w-8 rounded-full bg-[#d4af7a]/30 blur-xl"
      />
      <motion.div
        animate={{ y: [15, -15, 15], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] top-[40%] h-12 w-12 rounded-full bg-[#e8939f]/20 blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-20 mx-auto max-w-5xl px-6 pb-16 pt-24 text-center sm:px-8"
      >
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
            className="relative mb-8 flex items-center justify-center"
          >
            {/* Rotating sacred mandala and rings */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute text-[#d4af7a]/20"
            >
              <Mandala className="h-[360px] w-[360px]" />
            </motion.div>
            
            <div className="absolute h-[320px] w-[320px] rounded-full border border-[#d4af7a]/20 animate-[spinSlow_18s_linear_infinite]" />
            <div className="absolute h-[255px] w-[255px] rounded-full border border-[#d4af7a]/15 animate-[spinSlow_12s_linear_infinite_reverse]" />
            
            {/* Animated sacred aura */}
            <div className="absolute h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.15),transparent_70%)] animate-[pulseGlow_4s_ease-in-out_infinite]" />
            
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex h-[190px] w-[190px] items-center justify-center sm:h-[230px] sm:w-[230px] md:h-[260px] md:w-[260px]"
            >
              <Image
                src="/royal/ganesh.png"
                alt="भगवान गणेश — शुभ कार्य का आरंभ"
                width={260}
                height={260}
                priority
                className="h-full w-full object-contain drop-shadow-[0_0_50px_rgba(212,175,122,0.45)]"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* Sanskrit text with perfect Devanagari conjunct rendering (no split CharReveal) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="mb-4 text-center"
          >
            <p className="hindi-text text-base md:text-lg font-semibold tracking-normal text-[#f0d9a8] select-none">
              ॥ श्री गणेशाय नमः ॥
            </p>
            {/* Elegant gold flourish divider */}
            <div className="mx-auto mt-2 flex items-center justify-center gap-3 opacity-80">
              <span className="text-[#d4af7a] text-[10px]">✦</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4af7a]/50 to-transparent" />
              <span className="text-[#d4af7a] text-xs">❦</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4af7a]/50 to-transparent" />
              <span className="text-[#d4af7a] text-[10px]">✦</span>
            </div>
          </motion.div>

          {/* Premium Monogram Shield with ambient glow and animated border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 1.5, type: "spring", stiffness: 60 }}
            className="mb-6 relative flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute h-16 w-16 rounded-full border border-dashed border-[#d4af7a]/40"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-14 w-14 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.2),transparent_70%)] blur-sm"
            />
            <div className="relative h-12 w-12 rounded-full border border-[#d4af7a]/25 bg-[#060914]/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(212,175,122,0.3)]">
              <span className="number-text text-sm font-bold text-gold-shimmer tracking-normal select-none">
                {couple.monogram}
              </span>
            </div>
          </motion.div>

          {/* "शुभ विवाह" reveals as a single block with luxury golden shimmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 pt-3 pb-1 select-none" 
            style={{ filter: "drop-shadow(0 0 25px rgba(212,175,122,0.35))" }}
          >
            <h1 className="hindi-text bg-gradient-to-r from-[#f5efe0] via-[#f0d9a8] to-[#c9a24a] bg-[length:200%_100%] bg-clip-text text-[clamp(4.2rem,8vw,7.2rem)] font-bold leading-[1.3] tracking-normal text-transparent inline-block text-gold-shimmer">
              शुभ विवाह
            </h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#d4af7a]/50" />
              <span className="text-[#d4af7a] text-[10px]">✨</span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#d4af7a]/50" />
            </div>
          </motion.div>

          {/* Bride & Groom names enhanced, 25-35% larger, with title prefixes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1.2, ease: "easeOut" }}
            className="flex flex-col gap-4 items-center justify-center text-[#f0d9a8] select-none"
          >
            <div className="text-center">
              <span className="hindi-text text-xs md:text-sm font-medium tracking-[0.1em] text-[#f5efe0]/60 block mb-1">
                {couple.bride.title}
              </span>
              <p className="hindi-text text-[2.8rem] md:text-[3.8rem] font-bold leading-[1.2] text-[#f5efe0] text-gold-shimmer">
                {couple.bride.name}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 my-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/40" />
              <span className="text-[#e8939f] text-2xl animate-pulse">❤️</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af7a]/40" />
            </div>

            <div className="text-center">
              <span className="hindi-text text-xs md:text-sm font-medium tracking-[0.1em] text-[#f5efe0]/60 block mb-1">
                {couple.groom.title}
              </span>
              <p className="hindi-text text-[2.8rem] md:text-[3.8rem] font-bold leading-[1.2] text-[#f5efe0] text-gold-shimmer">
                {couple.groom.name}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 1 }}
            className="mt-12 flex flex-col justify-center gap-5 sm:flex-row"
          >
            <PremiumButton asChild>
              <Link href="#countdown">Save The Date</Link>
            </PremiumButton>
            <Link
              href="#events"
              className="inline-flex items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/70 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.4em] text-[#f5efe0] backdrop-blur-md transition-all hover:bg-[#d4af7a]/10 hover:border-[#d4af7a]/60 hover:shadow-[0_0_20px_rgba(212,175,122,0.15)]"
            >
              Explore Events
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
