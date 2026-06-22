"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import type { EventItem } from "@/types";

const events: EventItem[] = [
  {
    date: "09 July 2026",
    title: "श्री सत्यनारायण पूजा",
    subtitle: "मंडवा मत्कोर",
  },
  {
    date: "10 July 2026",
    title: "संगीत एवं मेहंदी",
  },
  {
    date: "11 July 2026",
    title: "शुभ विवाह एवं प्रीति भोज",
  },
];

export function EventsTimeline() {
  return (
    <section id="events" className="relative overflow-hidden bg-[#0a1028] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_16%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060914] to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">The Celebration</p>
          <h2 className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">मांगलिक कार्यक्रम</h2>
        </motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {events.map((event, idx) => (
            <motion.article
              key={event.date}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-[#d4af7a]/20 bg-gradient-to-b from-[#0f1b49]/90 to-[#060914]/80 p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.1),transparent_18%)]" />
              <div className="relative">
                <CalendarDays className="mx-auto h-6 w-6 text-[#f0d9a8]" />
                <p className="mt-4 font-serif text-sm uppercase tracking-[0.35em] text-[#f0d9a8]">{event.date}</p>
                <h3 className="hindi-text mt-3 text-2xl text-[#f5efe0]">{event.title}</h3>
                {event.subtitle && <p className="hindi-text mt-2 text-[#f5efe0]/75">{event.subtitle}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
