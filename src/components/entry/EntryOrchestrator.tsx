"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashLoader } from "@/components/entry/SplashLoader";
import { PalaceGatesReveal } from "@/components/entry/PalaceGatesReveal";
import { useAudio } from "@/components/providers/AudioProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Stage = "splash" | "gates" | "done";

const STORAGE_KEY = "wedding-entry-seen";

/**
 * Runs the cinematic entry experience on first visit:
 *   splash (Begin tap unlocks audio) → palace gates reveal → main site
 *
 * On repeat visits (same browser session) the intro is skipped. Reduced-motion
 * users get a fast path straight to the main site.
 */
export function EntryOrchestrator({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const { unlock } = useAudio();

  // Compute the initial stage without a setState-in-effect cascade:
  // - reduced motion, or a repeat visit in this session → skip straight in.
  const [skipIntro] = useState(() => {
    if (reduced) return true;
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [stage, setStage] = useState<Stage>(skipIntro ? "done" : "splash");

  // Mark the intro as completed once we reach the main site, and reset scroll.
  useEffect(() => {
    if (stage !== "done") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
  }, [stage]);

  // The splash "Begin" tap is the user gesture that unlocks audible audio,
  // then advances to the palace gates reveal.
  const beginFromSplash = useCallback(() => {
    unlock();
    setStage("gates");
  }, [unlock]);

  const toDone = useCallback(() => setStage("done"), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === "splash" && <SplashLoader key="splash" onComplete={beginFromSplash} />}
        {stage === "gates" && <PalaceGatesReveal key="gates" onOpen={toDone} />}
      </AnimatePresence>

      {/* Render the main site underneath; reveal it (and let it scroll) once done. */}
      <div
        aria-hidden={stage !== "done"}
        style={
          stage === "done" ? undefined : { overflow: "hidden", height: "100vh", maxHeight: "100dvh" }
        }
      >
        {children}
      </div>
    </>
  );
}
