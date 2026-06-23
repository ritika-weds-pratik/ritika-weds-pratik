"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";

/**
 * Persistent mute/unmute control. Shown in the navbar once audio has
 * been unlocked by the entry experience.
 */
export function MuteToggle({ className }: { className?: string }) {
  const { muted, toggleMute, playing } = useAudio();

  return (
    <motion.button
      type="button"
      onClick={toggleMute}
      whileTap={{ scale: 0.9 }}
      aria-pressed={muted}
      aria-label={muted ? "Unmute ambient music" : "Mute ambient music"}
      title={muted ? "Unmute music" : "Mute music"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#0b1027]/60 text-[#f0d9a8] backdrop-blur-sm transition hover:bg-[#0b1027]/80 ${className ?? ""}`}
    >
      {muted || !playing ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Volume2 className="h-4 w-4" />
        </motion.span>
      )}
    </motion.button>
  );
}
