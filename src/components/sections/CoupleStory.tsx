"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { OrnamentalFrame } from "@/components/effects/OrnamentalFrame";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { couple } from "@/data/wedding";

/**
 * Couple Story — an emotional, scroll-triggered timeline of the journey.
 * Each milestone alternates left/right with a placeholder memory frame that
 * can be swapped for a real photo (drop a file in /public and set `img`).
 */
type Milestone = {
  year: string;
  title: string;
  story: string;
  emoji: string;
  /** Optional photo path under /public. Omit for an ornamental placeholder. */
  img?: string;
};

const milestones: Milestone[] = [
  {
    year: "The First Hello",
    title: "पहली मुलाकात",
    story:
      "Where it all began — a quiet introduction, kind eyes, and the faint feeling that something meaningful had just started.",
    emoji: "🌸",
  },
  {
    year: "Growing Closer",
    title: "नजदीकियाँ",
    story:
      "Long conversations, shared laughter and the slow, certain realization that this was turning into something rare.",
    emoji: "💬",
  },
  {
    year: "The Proposal",
    title: "वचन",
    story:
      "A promise made from the heart — to walk together, to hold each other through every season of life.",
    emoji: "💍",
  },
  {
    year: "Forever Begins",
    title: "शुभ विवाह",
    story:
      "Surrounded by family and blessings, two souls step into a lifetime of love, trust and togetherness.",
    emoji: "👑",
  },
];

export function CoupleStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden bg-[#060914] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.07),transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(212,175,122,0.03)_50%,transparent_100%)]" />
      <GoldenParticles count={16} className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">Two Souls, One Journey</p>
          <h2 id="story-heading" className="hindi-text mt-4 text-4xl text-[#f5efe0] md:text-6xl">
            {couple.bride.name} <span className="text-[#e8939f]">&amp;</span> {couple.groom.name}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af7a] to-transparent" />
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#f5efe0]/70">
            A new chapter begins in love, trust and celebration — where every promise feels like a blessing
            and every moment is made to be remembered.
          </p>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative mt-20 md:mt-28">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4af7a]/30 to-transparent md:block" />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={m.year} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  {/* Spine node */}
                  <div className="absolute left-1/2 top-1/2 z-20 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:block">
                    <span className="absolute inset-0 rounded-full bg-[#f0d9a8] shadow-[0_0_14px_rgba(240,217,168,0.7)]" />
                  </div>

                  {/* Memory frame */}
                  <RevealOnScroll
                    direction={isLeft ? "right" : "left"}
                    className={isLeft ? "md:order-1" : "md:order-2"}
                  >
                    <OrnamentalFrame className="mx-auto max-w-xs">
                      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[linear-gradient(160deg,rgba(15,27,73,0.7),rgba(5,9,19,0.9))] p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,122,0.16),transparent_60%)]" />
                        {m.img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.img} alt={m.title} className="relative h-full w-full object-cover" />
                        ) : (
                          <motion.span
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative text-6xl"
                            aria-hidden
                          >
                            {m.emoji}
                          </motion.span>
                        )}
                      </div>
                    </OrnamentalFrame>
                  </RevealOnScroll>

                  {/* Story text */}
                  <RevealOnScroll
                    delay={0.15}
                    direction={isLeft ? "left" : "right"}
                    className={isLeft ? "md:order-2" : "md:order-1"}
                  >
                    <div className={isLeft ? "md:pl-8" : "md:pr-8 md:text-right"}>
                      <p className="text-xs uppercase tracking-[0.5em] text-[#f0d9a8]">{m.year}</p>
                      <h3 className="hindi-text mt-3 text-3xl text-[#f5efe0] md:text-4xl">{m.title}</h3>
                      <div
                        className={`mt-4 h-px w-20 bg-gradient-to-r from-[#d4af7a]/60 to-transparent ${
                          isLeft ? "" : "md:ml-auto"
                        }`}
                      />
                      <p className="mt-4 text-base leading-8 text-[#f5efe0]/75">{m.story}</p>
                    </div>
                  </RevealOnScroll>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
