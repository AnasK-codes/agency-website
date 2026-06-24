"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    body: "We immerse ourselves in your brand, your audience, and your goals. Before a single wireframe exists, we define a creative brief that ensures every design decision has a clear purpose and a measurable outcome.",
  },
  {
    number: "02",
    title: "Design & Prototype",
    body: "We craft high-fidelity designs that bring your brand to life — then animate them into interactive prototypes. You'll see, click, and feel your future website before a single line of production code is written.",
  },
  {
    number: "03",
    title: "Build & Launch",
    body: "We engineer your website with modern tooling: Next.js, GSAP, and Framer Motion. Every animation and interaction is finely tuned before we launch a site that loads beautifully and performs flawlessly.",
  },
];

export function Process() {
  const processRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
      });
    });

    const stepEls = gsap.utils.toArray<HTMLElement>(".process-step");
    stepEls.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0.15, xPercent: 8 },
        {
          opacity: 1,
          xPercent: 0,
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  }, { scope: processRef });

  return (
    <section
      ref={processRef}
      className="relative w-full max-w-[1560px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-12 md:gap-28 mb-40"
    >
      {/* Sticky left heading */}
      <div
        className="w-full md:w-1/2 h-[50dvh] md:h-[100dvh] flex flex-col justify-center md:justify-start md:pt-[30dvh] items-start"
        ref={leftColRef}
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
          >
            [ Our Method ]
          </span>
        </div>
        <h2
          className="text-6xl md:text-8xl font-bold tracking-[-0.055em] leading-[0.86]"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
        >
          The<br />Method.
        </h2>
        <p
          className="mt-6 text-lg leading-[1.72] max-w-sm"
          style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
        >
          Three deliberate stages, zero shortcuts. From the first brief to the final pixel, every step is designed to produce a website that genuinely sets you apart.
        </p>
      </div>

      {/* Scrolling steps */}
      <div className="w-full md:w-1/2 flex flex-col gap-[45dvh] md:pt-[30dvh] pb-[20dvh] md:pb-0">
        {steps.map((step, index) => (
          <div key={step.number} className={`process-step flex flex-col gap-5 ${index === steps.length - 1 ? "md:h-[70dvh]" : ""}`}>
            <span
              className="text-lg tracking-widest"
              style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
            >
              [ {step.number} ]
            </span>
            <h3
              className="text-4xl md:text-5xl font-bold tracking-[-0.05em] leading-[1]"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
            >
              {step.title}
            </h3>
            <p
              className="text-lg md:text-xl leading-[1.72]"
              style={{ color: "#A09890", fontFamily: "var(--font-dm-sans)" }}
            >
              {step.body}
            </p>
            {/* Divider */}
            <div
              className="mt-4 w-16 h-[1px]"
              style={{ background: "rgba(255, 77, 0, 0.3)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
