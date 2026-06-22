"use client";

import { motion } from "framer-motion";

export function CoupleIntroductionSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0d0a1f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.08),transparent_15%),radial-gradient(circle_at_bottom,rgba(240,217,168,0.05),transparent_10%)]" />
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af7a]/10" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,122,0.06),transparent_68%)]" />

      {[
        { top: "8%", left: "12%", delay: 0 },
        { top: "18%", right: "10%", delay: 0.7 },
        { bottom: "12%", left: "18%", delay: 1.4 },
        { bottom: "18%", right: "16%", delay: 2.1 },
      ].map((petal, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: [0, 0.5, 0.25], scale: [0.6, 1, 0.8] }}
          transition={{ duration: 6, delay: petal.delay, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute h-2.5 w-2.5 rounded-full bg-[#f0d9a8]/30 blur-[1px]"
          style={{
            top: petal.top,
            left: petal.left,
            right: petal.right,
            bottom: petal.bottom,
          }}
        />
      ))}

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0d9a8]/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[2rem] border border-[#d4af7a]/15 bg-[linear-gradient(120deg,rgba(12,10,34,0.88),rgba(22,17,52,0.72),rgba(12,10,34,0.88))] shadow-[0_0_80px_rgba(212,175,122,0.08)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(240,217,168,0.08),transparent_12%)]" />
          <div className="absolute inset-3 border border-[#d4af7a]/10" />
          <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-[#d4af7a]/35" />
          <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-[#d4af7a]/35" />
          <div className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[#d4af7a]/35" />
          <div className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#d4af7a]/35" />

          <div className="relative grid gap-8 px-8 py-16 md:grid-cols-[1fr_auto_1fr] md:px-12 lg:px-16 lg:py-20">
            <div className="relative flex flex-col items-center justify-center px-6 py-10 text-center md:items-start md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative mb-8 h-52 w-52 rounded-full border border-[#d4af7a]/25 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_12%),radial-gradient(circle,rgba(212,175,122,0.18),rgba(21,15,48,0.92)_68%)] shadow-[inset_0_0_50px_rgba(240,217,168,0.06)]"
              >
                <div className="absolute inset-6 rounded-full border border-[#f0d9a8]/10" />
                <div className="absolute inset-14 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(16,12,38,0.14)_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-[#f0d9a8]">R</div>
              </motion.div>

              <p className="hindi-text text-xs uppercase tracking-[0.55em] text-[#f0d9a8]">
                आयुष्मती कुमारी
              </p>
              <h3
                className="mt-4 text-[clamp(3.5rem,5vw,5.2rem)] leading-none text-[#f5efe0]"
                style={{ fontFamily: "var(--font-dev-hindi), serif" }}
              >
                रितिका
              </h3>
              <p className="mt-4 text-sm uppercase tracking-[0.45em] text-[#f0d9a8]">सुपुत्री</p>
              <div className="mt-6 max-w-md space-y-2 text-[#f5efe0]/90">
                <p className="hindi-text text-base leading-7">श्रीमती ज्योति देवी एवं</p>
                <p className="hindi-text text-base leading-7">श्री विनोद चौधरी (पप्पू)</p>
              </div>
              <div className="mt-6 w-full border-t border-[#d4af7a]/15" />
              <div className="mt-6 space-y-1 text-[#f0d9a8]">
                <p className="text-xs uppercase tracking-[0.5em]">निवासी</p>
                <p className="hindi-text text-base leading-7">चिमनापुर, लालगंज,</p>
                <p className="hindi-text text-base leading-7">वैशाली, बिहार</p>
              </div>
            </div>

            <div className="flex items-center justify-center py-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#140f2d]/80 shadow-[0_0_30px_rgba(212,175,122,0.1)]"
              >
                <div className="absolute inset-3 rounded-full border border-[#d4af7a]/15" />
                <span className="text-2xl text-[#f0d9a8]">❤</span>
              </motion.div>
            </div>

            <div className="relative flex flex-col items-center justify-center px-6 py-10 text-center md:items-end md:text-right">
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative mb-8 h-52 w-52 rounded-full border border-[#d4af7a]/25 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.12),transparent_12%),radial-gradient(circle,rgba(212,175,122,0.18),rgba(21,15,48,0.92)_68%)] shadow-[inset_0_0_50px_rgba(240,217,168,0.06)]"
              >
                <div className="absolute inset-6 rounded-full border border-[#f0d9a8]/10" />
                <div className="absolute inset-14 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(16,12,38,0.14)_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-[#f0d9a8]">P</div>
              </motion.div>

              <p className="hindi-text text-xs uppercase tracking-[0.55em] text-[#f0d9a8]">
                आयुष्मान कुमार
              </p>
              <h3
                className="mt-4 text-[clamp(3.5rem,5vw,5.2rem)] leading-none text-[#f5efe0]"
                style={{ fontFamily: "var(--font-dev-hindi), serif" }}
              >
                प्रतीक
              </h3>
              <p className="mt-4 text-sm uppercase tracking-[0.45em] text-[#f0d9a8]">सुपुत्र</p>
              <div className="mt-6 max-w-md space-y-2 text-[#f5efe0]/90">
                <p className="hindi-text text-base leading-7">श्रीमती सुमित्रा जैसवाल एवं</p>
                <p className="hindi-text text-base leading-7">श्री प्रभात जैसवाल</p>
              </div>
              <div className="mt-6 w-full border-t border-[#d4af7a]/15" />
              <div className="mt-6 space-y-1 text-[#f0d9a8]">
                <p className="text-xs uppercase tracking-[0.5em]">निवासी</p>
                <p className="hindi-text text-base leading-7">दिलदारनगर, गाजीपुर,</p>
                <p className="hindi-text text-base leading-7">उत्तर प्रदेश</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
