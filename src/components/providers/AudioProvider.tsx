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
 * Ambient background music via the YouTube IFrame Player API.
 *
 * The track (https://www.youtube.com/watch?v=MqGPokaVo6o) is loaded into a
 * tiny off-screen iframe. Browsers block autoplay-with-sound until a user
 * gesture, so audible playback is unlocked on the first interaction — which
 * the EntryOrchestrator triggers when the guest taps "Begin" on the splash.
 *
 * Until then the iframe is created and muted, so it can buffer freely.
 * The MuteToggle flips player.mute()/unMute().
 */

const VIDEO_ID = "MqGPokaVo6o";

// Minimal subset of the YouTube IFrame API we use.
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: Record<string, unknown>
      ) => YTPlayer;
      PlayerState: { PLAYING: number; CUED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type AudioContextValue = {
  ready: boolean;
  playing: boolean;
  muted: boolean;
  /** Unlock + play audible audio. Called from a user gesture. */
  unlock: () => void;
  toggleMute: () => void;
};

const Ctx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<YTPlayer | null>(null);
  // Latest "should play" flag, read inside the async onReady callback.
  const shouldPlayRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);

  // Keep the ref in sync with state.
  useEffect(() => {
    shouldPlayRef.current = shouldPlay;
  }, [shouldPlay]);

  // Inject the off-screen player host + YouTube API script once.
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Host element for the player (1px, visually hidden but rendered so the
    // API can attach to it).
    const host = document.createElement("div");
    host.setAttribute("data-yt-audio", "");
    host.style.position = "fixed";
    host.style.width = "1px";
    host.style.height = "1px";
    host.style.left = "-9999px";
    host.style.top = "0";
    host.style.pointerEvents = "none";
    host.style.opacity = "0";
    host.style.zIndex = "-1";
    document.body.appendChild(host);

    const buildPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      // The API replaces the given element with an iframe.
      const inner = document.createElement("div");
      host.appendChild(inner);
      playerRef.current = new window.YT.Player(inner, {
        videoId: VIDEO_ID,
        width: "1",
        height: "1",
        playerVars: {
          autoplay: 1, // allowed because we start muted
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: VIDEO_ID, // loop requires the video id in playlist
        },
        events: {
          onReady: () => {
            const p = playerRef.current;
            if (!p) return;
            p.setVolume(45);
            p.mute(); // muted until the user gesture
            setReady(true);
            if (shouldPlayRef.current) {
              p.unMute();
              p.setVolume(45);
              p.playVideo();
              setMuted(false);
            }
          },
          onStateChange: (e: { data: number }) => {
            const PLAYING = window.YT?.PlayerState.PLAYING ?? 1;
            setPlaying(e.data === PLAYING);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      buildPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        buildPlayer();
      };
      // Load the API script if not already present.
      if (!document.querySelector("script[data-yt-api]")) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        tag.setAttribute("data-yt-api", "");
        document.head.appendChild(tag);
      }
    }

    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      if (host.parentNode) {
        host.parentNode.removeChild(host);
      }
    };
  }, []);

  // Attempt playback once unlocked and ready (for the case where the guest
  // taps Begin after the player has already signalled ready). Mirroring the
  // external player's unmuted state into React here is intentional — this
  // effect syncs the YouTube IFrame (external system) with component state.
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !shouldPlay || !ready) return;
    try {
      p.unMute();
      p.setVolume(45);
      p.playVideo();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMuted(false);
    } catch {
      /* player not quite ready */
    }
  }, [shouldPlay, ready]);

  const unlock = useCallback(() => setShouldPlay(true), []);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    setMuted((wasMuted) => {
      if (wasMuted) {
        p.unMute();
        p.setVolume(45);
        p.playVideo();
        return false;
      }
      p.mute();
      return true;
    });
  }, []);

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
