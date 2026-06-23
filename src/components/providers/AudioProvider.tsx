"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Ambient audio (shehnai / instrumental). Browsers block autoplay-with-sound
 * until a user gesture, so playback is unlocked on the first interaction —
 * which the EntryOrchestrator triggers when the guest taps the wax seal.
 *
 * Audio source: /audio/ambient.mp3 — swap this file for the couple's own
 * track. If the file is missing the player silently no-ops.
 */

type AudioContextValue = {
  ready: boolean;
  playing: boolean;
  muted: boolean;
  /** Unlock + play. Called from a user gesture (the seal tap). */
  unlock: () => void;
  toggleMute: () => void;
};

const Ctx = createContext<AudioContextValue | null>(null);

const TRACK = "/audio/ambient.mp3";

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  // Set up the audio element on mount (muted is fine pre-gesture).
  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "none";
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // React to mute changes.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  // Attempt playback once unlocked and ready.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlay) return;
    if (ready) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          /* autoplay still blocked; the mute toggle can retry */
        });
    } else {
      // load metadata so we can play as soon as allowed
      audio.load();
    }
  }, [shouldPlay, ready]);

  const unlock = useCallback(() => setShouldPlay(true), []);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <Ctx.Provider value={{ ready, playing, muted, unlock, toggleMute }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within <AudioProvider>");
  return ctx;
}
