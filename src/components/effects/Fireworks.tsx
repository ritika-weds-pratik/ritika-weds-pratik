"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
};

type Rocket = {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
  exploded: boolean;
};

const COLORS = ["#f0d9a8", "#c9a24a", "#e8939f", "#e74c3c", "#fff7d9", "#d4af7a"];

/**
 * Lightweight canvas fireworks for the grand finale. Rockets rise and burst
 * into gravity-affected particle showers. Paused when off-screen and fully
 * disabled for reduced-motion users (a static starfield is shown instead).
 */
export function Fireworks({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const spawnRocket = () => {
      const x = Math.random() * canvas.offsetWidth;
      const targetY = canvas.offsetHeight * (0.15 + Math.random() * 0.35);
      rockets.push({
        x,
        y: canvas.offsetHeight,
        vy: -(7 + Math.random() * 3),
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        exploded: false,
      });
    };

    const burst = (rocket: Rocket) => {
      const count = 46 + Math.floor(Math.random() * 24);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3.5;
        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 30,
          color: Math.random() > 0.3 ? rocket.color : COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    let raf = 0;
    let lastSpawn = 0;
    const tick = (t: number) => {
      ctx.fillStyle = "rgba(5,6,16,0.22)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (t - lastSpawn > 700 + Math.random() * 500) {
        spawnRocket();
        lastSpawn = t;
      }

      // Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(r.x - 1.5, r.y - 4, 3, 6);
        ctx.shadowBlur = 0;
        if (r.y <= r.targetY) {
          burst(r);
          rockets.splice(i, 1);
        }
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.vy += 0.04; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", resize);

    if (reduced) {
      // Static faint starfield instead of animated fireworks.
      ctx.fillStyle = "rgba(5,6,16,1)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (let i = 0; i < 60; i++) {
        ctx.globalAlpha = Math.random() * 0.6;
        ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.offsetWidth,
          Math.random() * canvas.offsetHeight,
          1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    />
  );
}
