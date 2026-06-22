import { HeroSection } from "@/components/sections/HeroSection";
import { CoupleIntroductionSection } from "@/components/sections/CoupleIntroductionSection";
import { CoupleStory } from "@/components/sections/CoupleStory";
import { EventsTimeline } from "@/components/sections/EventsTimeline";
import { VenueSection } from "@/components/sections/VenueSection";
import { FamilySection } from "@/components/sections/FamilySection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { FinalSection } from "@/components/sections/FinalSection";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060914] text-[#f5efe0]">
      <HeroSection />
      <CoupleIntroductionSection />
      <CoupleStory />
      <EventsTimeline />
      <VenueSection />
      <FamilySection />
      <CountdownSection />
      <FinalSection />
      <Footer />
    </main>
  );
}
