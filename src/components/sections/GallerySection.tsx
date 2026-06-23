"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { OrnamentalFrame } from "@/components/effects/OrnamentalFrame";

/**
 * Premium memories gallery — masonry layout with an interactive lightbox.
 *
 * Image system: each item may declare a real `src` (a path under /public).
 * If the file is present it is shown; otherwise an elegant royal placeholder
 * (themed gradient + SVG motif + caption) renders in its place. To use real
 * photos, drop files into /public/royal/ and set the `src` fields below —
 * no code change required.
 */
type Photo = {
  src?: string;
  caption: string;
  motif: string;
  /** Varying spans create the masonry rhythm. */
  aspect: "tall" | "wide" | "square";
  tint: string;
};

const photos: Photo[] = [
  { caption: "The First Glance", motif: "🌸", aspect: "tall", tint: "#9d3b54" },
  { caption: "Golden Hour", motif: "🌅", aspect: "wide", tint: "#c9a24a" },
  { caption: "Sacred Vows", motif: "💍", aspect: "square", tint: "#7a1f2b" },
  { caption: "Laughter & Joy", motif: "✨", aspect: "tall", tint: "#0f5132" },
  { caption: "Family Blessings", motif: "🙏", aspect: "square", tint: "#6e4a1f" },
  { caption: "The Celebration", motif: "🎉", aspect: "wide", tint: "#b8a878" },
  { caption: "Forever Begins", motif: "👑", aspect: "tall", tint: "#9d3b54" },
  { caption: "Sweet Moments", motif: "🪔", aspect: "square", tint: "#c9a24a" },
];

const aspectClass: Record<Photo["aspect"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

function Placeholder({ photo }: { photo: Photo }) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${aspectClass[photo.aspect]}`}
      style={{
        background: `radial-gradient(circle at 50% 35%, ${photo.tint}33, rgba(5,9,19,0.9) 70%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 10px, rgba(240,217,168,0.06) 10px 11px)",
        }}
      />
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl"
        aria-hidden
      >
        {photo.motif}
      </motion.span>
      <p className="absolute bottom-4 left-0 right-0 text-center text-xs uppercase tracking-[0.35em] text-[#f0d9a8]">
        {photo.caption}
      </p>
    </div>
  );
}

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  // Keyboard support for the lightbox.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((s) => (s === null ? s : (s + 1) % photos.length));
      if (e.key === "ArrowLeft") setSelected((s) => (s === null ? s : (s - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-[#0a1028] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.04),transparent_16%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.4em] text-[#f0d9a8]">Gallery</p>
          <h2 id="gallery-heading" className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">
            Moments in Frame
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#f5efe0]/65">
            A treasury of memories — tap any frame to view it up close.
          </p>
        </RevealOnScroll>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 xl:columns-3">
          {photos.map((photo, index) => (
            <RevealOnScroll key={photo.caption} delay={(index % 3) * 0.05}>
              <motion.button
                type="button"
                onClick={() => setSelected(index)}
                whileHover={{ y: -6 }}
                className="mb-5 block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d9a8]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1028]"
                aria-label={`View ${photo.caption}`}
              >
                <OrnamentalFrame tint={photo.tint}>
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      width={900}
                      height={1200}
                      className={`w-full object-cover transition duration-700 hover:scale-105 ${aspectClass[photo.aspect]}`}
                    />
                  ) : (
                    <Placeholder photo={photo} />
                  )}
                </OrnamentalFrame>
              </motion.button>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            data-lenis-prevent
          >
            <button
              className="absolute right-6 top-6 rounded-full border border-[#d4af7a]/30 bg-[#0b1027] p-3 text-[#f5efe0] transition hover:bg-[#0b1027]/80"
              onClick={() => setSelected(null)}
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.figure
              key={selected}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh]"
            >
              <OrnamentalFrame className="w-[88vw] max-w-3xl">
                <div className="flex aspect-[3/4] items-center justify-center bg-[linear-gradient(160deg,rgba(15,27,73,0.6),rgba(5,9,19,0.9))] sm:aspect-[4/3]">
                  {photos[selected].src ? (
                    <Image
                      src={photos[selected].src!}
                      alt={photos[selected].caption}
                      width={1200}
                      height={1600}
                      className="max-h-[80vh] w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 px-8 text-center">
                      <span className="text-7xl" aria-hidden>
                        {photos[selected].motif}
                      </span>
                      <p className="text-sm uppercase tracking-[0.4em] text-[#f0d9a8]">{photos[selected].caption}</p>
                      <p className="max-w-xs text-xs leading-6 text-[#f5efe0]/55">
                        A photograph will appear here once added.
                      </p>
                    </div>
                  )}
                </div>
              </OrnamentalFrame>
              <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.4em] text-[#f0d9a8]">
                {photos[selected].caption} · {selected + 1} / {photos.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
