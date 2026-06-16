"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ── Canvas-based particle system ─────────────────────────────────────────────
// Drawing to a canvas never forces layout/reflow. One composited layer,
// zero DOM mutations after mount.
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;   // 0-1, fades to 0
  size: number;
}

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafId     = useRef<number>(0);
  const prevPos   = useRef({ x: -200, y: -200 });

  // ── Particle RAF loop (canvas only — no DOM writes) ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0.01);

      for (const p of particles.current) {
        p.x    += p.vx;
        p.y    += p.vy;
        p.vx   *= 0.92;
        p.vy   *= 0.92;
        p.life *= 0.88;

        ctx.globalAlpha = p.life;
        ctx.fillStyle   = "#FF4D00";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Cursor GSAP + interaction logic ─────────────────────────────────────
  useEffect(() => {
    document.body.style.cursor = "none";

    const xDot  = gsap.quickTo(dotRef.current,  "x", { duration: 0.15, ease: "power3.out" });
    const yDot  = gsap.quickTo(dotRef.current,  "y", { duration: 0.15, ease: "power3.out" });
    const xRing = gsap.quickTo(ringRef.current, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ringRef.current, "y", { duration: 0.55, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevPos.current = { x: e.clientX, y: e.clientY };

      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      // Squish ring in direction of travel
      const angle  = Math.atan2(dy, dx) * (180 / Math.PI);
      const squish = Math.min(speed * 0.035, 0.3);
      gsap.to(ringRef.current, {
        scaleX:   1 + squish,
        scaleY:   1 - squish * 0.5,
        rotation: angle,
        duration: 0.12,
        ease:     "power2.out",
      });

      // Emit canvas particle only on fast movement — pure 2D draw, zero DOM cost
      if (speed > 10) {
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x:    e.clientX + (Math.random() - 0.5) * 4,
            y:    e.clientY + (Math.random() - 0.5) * 4,
            vx:   (Math.random() - 0.5) * 3,
            vy:   (Math.random() - 0.5) * 3,
            life: 0.9 + Math.random() * 0.1,
            size: 2 + Math.random() * 2,
          });
        }
        // Hard cap so the array never grows unbounded
        if (particles.current.length > 60) {
          particles.current = particles.current.slice(-60);
        }
      }
    };

    // Use mouseover for interactive detection (fires less often than mousemove)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".service-item") ||
        target.closest(".magnetic-target");

      if (isClickable) {
        gsap.to(dotRef.current,  { scale: 0, duration: 0.2, ease: "power2.in" });
        gsap.to(ringRef.current, {
          scale: 2.5, borderColor: "#14B8A6",
          duration: 0.35, ease: "expo.out",
        });
      } else {
        gsap.to(dotRef.current,  { scale: 1, duration: 0.3, ease: "back.out(2)" });
        gsap.to(ringRef.current, {
          scale: 1, scaleX: 1, scaleY: 1,
          borderColor: "rgba(255,77,0,0.55)",
          duration: 0.35, ease: "expo.out",
        });
      }
    };

    const handleMouseLeave = () =>
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.25 });
    const handleMouseEnter = () =>
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.25 });

    const handleMouseDown = () => {
      gsap.to(ringRef.current, { scale: 0.72, duration: 0.1,  ease: "power3.in" });
      gsap.to(dotRef.current,  { scale: 1.8,  duration: 0.1,  ease: "power3.in" });
    };
    const handleMouseUp = () => {
      gsap.to(ringRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
      gsap.to(dotRef.current,  { scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
    };

    window.addEventListener("mousemove",  onMouseMove, { passive: true });
    window.addEventListener("mouseover",  handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown",  handleMouseDown);
    window.addEventListener("mouseup",    handleMouseUp);

    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseover",  handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown",  handleMouseDown);
      window.removeEventListener("mouseup",    handleMouseUp);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `*, a, button, input, [role='button'] { cursor: none !important; }`
      }} />

      {/* Particle canvas — one composited layer, never causes reflow */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none hidden md:block"
        style={{ zIndex: 9997 }}
      />

      {/* Inner ember dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#FF4D00",
          boxShadow: "0 0 8px rgba(255,77,0,0.8), 0 0 18px rgba(255,77,0,0.35)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />

      {/* Outer morphing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(255,77,0,0.55)",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          mixBlendMode: "plus-lighter",
        }}
      />
    </>
  );
}
