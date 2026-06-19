"use client";

import { gsap, useGSAP } from "@/lib/gsapConfig";

import { useRef } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import Grainient from "@/components/Grainient";
import { ShaderAnimation } from "./ShaderAnimation";
import ShinyText from "./ShinyText";
import CircularText from "./CircularText";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial Load Animation replacing Framer Motion
    gsap.fromTo(
      ".hero-text-line",
      { y: 40, clipPath: "inset(100% 0 -20% 0)" },
      { y: 0, clipPath: "inset(0% 0 -20% 0)", duration: 1, stagger: 0.12, ease: "power3.out" }
    );
    
    gsap.fromTo(
      ".hero-fade-in",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hero-fade-up",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.55, ease: "power2.out" }
    );

    const mm = gsap.matchMedia();

    // Desktop: full parallax
    mm.add("(min-width: 768px)", () => {
      gsap.to(parallaxRef.current, {
        y: -180,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Mobile: subtler parallax to avoid jarring acceleration
    mm.add("(max-width: 767px)", () => {
      gsap.to(parallaxRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-start pt-24 pb-12 px-6 md:px-16 lg:px-24 overflow-hidden border-b"
      style={{ borderColor: "rgba(255, 77, 0, 0.1)", background: "#080807" }}
    >
      {/* Background atmosphere — layered Grainient + Shader */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Layer 1: Grainient — warm ember fog base */}
        <div className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen">
          <Grainient
            color1="#FF4D00"
            color2="#7C2D00"
            color3="#1A0800"
            timeSpeed={0.12}
            colorBalance={0}
            warpStrength={0.7}
            warpFrequency={3.5}
            warpSpeed={1.2}
            warpAmplitude={35}
            blendAngle={30}
            blendSoftness={0.1}
            rotationAmount={250}
            noiseScale={2}
            grainAmount={0.07}
            grainScale={2}
            grainAnimated={false}
            contrast={1.2}
            gamma={1}
            saturation={1.1}
            centerX={0}
            centerY={0}
            zoom={1.05}
          />
        </div>

        {/* Layer 2: ShaderAnimation — ember interference rings on top */}
        {/* H-06: Hidden on mobile — two WebGL contexts melt mobile GPUs */}
        <div className="absolute inset-0 w-full h-full opacity-55 mix-blend-screen hidden md:block">
          <ShaderAnimation />
        </div>

        {/* Structural grid guides */}
        <div
          className="absolute top-0 bottom-0 left-[50%] w-[1px]"
          style={{ background: "rgba(255,255,255,0.025)" }}
        />
        <div
          className="absolute top-[50%] left-0 right-0 h-[1px]"
          style={{ background: "rgba(255,255,255,0.025)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1560px] w-full mx-auto flex flex-col justify-center items-start">
        <div ref={parallaxRef} className="flex flex-col items-start pt-16 lg:pt-0">

          {/* Label */}
          <div className="flex items-center gap-3 mb-10 hero-fade-in">
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
            >
              Design Engineering Studio
            </span>
          </div>

          {/* Headline */}
          <h1 className="flex flex-col mb-10">
            <div className="overflow-hidden pb-4 pt-2">
              <span
                className="hero-text-line block text-[clamp(3.5rem,9vw,9rem)] font-bold leading-none tracking-[-0.055em] pb-6"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
              >
                We Engineer
              </span>
            </div>
            <div className="overflow-hidden pb-4">
              <span
                className="hero-text-line block text-[clamp(3.5rem,9vw,9rem)] font-bold leading-none tracking-[-0.055em] pb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <ShinyText
                  text="Digital Excellence."
                  className="pr-2"
                  speed={2.5}
                  color="#F5F0EB"
                  shineColor="#FF4D00"
                  spread={120}
                  direction="left"
                  yoyo={true}
                  pauseOnHover={false}
                />
              </span>
            </div>
          </h1>

          {/* Subtext */}
          <p
            className="hero-fade-up text-lg md:text-xl max-w-xl leading-[1.72] mb-14"
            style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
          >
            By merging uncompromising aesthetics with relentless performance, we
            build digital platforms that outlast trends and command attention.
          </p>

        </div>
      </div>

      {/* Scroll to Explore indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center justify-center">
        <CircularText
          text="SCROLL*TO*EXPLORE*SCROLL*TO*EXPLORE*"
          onHover="speedUp"
          spinDuration={20}
          className="opacity-70 hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#14B8A6]">
          <ArrowDown weight="thin" className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
}
