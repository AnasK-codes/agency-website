"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Discovery & Architecture",
    body: "We map the entire ecosystem before writing a single line of code or pushing a single pixel. We research the brand, the audience, and the technical constraints to architect a flawless foundation.",
  },
  {
    number: "02",
    title: "Design Engineering",
    body: "Where aesthetics meet mathematics. We build robust, scalable applications using Next.js and Tailwind, transforming static wireframes into highly performant, responsive systems.",
  },
  {
    number: "03",
    title: "Choreography & Motion",
    body: "The final layer of polish. We introduce GSAP scroll triggers and Framer Motion spring physics to make the interface feel tactile, fluid, and genuinely alive.",
  },
];

export function Process() {
  const processRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: processRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
      pinSpacing: false,
    });

    const stepEls = gsap.utils.toArray(".process-step");
    stepEls.forEach((step: any) => {
      gsap.fromTo(
        step,
        { opacity: 0.15, x: 60 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: step,
            start: "top 65%",
            end: "top 40%",
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
        className="w-full md:w-1/2 h-[50vh] md:h-[100vh] flex flex-col justify-center items-start"
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
          We break down complex problems into elegant mathematical and visual
          solutions, ensuring every frame feels perfect.
        </p>
      </div>

      {/* Scrolling steps */}
      <div className="w-full md:w-1/2 flex flex-col gap-40 md:pt-[50vh] pb-[20vh] md:pb-[50vh]">
        {steps.map((step) => (
          <div key={step.number} className="process-step flex flex-col gap-5">
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
