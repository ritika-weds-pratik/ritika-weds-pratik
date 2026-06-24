"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mandala } from "@/components/effects/Mandala";

/** Small Ganesh blessing motif used inline where the full Divine Blessings
 *  section isn't appropriate. Artwork loaded lazily from /royal/ganesh.png. */
export function GaneshIntro() {
  return (
    <div className="relative flex items-center justify-center text-center">
      <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#d4af7a]/10 p-2 shadow-[0_0_50px_rgba(212,175,122,0.15)]">
        <Mandala className="absolute inset-0 h-full w-full opacity-30 animate-[spinSlow_40s_linear_infinite]" />
        <Image
          src="/royal/ganesh.png"
          alt="भगवान गणेश"
          width={112}
          height={112}
          className="relative h-full w-full object-contain"
        />
      </div>
      <p className="sr-only">।। श्री गणेशाय नमः ।।</p>
    </div>
  );
}

/** Larger Divine Blessings centerpiece section. */
export function DivineBlessingsSection() {
  return (
    <section
      id="blessings"
      aria-labelledby="blessings-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1028] py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.14),transparent_20%)]" />
      <Mandala className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] animate-[spinSlow_60s_linear_infinite]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <div className="relative mb-8 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
          <div className="absolute h-full w-full rounded-full border border-[#d4af7a]/20 animate-[spinSlow_24s_linear_infinite]" />
          <div className="absolute h-[78%] w-[78%] rounded-full border border-[#d4af7a]/12 animate-[spinSlow_18s_linear_infinite_reverse]" />
          <div className="absolute h-[62%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(240,217,168,0.12),transparent_70%)] animate-[pulseGlow_5s_ease-in-out_infinite]" />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="relative h-44 w-44 sm:h-52 sm:w-52"
          >
            <Image
              src="/royal/ganesh.png"
              alt="भगवान गणेश का आशीर्वाद"
              width={208}
              height={208}
              className="h-full w-full object-contain drop-shadow-[0_0_40px_rgba(212,175,122,0.4)]"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="hindi-text text-base font-semibold tracking-normal text-[#f0d9a8] select-none"
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        <motion.h2
          id="blessings-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-6 hindi-text text-3xl font-bold text-[#f5efe0] md:text-4xl text-gold-shimmer select-none"
        >
          वन्दना
        </motion.h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 max-w-2xl select-none"
        >
          <p className="hindi-text text-lg leading-9 text-[#f0d9a8] md:text-2xl md:leading-10 tracking-normal font-medium">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          </p>
          <p className="hindi-text text-lg leading-9 text-[#f0d9a8] md:text-2xl md:leading-10 tracking-normal font-medium">
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          viewport={{ once: true }}
          className="mt-6 max-w-xl text-sm leading-7 text-[#f5efe0]/70 md:text-base"
        >
          हम इस पावन अवसर पर भगवान गणेश का आह्वान करते हैं, कि वे हर विघ्न-बाधा को दूर करें और इस शुभ मिलन को अपना आशीर्वाद दें।
        </motion.p>
      </motion.div>
    </section>
  );
}
