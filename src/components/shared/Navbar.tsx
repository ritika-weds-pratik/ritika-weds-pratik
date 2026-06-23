"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { couple } from "@/data/wedding";
import { MuteToggle } from "@/components/ui/MuteToggle";

const links = [
  { href: "#story", label: "Story" },
  { href: "#events", label: "Events" },
  { href: "#venue", label: "Venue" },
  { href: "#family", label: "Family" },
  { href: "#gallery", label: "Gallery" },
  { href: "#rsvp", label: "RSVP" },
];

/**
 * Scroll-aware navbar. Transparent at the very top (so it doesn't fight the
 * hero), condenses into a solid glass bar once the guest scrolls. Includes
 * a working mobile menu and the ambient-music mute toggle.
 *
 * Anchor links use Lenis (if active) via smooth scroll fallback, and a
 * header offset so section headings aren't hidden under the fixed bar.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
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
          className="flex items-center gap-2 text-[#f5efe0]"
          aria-label="Back to top"
        >
          <Sparkles className="h-4 w-4 text-[#d4af7a]" />
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
              className="text-sm uppercase tracking-[0.2em] text-[#f5efe0]/75 transition hover:text-[#f0d9a8]"
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
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/60 text-[#f0d9a8] backdrop-blur-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#d4af7a]/15 bg-[#060914]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  className="rounded-lg px-3 py-3 text-sm uppercase tracking-[0.2em] text-[#f5efe0]/80 transition hover:bg-[#d4af7a]/10 hover:text-[#f0d9a8]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
