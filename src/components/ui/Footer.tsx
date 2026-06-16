"use client";

import { useRef } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { y: 180 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="py-28 px-6 md:px-16 lg:px-24 border-t relative overflow-hidden"
      style={{
        background: "#111110",
        borderColor: "rgba(255, 77, 0, 0.1)",
      }}
    >
      {/* Ambient ember glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255, 77, 0, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1560px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between relative z-10 gap-12">
        {/* CTA block */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
            >
              [ Get In Touch ]
            </span>
          </div>
          <h2
            className="text-5xl md:text-8xl font-bold tracking-[-0.055em] leading-[0.86] mb-10"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
          >
            Let's Talk.
          </h2>
          <MagneticButton
            intensity={0.3}
            className="px-8 py-4 gap-3 rounded-full text-lg font-semibold inline-flex items-center cursor-none"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              background: "#FF4D00",
              color: "#F5F0EB",
              boxShadow: "0 0 40px rgba(255, 77, 0, 0.45), 0 0 80px rgba(255, 77, 0, 0.12)",
            }}
          >
            <EnvelopeSimple weight="bold" className="w-5 h-5" />
            hello@sickn33.com
          </MagneticButton>
        </div>

        {/* Meta info */}
        <div
          className="flex flex-col items-start md:items-end gap-2 text-sm"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#504840" }}
        >
          <span>© 2026 SICKN33 LLC.</span>
          <span>All systems nominal.</span>
          <div
            className="mt-4 w-12 h-[1px]"
            style={{ background: "rgba(255, 77, 0, 0.25)" }}
          />
        </div>
      </div>

      {/* Parallax background wordmark */}
      <div
        ref={textRef}
        className="absolute top-[25%] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none text-[14vw] font-bold tracking-[-0.055em]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "rgba(255, 77, 0, 0.04)",
        }}
      >
        SICKN33
      </div>
    </footer>
  );
}
