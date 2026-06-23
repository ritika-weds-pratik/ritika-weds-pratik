"use client";

import type { ReactNode } from "react";

/**
 * Royal picture frame with a Mughal-arch top, gold foil border and corner
 * flourishes. Used for couple portraits, family cards and gallery items.
 * Children sit inside; pass an optional `tint` to vary the gold warmth.
 */
export function OrnamentalFrame({
  children,
  className,
  tint = "#d4af7a",
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Outer arched border */}
      <div
        className="relative overflow-hidden rounded-[2rem] rounded-t-[6rem] border p-[3px]"
        style={{
          borderColor: `${tint}66`,
          background: `linear-gradient(160deg, ${tint}40, transparent 40%, ${tint}30)`,
          boxShadow: `0 25px 60px rgba(0,0,0,0.45), inset 0 0 30px ${tint}14`,
        }}
      >
        {/* Inner border */}
        <div
          className="relative overflow-hidden rounded-[1.9rem] rounded-t-[5.7rem] border"
          style={{ borderColor: `${tint}33` }}
        >
          {children}
        </div>
      </div>

      {/* Corner flourishes */}
      {[
        "left-2 top-2 border-l border-t",
        "right-2 top-2 border-r border-t",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute ${pos} h-6 w-6 rounded-[2px]`}
          style={{ borderColor: `${tint}88` }}
        />
      ))}
    </div>
  );
}
