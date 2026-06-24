"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

type Photo = {
  src?: string;
  caption: string;
  motif: string;
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
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#060914] ${aspectClass[photo.aspect]}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,122,0.1),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 10px, rgba(240,217,168,0.2) 10px 11px)" }}
      />
      <motion.span
        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl drop-shadow-[0_0_15px_rgba(212,175,122,0.3)]"
        aria-hidden
      >
        {photo.motif}
      </motion.span>
    </div>
  );
}

// Duplicate photos for infinite scrolling effect
const carouselPhotos = [...photos, ...photos];

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  
  // Auto-scrolling logic
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef(0);

  // Drag to scroll logic for mobile devices
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const startScrollPosition = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setIsDragging(true);
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    startScrollPosition.current = scrollPosition.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !containerRef.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    // Prevent vertical page scroll if they are clearly swiping horizontally
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }

    let newPos = startScrollPosition.current + diffX;
    
    // Wrap scroll position to stay within infinite bounds [ -3200, 0 ]
    while (newPos <= -3200) newPos += 3200;
    while (newPos > 0) newPos -= 3200;

    scrollPosition.current = newPos;
    containerRef.current.style.transform = `translateX(${scrollPosition.current}px)`;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setIsDragging(false);
    touchStartRef.current = null;
  };

  // Lightbox swipe and navigation handlers
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelected((s) => (s === null ? 0 : (s - 1 + photos.length) % photos.length));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelected((s) => (s === null ? 0 : (s + 1) % photos.length));
  };

  const lightboxTouchStart = useRef<number | null>(null);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStart.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStart.current === null) return;
    const diffX = e.changedTouches[0].clientX - lightboxTouchStart.current;
    const threshold = 50; // min distance
    if (diffX > threshold) {
      handlePrev();
    } else if (diffX < -threshold) {
      handleNext();
    }
    lightboxTouchStart.current = null;
  };
  
  useAnimationFrame((t, delta) => {
    if (!containerRef.current || isHovered || selected !== null || isDragging) return;
    
    // Adjust speed here (pixels per millisecond)
    const speed = 0.05;
    scrollPosition.current -= speed * delta;
    
    // If we've scrolled past half the content, reset to create infinite loop
    // Assuming each card + gap is roughly 400px, 8 cards = 3200px
    if (scrollPosition.current <= -3200) {
      scrollPosition.current += 3200;
    }
    
    containerRef.current.style.transform = `translateX(${scrollPosition.current}px)`;
  });

  useEffect(() => {
    if (selected === null) {
      document.body.style.overflow = "unset";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((s) => (s === null ? s : (s + 1) % photos.length));
      if (e.key === "ArrowLeft") setSelected((s) => (s === null ? s : (s - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-[#0a1028] py-24 md:py-32" 
      style={{ contain: "layout paint" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.04),transparent_16%)]" />
      
      {/* Golden dust particles in background */}
      <div className="absolute inset-0 bg-[url('/royal/texture.png')] bg-cover opacity-5 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <RevealOnScroll className="text-center">
          <p className="section-label">Moments in Frame</p>
          <div className="mt-4 flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/60" />
            <h2 id="gallery-heading" className="hindi-text text-3xl font-bold text-[#f5efe0] text-gold-shimmer">
              गैलरी
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af7a]/60" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#f5efe0]/70">
            A cinematic treasury of memories. Tap any frame to immerse in the moment.
          </p>
        </RevealOnScroll>
      </div>

      {/* Luxury Auto-Carousel — overflow-hidden clips the w-max inner rail */}
      <div 
        className="relative z-20 mt-20 w-full overflow-hidden py-10 select-none"
        style={{ isolation: "isolate", contain: "layout paint", touchAction: "pan-y" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={containerRef}
          className="flex w-max items-center gap-8 px-8"
          style={{ willChange: "transform" }}
        >
          {carouselPhotos.map((photo, index) => {
            // Original index for selection mapping
            const originalIndex = index % photos.length;
            const rotateAngle = index % 2 === 0 ? 3 : -3;
            
            return (
              <div 
                key={`${photo.caption}-${index}`} 
                className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 perspective-[1000px]"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    duration: 6 + (index % 3), 
                    delay: (index % 4) * 0.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setSelected(originalIndex)}
                    initial={{ rotate: rotateAngle }}
                    whileHover={{ scale: 1.05, rotate: 0, z: 50 }}
                    className="group relative block w-full overflow-hidden rounded-[1rem] bg-[#f5efe0] p-3 pb-14 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(212,175,122,0.3)] focus:outline-none"
                    aria-label={`View ${photo.caption}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Polaroid inner frame */}
                    <div className="relative overflow-hidden rounded-md border border-[#d4af7a]/20 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
                      {photo.src ? (
                        <Image
                          src={photo.src}
                          alt={photo.caption}
                          width={900}
                          height={1200}
                          className={`w-full object-cover transition duration-1000 group-hover:scale-110 ${aspectClass[photo.aspect]}`}
                        />
                      ) : (
                        <Placeholder photo={photo} />
                      )}
                      
                      {/* Hover overlay with zoom icon */}
                      <div className="absolute inset-0 bg-[#060914]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
                        <ZoomIn className="h-12 w-12 text-[#f0d9a8] drop-shadow-md scale-50 transition-transform duration-300 group-hover:scale-100" />
                      </div>
                    </div>
                    
                    {/* Polaroid caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center">
                      <p className="font-serif text-sm uppercase tracking-[0.25em] text-[#050a1f]/80 font-semibold">{photo.caption}</p>
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            );
          })}
        </div>
        
        {/* Carousel Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a1028] to-transparent z-30" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a1028] to-transparent z-30" />
      </div>

      {/* Cinematic Lightbox Experience */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelected(null)}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
            data-lenis-prevent
          >
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af7a]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e8939f]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/70 p-3 md:p-4 text-[#f5efe0] backdrop-blur-md transition-all hover:bg-[#d4af7a]/20 hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/70 p-3 md:p-4 text-[#f5efe0] backdrop-blur-md transition-all hover:bg-[#d4af7a]/20 hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            <button
              className="absolute right-6 top-6 z-50 rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/50 p-4 text-[#f5efe0] backdrop-blur-md transition-all hover:bg-[#d4af7a]/20 hover:scale-110"
              onClick={() => setSelected(null)}
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.figure
              key={selected}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -50 }}
              transition={{ duration: 0.6, type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#d4af7a]/30 shadow-[0_0_80px_rgba(212,175,122,0.15)] bg-[#050a1f]">
                {photos[selected].src ? (
                  <Image
                    src={photos[selected].src!}
                    alt={photos[selected].caption}
                    width={1800}
                    height={1200}
                    className="max-h-[80vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-6 px-8 text-center bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.15),transparent)]">
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ duration: 4, repeat: Infinity }} 
                      className="text-8xl drop-shadow-[0_0_30px_rgba(212,175,122,0.5)]" 
                      aria-hidden
                    >
                      {photos[selected].motif}
                    </motion.span>
                    <p className="font-serif text-2xl uppercase tracking-[0.4em] text-[#f0d9a8] mt-4">{photos[selected].caption}</p>
                    <p className="max-w-md text-sm leading-6 text-[#f5efe0]/60">
                      A high-resolution photograph will appear here once added to the royal collection.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <p className="font-serif text-lg tracking-widest text-[#f0d9a8]">
                  {photos[selected].caption}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af7a]/50" />
                  <p className="font-mono text-sm text-[#f5efe0]/50 tracking-widest">
                    {String(selected + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
