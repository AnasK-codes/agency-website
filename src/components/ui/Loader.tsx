"use client";

import { gsap, useGSAP } from "@/lib/gsapConfig";
import { useRef } from "react";

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    document.body.style.overflow = "hidden";

    // A11y: Prevent keyboard from tabbing into the hidden page content
    const mainContent = document.querySelector("main");
    if (mainContent) mainContent.inert = true;

    const tl = gsap.timeline({
      onComplete: () => {
        // Use "" to reset to stylesheet default rather than "auto",
        // which could conflict with Lenis's scroll management.
        document.body.style.overflow = "";
        if (mainContent) mainContent.inert = false;
      },
    });

    const obj = { val: 0 };

    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power3.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(obj.val).toString();
        }
        if (barRef.current) {
          barRef.current.style.width = `${Math.round(obj.val)}%`;
        }
      },
    })
    .to(textRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.3")
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1.4,
      ease: "power4.inOut",
    }, "+=0.05");

    // Safety: always restore scroll in case the component unmounts early
    return () => { document.body.style.overflow = ""; };
  }, { scope: loaderRef });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-start justify-end p-8 md:p-16"
      style={{ background: "#080807" }}
    >
      {/* Ember ambient glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255, 77, 0, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div ref={textRef} className="relative z-10 w-full">
        {/* Counter */}
        <div className="flex items-baseline gap-2 mb-6">
          <div
            ref={counterRef}
            className="text-[20vw] md:text-[14vw] font-bold tracking-[-0.055em] leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
          >
            0
          </div>
          <div
            className="text-[6vw] md:text-[4vw] font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#FF4D00" }}
          >
            %
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-[1px] mb-6"
          style={{ background: "rgba(255, 77, 0, 0.1)" }}
        >
          <div
            ref={barRef}
            className="h-full transition-none"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, #FF4D00, #FF7A3D)",
              boxShadow: "0 0 14px rgba(255, 77, 0, 0.8)",
            }}
          />
        </div>

        {/* Label */}
        <div
          className="text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#504840" }}
        >
          Loading Assets
        </div>
      </div>

      {/* Studio name bottom right */}
      <div
        className="absolute bottom-8 right-8 md:right-16 text-xs uppercase tracking-[0.3em]"
        style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#504840" }}
      >
        SICKN33 Studio
      </div>
    </div>
  );
}
