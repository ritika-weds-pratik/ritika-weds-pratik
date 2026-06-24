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
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af7a]/40 bg-[linear-gradient(145deg,rgba(11,16,39,0.8),rgba(6,9,20,0.9))] shadow-[0_0_15px_rgba(212,175,122,0.15)] text-[#f0d9a8] backdrop-blur-md transition-all hover:border-[#d4af7a]/80 hover:shadow-[0_0_25px_rgba(212,175,122,0.3)] ${className ?? ""}`}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,122,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {muted || !playing ? (
        <VolumeX className="h-4 w-4 relative z-10 transition-colors group-hover:text-[#fff1be]" />
      ) : (
        <motion.span
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-[#c9a24a]"
        >
          {/* Subtle pulse ring when playing */}
          <span className="absolute inset-0 -m-1 rounded-full border border-[#d4af7a]/30 animate-[ping_3s_ease-in-out_infinite]" />
          <Volume2 className="h-4 w-4 transition-colors group-hover:text-[#fff1be]" />
        </motion.span>
      )}
    </motion.button>
  );
}
