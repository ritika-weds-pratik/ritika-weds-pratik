"use client";

/**
 * Decorative concentric mandala — a layered radial SVG with lotus petals,
 * used as a sacred backdrop behind the Ganesha section and as ornamental
 * flourishes elsewhere. Strokes use currentColor so callers tint via text color.
 */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 });
  const innerPetals = Array.from({ length: 12 });
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      className={className}
      role="presentation"
      aria-hidden
    >
      <g stroke="#d4af7a">
        {/* Outer rings */}
        <circle cx="100" cy="100" r="98" strokeWidth="0.6" opacity="0.5" />
        <circle cx="100" cy="100" r="86" strokeWidth="0.4" opacity="0.4" />
        <circle cx="100" cy="100" r="64" strokeWidth="0.5" opacity="0.5" />
        <circle cx="100" cy="100" r="42" strokeWidth="0.4" opacity="0.4" />
        <circle cx="100" cy="100" r="22" strokeWidth="0.6" opacity="0.6" />

        {/* Outer lotus petals */}
        <g opacity="0.55">
          {petals.map((_, i) => {
            const a = (i / petals.length) * Math.PI * 2;
            return (
              <path
                key={`o-${i}`}
                d={`M100,14 Q${100 + Math.sin(a) * 10},${36 - Math.cos(a) * 4} 100,36 Q${100 - Math.sin(a) * 10},${36 - Math.cos(a) * 4} 100,14`}
                transform={`rotate(${(i / petals.length) * 360} 100 100)`}
                strokeWidth="0.5"
              />
            );
          })}
        </g>

        {/* Mid petals (offset) */}
        <g opacity="0.5">
          {innerPetals.map((_, i) => {
            const rot = (i / innerPetals.length) * 360;
            return (
              <path
                key={`m-${i}`}
                d="M100,42 Q104,62 100,78 Q96,62 100,42 Z"
                transform={`rotate(${rot} 100 100)`}
                strokeWidth="0.4"
              />
            );
          })}
        </g>

        {/* Radial spokes */}
        <g opacity="0.35">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={`s-${i}`}
              x1="100"
              y1="44"
              x2="100"
              y2="86"
              strokeWidth="0.3"
              transform={`rotate(${(i / 24) * 360} 100 100)`}
            />
          ))}
        </g>

        <circle cx="100" cy="100" r="8" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
