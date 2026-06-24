"use client";

import { motion } from "framer-motion";
import { couple } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { GoldenParticles } from "@/components/effects/GoldenParticles";

export function CoupleIntroductionSection() {
  return (
    <section
      id="couple"
      aria-labelledby="couple-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0d0a1f] py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.08),transparent_15%),radial-gradient(circle_at_bottom,rgba(240,217,168,0.05),transparent_10%)]" />
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af7a]/10" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.06),transparent_68%)]" />
      <GoldenParticles count={20} className="opacity-60" />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0d9a8]/10 blur-[80px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
        <RevealOnScroll direction="fade" className="mb-14 text-center select-none">
          <p className="font-serif text-sm font-bold uppercase tracking-[0.4em] text-[#f0d9a8]">The Couple</p>
          <div className="mt-4 flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
            <h2 id="couple-heading" className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer">
              विवाह-युगल
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
          </div>

          {/* Luxury focal spotlight block highlighting both names together */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-12 max-w-xl mx-auto px-6 py-8 rounded-[2rem] border border-[#d4af7a]/20 bg-[linear-gradient(180deg,rgba(212,175,122,0.05),rgba(6,9,20,0.5))] shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,217,168,0.06),transparent_60%)]" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="text-center">
                <span className="hindi-text text-xs uppercase tracking-[0.1em] text-[#f0d9a8]/70 block mb-1">
                  {couple.bride.title}
                </span>
                <span className="hindi-text text-3xl md:text-4xl font-bold text-[#f5efe0] text-gold-shimmer drop-shadow-md">
                  {couple.bride.name}
                </span>
              </div>
              
              <div className="flex items-center gap-4 my-1">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af7a]/40 to-transparent" />
                <span className="text-[#e8939f] text-2xl animate-pulse">❤️</span>
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af7a]/40 to-transparent" />
              </div>

              <div className="text-center">
                <span className="hindi-text text-xs uppercase tracking-[0.1em] text-[#f0d9a8]/70 block mb-1">
                  {couple.groom.title}
                </span>
                <span className="hindi-text text-3xl md:text-4xl font-bold text-[#f5efe0] text-gold-shimmer drop-shadow-md">
                  {couple.groom.name}
                </span>
              </div>
            </div>
          </motion.div>
        </RevealOnScroll>

        {/* Premium Floral Borders and Glowing Frame */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting light trail SVG between cards */}
          <svg className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 md:block" viewBox="0 0 1000 200" fill="none" preserveAspectRatio="none">
             <motion.path
               d="M0,100 Q250,150 500,100 T1000,100"
               stroke="url(#glow-gradient)"
               strokeWidth="2"
               strokeDasharray="10 10"
               initial={{ strokeDashoffset: 1000 }}
               whileInView={{ strokeDashoffset: 0 }}
               transition={{ duration: 3, ease: "linear", repeat: Infinity }}
             />
             <defs>
               <linearGradient id="glow-gradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                 <stop stopColor="rgba(212,175,122,0)" />
                 <stop offset="0.5" stopColor="rgba(240,217,168,0.6)" />
                 <stop offset="1" stopColor="rgba(212,175,122,0)" />
               </linearGradient>
             </defs>
          </svg>

          <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-4 lg:gap-8 items-center">
            
            {/* Bride enters from left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-[2rem] border border-[#d4af7a]/25 bg-[linear-gradient(135deg,rgba(12,10,34,0.9),rgba(22,17,52,0.8))] p-8 text-center shadow-[0_0_40px_rgba(212,175,122,0.1)] transition-all hover:border-[#d4af7a]/50 hover:shadow-[0_0_60px_rgba(240,217,168,0.15)]"
            >
              {/* Corner Ornaments */}
              <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-[#d4af7a]/40" />
              <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-[#d4af7a]/40" />
              <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#d4af7a]/40" />
              <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#d4af7a]/40" />

              <motion.div whileHover={{ scale: 1.05 }} className="group relative mx-auto mb-6 h-48 w-48">
                <div className="absolute inset-0 rounded-full border border-[#d4af7a]/30 animate-[spinSlow_20s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-[#d4af7a]/10 animate-[spinSlow_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-gold-shimmer">
                  {couple.bride.monogram}
                </div>
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>

              <p className="hindi-text text-xs text-[#f0d9a8] pt-1 tracking-normal font-semibold">{couple.bride.title}</p>
              <h3 className="mt-2 text-[2.6rem] leading-[1.35] text-[#f5efe0] hindi-text tracking-normal">{couple.bride.name}</h3>
              <p className="mt-2 text-sm text-[#f0d9a8] tracking-normal font-medium">{couple.bride.role}</p>
              
              <div className="mt-5 w-full border-t border-[#d4af7a]/20" />
              
              {/* Sequentially revealed details */}
              <div className="mt-5 space-y-2">
                {couple.bride.parents.map((p, i) => (
                  <motion.p 
                    key={p} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="hindi-text text-sm leading-6 text-[#f5efe0]/80"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <div className="mt-4 space-y-1">
                <p className="hindi-text text-xs text-[#f0d9a8] tracking-normal font-semibold">निवासी</p>
                {couple.bride.residence.map((r, i) => (
                  <motion.p 
                    key={r}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="hindi-text text-sm leading-6 text-[#f5efe0]/80"
                  >
                    {r}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Center Heart Medallion */}
            <div className="relative z-10 flex items-center justify-center py-4">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                viewport={{ once: true }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af7a]/40 bg-[#0d0a1f] shadow-[0_0_40px_rgba(212,175,122,0.2)]"
              >
                <div className="absolute inset-2 rounded-full border border-[#d4af7a]/20" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], textShadow: ["0 0 10px rgba(232,147,159,0.4)", "0 0 20px rgba(232,147,159,0.8)", "0 0 10px rgba(232,147,159,0.4)"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-3xl text-[#e8939f]"
                >
                  ❤
                </motion.div>
              </motion.div>
            </div>

            {/* Groom enters from right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-[2rem] border border-[#d4af7a]/25 bg-[linear-gradient(225deg,rgba(12,10,34,0.9),rgba(22,17,52,0.8))] p-8 text-center shadow-[0_0_40px_rgba(212,175,122,0.1)] transition-all hover:border-[#d4af7a]/50 hover:shadow-[0_0_60px_rgba(240,217,168,0.15)]"
            >
              {/* Corner Ornaments */}
              <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-[#d4af7a]/40" />
              <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-[#d4af7a]/40" />
              <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#d4af7a]/40" />
              <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#d4af7a]/40" />

              <motion.div whileHover={{ scale: 1.05 }} className="group relative mx-auto mb-6 h-48 w-48">
                <div className="absolute inset-0 rounded-full border border-[#d4af7a]/30 animate-[spinSlow_20s_linear_infinite_reverse]" />
                <div className="absolute inset-2 rounded-full border border-[#d4af7a]/10 animate-[spinSlow_15s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-gold-shimmer">
                  {couple.groom.monogram}
                </div>
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>

              <p className="hindi-text text-xs text-[#f0d9a8] pt-1 tracking-normal font-semibold">{couple.groom.title}</p>
              <h3 className="mt-2 text-[2.6rem] leading-[1.35] text-[#f5efe0] hindi-text tracking-normal">{couple.groom.name}</h3>
              <p className="mt-2 text-sm text-[#f0d9a8] tracking-normal font-medium">{couple.groom.role}</p>
              
              <div className="mt-5 w-full border-t border-[#d4af7a]/20" />
              
              {/* Sequentially revealed details */}
              <div className="mt-5 space-y-2">
                {couple.groom.parents.map((p, i) => (
                  <motion.p 
                    key={p}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="hindi-text text-sm leading-6 text-[#f5efe0]/80"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <div className="mt-4 space-y-1">
                <p className="hindi-text text-xs text-[#f0d9a8] tracking-normal font-semibold">निवासी</p>
                {couple.groom.residence.map((r, i) => (
                  <motion.p 
                    key={r}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="hindi-text text-sm leading-6 text-[#f5efe0]/80"
                  >
                    {r}
                  </motion.p>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
