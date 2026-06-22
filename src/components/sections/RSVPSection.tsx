"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RSVPSection() {
  const [status, setStatus] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Thank you — your RSVP has been received.");
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-[#0a1028] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.05),transparent_18%)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.4em] text-[#f0d9a8]">RSVP</p>
          <h2 className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">Your Presence Matters</h2>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onSubmit={onSubmit}
          className="mt-12 rounded-3xl border border-[#d4af7a]/20 bg-gradient-to-b from-[#d4af7a]/8 to-[#0b1027]/40 p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#f0d9a8]">Guest Name</label>
              <Input placeholder="Enter your name" required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#f0d9a8]">Mobile Number</label>
              <Input placeholder="Enter mobile number" required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#f0d9a8]">Number of Guests</label>
              <select className="flex h-11 w-full rounded-xl border border-[#d4af7a]/20 bg-[#0b1027]/80 px-4 py-2 text-sm text-[#f5efe0]">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#f0d9a8]">Attendance</label>
              <select className="flex h-11 w-full rounded-xl border border-[#d4af7a]/20 bg-[#0b1027]/80 px-4 py-2 text-sm text-[#f5efe0]">
                <option>Attending</option>
                <option>Maybe</option>
                <option>Not Attending</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-[#f0d9a8]">Message</label>
            <Textarea placeholder="Share your blessings" />
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Button className="rounded-full bg-gradient-to-r from-[#d4af7a] via-[#f0d9a8] to-[#c9a24a] px-7 py-3 text-[#0b1027]">Submit RSVP</Button>
            <p className="text-sm text-[#f0d9a8]">{status}</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
