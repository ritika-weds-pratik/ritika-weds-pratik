"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { OrnamentalFrame } from "@/components/effects/OrnamentalFrame";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { FloatingLanterns } from "@/components/effects/FloatingLanterns";
import { FallingPetals } from "@/components/effects/FallingPetals";
import { couple } from "@/data/wedding";

type Milestone = {
  year: string;
  title: string;
  story: string;
  emoji: string;
  img?: string;
};

const milestones: Milestone[] = [
  {
    year: "The First Hello",
    title: "पहली मुलाकात",
    story:
      "Where it all began — a quiet introduction, kind eyes, and the faint feeling that something meaningful had just started.",
    emoji: "🌸",
  },
  {
    year: "Growing Closer",
    title: "प्रेम की शुरुआत",
    story:
      "Long conversations, shared laughter and the slow, certain realization that this was turning into something rare.",
    emoji: "💕",
  },
  {
    year: "The Proposal",
    title: "सगाई",
    story:
      "A promise made from the heart — to walk together, to hold each other through every season of life.",
    emoji: "💍",
  },
  {
    year: "Forever Begins",
    title: "विवाह",
    story:
      "Surrounded by family and blessings, two souls step into a lifetime of love, trust and togetherness.",
    emoji: "👑",
  },
];

export function CoupleStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Auto-progress timeline
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 6000); // 6 seconds per chapter
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    
    const threshold = 50;
    // Ensure horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swiped right -> go to previous chapter
        setActiveIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
      } else {
        // Swiped left -> go to next chapter
        setActiveIndex((prev) => (prev + 1) % milestones.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden bg-[#060914] py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-[url('/royal/texture.png')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.07),transparent_30%)]" />
      
      {/* Floating Elements */}
      <FloatingLanterns count={6} />
      <FallingPetals count={10} />
      <GoldenParticles count={20} className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="section-label">Two Souls, One Journey</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
              <h2 id="story-heading" className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer leading-[1.4]">
                {couple.bride.name}
              </h2>
              <span className="text-[#e8939f] text-2xl" aria-hidden>❤</span>
              <h2 className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer leading-[1.4]">
                {couple.groom.name}
              </h2>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#f5efe0]/80">
            A cinematic timeline of love, trust and celebration.
          </p>
        </RevealOnScroll>

        {/* Animated Timeline Carousel */}
        <div className="relative mt-20 md:mt-28">
          
          {/* Horizontal Timeline Path */}
          <div className="relative mx-auto w-full max-w-4xl h-1 bg-[#16122d] rounded-full mb-16 hidden md:block">
            {/* Animated Progress Line */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#d4af7a] via-[#e8939f] to-[#d4af7a] rounded-full shadow-[0_0_15px_rgba(212,175,122,0.6)]"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeIndex / (milestones.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* Timeline Nodes */}
            <div className="absolute inset-0 flex justify-between items-center px-0">
              {milestones.map((m, i) => (
                <button
                  key={`node-${i}`}
                  onClick={() => setActiveIndex(i)}
                  className="relative z-10 flex flex-col items-center group outline-none"
                  aria-label={`Go to ${m.year}`}
                >
                  <motion.div 
                    animate={{ 
                      scale: activeIndex === i ? 1.5 : 1,
                      backgroundColor: activeIndex >= i ? "#f0d9a8" : "#060914",
                      borderColor: activeIndex >= i ? "#f0d9a8" : "#d4af7a"
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-4 w-4 rounded-full border-2 border-[#d4af7a] shadow-[0_0_10px_rgba(240,217,168,0.5)] transition-all group-hover:scale-125"
                  />
                  <div className={`absolute top-8 w-max text-center transition-all duration-500 ${activeIndex === i ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af7a] font-semibold">{m.year}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Content Reveal */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-5xl"
              >
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                  {/* Memory frame */}
                  <div className="order-2 md:order-1 flex justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: -2 }} 
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <OrnamentalFrame className="max-w-[280px] sm:max-w-[320px]">
                        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[linear-gradient(160deg,rgba(15,27,73,0.8),rgba(5,9,19,0.95))] p-8 shadow-[inset_0_0_40px_rgba(212,175,122,0.2)]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,217,168,0.2),transparent_60%)]" />
                          <div className="absolute inset-4 border border-[#d4af7a]/20 rounded-full border-dashed animate-[spinSlow_30s_linear_infinite]" />
                          
                          {milestones[activeIndex].img ? (
                            <img 
                              src={milestones[activeIndex].img} 
                              alt={milestones[activeIndex].title} 
                              className="relative z-10 h-[85%] w-[85%] object-cover rounded-full" 
                            />
                          ) : (
                            <motion.span
                              animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              className="relative z-10 text-[6rem] drop-shadow-[0_0_25px_rgba(240,217,168,0.5)]"
                              aria-hidden
                            >
                              {milestones[activeIndex].emoji}
                            </motion.span>
                          )}
                        </div>
                      </OrnamentalFrame>
                    </motion.div>
                  </div>

                  {/* Story text */}
                  <div className="order-1 md:order-2">
                    <div className="relative p-10 rounded-[2rem] border border-[#d4af7a]/15 bg-[linear-gradient(145deg,rgba(12,10,34,0.7),rgba(6,9,20,0.9))] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                      <div className="absolute -top-6 left-8 text-7xl text-[#d4af7a]/10 font-serif">"</div>
                      <p className="text-xs uppercase tracking-[0.5em] text-[#f0d9a8] font-semibold">{milestones[activeIndex].year}</p>
                      <h3 className="hindi-text mt-4 text-3xl font-bold md:text-4xl text-[#f5efe0] drop-shadow-md tracking-normal">{milestones[activeIndex].title}</h3>
                      <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#d4af7a]/80 to-transparent" />
                      <p className="mt-6 text-lg leading-9 text-[#f5efe0]/85">{milestones[activeIndex].story}</p>
                      <div className="absolute -bottom-4 right-8 text-7xl text-[#d4af7a]/10 font-serif rotate-180">"</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Mobile Timeline Indicators */}
          <div className="mt-12 flex justify-center gap-3 md:hidden">
            {milestones.map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeIndex === i ? "w-8 bg-[#f0d9a8]" : "w-2 bg-[#d4af7a]/30"
                }`}
                aria-label={`Go to chapter ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
