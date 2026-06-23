"use client";

/**
 * Stylized Indian royal palace skyline — domes, chhatris, minarets.
 * Used as the backdrop for the splash loader and grand finale.
 * Pure inline SVG, tinted with currentColor / opacity for depth.
 */
export function PalaceSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      role="presentation"
      aria-hidden
    >
      <defs>
        <linearGradient id="palaceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1330" stopOpacity="0" />
          <stop offset="60%" stopColor="#0a0814" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#020308" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Far minarets */}
      <g fill="#0a0814" opacity="0.6">
        <path d="M120 320 L120 200 L114 196 L114 150 L126 150 L126 196 L120 200 Z" />
        <circle cx="120" cy="146" r="6" />
        <path d="M1080 320 L1080 210 L1074 206 L1074 165 L1086 165 L1086 206 L1080 210 Z" />
        <circle cx="1080" cy="161" r="5" />
      </g>

      {/* Main palace block */}
      <g fill="#0c0a1c">
        {/* Left wing */}
        <rect x="300" y="220" width="150" height="100" />
        <path d="M300 220 Q375 150 450 220 Z" />
        <rect x="350" y="170" width="18" height="50" />
        <circle cx="359" cy="166" r="11" />

        {/* Right wing */}
        <rect x="750" y="220" width="150" height="100" />
        <path d="M750 220 Q825 150 900 220 Z" />
        <rect x="832" y="170" width="18" height="50" />
        <circle cx="841" cy="166" r="11" />

        {/* Central dome structure */}
        <rect x="480" y="190" width="240" height="130" />
        {/* Grand central onion dome */}
        <path d="M470 200 Q600 20 730 200 Q700 120 600 110 Q500 120 470 200 Z" />
        <rect x="592" y="60" width="16" height="55" />
        <circle cx="600" cy="56" r="12" />
        <path d="M600 30 L606 44 L600 38 L594 44 Z" />

        {/* Side chhatris (small domes) */}
        <path d="M450 200 Q495 150 540 200 Z" />
        <rect x="528" y="160" width="10" height="42" />
        <circle cx="533" cy="156" r="7" />
        <path d="M660 200 Q705 150 750 200 Z" />
        <rect x="662" y="160" width="10" height="42" />
        <circle cx="667" cy="156" r="7" />

        {/* Arched gate glow opening */}
        <path d="M560 320 L560 270 Q600 230 640 270 L640 320 Z" fill="#06040f" />
      </g>

      {/* Foreground arches / jali */}
      <g fill="#04030a" opacity="0.9">
        <rect x="0" y="270" width="1200" height="50" />
      </g>

      {/* Tint overlay */}
      <rect x="0" y="0" width="1200" height="320" fill="url(#palaceGrad)" />
    </svg>
  );
}
