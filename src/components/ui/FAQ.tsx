"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { Plus, Minus, Question, EnvelopeSimple } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Timeline depends on the scope and complexity of your vision. For our MVP Sprints, we typically deliver a fully functional, production-ready web application within 6 to 8 weeks. For brand identity overhauls and bespoke WebGL experiences, timelines usually range from 4 to 6 weeks. With our Growth Partnerships, we operate in continuous weekly sprints, shipping tangible improvements and new features every Friday.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Absolutely. We thrive on helping ambitious early-stage founders turn complex concepts into market-dominating digital products. Whether you are raising a Seed round and need an interactive WebGL prototype that wows investors, or an established enterprise scaling your infrastructure, we tailor our design engineering engagement to your growth stage.",
  },
  {
    question: "Who owns the code when we're done?",
    answer:
      "You own 100% of the intellectual property, design tokens, and codebase from day one. Unlike traditional agencies that lock you into proprietary platforms or obscure vendor licensing, we build on modern open frameworks. Upon project conclusion, we provide a complete codebase handoff, architectural documentation, and team onboarding so you remain fully empowered.",
  },
  {
    question: "What tech stack do you use?",
    answer:
      "We engineer digital platforms using industry-standard, type-safe, and high-performance technologies. Our core frontend stack centers on Next.js, React, and TypeScript, styled with Tailwind CSS and custom vanilla CSS. For physics-based motion and 3D interactivity, we leverage GSAP, Three.js, WebGL, and Framer Motion. On the backend, we integrate seamlessly with Node.js, PostgreSQL, Supabase, and cloud infrastructures like Vercel and AWS.",
  },
  {
    question: "What happens after we launch?",
    answer:
      "We don't just launch and disappear. Every fixed-scope project includes a 30-day post-launch warranty, during which we actively monitor Lighthouse performance, resolve any edge-case issues, and guarantee flawless stability at zero additional cost. For clients who require ongoing feature development and scaling, our Growth Partnership provides continuous dedicated engineering support.",
  },
  {
    question: "How do we kick off an engagement with Maven Studio?",
    answer:
      "Getting started is straightforward. Once you reach out via our contact email or inquiry form, we schedule a concise 30-minute discovery call to align on your strategic goals, technical constraints, and timeline. Within 48 hours, we provide a transparent technical roadmap and fixed-scope proposal. Once approved, we establish shared communication channels and launch sprint engineering within one week.",
  },
];

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative py-32 px-6 md:px-16 lg:px-24 w-full border-t overflow-x-clip"
      style={{
        background: "#080807",
        borderColor: "rgba(255, 77, 0, 0.12)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05] blur-[150px]"
        style={{ background: "#FF4D00" }}
      />
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05] blur-[150px]"
        style={{ background: "#14B8A6" }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
            <span
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
            >
              [ FAQ ]
            </span>
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          </div>

          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.04em] leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
          >
            Common <span style={{ color: "#FF4D00" }}>Questions.</span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", color: "#A09890" }}
          >
            Everything you need to know about our engineering process, deliverables, and partnership philosophy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-[960px] mx-auto">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`faq-item rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#111110] border-[#FF4D00]/40 shadow-[0_4px_30px_rgba(255,77,0,0.08)]"
                    : "bg-[#0d0d0c] border-white/5 hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left focus:outline-none cursor-pointer"
                >
                  <span
                    className={`text-lg md:text-xl font-bold transition-colors duration-300 flex items-center gap-4 ${
                      isOpen ? "text-[#FF4D00]" : "text-[#F5F0EB]"
                    }`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <span className="text-sm font-mono text-[#60605a] shrink-0">0{index + 1}.</span>
                    {item.question}
                  </span>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FF4D00] text-[#080807] rotate-180 shadow-[0_0_15px_rgba(255,77,0,0.5)]"
                        : "bg-white/5 text-[#A09890] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {isOpen ? (
                      <Minus weight="bold" className="w-5 h-5" />
                    ) : (
                      <Plus weight="bold" className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6 md:pb-8" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6 md:px-8 pl-14 md:pl-16">
                    <p
                      className="text-base md:text-lg text-[#A09890] leading-relaxed pr-4 border-l-2 border-[#14B8A6]/40 pl-4"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA Banner */}
        <div className="mt-20 max-w-[960px] mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-[#0e0e0d] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6] shrink-0">
              <Question weight="bold" className="w-6 h-6" />
            </div>
            <div>
              <h4
                className="text-xl font-bold text-[#F5F0EB]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Have a question that isn&apos;t listed here?
              </h4>
              <p
                className="text-sm text-[#A09890] mt-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Our lead design engineers are always happy to discuss technical specs and roadmaps.
              </p>
            </div>
          </div>

          <MagneticButton
            intensity={0.25}
            onClick={() => {
              window.location.href = "mailto:mavenstudio.hello@gmail.com?subject=Technical%20Question";
            }}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-[#F5F0EB] font-bold text-sm inline-flex items-center gap-2 shrink-0 transition-all duration-300 hover:border-[#FF4D00]/50"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <EnvelopeSimple weight="bold" className="w-4 h-4 text-[#FF4D00]" />
            <span>Ask Us Anything</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
