"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { weddingDate } from "@/data/wedding";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { Mandala } from "@/components/effects/Mandala";

/**
 * Live countdown to the wedding day, presented as four ornate gold plaques
 * with a shimmering fill and an animated flip on each second tick.
 * The target date is the single source of truth from wedding data.
 */
function getTimeLeft() {
  const target = new Date(weddingDate.iso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const initial = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(initial);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-heading"
      className="relative overflow-hidden bg-[#060914] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_18%)]" />
      <Mandala className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <RevealOnScroll>
          <p className="section-label">Live Countdown</p>
          <h2 id="countdown-heading" className="mt-4 hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer pt-2">
            प्रतीक्षा
          </h2>
          <p className="number-text mt-3 text-sm md:text-base font-semibold tracking-[0.2em] text-[#f0d9a8]/80">{weddingDate.display}</p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-4">
          {values.map((item, idx) => (
            <RevealOnScroll key={item.label} delay={idx * 0.08} direction="scale">
              <div className="group relative overflow-hidden rounded-[1.5rem] border border-[#d4af7a]/25 bg-[linear-gradient(180deg,rgba(212,175,122,0.14),rgba(11,16,39,0.5))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                {/* Shimmering gold sweep */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,247,217,0.12)_50%,transparent_60%)] [background-size:250%_100%] animate-[goldSweep_6s_linear_infinite]" />
                <div className="absolute inset-2 rounded-[1.2rem] border border-[#d4af7a]/10" />

                <div className="relative">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={item.value}
                      initial={{ y: -18, opacity: 0, rotateX: -40 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: 18, opacity: 0, rotateX: 40 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="number-text text-5xl font-semibold tracking-[0.1em] text-gold-shimmer md:text-7xl"
                    >
                      {String(item.value).padStart(2, "0")}
                    </motion.div>
                  </AnimatePresence>
                  <p className="mt-3 font-serif text-[10px] uppercase tracking-[0.45em] text-[#f5efe0]/70">{item.label}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
