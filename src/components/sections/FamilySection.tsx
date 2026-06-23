"use client";

import { motion } from "framer-motion";
import { Phone, UserRound } from "lucide-react";
import { family } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

/**
 * Family Showcase — hosts, well-wishers and the contact family (आकांक्षी).
 * Names render as ornamental chips with a golden hover; the contact card
 * is a standalone royal panel. Reads from the shared family data.
 */
export function FamilySection() {
  return (
    <section
      id="family"
      aria-labelledby="family-heading"
      className="relative overflow-hidden bg-[#060914] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.05),transparent_18%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <RevealOnScroll className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">With Love &amp; Blessings</p>
          <h2 id="family-heading" className="mt-3 font-serif text-4xl text-[#f5efe0] md:text-5xl">
            परिवार
          </h2>
        </RevealOnScroll>

        <div className="mt-14 space-y-8">
          {family.map((group, idx) => (
            <RevealOnScroll key={group.title} delay={idx * 0.1}>
              <div className="group relative overflow-hidden rounded-[1.75rem] border border-[#d4af7a]/15 bg-gradient-to-b from-[#0f1b49]/60 to-[#060914]/70 p-8 shadow-[0_25px_65px_rgba(0,0,0,0.38)] backdrop-blur-sm transition-colors hover:border-[#d4af7a]/30 md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.07),transparent_20%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <h3 className="font-serif text-2xl text-[#f0d9a8]">{group.title}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-[#f0d9a8]/60">{group.english}</p>

                  {group.contact ? (
                    // Contact family card
                    <div className="mx-auto mt-6 max-w-md rounded-[1.5rem] border border-[#d4af7a]/15 bg-[linear-gradient(180deg,rgba(15,27,73,0.78),rgba(7,10,25,0.88))] p-8 shadow-[inset_0_0_40px_rgba(212,175,122,0.04)]">
                      <div className="flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#f0d9a8]/10 shadow-[0_0_25px_rgba(212,175,122,0.08)]">
                          <UserRound className="h-7 w-7 text-[#f0d9a8]" />
                        </div>
                      </div>
                      <div className="mt-5 space-y-4 text-left">
                        <div className="rounded-2xl border border-[#d4af7a]/10 bg-white/5 p-4">
                          <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Name</p>
                          <p className="mt-1 text-base leading-7 text-[#f5efe0]">{group.contact.name}</p>
                        </div>
                        <div className="rounded-2xl border border-[#d4af7a]/10 bg-white/5 p-4">
                          <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Address</p>
                          <div className="mt-1 space-y-1 text-sm leading-6 text-[#f5efe0]/90">
                            {group.contact.address.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-[#d4af7a]/10 bg-white/5 p-4">
                          <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Number</p>
                          <a
                            href={`tel:${group.contact.phone.replace(/\s/g, "")}`}
                            className="mt-1 flex items-center gap-2 text-base tracking-[0.12em] text-[#f0d9a8] transition hover:text-[#fff1be]"
                          >
                            <Phone className="h-4 w-4" />
                            {group.contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Name chips with golden hover
                    <div className="mt-5 flex flex-wrap justify-center gap-3 text-[#f5efe0]/85">
                      {group.names.map((name) => (
                        <motion.span
                          key={name}
                          whileHover={{ y: -3 }}
                          className="group/chip relative overflow-hidden rounded-full border border-[#d4af7a]/15 bg-[#0b1027]/50 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:border-[#d4af7a]/50"
                        >
                          <span className="relative z-10 transition-colors group-hover/chip:text-[#fff1be]">
                            {name}
                          </span>
                          {/* Shimmer sweep */}
                          <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(240,217,168,0.18),transparent)] transition-transform duration-700 group-hover/chip:translate-x-full" />
                        </motion.span>
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
