"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { events, accentHex, type CeremonyEvent } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { OrnamentalFrame } from "@/components/effects/OrnamentalFrame";

/**
 * Royal Wedding Events — a storybook of six ceremonies. Rather than uniform
 * cards, each event is its own premium panel with a unique accent theme,
 * a motif medallion, schedule, venue and floating décor. Layout alternates
 * left/right for a cinematic scroll rhythm.
 */
function EventPanel({ event, index }: { event: CeremonyEvent; index: number }) {
  const accent = accentHex[event.accent];
  const isLeft = index % 2 === 0;

  return (
    <div id={event.key} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12">
      {/* Timeline connector node */}
      <div className="absolute left-1/2 top-1/2 z-20 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 md:block">
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: accent.to, boxShadow: `0 0 16px ${accent.to}` }}
        />
      </div>

      {/* Motif / illustration side */}
      <RevealOnScroll
        direction={isLeft ? "right" : "left"}
        className={isLeft ? "md:order-1" : "md:order-2"}
      >
        <OrnamentalFrame tint={accent.to} className="mx-auto max-w-sm">
          <div
            className="relative flex aspect-[4/5] flex-col items-center justify-center p-8"
            style={{ background: `radial-gradient(circle at 50% 30%, ${accent.soft}, transparent 70%)` }}
          >
            {/* Soft accent glow */}
            <div
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `radial-gradient(circle, ${accent.soft}, transparent 65%)` }}
            />
            {/* Motif medallion */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full"
              style={{
                border: `1px solid ${accent.to}66`,
                background: `radial-gradient(circle, ${accent.soft}, rgba(6,9,20,0.85))`,
                boxShadow: `inset 0 0 30px ${accent.soft}, 0 0 30px ${accent.soft}`,
              }}
            >
              <div className="absolute inset-3 rounded-full" style={{ border: `1px solid ${accent.to}33` }} />
              <span className="text-5xl" aria-hidden>
                {event.motif}
              </span>
            </motion.div>
            <p className="mt-6 text-center font-serif text-2xl" style={{ color: accent.to }}>
              {event.englishLabel}
            </p>
          </div>
        </OrnamentalFrame>
      </RevealOnScroll>

      {/* Details side */}
      <RevealOnScroll
        delay={0.15}
        direction={isLeft ? "left" : "right"}
        className={isLeft ? "md:order-2" : "md:order-1"}
      >
        <div
          className="relative overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(160deg,rgba(15,27,73,0.55),rgba(5,9,19,0.85))] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm md:p-10"
          style={{ borderColor: `${accent.to}33` }}
        >
          <div
            className="absolute right-0 top-0 h-32 w-32"
            style={{ background: `radial-gradient(circle at top right, ${accent.soft}, transparent 70%)` }}
          />

          <p className="text-xs uppercase tracking-[0.5em]" style={{ color: accent.to }}>
            {event.date}
          </p>
          <h3 className="hindi-text mt-3 text-3xl text-[#f5efe0] md:text-4xl">{event.title}</h3>
          <div className="mt-5 h-px w-24" style={{ background: `linear-gradient(90deg, ${accent.to}, transparent)` }} />

          <p className="mt-5 hindi-text text-base leading-8 text-[#f5efe0]/85">{event.description}</p>

          <div className="mt-7 flex flex-col gap-3 text-sm">
            <p className="flex items-center gap-3 text-[#f0d9a8]">
              <Clock className="h-4 w-4" style={{ color: accent.to }} />
              <span>{event.time}</span>
            </p>
            <p className="flex items-center gap-3 text-[#f5efe0]/80">
              <MapPin className="h-4 w-4" style={{ color: accent.to }} />
              <span>{event.venue}</span>
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}

export function EventsTimeline() {
  return (
    <section id="events" className="relative overflow-hidden bg-[#0a1028] py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_18%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060914] to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">The Celebration</p>
          <h2 className="mt-4 hindi-text text-4xl text-[#f5efe0] md:text-6xl">मांगलिक कार्यक्रम</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#f5efe0]/65">
            Six sacred ceremonies, woven into a week of devotion, colour, music and love.
          </p>
        </RevealOnScroll>

        {/* Vertical spine */}
        <div className="relative mt-20 space-y-24 md:mt-24 md:space-y-32">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4af7a]/25 to-transparent md:block" />
          {events.map((event, index) => (
            <EventPanel key={event.key} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
