"use client";

import { motion } from "framer-motion";
import { Fireworks } from "@/components/effects/Fireworks";
import { FloatingLanterns } from "@/components/effects/FloatingLanterns";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { PalaceSilhouette } from "@/components/effects/PalaceSilhouette";
import { couple, weddingDate } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

/**
 * Grand Finale — palace illumination, fireworks, floating lanterns,
 * the couple monogram and an emotional closing blessing. The emotional
 * bookend that mirrors the opening entry experience.
 */
export function FinalSection() {
  return (
    <section
      id="finale"
      aria-labelledby="finale-heading"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[#060914] pt-24 pb-20"
      style={{ contain: "layout paint" }}
    >
      {/* Deep sky */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(212,175,122,0.12),transparent_45%),linear-gradient(180deg,#050a1f_0%,#0b1027_55%,#060914_100%)]" />

      {/* Fireworks layer */}
      <div className="absolute inset-0 opacity-90">
        <Fireworks className="h-full w-full" />
      </div>

      {/* Palace silhouette illuminated at the base */}
      <PalaceSilhouette className="absolute inset-x-0 bottom-0 h-[36vh] w-full text-[#0a0814]" />

      {/* Warm palace glow from below (illumination sequence) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{ background: "linear-gradient(0deg, rgba(240,217,168,0.22), transparent)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.8, 0.5, 0.85] }}
        viewport={{ once: true }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Seamless bottom fade — blends to exact page bg, eliminates any visible gap */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, #060914)",
        }}
      />

      <FloatingLanterns count={10} />
      <GoldenParticles count={26} className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll direction="fade">
          {/* Monogram */}
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#d4af7a]/30 animate-[spinSlow_28s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-[#d4af7a]/15" />
            <span className="hindi-text text-gold-shimmer text-2xl font-semibold">{couple.monogram}</span>
          </div>

          <div className="mx-auto mb-6 flex w-max items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
            <span className="text-[#f0d9a8]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
          </div>

          <motion.h2
            id="finale-heading"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hindi-text text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.3] text-[#f5efe0] tracking-normal pt-2"
            style={{ textShadow: "0 0 40px rgba(240,217,168,0.45)" }}
          >
            {couple.bride.name} <span className="text-[#e8939f]">❤</span> {couple.groom.name}
          </motion.h2>

          <p className="number-text mt-5 text-sm md:text-base font-semibold tracking-[0.3em] text-[#f0d9a8]">{weddingDate.display}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="hindi-text mt-10 text-lg leading-9 text-[#f0d9a8] md:text-xl tracking-wide">
            एक नई कहानी का शुभ आरम्भ...
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            <p className="hindi-text text-xl md:text-2xl leading-10 text-[#f5efe0]/90">
              आपकी उपस्थिति एवं आशीर्वाद हमारे लिए सबसे बड़ा उपहार है।
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af7a]/50" />
            <span className="text-[#f0d9a8] text-xl">💐</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af7a]/50" />
          </div>
          <p className="hindi-text mt-6 text-xl text-[#f0d9a8] md:text-2xl tracking-normal">सादर आमंत्रण</p>
          <p className="mt-2 hindi-text text-xs tracking-normal text-[#f5efe0]/50">With Love &amp; Blessings</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
