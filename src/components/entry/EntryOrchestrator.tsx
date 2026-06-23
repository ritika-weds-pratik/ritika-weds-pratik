"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashLoader } from "@/components/entry/SplashLoader";
import { EnvelopeExperience } from "@/components/entry/EnvelopeExperience";
import { PalaceGatesReveal } from "@/components/entry/PalaceGatesReveal";
import { useAudio } from "@/components/providers/AudioProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Stage = "splash" | "envelope" | "gates" | "done";

const STORAGE_KEY = "wedding-entry-seen";

/**
 * Runs the cinematic entry trilogy on first visit:
 *   splash  →  envelope (+ unlocks audio on the wax-seal tap)
 *            →  palace gates reveal  →  main site
 *
 * On repeat visits (same browser) the full intro is skipped, but a guest
 * can still replay it via a hidden control if desired. Reduced-motion
 * users get a fast path straight to the main site.
 */
export function EntryOrchestrator({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const { unlock } = useAudio();
  const [stage, setStage] = useState<Stage>("splash");

  // Decide whether to play the intro at all.
  useEffect(() => {
    if (reduced) {
      setStage("done");
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setStage("done");
      }
    } catch {
      /* sessionStorage may be unavailable; default to playing the intro */
    }
  }, [reduced]);

  // Mark the intro as completed once we reach the main site.
  useEffect(() => {
    if (stage === "done") {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      // Ensure scroll begins at the top of the invitation.
      window.scrollTo(0, 0);
    }
  }, [stage]);

  const toEnvelope = useCallback(() => setStage("envelope"), []);
  const toGates = useCallback(() => {
    // The wax-seal tap is the user gesture that unlocks audio.
    unlock();
    setStage("gates");
  }, [unlock]);
  const toDone = useCallback(() => setStage("done"), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === "splash" && <SplashLoader key="splash" onComplete={toEnvelope} />}
        {stage === "envelope" && <EnvelopeExperience key="env" onOpen={toGates} />}
        {stage === "gates" && <PalaceGatesReveal key="gates" onOpen={toDone} />}
      </AnimatePresence>

      {/* Render the main site underneath; reveal it (and let it scroll) once done. */}
      <div
        aria-hidden={stage !== "done"}
        style={
          stage === "done"
            ? undefined
            : { overflow: "hidden", height: "100vh", maxHeight: "100dvh" }
        }
      >
        {children}
      </div>
    </>
  );
}
