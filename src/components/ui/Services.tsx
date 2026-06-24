"use client";

import { useRef, useEffect } from "react";
import { Sparkle, Palette, Code } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

const services = [
  {
    icon: Palette,
    number: "01",
    title: "Bespoke Web Design",
    body: "Forget templates. Every layout, color, and interaction is crafted from scratch to reflect your brand's unique voice — and engineered to convert your ideal clients on first sight.",
    label: "UI/UX DESIGN",
    hoverBorderColor: "rgba(255, 77, 0, 0.5)",
  },
  {
    icon: Code,
    number: "02",
    title: "High-Performance Development",
    body: "We engineer your designs into lightning-fast, accessible web applications. Built on Next.js with pixel-perfect attention to Core Web Vitals — beautiful on every device, flawless on every screen size.",
    label: "FRONTEND DEV",
    hoverBorderColor: "rgba(20, 184, 166, 0.5)",
  },
  {
    icon: Sparkle,
    number: "03",
    title: "Brand & Motion Design",
    body: "A great website is more than screens — it's a feeling. We craft your visual identity, design system, and micro-interactions so every touchpoint feels cohesive, premium, and unmistakably alive.",
    label: "BRAND + MOTION",
    hoverBorderColor: "rgba(255, 77, 0, 0.5)",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger will be used for revealing items.
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".service-item",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-32 px-6 md:px-16 lg:px-24 max-w-[1560px] mx-auto w-full border-t"
      style={{ borderColor: "rgba(255, 77, 0, 0.1)" }}
    >
      {/* Header */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
          >
            [ What We Do ]
          </span>
        </div>
        <h2
          className="text-4xl md:text-6xl font-bold tracking-[-0.055em]"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
        >
          Our Capabilities
        </h2>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.number}
              className="service-item group relative pt-8 border-t transition-all duration-500"
              style={{ borderColor: "rgba(255, 77, 0, 0.1)" }}
            >
              <Icon
                weight="duotone"
                className="w-10 h-10 mb-6 transition-colors duration-500"
                style={{ color: "rgba(255, 77, 0, 0.5)" }}
              />
              <h3
                className="text-2xl font-bold mb-4 tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
              >
                {service.title}
              </h3>
              <p
                className="leading-[1.72] mb-6"
                style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
              >
                {service.body}
              </p>
              <div
                className="text-xs uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#504840" }}
              >
                {service.number} {"//"} {service.label}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
