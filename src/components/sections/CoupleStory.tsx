"use client";

import { motion } from "framer-motion";

export function CoupleStory() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060914]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.08),transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(212,175,122,0.03)_50%,transparent_100%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#d4af7a]/15 bg-gradient-to-b from-[#0f1b49]/80 to-[#060914]/70 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">Two Souls, One Journey</p>
          <h2 className="hindi-text mt-5 text-4xl text-[#f5efe0] md:text-6xl">रीतिका & प्रतीक</h2>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af7a] to-transparent mx-auto" />
          <p className="mt-8 text-lg leading-8 text-[#f5efe0]/75">
            A new chapter begins in love, trust, and celebration — where every promise feels like a blessing and every moment is made to be remembered.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
