"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { MagneticButton } from "./MagneticButton";

const projects = [
  {
    title: "SkyPaints",
    category: "Web Application",
    description:
      "A vibrant e-commerce platform for a premium paint brand, built with Next.js and a fully custom 3D color explorer.",
    number: "01",
    image: "/skypaints.png",
    url: "https://sky-paints.vercel.app/",
  },
  {
    title: "Aarogya One",
    category: "Brand Identity & Website",
    description:
      "A comprehensive health and wellness platform designed to connect users with healthcare providers and services.",
    number: "02",
    image: "/aarogya-one.png",
    url: "https://aarogya-one-sigma.vercel.app/",
  },
  {
    title: "Meridian",
    category: "SaaS Product Design",
    description:
      "End-to-end product design for a B2B analytics platform — from information architecture and design system to interactive prototype.",
    number: "03",
    image: "/work-3.png",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: horizontal scroll gallery
      mm.add("(min-width: 768px)", () => {
        // Set horizontal width only on desktop
        gsap.set(containerRef.current, {
          width: `${projects.length * 100}vw`,
        });

        gsap.to(containerRef.current, {
          x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          willChange: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            end: () =>
              `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
          },
        });

        // Parallax images — desktop only
        const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
        panels.forEach((panel) => {
          const img = panel.querySelector(".parallax-img");
          if (!img) return;
          gsap.to(img, {
            xPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              invalidateOnRefresh: true,
              end: () =>
                `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
              scrub: true,
            },
          });
        });
      });

      // Mobile: vertical stack with fade-in
      mm.add("(max-width: 767px)", () => {
        // Reset any width set by desktop context
        gsap.set(containerRef.current, { width: "auto", x: 0 });

        const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0.3, y: 40 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                end: "top 55%",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full overflow-hidden flex flex-col md:h-[100dvh]"
      style={{ background: "#080807" }}
    >
      {/* Section header — in normal flow, flex-shrink-0 */}
      <div className="flex-shrink-0 px-6 md:px-16 lg:px-24 pt-32 pb-4 pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              color: "#14B8A6",
            }}
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

      {/* Scroll container — horizontal on md+, vertical stack on mobile */}
      <div ref={containerRef} className="flex flex-col md:flex-row flex-1">
        {projects.map((project, index) => {
          const content = (
            <>
              <div
                className="relative w-full max-w-4xl h-[40dvh] md:h-[45dvh] max-h-[500px] rounded-2xl overflow-hidden magnetic-target group-hover:shadow-[0_32px_80px_-20px_rgba(255,77,0,0.3)] transition-shadow duration-500"
                style={{
                  border: "1px solid rgba(255, 77, 0, 0.14)",
                  boxShadow: "0 32px 80px -20px rgba(255, 77, 0, 0.12)",
                }}
              >
                <div className="parallax-img absolute top-0 -left-[10%] w-[120%] h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                {project.url && (
                  <div className="work-overlay absolute inset-0 bg-[#080807]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <MagneticButton className="work-overlay-text px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-[#F5F0EB] font-bold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-[#FF4D00]/50 hover:text-[#FF4D00]">
                      <div className="flex items-center gap-3">
                        <span>View Project</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </MagneticButton>
                  </div>
                )}
              </div>

              <div className="w-full max-w-4xl mt-6 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3
                    className="text-3xl md:text-5xl font-bold tracking-[-0.05em] transition-colors duration-500 group-hover:text-[#FF4D00]"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: "#F5F0EB",
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.description && (
                    <p
                      className="text-sm max-w-md mt-2 leading-[1.6]"
                      style={{
                        color: "#504840",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-4">
                  <span
                    className="text-xs uppercase tracking-[0.3em]"
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      color: "#14B8A6",
                    }}
                  >
                    {project.number}
                  </span>
                  <span
                    className="text-sm uppercase tracking-widest transition-colors duration-500 group-hover:text-[#F5F0EB]"
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      color: "#504840",
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>
            </>
          );

          return (
            <div
              key={index}
              className="work-panel w-full md:w-[100vw] py-12 md:py-0 md:h-full flex flex-col justify-center items-center px-6 md:px-16 lg:px-24"
            >
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex flex-col items-center group cursor-none"
                >
                  {content}
                </a>
              ) : (
                <div className="w-full flex flex-col items-center group cursor-none">
                  {content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
