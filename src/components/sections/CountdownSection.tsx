"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft() {
  const target = new Date("2026-07-11T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const initialTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

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
    <section id="countdown" className="relative overflow-hidden bg-[#060914] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_18%)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-sm uppercase tracking-[0.4em] text-[#f0d9a8]"
        >
          Live Countdown
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl"
        >
          Counting the Days
        </motion.h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-4">
          {values.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-[#d4af7a]/20 bg-gradient-to-b from-[#d4af7a]/10 to-[#0b1027]/30 p-6"
            >
              <div
                className="text-5xl font-semibold tracking-[0.08em] text-[#f0d9a8]"
                style={{ fontFamily: '"Times New Roman", "Times", serif' }}
              >
                {String(item.value).padStart(2, "0")}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.4em] text-[#f5efe0]/75">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
