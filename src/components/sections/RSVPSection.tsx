"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

/**
 * Royal RSVP — a luxury guest-confirmation journey. On submit the form
 * dissolves into a golden seal confirmation with a celebration particle
 * burst and a personalized acknowledgement. (Client-side only; wire the
 * `handleSubmit` fetch to a backend or form service to persist responses.)
 */

type Shard = { id: number; dx: number; dy: number; r: number; color: string };

export function RSVPSection() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const burst = useMemo<Shard[]>(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        dx: (Math.random() - 0.5) * 360,
        dy: (Math.random() - 0.5) * 360,
        r: (Math.random() - 0.5) * 540,
        color: ["#f0d9a8", "#c9a24a", "#fff7d9", "#e8939f"][i % 4],
      })),
    []
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setName((data.get("name") as string) || "");
    setSubmitted(true);
    // Future: POST `data` to a form endpoint / API route here.
  }

  const fieldClass =
    "flex w-full rounded-xl border border-[#d4af7a]/25 bg-[#0b1027]/80 px-4 py-2.5 text-sm text-[#f5efe0] placeholder:text-[#f5efe0]/40 focus:border-[#d4af7a]/60 focus:outline-none focus:ring-2 focus:ring-[#d4af7a]/30";
  const labelClass = "mb-2 block text-xs uppercase tracking-[0.3em] text-[#f0d9a8]";

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="relative overflow-hidden bg-[#0a1028] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.05),transparent_18%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <RevealOnScroll className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.4em] text-[#f0d9a8]">RSVP</p>
          <h2 id="rsvp-heading" className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">
            Your Presence Matters
          </h2>
        </RevealOnScroll>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              onSubmit={onSubmit}
              className="mt-12 relative overflow-hidden rounded-[1.75rem] border border-[#d4af7a]/20 bg-[linear-gradient(180deg,rgba(212,175,122,0.08),rgba(11,16,39,0.6))] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.4)] backdrop-blur-sm md:p-10"
            >
              <div className="absolute inset-2 rounded-[1.6rem] border border-[#d4af7a]/10" />

              <div className="relative grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="rsvp-name">Guest Name</label>
                  <Input
                    id="rsvp-name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="rsvp-mobile">Mobile Number</label>
                  <Input
                    id="rsvp-mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter mobile number"
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="rsvp-count">Number of Guests</label>
                  <select id="rsvp-count" name="guests" className={fieldClass} defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="rsvp-attendance">Attendance</label>
                  <select id="rsvp-attendance" name="attendance" className={fieldClass} defaultValue="Attending">
                    <option>Attending with joy</option>
                    <option>Maybe</option>
                    <option>Not attending (will miss it)</option>
                  </select>
                </div>
              </div>

              <div className="relative mt-5">
                <label className={labelClass} htmlFor="rsvp-message">Message &amp; Blessings</label>
                <Textarea
                  id="rsvp-message"
                  name="message"
                  placeholder="Share your blessings and wishes for the couple…"
                  className={`${fieldClass} min-h-[110px] resize-y`}
                />
              </div>

              <div className="relative mt-7">
                <Button className="w-full rounded-full bg-gradient-to-r from-[#d4af7a] via-[#f0d9a8] to-[#c9a24a] px-7 py-3.5 text-sm uppercase tracking-[0.3em] text-[#0b1027] shadow-[0_10px_30px_rgba(201,162,74,0.3)] transition hover:shadow-[0_14px_40px_rgba(201,162,74,0.45)] md:w-auto">
                  Seal &amp; Confirm
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-12 flex flex-col items-center overflow-hidden rounded-[1.75rem] border border-[#d4af7a]/30 bg-[linear-gradient(180deg,rgba(15,27,73,0.7),rgba(5,9,19,0.9))] p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
              {/* Celebration burst */}
              <div className="pointer-events-none absolute left-1/2 top-16">
                {burst.map((s) => (
                  <motion.span
                    key={s.id}
                    className="absolute h-2 w-2 rounded-full"
                    style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: s.dx, y: s.dy, rotate: s.r, opacity: 0, scale: 0.2 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                ))}
              </div>

              {/* Golden seal */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
                className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full"
              >
                <span className="absolute inset-0 rounded-full bg-[#d4af7a]/30 blur-xl animate-[pulseGlow_3s_ease-in-out_infinite]" />
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f0d9a8,#c9a24a_60%,#8a6a2a)] shadow-[inset_0_-6px_12px_rgba(0,0,0,0.4),inset_0_4px_8px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.4)]" />
                <span className="absolute inset-3 rounded-full border border-[#fff7d9]/40" />
                <motion.svg
                  viewBox="0 0 24 24"
                  className="relative h-10 w-10 text-[#0b1027]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.path d="M20 6L9 17l-5-5" />
                </motion.svg>
              </motion.div>

              <h3 className="font-serif text-2xl text-[#f0d9a8] md:text-3xl">Confirmed with Blessings</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-[#f5efe0]/85">
                {name ? `धन्यवाद, ${name}! ` : "धन्यवाद! "}
                Your presence has been noted with joy. We can&apos;t wait to celebrate with you.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#f0d9a8]/70">
                आपका स्नेह एवं आशीर्वाद सादर आभार
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/60 px-6 py-2.5 text-xs uppercase tracking-[0.3em] text-[#f5efe0] backdrop-blur-sm transition hover:bg-[#0b1027]/80"
              >
                Edit Response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
