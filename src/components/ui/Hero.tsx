"use client";

import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import Grainient from "@/components/Grainient";
import { ShaderAnimation } from "./ShaderAnimation";
import ShinyText from "./ShinyText";
import CircularText from "./CircularText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const lineVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 40 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: { type: "spring", stiffness: 75, damping: 16 },
  },
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
        <div className="absolute inset-0 w-full h-full opacity-55 mix-blend-screen">
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
            >
              Design Engineering Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col mb-10"
          >
            <div className="overflow-hidden pb-4">
              <motion.h1
                variants={lineVariants}
                className="text-[clamp(3.5rem,9vw,9rem)] font-bold leading-[0.86] tracking-[-0.055em] pb-2"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
              >
                We Engineer
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-4">
              <motion.h1
                variants={lineVariants}
                className="text-[clamp(3.5rem,9vw,9rem)] font-bold leading-[0.86] tracking-[-0.055em] pb-2"
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
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
            className="text-lg md:text-xl max-w-xl leading-[1.72] mb-14"
            style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
          >
            By merging uncompromising aesthetics with relentless performance, we
            build digital platforms that outlast trends and command attention.
          </motion.p>

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
