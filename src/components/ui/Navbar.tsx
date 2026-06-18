"use client";

import { useRef } from "react";
import { Sparkle } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to(navRef.current, {
      paddingTop: "0.625rem",
      paddingBottom: "0.625rem",
      scale: 0.98,
      scrollTrigger: {
        trigger: "body",
        start: "top -50",
        end: "top -200",
        scrub: 0.5,
      },
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
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
              const target = document.querySelector(`#${label.toLowerCase()}`);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0EB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A09890")}
            className="transition-colors duration-300 relative group"
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
