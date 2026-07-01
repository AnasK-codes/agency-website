"use client";

import { useRef } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";
import { TextGenerateEffect } from "./TextGenerateEffect";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
          <div className="text-center md:text-left space-y-4 md:space-y-6">
            <div style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}>
              <TextGenerateEffect
                words="Let's create something extraordinary."
                className="text-4xl md:text-6xl leading-tight"
              />
            </div>
            <p className="text-lg md:text-xl max-w-md mx-auto md:mx-0" style={{ color: "#A09890" }}>
              Have a project in mind? Whether you need a bespoke website, a brand refresh, or a full digital transformation — we&apos;re ready to build something unforgettable.
            </p>
          </div>
          <MagneticButton
            intensity={0.3}
            onClick={() => {
              window.location.href = "mailto:mavenstudio.hello@gmail.com";
            }}
            className="group px-6 py-4 sm:px-8 sm:py-5 rounded-full text-sm sm:text-base md:text-lg font-bold inline-flex items-center justify-center cursor-none mt-8 max-w-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(255,77,0,0.6)]"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              background: "#FF4D00",
              color: "#F5F0EB",
              boxShadow: "0 0 40px rgba(255, 77, 0, 0.45), 0 0 80px rgba(255, 77, 0, 0.12)",
            }}
          >
            <EnvelopeSimple weight="bold" className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
            <span className="truncate tracking-wide">mavenstudio.hello@gmail.com</span>
          </MagneticButton>
        </div>

        {/* Meta info */}
        <div
          className="flex flex-col items-start md:items-end gap-2 text-sm"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#504840" }}
        >
          <span>© 2026 Maven Studio LLC.</span>
          <span>Designing the unreasonable.</span>
          <div
            className="mt-4 w-12 h-[1px]"
            style={{ background: "rgba(255, 77, 0, 0.25)" }}
          />
        </div>
      </div>

      {/* Parallax background wordmark — clamped for ultrawide */}
      <div
        ref={textRef}
        className="absolute top-[25%] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none text-[clamp(2rem,11vw,24rem)] font-bold tracking-[-0.055em]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "rgba(255, 77, 0, 0.04)",
        }}
      >
        MAVEN STUDIO
      </div>
    </footer>
  );
}
