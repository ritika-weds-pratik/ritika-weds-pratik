"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { couple, weddingDate } from "@/data/wedding";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Stage 2 of the entry — a faux-3D royal envelope.
 *
 * Layered CSS builds the gold-foil envelope; pointer movement tilts it in
 * 3D space (skipped for touch / reduced-motion). Tapping the wax seal:
 *   1. bursts golden particles
 *   2. cracks the seal
 *   3. opens the flap in slow-motion
 *   4. slides the invitation card up out of the envelope
 *   5. calls onOpen() to advance to the palace gates
 */

type Shard = { id: number; dx: number; dy: number; rotate: number };

export function EnvelopeExperience({ onOpen }: { onOpen: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<"sealed" | "breaking" | "opening" | "done">("sealed");
  const [shards, setShards] = useState<Shard[]>([]);
  const stageRef = useRef(stage);
  stageRef.current = stage;

  // Mouse-driven 3D tilt (desktop only, not reduced-motion).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 14 });

  useEffect(() => {
    if (reduced) return;
    const handle = (e: PointerEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      mx.set((e.clientX / w) - 0.5);
      my.set((e.clientY / h) - 0.5);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [mx, my, reduced]);

  // Burst shard data once.
  const burst = useMemo<Shard[]>(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        dx: (Math.random() - 0.5) * 320,
        dy: (Math.random() - 0.5) * 320,
        rotate: (Math.random() - 0.5) * 540,
      })),
    []
  );

  function handleSealClick() {
    if (stageRef.current !== "sealed") return;
    setShards(burst);
    setStage("breaking");
    // seal cracks -> flap opens -> card rises
    window.setTimeout(() => setStage("opening"), 650);
    window.setTimeout(() => setStage("done"), 2300);
    window.setTimeout(onOpen, 3200);
  }

  const opened = stage === "opening" || stage === "done";

  return (
    <motion.div
      key="envelope"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,122,0.16),transparent_45%),linear-gradient(180deg,#06091a_0%,#0b1027_100%)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      <GoldenParticles count={30} className="opacity-80" />

      {/* God rays behind the envelope */}
      {!reduced && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(240,217,168,0.12) 6deg, transparent 14deg, rgba(240,217,168,0.08) 24deg, transparent 32deg)",
            filter: "blur(6px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Scene with perspective */}
        <motion.div
          className="[perspective:1200px]"
          style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
        >
          <div className="relative h-[360px] w-[440px] max-w-[88vw] [transform-style:preserve-3d] sm:h-[400px] sm:w-[500px]">
            {/* ===== Envelope body ===== */}
            <div className="absolute inset-x-0 bottom-0 top-[28%] overflow-hidden rounded-b-[10px] border border-[#8a6a2a]/60 bg-[linear-gradient(160deg,#5a3f18,#7a5a25_45%,#4a3414)] shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
              {/* Gold foil sheen */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(240,217,168,0.35)_48%,rgba(255,247,217,0.55)_50%,rgba(240,217,168,0.35)_52%,transparent_70%)] [background-size:250%_100%] animate-[goldSweep_5s_linear_infinite]" />
              {/* Inner border */}
              <div className="absolute inset-3 rounded-md border border-[#f0d9a8]/25" />
              {/* Ornamental center monogram on the body */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="hindi-text select-none bg-gradient-to-br from-[#fff7d9] via-[#f0d9a8] to-[#c9a24a] bg-clip-text text-5xl font-semibold text-transparent opacity-70 sm:text-6xl">
                  {couple.monogram}
                </span>
              </div>
            </div>

            {/* ===== Invitation card (slides up from envelope) ===== */}
            <motion.div
              className="absolute inset-x-[8%] bottom-[6%] top-[8%] z-20 overflow-hidden rounded-[8px] border border-[#d4af7a]/50 bg-[linear-gradient(160deg,#fbf3e0,#f3e6c8)] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              initial={{ y: "82%" }}
              animate={opened ? { y: "-44%" } : { y: "82%" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[#5a3f18]">
                <div className="absolute inset-2 rounded-[5px] border border-[#c9a24a]/40" />
                <p className="text-[9px] uppercase tracking-[0.5em] text-[#8a6a2a]">
                  With the blessings of the family
                </p>
                <p className="mt-3 text-base italic text-[#7a5a25]">cordially invite you to the wedding of</p>
                <p className="mt-4 font-serif text-3xl text-[#5a3f18]">
                  {couple.bride.englishName} <span className="text-[#c9a24a]">&amp;</span> {couple.groom.englishName}
                </p>
                <div className="my-3 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a24a] to-transparent" />
                <p className="text-sm uppercase tracking-[0.35em] text-[#8a6a2a]">{weddingDate.display}</p>
              </div>
            </motion.div>

            {/* ===== Envelope flap (closes over the top) ===== */}
            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-[30%] [transform-origin:top]"
              initial={{ rotateX: 0 }}
              animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Outer face of the flap (gold foil) */}
              <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-[linear-gradient(160deg,#5a3f18,#7a5a25_45%,#4a3414)] shadow-[inset_0_-12px_24px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-[linear-gradient(110deg,transparent_30%,rgba(240,217,168,0.4)_48%,rgba(255,247,217,0.6)_50%,rgba(240,217,168,0.4)_52%,transparent_70%)] [background-size:250%_100%] animate-[goldSweep_5s_linear_infinite]" />
              </div>
            </motion.div>

            {/* ===== Wax seal (centered over the flap point) ===== */}
            <div className="absolute left-1/2 top-[28%] z-40 -translate-x-1/2 -translate-y-1/2">
              <AnimatePresence>
                {stage === "sealed" && (
                  <motion.button
                    key="seal"
                    type="button"
                    onClick={handleSealClick}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.25 } }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    aria-label="Break the wax seal to open your invitation"
                    className="group relative flex h-20 w-20 items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f0d9a8]/50 sm:h-24 sm:w-24"
                  >
                    {/* Glow halo */}
                    <span className="absolute inset-0 rounded-full bg-[#c0392b]/40 blur-xl animate-[pulseGlow_3s_ease-in-out_infinite]" />
                    {/* Wax body */}
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e74c3c,#a82520_60%,#6e1714)] shadow-[inset_0_-6px_12px_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.45)]" />
                    {/* Embossed monogram */}
                    <span className="relative font-serif text-2xl font-semibold text-[#f0d9a8] [text-shadow:0_1px_1px_rgba(0,0,0,0.6)] sm:text-3xl">
                      {couple.monogram}
                    </span>
                    {/* Tap hint ring */}
                    <span className="absolute -inset-2 rounded-full border border-[#f0d9a8]/30 opacity-0 transition group-hover:opacity-100" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Breaking shard burst */}
              {stage === "breaking" && (
                <div className="pointer-events-none absolute left-1/2 top-1/2">
                  {shards.map((s) => (
                    <motion.span
                      key={s.id}
                      className="absolute h-3 w-3 rounded-full bg-gradient-to-br from-[#e74c3c] to-[#a82520] shadow-[0_0_8px_rgba(240,217,168,0.6)]"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: s.dx, y: s.dy, rotate: s.rotate, opacity: 0, scale: 0.3 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  ))}
                  {/* Gold sparkles among the shards */}
                  {shards.slice(0, 10).map((s) => (
                    <motion.span
                      key={`g-${s.id}`}
                      className="absolute h-1.5 w-1.5 rounded-full bg-[#f0d9a8] shadow-[0_0_8px_#f0d9a8]"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: s.dx * 0.7, y: s.dy * 0.7, opacity: 0 }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Instruction / status text */}
        <div className="mt-10 h-6 text-center">
          {stage === "sealed" && (
            <motion.p
              key="tap"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="text-xs uppercase tracking-[0.45em] text-[#f0d9a8]/80"
            >
              Tap the seal to open
            </motion.p>
          )}
          {(stage === "breaking" || stage === "opening") && (
            <p className="text-xs uppercase tracking-[0.45em] text-[#f0d9a8]">Opening your invitation…</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
