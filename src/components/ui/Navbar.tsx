"use client";

import { useRef } from "react";
import { Sparkle } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: subtle scale and translateY
    mm.add("(min-width: 768px)", () => {
      gsap.to(navRef.current, {
        y: -4,
        scale: 0.96,
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top -50",
          end: "top -200",
          scrub: 0.5,
        },
      });
    });

    // Mobile: just shrink padding, skip scale to avoid sub-pixel artifacts
    mm.add("(max-width: 767px)", () => {
      gsap.to(navRef.current, {
        y: -2,
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top -20",
          end: "top -100",
          scrub: 0.5,
        },
      });
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full border border-white/10 bg-[#080807]/60 backdrop-blur-lg shadow-2xl"
    >
      {/* Logo Container */}
      <div className="flex-1 flex items-center">
        <div
          className="flex items-center gap-2 font-bold tracking-[-0.04em] text-lg"
          style={{ color: "#F5F0EB", fontFamily: "var(--font-space-grotesk)" }}
        >
          <Sparkle
            weight="fill"
            className="w-5 h-5"
            style={{ color: "#FF4D00" }}
          />
          <span>SICKN33</span>
        </div>
      </div>

      {/* Nav links */}
      <div
        className="hidden md:flex items-center justify-center gap-10 text-sm font-medium tracking-wide"
        style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
      >
        {(["Philosophy", "Work", "Services"] as const).map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              // Attempt to use window.Lenis if exposed globally, or fallback to native scrolling
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const lenisInstance = (window as any).lenis;
              if (lenisInstance) {
                lenisInstance.scrollTo(`#${label.toLowerCase()}`);
              } else {
                const target = document.querySelector(`#${label.toLowerCase()}`);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="nav-link transition-colors duration-300 relative group"
            style={{ color: "#A09890" }}
          >
            {label}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#FF4D00] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Right spacer for centering */}
      <div className="flex-1 hidden md:block" />
    </nav>
  );
}
