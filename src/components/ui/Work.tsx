"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Obsidian Liquid",
    category: "3D Render & Motion",
    number: "01",
    image: "/work-1.png",
  },
  {
    title: "Aura Geometry",
    category: "Brand Identity",
    number: "02",
    image: "/work-2.png",
  },
  {
    title: "Brutalist Form",
    category: "Editorial Design",
    number: "03",
    image: "/work-3.png",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".work-panel");

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        anticipatePin: 1, // prevents CLS from the spacer div insertion
        end: () => `+=${window.innerWidth * (panels.length - 1)}`,
      },
    });

    panels.forEach((panel: any) => {
      const img = panel.querySelector(".parallax-img");
      gsap.to(img, {
        xPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerWidth * (panels.length - 1)}`,
          scrub: 1,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-[100dvh] w-full overflow-hidden flex items-center"
      style={{ background: "#080807" }}
    >
      {/* Section header */}
      <div className="absolute top-24 left-6 md:left-16 lg:left-24 z-10 pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
          >
            [ Portfolio ]
          </span>
        </div>
        <h2
          className="text-4xl md:text-6xl font-bold tracking-[-0.055em]"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
        >
          Selected Work
        </h2>
      </div>

      {/* Horizontal panels */}
      <div ref={containerRef} className="flex h-full" style={{ width: `${projects.length * 100}vw` }}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="work-panel w-[100vw] h-full flex flex-col justify-center items-center px-6 md:px-16 lg:px-24"
          >
            <div
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden magnetic-target"
              style={{
                border: "1px solid rgba(255, 77, 0, 0.14)",
                boxShadow: "0 32px 80px -20px rgba(255, 77, 0, 0.12)",
              }}
            >
              <div className="parallax-img absolute top-0 -left-[10%] w-[120%] h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>

            <div className="w-full max-w-5xl mt-8 flex justify-between items-start">
              <h3
                className="text-3xl md:text-5xl font-bold tracking-[-0.05em]"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
              >
                {project.title}
              </h3>
              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
                >
                  {project.number}
                </span>
                <span
                  className="text-sm uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#504840" }}
                >
                  {project.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
