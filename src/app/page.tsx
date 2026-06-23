import { HeroSection } from "@/components/sections/HeroSection";
import { DivineBlessingsSection } from "@/components/sections/GaneshIntro";
import { CoupleIntroductionSection } from "@/components/sections/CoupleIntroductionSection";
import { CoupleStory } from "@/components/sections/CoupleStory";
import { EventsTimeline } from "@/components/sections/EventsTimeline";
import { VenueSection } from "@/components/sections/VenueSection";
import { FamilySection } from "@/components/sections/FamilySection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FinalSection } from "@/components/sections/FinalSection";
import { Footer } from "@/components/shared/Footer";

/**
 * The invitation, in cinematic reading order:
 *
 *   Hero  →  Divine Blessings  →  Couple Introduction  →  Couple Story
 *         →  Events (storybook)  →  Venue  →  Family
 *         →  Countdown  →  Gallery  →  Grand Finale  →  Footer
 *
 * The cinematic entry experience (splash → palace gates) and the
 * smooth-scroll + audio providers wrap this page in layout.tsx.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#060914] text-[#f5efe0]">
      {/* "Skip to invitation" link for keyboard / screen-reader users,
          bypassing the entry experience. */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:border focus:border-[#d4af7a]/40 focus:bg-[#0b1027] focus:px-5 focus:py-2 focus:text-sm focus:text-[#f0d9a8]"
      >
        Skip to invitation
      </a>

      <HeroSection />
      <DivineBlessingsSection />
      <CoupleIntroductionSection />
      <CoupleStory />
      <EventsTimeline />
      <VenueSection />
      <FamilySection />
      <CountdownSection />
      <GallerySection />
      <FinalSection />
      <Footer />
    </main>
  );
}
