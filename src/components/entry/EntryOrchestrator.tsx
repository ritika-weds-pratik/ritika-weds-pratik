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

  // Always start at "splash" so server and first client render are identical
  // (no hydration mismatch). After mount, skip the intro for repeat visits or
  // reduced-motion users via a single, guarded state flip.
  const [stage, setStage] = useState<Stage>("splash");

  useEffect(() => {
    if (reduced) {
      // One-time guarded flip (skip intro); not a render cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStage("done");
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setStage("done");
      }
    } catch {
      /* sessionStorage unavailable — show the intro */
    }
  }, [reduced]);

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

  const isDone = stage === "done";

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === "splash" && <SplashLoader key="splash" onComplete={beginFromSplash} />}
        {stage === "gates" && <PalaceGatesReveal key="gates" onOpen={toDone} />}
      </AnimatePresence>

      {/* Render the main site underneath; reveal it (and let it scroll) once done. */}
      <div
        aria-hidden={!isDone}
        style={
          isDone ? undefined : { overflow: "hidden", height: "100vh", maxHeight: "100dvh" }
        }
      >
        {children}
      </div>
    </>
  );
}
