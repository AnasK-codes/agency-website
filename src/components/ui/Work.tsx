"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapConfig";

const projects = [
  {
    title: "SkyPaints",
    category: "Web Application",
    number: "01",
    image: "/skypaints.png",
    url: "https://sky-paints.vercel.app/",
  },
  {
    title: "Obsidian Liquid",
    category: "3D Render & Motion",
    number: "02",
    image: "/work-2.png",
  },
  {
    title: "Aura Geometry",
    category: "Brand Identity",
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
        const panels = gsap.utils.toArray(".work-panel");
        panels.forEach((panel: any) => {
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

        const panels = gsap.utils.toArray(".work-panel");
        panels.forEach((panel: any) => {
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
      <div className="flex-shrink-0 px-6 md:px-16 lg:px-24 pt-8 pb-4 pointer-events-none">
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
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row flex-1"
      >
        {projects.map((project, index) => {
          const content = (
            <>
              <div
                className="relative w-full max-w-4xl h-[50dvh] md:h-[55dvh] max-h-[600px] rounded-2xl overflow-hidden magnetic-target group-hover:shadow-[0_32px_80px_-20px_rgba(255,77,0,0.3)] transition-shadow duration-500"
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
                    priority={true}
                  />
                </div>
                {project.url && (
                <div className="work-overlay absolute inset-0 bg-[#080807]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="work-overlay-text flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-black/40 text-[#F5F0EB] font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span>View Project</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full max-w-4xl mt-8 flex justify-between items-start">
                <h3
                  className="text-3xl md:text-5xl font-bold tracking-[-0.05em] transition-colors duration-500 group-hover:text-[#FF4D00]"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "#F5F0EB",
                  }}
                >
                  {project.title}
                </h3>
                <div className="flex flex-col items-end gap-1">
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

