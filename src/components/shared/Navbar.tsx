"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, Sparkles, X, BookOpen, Heart, CalendarHeart, MapPin, Users, Image as ImageIcon } from "lucide-react";
import { couple } from "@/data/wedding";
import { MuteToggle } from "@/components/ui/MuteToggle";

const links = [
  { href: "#story", label: "Story", icon: BookOpen },
  { href: "#couple", label: "Couple", icon: Heart },
  { href: "#events", label: "Events", icon: CalendarHeart },
  { href: "#venue", label: "Venue", icon: MapPin },
  { href: "#family", label: "Family", icon: Users },
  { href: "#gallery", label: "Gallery", icon: ImageIcon },
  { href: "#finale", label: "Blessings", icon: Sparkles },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [open]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 84;
    // Play a soft sound if we had an audio context here, but visual feedback is key
    if (lenis) {
      lenis.scrollTo(top, { immediate: false });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled
            ? "border-b border-[#d4af7a]/15 bg-[#060914]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => handleNav(e, "#home")}
            className="flex items-center gap-2 text-[#f5efe0] transition hover:text-[#f0d9a8] group"
            aria-label="Back to top"
          >
            <Sparkles className="h-4 w-4 text-[#d4af7a] transition-transform group-hover:scale-125" />
            <span className="hindi-text text-sm uppercase tracking-[0.4em]">
              {couple.bride.name} &amp; {couple.groom.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5efe0]/75 transition hover:text-[#f0d9a8]"
              >
                {l.label}
              </a>
            ))}
            <MuteToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <MuteToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/60 text-[#f0d9a8] backdrop-blur-sm transition active:scale-95"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#020611]/60 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 right-0 top-0 w-full max-w-sm border-l border-[#d4af7a]/20 bg-gradient-to-bl from-[#0b1027] to-[#060914] shadow-2xl p-6 flex flex-col"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-12 mt-2">
                <span className="hindi-text text-lg uppercase tracking-[0.3em] text-[#f0d9a8]">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/80 text-[#f0d9a8] transition active:scale-95 hover:bg-[#d4af7a]/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Links with Staggered Animation */}
              <div className="flex flex-col gap-6 flex-1">
                {links.map((l, i) => {
                  const Icon = l.icon;
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <a
                        href={l.href}
                        onClick={(e) => handleNav(e, l.href)}
                        className="group flex items-center gap-4 py-2"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af7a]/20 bg-[#d4af7a]/5 text-[#d4af7a] transition-all group-hover:bg-[#d4af7a]/20 group-hover:scale-110">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-lg uppercase tracking-[0.2em] text-[#f5efe0]/90 transition group-hover:text-[#f0d9a8]">
                          {l.label}
                        </span>
                      </a>
                      {/* Golden animated divider */}
                      {i < links.length - 1 && (
                        <div className="mt-6 h-px w-full bg-gradient-to-r from-[#d4af7a]/30 via-transparent to-transparent origin-left scale-x-0 animate-[scaleIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${0.2 + i * 0.05}s` }} />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Menu Footer */}
              <div className="mt-auto pt-8 border-t border-[#d4af7a]/20 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#f5efe0]/40">
                  {couple.monogram} • 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
