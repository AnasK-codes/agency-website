"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";

const philosophyText =
  "We do not build templates. We engineer digital experiences that defy the generic, utilizing advanced mathematics, physics, and design engineering to elevate brands into a completely different stratosphere of the internet.";

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const words = textRef.current.querySelectorAll(".word-reveal");
    const mm = gsap.matchMedia();

    // Desktop: pinned word-by-word reveal
    mm.add("(min-width: 768px)", () => {
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
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        }
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
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="min-h-[100dvh] px-6 md:px-16 lg:px-24 w-full flex justify-center items-center"
    >
      <div className="max-w-[1560px] w-full mx-auto">
        <div className="max-w-5xl">
          {/* Label */}
          <div className="flex items-center gap-3 mb-12">
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
            {philosophyText.split(" ").map((word, i) => (
              <span
                key={i}
                className="word-reveal"
                style={{ color: "rgba(245, 240, 235, 0.1)" }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
