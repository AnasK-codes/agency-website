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
      {/* Logo */}
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

      {/* Nav links */}
      <div
        className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide"
        style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
      >
        {(["Work", "Studio", "Services"] as const).map((label) => (
          <Link
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{ color: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F0EB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A09890")}
            className="transition-colors duration-300"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <MagneticButton
        intensity={0.2}
        className="px-6 py-2.5 text-sm font-semibold rounded-full cursor-none"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          background: "#FF4D00",
          color: "#F5F0EB",
          boxShadow: "0 0 22px rgba(255, 77, 0, 0.45)",
        }}
      >
        Start Project
      </MagneticButton>
    </nav>
  );
}
