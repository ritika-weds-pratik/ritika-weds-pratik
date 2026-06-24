"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { events, accentHex, type CeremonyEvent } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { FallingPetals } from "@/components/effects/FallingPetals";

function EventThemeEffects({ eventKey, accent }: { eventKey: string; accent: string }) {
  if (eventKey === "satya-narayan-pujan-matkor") {
    return (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,217,168,0.1),transparent_50%)]" />
        <GoldenParticles count={15} className="opacity-70" />
      </>
    );
  }
  if (eventKey === "mehendi-sangeet") {
    return (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(15,81,50,0.15),transparent_60%)]" />
        <FallingPetals count={12} color="#0f5132" />
        {/* Musical notes */}
        <motion.div animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute right-10 top-10 text-[#d4af7a] text-xl">♪</motion.div>
        <motion.div animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 2 }} className="absolute left-12 bottom-12 text-[#d4af7a] text-2xl">♫</motion.div>
      </>
    );
  }
  if (eventKey === "wedding") {
    return (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,31,43,0.15),transparent_60%)]" />
        <FallingPetals count={20} color="#7a1f2b" />
        {/* Sacred fire glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 bottom-0 h-32 w-48 -translate-x-1/2 bg-[#d4af7a]/20 blur-3xl rounded-full"
        />
      </>
    );
  }
  return null;
}

function EventCard({ event, index }: { event: CeremonyEvent; index: number }) {
  const accentColor = accentHex[event.accent].to;
  const accentSoft = accentHex[event.accent].soft;
  const isLeft = index % 2 === 0;

  return (
    <RevealOnScroll
      delay={index * 0.15}
      direction={isLeft ? "right" : "left"}
    >
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.4 }}
        className="group relative overflow-hidden rounded-[2rem] border-2 bg-[#060914]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-12 mx-auto max-w-3xl"
        style={{ borderColor: `${accentColor}40` }}
      >
        {/* Golden embossed border effect */}
        <div className="absolute inset-3 rounded-3xl border border-dashed opacity-50" style={{ borderColor: accentColor }} />
        <div className="absolute inset-4 rounded-[1.25rem] border opacity-20" style={{ borderColor: accentColor }} />
        
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle_at_50%_0%, ${accentSoft}, transparent 60%)` }} />

        {/* Thematic Background Effects */}
        <EventThemeEffects eventKey={event.key} accent={accentSoft} />

        {/* Decorative Indian Corner Ornaments */}
        <div className="absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2" style={{ borderColor: `${accentColor}80` }} />
        <div className="absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2" style={{ borderColor: `${accentColor}80` }} />
        <div className="absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2" style={{ borderColor: `${accentColor}80` }} />
        <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2" style={{ borderColor: `${accentColor}80` }} />

        <div className="relative z-10 grid gap-8 md:grid-cols-[auto_1fr] items-center">
          {/* Icon/Motif */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotateY: [0, 15, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-32 w-32 items-center justify-center rounded-full border-2 bg-gradient-to-br shadow-2xl"
              style={{ 
                borderColor: `${accentColor}60`,
                background: `linear-gradient(to bottom right, #0b1027, ${accentSoft})`
              }}
            >
              <div className="absolute inset-2 rounded-full border border-dashed opacity-50" style={{ borderColor: accentColor }} />
              <span className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{event.motif}</span>
            </motion.div>
          </div>

          {/* Details */}
          <div className="text-center md:text-left">
            <p className="number-text text-sm md:text-base font-semibold tracking-[0.2em]" style={{ color: accentColor }}>
              {event.date}
            </p>
            <h3 className="hindi-text mt-4 text-3xl text-[#f5efe0] md:text-4xl text-shadow-sm shadow-[#000]">
              {event.title}
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] opacity-80" style={{ color: accentColor }}>{event.englishLabel}</p>
            
            <div className="mt-5 h-[2px] w-24 mx-auto md:mx-0" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

            <p className="mt-5 hindi-text text-lg leading-8 text-[#f5efe0]/90">
              {event.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-[#f0d9a8]">
                <Clock className="h-4 w-4" style={{ color: accentColor }} />
                <span className="number-text font-semibold">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-[#f5efe0]/80">
                <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                <span className="tracking-wide">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

export function EventsTimeline() {
  return (
    <section id="events" className="relative overflow-hidden bg-[#0a1028] py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_18%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060914] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060914] to-transparent" />

      {/* Ambient background for the whole section */}
      <GoldenParticles count={30} className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <p className="section-label">The Celebration</p>
          <div className="mt-4 flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
            <h2 className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer">मांगलिक कार्यक्रम</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#f5efe0]/75">
            Sacred ceremonies woven into a week of devotion, colour, music, and eternal love.
          </p>
        </RevealOnScroll>

        <div className="relative mt-20 space-y-16 md:mt-28 md:space-y-24">
          {events.map((event, index) => (
            <EventCard key={event.key} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
