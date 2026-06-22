"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PremiumButton } from "@/components/shared/PremiumButton";

export function VenueSection() {
  return (
    <section id="venue" className="relative overflow-hidden bg-[#060914] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_18%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">The Venue</p>
          <h2 className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">Pearl Marriage Vatika</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 rounded-[2rem] border border-[#d4af7a]/15 bg-[#0b1027]/70 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <div className="aspect-[16/9] overflow-hidden rounded-[1.5rem]">
            <iframe
              title="Venue Map"
              src="https://www.google.com/maps?q=Pearl%20Marriage%20Vatika%20Lalganj%20Vaishali&z=13&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </motion.div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PremiumButton>Get Directions</PremiumButton>
          <button className="inline-flex items-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/70 px-6 py-3 text-sm uppercase tracking-[0.3em] text-[#f5efe0] backdrop-blur-sm">
            <MapPin className="mr-2 h-4 w-4" /> Share Location
          </button>
        </div>
      </div>
    </section>
  );
}
