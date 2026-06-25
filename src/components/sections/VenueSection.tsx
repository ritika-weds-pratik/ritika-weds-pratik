"use client";

import * as React from "react";
import { CalendarDays, Clock, MapPin, Navigation, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { venue, weddingDate } from "@/data/wedding";
import { PalaceSilhouette } from "@/components/effects/PalaceSilhouette";
import { GoldenParticles } from "@/components/effects/GoldenParticles";

export function VenueSection() {
  const [mapState, setMapState] = React.useState<"loading" | "loaded" | "error">("loading");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    // 5-second safety timeout: if iframe onLoad hasn't triggered, switch to fallback card.
    const timer = setTimeout(() => {
      if (mapState === "loading") {
        setMapState("error");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [mapState]);

  const onCopyAddress = () => {
    try {
      navigator.clipboard.writeText(`${venue.name}, ${venue.area}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard write failed */
    }
  };

  const onShare = async () => {
    const shareData = {
      title: `${venue.name} — Wedding Venue`,
      text: `Join us at ${venue.name}, ${venue.area} on ${weddingDate.display}`,
      url: venue.directions,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} — ${shareData.url}`);
      }
    } catch {
      /* user cancelled or clipboard unavailable */
    }
  };

  return (
    <section id="venue" className="relative overflow-hidden bg-[#060914] py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.06),transparent_18%)]" />
      
      {/* Palace silhouette at the bottom */}
      <PalaceSilhouette className="absolute inset-x-0 bottom-0 h-[25vh] w-full text-[#0a1028] opacity-30" />
      
      {/* Floating location particles */}
      <GoldenParticles count={25} className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center select-none">
          <p className="section-label">The Venue</p>
          <div className="mt-4 flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
            <h2 className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer">स्थल</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Venue details card */}
          <RevealOnScroll direction="right">
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#d4af7a]/25 bg-[linear-gradient(160deg,rgba(15,27,73,0.7),rgba(5,9,19,0.9))] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md md:p-10 transition-shadow hover:shadow-[0_0_50px_rgba(212,175,122,0.15)]">
              <div className="absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(212,175,122,0.2),transparent_70%)]" />

              <div className="relative">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d4af7a]/40 bg-[#f0d9a8]/10 shadow-[0_0_30px_rgba(212,175,122,0.2)]">
                  {/* Glowing location marker animation */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-[#f0d9a8]"
                  />
                  <MapPin className="h-7 w-7 text-[#f0d9a8]" />
                </div>
                
                <h3 className="mt-8 font-serif text-3xl text-[#f5efe0]">{venue.name}</h3>
                <p className="mt-2 text-sm text-[#f0d9a8]/80">{venue.area}</p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#d4af7a]/40 to-transparent" />

                <dl className="mt-6 space-y-5 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af7a]/10 border border-[#d4af7a]/20">
                      <CalendarDays className="h-4 w-4 shrink-0 text-[#f0d9a8]" />
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/70">Date</dt>
                      <dd className="number-text text-base md:text-lg text-[#f5efe0] font-semibold tracking-widest">{weddingDate.display}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af7a]/10 border border-[#d4af7a]/20">
                      <Clock className="h-4 w-4 shrink-0 text-[#f0d9a8]" />
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/70">Time</dt>
                      <dd className="number-text text-base md:text-lg text-[#f5efe0] font-semibold tracking-widest">6:00 PM <span className="font-serif tracking-[0.2em] text-xs uppercase">onwards</span></dd>
                    </div>
                  </div>
                </dl>

                {/* Animated route line */}
                <div className="relative mt-10 h-16 overflow-hidden">
                  <svg viewBox="0 0 300 40" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
                    <motion.path
                      d="M6,20 C70,4 120,36 180,16 S280,28 294,18"
                      fill="none"
                      stroke="rgba(240,217,168,0.5)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      initial={{ strokeDashoffset: 300 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    />
                    <motion.circle 
                      cx="6" cy="20" r="4" fill="#f0d9a8" 
                      animate={{ scale: [1, 1.5, 1] }} 
                      transition={{ duration: 1.5, repeat: Infinity }} 
                    />
                    <motion.circle 
                      cx="294" cy="18" r="5" fill="#e8939f"
                      animate={{ scale: [1, 1.5, 1], filter: ["drop-shadow(0 0 2px #e8939f)", "drop-shadow(0 0 8px #e8939f)", "drop-shadow(0 0 2px #e8939f)"] }} 
                      transition={{ duration: 2, repeat: Infinity }} 
                    />
                  </svg>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <a href={venue.directions} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden rounded-full">
                    <motion.div 
                      className="absolute inset-0 bg-[#d4af7a]/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" 
                    />
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      className="w-full relative flex items-center justify-center bg-gradient-to-r from-[#c9a24a] to-[#d4af7a] py-4 text-sm font-bold uppercase tracking-[0.25em] text-[#050a1f] shadow-[0_0_20px_rgba(212,175,122,0.3)] transition-all hover:shadow-[0_0_30px_rgba(212,175,122,0.5)]"
                    >
                      <Navigation className="mr-3 h-5 w-5" /> Get Directions
                    </motion.button>
                  </a>
                  <button
                    type="button"
                    onClick={onShare}
                    className="inline-flex items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/70 px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#f5efe0] backdrop-blur-sm transition-all hover:bg-[#d4af7a]/10 hover:border-[#d4af7a]/60 active:scale-95"
                  >
                    <Share2 className="mr-3 h-4 w-4" /> Share Location
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Luxury Map Reveal with Skeleton and Fallback handling */}
          <RevealOnScroll direction="left" delay={0.2}>
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[2rem] border-2 border-[#d4af7a]/25 bg-[#0b1027]/90 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)] group">
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] min-h-[360px] bg-[#050a1f]">
                
                {/* 1. Loading Skeleton overlay (active for max 2-3s, or until iframe triggers onLoad) */}
                {mapState === "loading" && (
                  <div className="absolute inset-0 bg-[#050a1f] flex flex-col items-center justify-center z-20 space-y-4">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute h-16 w-16 rounded-full border-2 border-[#d4af7a]/30 animate-ping" />
                      <div className="h-12 w-12 rounded-full border-2 border-t-[#d4af7a] border-r-[#d4af7a] border-b-transparent border-l-transparent animate-spin" />
                    </div>
                    <p className="font-serif text-[#f0d9a8] text-[10px] uppercase tracking-[0.3em] animate-pulse">Initializing Sacred Map...</p>
                  </div>
                )}

                {/* 2. Interactive Map Iframe */}
                {mapState !== "error" && (
                  <iframe
                    title={`${venue.name} map`}
                    src={venue.mapEmbed}
                    onLoad={() => setMapState("loaded")}
                    className="h-full w-full grayscale-[0.3] contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 min-h-[360px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    data-lenis-prevent
                  />
                )}

                {/* 3. Fallback venue card when mapState is error */}
                {mapState === "error" && (
                  <div className="absolute inset-0 bg-[#050a1f] flex flex-col z-20 overflow-hidden select-none">
                    {/* Venue Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src="/royal/venue_fallback.png" 
                        alt="Pearl Marriage Vatika"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1027] via-[#0b1027]/40 to-transparent" />
                      <div className="absolute top-4 left-4 rounded-full border border-[#d4af7a]/50 bg-[#060914]/85 px-4 py-1 text-[9px] uppercase tracking-[0.15em] text-[#f0d9a8]">
                        📍 Venue Location
                      </div>
                    </div>

                    {/* Venue Details */}
                    <div className="flex-1 flex flex-col justify-between p-6 bg-[#0b1027]/95 border-t border-[#d4af7a]/20">
                      <div>
                        <h4 className="font-serif text-2xl text-[#f5efe0] text-gold-shimmer">{venue.name}</h4>
                        <p className="mt-2 text-xs text-[#f0d9a8]/70 leading-relaxed font-sans">
                          {venue.area}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[#f0d9a8] bg-[#d4af7a]/10 border border-[#d4af7a]/20 px-2.5 py-1 rounded">
                          <span>बिहार, भारत</span>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="mt-6 flex gap-3">
                        <a 
                          href={venue.directions} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#d4af7a] py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#050a1f] shadow-md transition-all hover:brightness-110 active:scale-95"
                        >
                          <Navigation className="h-3.5 w-3.5" /> Open Maps
                        </a>
                        <button 
                          onClick={onCopyAddress}
                          className="flex-1 flex items-center justify-center gap-2 rounded-full border border-[#d4af7a]/30 bg-[#0b1027] py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5efe0] transition-all hover:bg-[#d4af7a]/15 active:scale-95"
                        >
                          {copied ? "Copied! ✓" : "Copy Location"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
