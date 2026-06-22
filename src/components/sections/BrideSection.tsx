"use client";

import { motion } from "framer-motion";

export function BrideSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#140f2d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,147,90,0.12),transparent_18%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,217,168,0.05),transparent_10%),radial-gradient(circle_at_80%_30%,rgba(240,217,168,0.04),transparent_8%)]" />
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af7a]/5" />
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.06),transparent_68%)]" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-10 top-16 h-20 w-20 rounded-full bg-[#f0d9a8]/5 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-12 top-24 h-16 w-16 rounded-full bg-[#d4af7a]/5 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-3xl border border-[#d4af7a]/20 bg-[#0f0a24]/40 p-10 shadow-[0_0_50px_rgba(212,175,122,0.06)] backdrop-blur-sm md:p-14"
        >
          <div className="absolute inset-3 border border-[#d4af7a]/10" />
          <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-[#d4af7a]/40" />
          <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-[#d4af7a]/40" />
          <div className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[#d4af7a]/40" />
          <div className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#d4af7a]/40" />

          <div className="relative flex flex-col items-start text-left">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-[#d4af7a] to-transparent" />
              <p
                className="text-xs uppercase tracking-[0.55em] text-[#f0d9a8]"
                style={{ fontFamily: "var(--font-dev-hindi), serif" }}
              >
                आयुष्मती कुमारी
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-[#d4af7a] to-transparent" />
            </div>

            <h2
              className="text-[clamp(4rem,7vw,6.2rem)] leading-none text-[#f5efe0]"
              style={{ fontFamily: "var(--font-dev-hindi), serif" }}
            >
              रितिका
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <span className="h-px w-12 bg-[#d4af7a]/40" />
              <p className="text-sm uppercase tracking-[0.45em] text-[#f0d9a8]">सुपुत्री</p>
              <span className="h-px w-12 bg-[#d4af7a]/40" />
            </div>

            <div className="mt-8 space-y-2 text-center text-[#f5efe0]/90">
              <p className="text-base leading-7" style={{ fontFamily: "var(--font-dev-hindi), serif" }}>
                श्रीमती ज्योति देवी एवं
              </p>
              <p className="text-base leading-7" style={{ fontFamily: "var(--font-dev-hindi), serif" }}>
                श्री विनोद चौधरी (पप्पू)
              </p>
            </div>

            <div className="mt-8 w-full border-t border-[#d4af7a]/15" />

            <div className="mt-6 space-y-2 text-center text-[#f0d9a8]">
              <p className="text-xs uppercase tracking-[0.5em]">निवासी</p>
              <p className="text-base leading-7" style={{ fontFamily: "var(--font-dev-hindi), serif" }}>
                चिमनापुर,
              </p>
              <p className="text-base leading-7" style={{ fontFamily: "var(--font-dev-hindi), serif" }}>
                लालगंज,
              </p>
              <p className="text-base leading-7" style={{ fontFamily: "var(--font-dev-hindi), serif" }}>
                वैशाली, बिहार
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
