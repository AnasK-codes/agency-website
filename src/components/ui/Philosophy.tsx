"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

const philosophyText =
  "We don't build websites — we craft digital experiences. Editorial aesthetics, fluid motion, and precision engineering, combined to create something your audience will never forget. No templates. No compromises. Just results.";

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !containerRef.current) return;

      const words = textRef.current.querySelectorAll(".word-reveal");
      const mm = gsap.matchMedia();

      // Desktop: pinned word-by-word reveal + upward scroll to expose overflow
      mm.add("(min-width: 768px)", () => {
        const SCROLL_END = "+=200%";

        // Word colour reveal
        gsap.fromTo(
          words,
          { color: "rgba(245, 240, 235, 0.1)" },
          {
            color: "#F5F0EB",
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: SCROLL_END,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          },
        );

        // Scroll text block upward so any overflow below the fold enters view
        gsap.fromTo(
          textRef.current,
          { y: 0 },
          {
            y: () => {
              const textH = textRef.current!.offsetHeight;
              // 80px pt-20 top padding + ~50px label row = ~130px occupied above text
              const available = window.innerHeight - 130;
              return -Math.max(0, textH - available);
            },
            ease: "none",
            invalidateOnRefresh: true,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: SCROLL_END,
              scrub: 1,
            },
          },
        );
      });

      // Mobile: simpler scroll-reveal without pinning — no trapped scroll
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          words,
          { color: "rgba(245, 240, 235, 0.1)" },
          {
            color: "#F5F0EB",
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative min-h-[100dvh] pt-32 md:pt-30 px-6 md:px-16 lg:px-24 w-full flex justify-center items-start overflow-hidden"
    >
      <div className="max-w-[1560px] w-full mx-auto">
        <div className="max-w-5xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
            <h2
              className="text-xs uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                color: "#14B8A6",
              }}
            >
              [ The Philosophy ]
            </h2>
          </div>

          {/* Word-by-word reveal text */}
          <p
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.05em] leading-[1.05]"
            style={{
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            <span className="sr-only">{philosophyText}</span>
            <span aria-hidden="true">
              {philosophyText.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="word-reveal"
                  style={{ color: "rgba(245, 240, 235, 0.1)" }}
                >
                  {word}{" "}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
