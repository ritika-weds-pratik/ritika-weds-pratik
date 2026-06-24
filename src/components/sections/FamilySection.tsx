"use client";

import { motion } from "framer-motion";
import { Phone, UserRound, Crown } from "lucide-react";
import { family } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { GoldenParticles } from "@/components/effects/GoldenParticles";

export function FamilySection() {
  return (
    <section
      id="family"
      aria-labelledby="family-heading"
      className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_25%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(212,175,122,0.02)_50%,transparent_100%)]" />
      <GoldenParticles count={25} className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="section-label">Royal Family Wall</p>
          <div className="mt-4 flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
            <h2 id="family-heading" className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer">
              परिवार
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#f5efe0]/70">
            With love, blessings, and warm regards from the entire family.
          </p>
        </RevealOnScroll>

        {/* Families Highlight */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16">
          <RevealOnScroll delay={0.2} direction="right">
            <div className="flex items-center gap-4">
              <Crown className="h-6 w-6 text-[#d4af7a]" />
              <span className="font-serif text-2xl text-[#f0d9a8] tracking-widest">Chaudhary Family</span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.4} direction="up">
            <span className="text-[#d4af7a]/40 text-3xl">|</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.6} direction="left">
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl text-[#f0d9a8] tracking-widest">Jaiswal Family</span>
              <Crown className="h-6 w-6 text-[#d4af7a]" />
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-20 space-y-12">
          {family.map((group, idx) => (
            <RevealOnScroll key={group.title} delay={idx * 0.15}>
              <div className="group relative overflow-hidden rounded-[2rem] border-2 border-[#d4af7a]/20 bg-[linear-gradient(180deg,rgba(15,27,73,0.5),rgba(5,9,19,0.85))] p-8 shadow-[0_25px_65px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-[#d4af7a]/40 hover:shadow-[0_0_50px_rgba(212,175,122,0.15)] md:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.1),transparent_30%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute inset-4 border border-[#d4af7a]/15 rounded-[1.25rem] pointer-events-none" />
                
                {/* Decorative Indian Corner Ornaments */}
                <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-[#d4af7a]/30 pointer-events-none" />
                <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-[#d4af7a]/30 pointer-events-none" />
                <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-[#d4af7a]/30 pointer-events-none" />
                <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-[#d4af7a]/30 pointer-events-none" />

                <div className="relative text-center">
                  <div className="inline-flex flex-col items-center">
                    <h3 className="font-serif text-3xl text-[#f5efe0]">{group.title}</h3>
                    <div className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#d4af7a]/80 to-transparent" />
                    <p className="mt-3 text-xs uppercase tracking-[0.5em] text-[#f0d9a8]/70">{group.english}</p>
                  </div>

                  {group.contact ? (
                    // Contact family card
                    <div className="mx-auto mt-10 max-w-lg rounded-[1.5rem] border border-[#d4af7a]/25 bg-[linear-gradient(160deg,rgba(12,10,34,0.8),rgba(6,9,20,0.9))] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <div className="flex justify-center -mt-14 mb-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d4af7a]/40 bg-[#0d0a1f] shadow-[0_0_25px_rgba(212,175,122,0.2)]">
                          <UserRound className="h-8 w-8 text-[#f0d9a8]" />
                        </div>
                      </div>
                      <div className="space-y-4 text-left">
                        <div className="group/item flex items-center rounded-2xl border border-[#d4af7a]/15 bg-white/5 p-4 transition-colors hover:bg-white/10">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af7a]/10">
                            <span className="text-[#d4af7a] text-sm">N</span>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Name</p>
                            <p className="mt-1 text-base font-medium text-[#f5efe0]">{group.contact.name}</p>
                          </div>
                        </div>
                        <div className="group/item flex rounded-2xl border border-[#d4af7a]/15 bg-white/5 p-4 transition-colors hover:bg-white/10">
                          <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/10">
                            <span className="text-[#d4af7a] text-sm">A</span>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Address</p>
                            <div className="mt-1 space-y-1 text-sm leading-6 text-[#f5efe0]/90">
                              {group.contact.address.map((line) => (
                                <p key={line}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="group/item flex items-center rounded-2xl border border-[#d4af7a]/15 bg-white/5 p-4 transition-colors hover:bg-white/10">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af7a]/10">
                            <Phone className="h-4 w-4 text-[#d4af7a]" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Number</p>
                            <a
                              href={`tel:${group.contact.phone.replace(/\s/g, "")}`}
                              className="number-text mt-1 flex items-center gap-2 text-base md:text-lg tracking-[0.1em] text-[#f0d9a8] font-semibold transition hover:text-[#fff1be]"
                            >
                              {group.contact.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Royal name display
                    <div className="mt-10 flex flex-wrap justify-center gap-4 text-[#f5efe0]/90">
                      {group.names.map((name, i) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="group/chip relative overflow-hidden rounded-full border border-[#d4af7a]/25 bg-gradient-to-br from-[#1c1836]/60 to-[#0b1027]/80 px-6 py-3 text-sm backdrop-blur-md transition-all hover:border-[#d4af7a]/60 hover:shadow-[0_0_20px_rgba(212,175,122,0.2)]"
                        >
                          <span className="relative z-10 font-medium tracking-wide transition-colors group-hover/chip:text-[#fff1be]">
                            {name}
                          </span>
                          <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(240,217,168,0.25),transparent)] transition-transform duration-700 group-hover/chip:translate-x-full" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
