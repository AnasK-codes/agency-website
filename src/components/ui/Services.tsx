"use client";

import { useRef, useState, useEffect } from "react";
import { Sparkle, Palette, Code } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import Image from "next/image";

const services = [
  {
    icon: Palette,
    number: "01",
    title: "Aesthetic Direction",
    body: "Establishing distinctive visual languages that reject templated norms. We craft bespoke brand identities that command attention.",
    label: "UI/UX DESIGN",
    hoverBorderColor: "rgba(255, 77, 0, 0.5)",
    image: "/service-1.png",
  },
  {
    icon: Code,
    number: "02",
    title: "Design Engineering",
    body: "Bridging the gap between static design and interactive reality. We write performant, robust code that brings motion to life.",
    label: "FRONTEND DEV",
    hoverBorderColor: "rgba(20, 184, 166, 0.5)",
    image: "/service-2.png",
  },
  {
    icon: Sparkle,
    number: "03",
    title: "Motion & Interaction",
    body: "Fluid, physics-based micro-interactions that make interfaces feel tactile, responsive, and genuinely premium.",
    label: "CHOREOGRAPHY",
    hoverBorderColor: "rgba(255, 77, 0, 0.5)",
    image: "/service-3.png",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);
  const [hasHoverCapability] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(hover: hover)").matches;
    }
    return true;
  });

  useEffect(() => {

    // H-02: Only attach mousemove on devices with a fine pointer
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const container = containerRef.current;
    if (!hasHover || !container) return;

    const xTo = gsap.quickTo(imageWrapperRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(imageWrapperRef.current, "y", { duration: 0.5, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => container.removeEventListener("mousemove", onMouseMove);
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
              className="service-item group relative pt-8 border-t cursor-none transition-all duration-500"
              style={{ borderColor: "rgba(255, 77, 0, 0.1)" }}
              onMouseEnter={(e) => {
                if (!hasHoverCapability) return;
                setActiveService(service);
                (e.currentTarget as HTMLElement).style.borderColor = service.hoverBorderColor;
              }}
              onMouseLeave={(e) => {
                if (!hasHoverCapability) return;
                setActiveService(null);
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 77, 0, 0.1)";
              }}
            >
              <Icon
                weight="duotone"
                className="w-10 h-10 mb-6 transition-colors duration-500"
                style={{ color: "#504840" }}
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

      {/* Floating hover image */}
      <div
        ref={imageWrapperRef}
        className={`fixed top-0 left-0 w-72 h-[22rem] pointer-events-none z-40 rounded-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out hidden md:block ${
          activeService ? "opacity-100 scale-100 rotate-2" : "opacity-0 scale-90 -rotate-2"
        }`}
        style={{
          border: "1px solid rgba(255, 77, 0, 0.2)",
          boxShadow: "0 20px 60px rgba(255, 77, 0, 0.16)",
        }}
      >
        {activeService && (
          <Image
            src={activeService.image}
            alt="Service preview"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}
