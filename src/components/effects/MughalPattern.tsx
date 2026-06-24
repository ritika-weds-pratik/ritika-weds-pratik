"use client";

/**
 * Low-opacity Mughal/Jaipuri-inspired pattern texture overlay. Pure CSS via
 * layered repeating gradients — no image asset. Adds heritage richness to
 * section backgrounds without distracting from content.
 */
export function MughalPattern({
  className,
  opacity = 0.05,
}: {
  className?: string;
  /** 0–1 base opacity of the pattern. */
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      aria-hidden
      style={{
        opacity,
        backgroundImage: [
          // Large lattice diamonds
          "repeating-linear-gradient(45deg, transparent 0 28px, rgba(212,175,122,0.5) 28px 29px), repeating-linear-gradient(-45deg, transparent 0 28px, rgba(212,175,122,0.5) 28px 29px)",
          // Finer grid overlay
          "repeating-linear-gradient(0deg, transparent 0 56px, rgba(240,217,168,0.35) 56px 57px), repeating-linear-gradient(90deg, transparent 0 56px, rgba(240,217,168,0.35) 56px 57px)",
        ].join(", "),
        backgroundSize: "80px 80px, 80px 80px, 112px 112px, 112px 112px",
      }}
    />
  );
}
