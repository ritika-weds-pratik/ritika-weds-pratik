"use client";

import { motion } from "framer-motion";

export function FinalSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060914]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.1),transparent_16%),radial-gradient(circle_at_top,rgba(240,217,168,0.06),transparent_12%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(212,175,122,0.04),transparent)]" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af7a]/5 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03),transparent_6%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.03),transparent_5%)]" />

      {[...Array(18)].map((_, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0, 0.3, 0], y: [0, 40, 80] }}
          transition={{ duration: 7 + index * 0.25, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#f0d9a8] blur-[1px]"
          style={{
            left: `${6 + (index * 5) % 88}%`,
            top: `${8 + (index * 7) % 78}%`,
          }}
        />
      ))}

      {[
        { top: "10%", left: "18%", delay: 0 },
        { top: "18%", right: "12%", delay: 0.6 },
        { bottom: "14%", left: "16%", delay: 1.2 },
        { bottom: "22%", right: "18%", delay: 1.8 },
      ].map((petal, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.32, 0], scale: [0.7, 1, 0.8], y: [0, 18, 36] }}
          transition={{ duration: 8 + index, repeat: Number.POSITIVE_INFINITY, delay: petal.delay }}
          className="absolute h-2.5 w-2.5 rounded-full bg-[#f0d9a8]/25 blur-[1px]"
          style={{
            top: petal.top,
            left: petal.left,
            right: petal.right,
            bottom: petal.bottom,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl px-6 text-center"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#d4af7a]/15 bg-[linear-gradient(180deg,rgba(15,27,73,0.78),rgba(4,7,17,0.88))] p-10 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-sm">
          <div className="absolute inset-3 rounded-[1.75rem] border border-[#d4af7a]/10" />
          <div className="absolute left-6 top-6 h-6 w-6 border-l border-t border-[#d4af7a]/35" />
          <div className="absolute right-6 top-6 h-6 w-6 border-r border-t border-[#d4af7a]/35" />
          <div className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[#d4af7a]/35" />
          <div className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#d4af7a]/35" />

          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
              <span className="text-[#f0d9a8]">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="hindi-text mt-5 text-[clamp(3.2rem,5.2vw,5.8rem)] leading-none text-[#f5efe0]"
            >
              रीतिका ❤️ प्रतीक
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              viewport={{ once: true }}
              className="hindi-text mt-8 text-lg leading-8 text-[#f0d9a8] md:text-xl"
            >
              एक नई कहानी का शुभ आरम्भ...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              viewport={{ once: true }}
              className="mt-10 max-w-3xl space-y-4 text-center"
            >
              <p className="hindi-text text-base leading-8 text-[#f5efe0]/90 md:text-lg">
                आपकी उपस्थिति, आपका स्नेह
              </p>
              <p className="hindi-text text-base leading-8 text-[#f5efe0]/90 md:text-lg">
                और आपका आशीर्वाद ही
              </p>
              <p className="hindi-text text-base leading-8 text-[#f5efe0]/90 md:text-lg">
                हमारे इस पावन मिलन को
              </p>
              <p className="hindi-text text-base leading-8 text-[#f5efe0]/90 md:text-lg">
                संपूर्ण बनाएगा।
              </p>
            </motion.div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af7a]/50" />
              <span className="text-[#f0d9a8]">❀</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af7a]/50" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9 }}
              viewport={{ once: true }}
              className="hindi-text mt-7 text-base leading-8 text-[#f5efe0]/90 md:text-lg"
            >
              कृपया सपरिवार पधारकर
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.9 }}
              viewport={{ once: true }}
              className="hindi-text text-base leading-8 text-[#f5efe0]/90 md:text-lg"
            >
              हमारी खुशियों में सहभागी बनें।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.9 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af7a]/50" />
              <span className="text-[#f0d9a8] text-xl">💐</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af7a]/50" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.9 }}
              viewport={{ once: true }}
              className="hindi-text mt-6 text-xl text-[#f0d9a8] md:text-2xl"
            >
              सादर आमंत्रण
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
