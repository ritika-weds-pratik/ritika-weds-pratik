"use client";

import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#d4af7a]/10 bg-[#060914]/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="#home" className="flex items-center gap-2 text-[#f5efe0]">
          <Sparkles className="h-4 w-4 text-[#d4af7a]" />
          <span className="hindi-text text-sm uppercase tracking-[0.4em]">रीतिका & प्रतीक</span>
        </Link>
        <div className="hidden gap-5 md:flex">
          <Link href="#events" className="text-sm text-[#f5efe0]/75">Events</Link>
          <Link href="#venue" className="text-sm text-[#f5efe0]/75">Venue</Link>
          <Link href="#gallery" className="text-sm text-[#f5efe0]/75">Gallery</Link>
          <Link href="#rsvp" className="text-sm text-[#f5efe0]/75">RSVP</Link>
        </div>
        <Button className="md:hidden bg-transparent p-0 text-[#f5efe0] hover:bg-transparent">
          <Menu className="h-4 w-4" />
        </Button>
      </nav>
    </header>
  );
}
