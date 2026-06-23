"use client";

import { CalendarDays, Clock, MapPin, Navigation, Share2 } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { PremiumButton } from "@/components/shared/PremiumButton";
import { venue, weddingDate } from "@/data/wedding";

/**
 * Venue Experience — a luxury venue card beside an animated map, with a
 * decorative route line and one-click directions / share. The iframe uses
 * data-lenis-prevent so scrolling inside the map isn't hijacked.
 */
export function VenueSection() {
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

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]">The Venue</p>
          <h2 className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">{venue.name}</h2>
        </RevealOnScroll>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Venue details card */}
          <RevealOnScroll direction="right">
            <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-[#d4af7a]/15 bg-[linear-gradient(160deg,rgba(15,27,73,0.6),rgba(5,9,19,0.85))] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm md:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 bg-[radial-gradient(circle_at_top_right,rgba(212,175,122,0.16),transparent_70%)]" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#f0d9a8]/10 shadow-[0_0_25px_rgba(212,175,122,0.1)]">
                  <MapPin className="h-6 w-6 text-[#f0d9a8]" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-[#f5efe0]">{venue.name}</h3>
                <p className="mt-2 text-sm text-[#f0d9a8]">{venue.area}</p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#d4af7a]/40 to-transparent" />

                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 shrink-0 text-[#f0d9a8]" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Date</dt>
                      <dd className="text-[#f5efe0]">{weddingDate.display}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-[#f0d9a8]" />
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Time</dt>
                      <dd className="text-[#f5efe0]">11:00 AM onwards</dd>
                    </div>
                  </div>
                </dl>

                {/* Animated route line */}
                <div className="relative mt-8 h-10 overflow-hidden">
                  <svg viewBox="0 0 300 40" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
                    <path
                      d="M6,20 C70,4 120,36 180,16 S280,28 294,18"
                      fill="none"
                      stroke="rgba(212,175,122,0.25)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <circle cx="6" cy="20" r="4" fill="#f0d9a8" />
                    <circle cx="294" cy="18" r="4" fill="#e8939f" />
                  </svg>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a href={venue.directions} target="_blank" rel="noopener noreferrer">
                    <PremiumButton className="w-full justify-center">
                      <Navigation className="mr-2 h-4 w-4" /> Get Directions
                    </PremiumButton>
                  </a>
                  <button
                    type="button"
                    onClick={onShare}
                    className="inline-flex items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/70 px-6 py-3 text-sm uppercase tracking-[0.3em] text-[#f5efe0] backdrop-blur-sm transition hover:bg-[#0b1027]/80"
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share Location
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Map */}
          <RevealOnScroll direction="left" delay={0.1}>
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-[1.75rem] border border-[#d4af7a]/15 bg-[#0b1027]/70 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <div className="aspect-[16/11] overflow-hidden rounded-[1.5rem] lg:aspect-auto lg:h-full">
                <iframe
                  title={`${venue.name} map`}
                  src={venue.mapEmbed}
                  className="h-full w-full grayscale-[0.2]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-lenis-prevent
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
