"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import {
  CheckCircle,
  XCircle,
  Sparkle,
  Lightning,
  ArrowRight,
  ShieldCheck,
  Clock,
  Code,
  Users,
  Rocket,
  ArrowsLeftRight,
  Target,
  FileCode,
} from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

interface ComparisonPoint {
  id: string;
  category: string;
  tag: string;
  icon: React.ReactNode;
  traditional: {
    title: string;
    description: string;
  };
  maven: {
    title: string;
    description: string;
    highlight: string;
  };
}

const comparisonData: ComparisonPoint[] = [
  {
    id: "01",
    category: "Kickoff & Velocity",
    tag: "SPEED",
    icon: <Rocket weight="duotone" className="w-5 h-5 text-[#FF4D00]" />,
    traditional: {
      title: "Weeks of bureaucracy",
      description: "Endless discovery meetings, bloated proposals, and legal paperwork before a single line of code is written.",
    },
    maven: {
      title: "Active within 5 days",
      description: "Scoped, kicked off, and active engineering sprints launched within 5 business days.",
      highlight: "5 Business Days",
    },
  },
  {
    id: "02",
    category: "Team Synergy",
    tag: "SYNERGY",
    icon: <Users weight="duotone" className="w-5 h-5 text-[#14B8A6]" />,
    traditional: {
      title: "Siloed handoff chains",
      description: "Designers create static files in isolation, handing them off to developers who compromise the visual intent.",
    },
    maven: {
      title: "Unified design engineering",
      description: "UI design, physics-based motion, and frontend architecture engineered simultaneously as one fluid discipline.",
      highlight: "Zero Translation Loss",
    },
  },
  {
    id: "03",
    category: "Feedback Loops",
    tag: "COMMUNICATION",
    icon: <ArrowsLeftRight weight="duotone" className="w-5 h-5 text-[#FF4D00]" />,
    traditional: {
      title: "Account manager middlemen",
      description: "Sluggish approval chains where your feedback gets lost through non-technical project coordinators.",
    },
    maven: {
      title: "Direct engineer access",
      description: "Instant Slack/Discord communication directly with your lead design engineers and weekly live demos.",
      highlight: "Real-time Slack Channel",
    },
  },
  {
    id: "04",
    category: "Talent Quality",
    tag: "TALENT",
    icon: <Target weight="duotone" className="w-5 h-5 text-[#14B8A6]" />,
    traditional: {
      title: "Billed senior, staffed junior",
      description: "Pitched by agency partners and creative directors, but your codebase is offloaded to outsourced junior trainees.",
    },
    maven: {
      title: "Senior engineers only",
      description: "Dedicated senior design engineers on every single engagement. Zero fluff, zero agency bait-and-switch.",
      highlight: "100% Senior Staffed",
    },
  },
  {
    id: "05",
    category: "Code & Scalability",
    tag: "QUALITY",
    icon: <Code weight="duotone" className="w-5 h-5 text-[#FF4D00]" />,
    traditional: {
      title: "Fragile boilerplate templates",
      description: "Bloated, unmaintainable code built simply to pass visual inspection rather than scale in production.",
    },
    maven: {
      title: "Bespoke type-safe architecture",
      description: "Clean, type-safe TypeScript, custom shaders, and modular components engineered for 99+ Lighthouse scores.",
      highlight: "99+ Lighthouse Score",
    },
  },
  {
    id: "06",
    category: "Timelines & Scope",
    tag: "ACCOUNTABILITY",
    icon: <Clock weight="duotone" className="w-5 h-5 text-[#14B8A6]" />,
    traditional: {
      title: "Slipping deadlines & surprise bills",
      description: "Vague timelines that stretch for months, followed by unexpected invoices for minor scope adjustments.",
    },
    maven: {
      title: "Fixed-scope predictability",
      description: "Transparent iterative sprints, clear milestone roadmaps, and uncompromised delivery accountability.",
      highlight: "On Time, Fixed Budget",
    },
  },
  {
    id: "07",
    category: "Handoff & IP",
    tag: "OWNERSHIP",
    icon: <FileCode weight="duotone" className="w-5 h-5 text-[#FF4D00]" />,
    traditional: {
      title: "Vendor lock-in & zero docs",
      description: "Obscure licensing, proprietary setups, and zero technical documentation when the retainer ends.",
    },
    maven: {
      title: "100% IP ownership & clean docs",
      description: "Complete codebase handoff, comprehensive architecture guides, and seamless internal team onboarding.",
      highlight: "100% Code Ownership",
    },
  },
  {
    id: "08",
    category: "Core Philosophy",
    tag: "LONGEVITY",
    icon: <ShieldCheck weight="duotone" className="w-5 h-5 text-[#14B8A6]" />,
    traditional: {
      title: "Built for the invoice",
      description: "Optimized to prolong monthly retainers and satisfy bureaucratic checklists over actual product success.",
    },
    maven: {
      title: "Built to dominate & outlast",
      description: "Engineered with uncompromising aesthetics and robust performance to captivate users and lead your market.",
      highlight: "Market Dominance",
    },
  },
];

export function Comparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHover, setActiveHover] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".comparison-row",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="comparison"
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 md:px-16 lg:px-24 w-full border-t overflow-x-clip"
      style={{
        background: "#080807",
        borderColor: "rgba(255, 77, 0, 0.15)",
      }}
    >
      {/* ─── Ambient Background Glows ─── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] max-w-[900px] max-h-[600px] rounded-full pointer-events-none opacity-[0.07] blur-[150px]"
        style={{ background: "radial-gradient(circle, #FF4D00 0%, #14B8A6 100%)" }}
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.05] blur-[130px]"
        style={{ background: "#FF4D00" }}
      />

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* ─── Section Header ─── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
            <span
              className="text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ fontFamily: "var(--font-ibm-plex-mono)", color: "#14B8A6" }}
            >
              [ THE MAVEN DIFFERENCE ]
            </span>
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          </div>

          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.04em] leading-[1.02] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
          >
            The Old Way <span className="text-[#FF4D00] font-light italic">vs.</span> The Maven Way
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed text-[#A09890]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Why leading modern brands abandon traditional agency bureaucracies in favor of high-velocity design engineering.
          </p>
        </div>

        {/* ─── DESKTOP & TABLET MATRIX TABLE (Hidden on small screens) ─── */}
        <div className="hidden lg:block rounded-3xl border border-white/10 bg-[#0d0d0c]/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Sticky Table Header */}
          <div className="sticky top-20 z-30 bg-[#0d0d0c]/95 backdrop-blur-xl border-b border-white/10 grid grid-cols-12">
            {/* Column 1: Focus Area */}
            <div className="col-span-3 p-6 xl:p-8 flex items-center justify-between border-r border-white/5">
              <span
                className="text-sm font-bold uppercase tracking-widest text-[#F5F0EB]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Evaluation Criteria
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#A09890]">
                08 Points
              </span>
            </div>

            {/* Column 2: Traditional Agency */}
            <div className="col-span-4 p-6 xl:p-8 bg-[#100f0e]/80 border-r border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/70 inline-block animate-pulse" />
                  <span
                    className="text-base font-bold uppercase tracking-wider text-[#888884]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Traditional Agency
                  </span>
                </div>
                <div className="text-xs text-[#60605a] font-mono">Slow • Siloed • Built for Retainers</div>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded border border-red-500/20 text-red-400/80 bg-red-500/5">
                The Old Way
              </span>
            </div>

            {/* Column 3: Maven Studio */}
            <div className="col-span-5 p-6 xl:p-8 bg-gradient-to-r from-[#181412] to-[#121110] relative flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,77,0,0.3)]">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4D00] via-[#FF7A3D] to-[#14B8A6]" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkle weight="fill" className="text-[#FF4D00] w-5 h-5 animate-spin" style={{ animationDuration: "8s" }} />
                  <span
                    className="text-lg font-bold uppercase tracking-wider text-[#F5F0EB]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Working With Maven Studio
                  </span>
                </div>
                <div className="text-xs text-[#14B8A6] font-mono">Fast • Unified • Built to Dominate</div>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#FF4D00] text-[#080807] shadow-[0_0_20px_rgba(255,77,0,0.4)]">
                Recommended
              </span>
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-white/5">
            {comparisonData.map((item, index) => {
              const isHovered = activeHover === index;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={`comparison-row grid grid-cols-12 transition-all duration-300 relative group ${
                    isHovered ? "bg-white/[0.03]" : "bg-transparent"
                  }`}
                >
                  {/* Left Column: Category & Tag */}
                  <div className="col-span-3 p-6 xl:p-8 flex flex-col justify-between border-r border-white/5 relative">
                    {isHovered && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF4D00] to-[#14B8A6]" />
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[#FF4D00]/80 font-bold tracking-wider">
                        {item.id} //
                      </span>
                      <span
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded uppercase tracking-wider border"
                        style={{
                          borderColor: isHovered ? "rgba(20, 184, 166, 0.4)" : "rgba(255, 255, 255, 0.08)",
                          color: isHovered ? "#14B8A6" : "#A09890",
                          background: isHovered ? "rgba(20, 184, 166, 0.08)" : "transparent",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isHovered ? "bg-[#FF4D00]/20 text-[#FF4D00]" : "bg-white/5 text-[#A09890]"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className="text-lg font-bold text-[#F5F0EB] group-hover:text-white transition-colors"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: Traditional Agency */}
                  <div
                    className={`col-span-4 p-6 xl:p-8 border-r border-white/5 flex items-start gap-4 transition-colors duration-300 ${
                      isHovered ? "bg-red-950/[0.06]" : "bg-[#0e0d0c]/40"
                    }`}
                  >
                    <XCircle weight="fill" className="w-6 h-6 text-red-500/60 shrink-0 mt-0.5" />
                    <div>
                      <h4
                        className="text-base font-semibold text-[#888884] mb-1 group-hover:text-red-300/80 transition-colors"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {item.traditional.title}
                      </h4>
                      <p
                        className="text-sm text-[#706860] leading-relaxed"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.traditional.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Maven Studio */}
                  <div
                    className={`col-span-5 p-6 xl:p-8 flex items-start gap-4 relative transition-all duration-300 ${
                      isHovered
                        ? "bg-gradient-to-r from-[#181412] to-[#1c1714] shadow-[inset_0_0_30px_rgba(255,77,0,0.08)]"
                        : "bg-gradient-to-r from-[#131110] to-[#161412]"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#14B8A6]/20 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(20,184,166,0.4)]">
                      <CheckCircle weight="fill" className="w-5 h-5 text-[#14B8A6]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4
                          className="text-base md:text-lg font-bold text-[#F5F0EB] group-hover:text-[#FF4D00] transition-colors"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {item.maven.title}
                        </h4>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30 font-semibold uppercase tracking-wider shrink-0">
                          {item.maven.highlight}
                        </span>
                      </div>
                      <p
                        className="text-sm md:text-base text-[#F5F0EB]/90 leading-relaxed font-normal"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.maven.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE & SMALL TABLET CARDS (Shown on screens < lg) ─── */}
        <div className="block lg:hidden space-y-6">
          {comparisonData.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-[#0d0d0c] overflow-hidden shadow-xl"
            >
              {/* Card Category Header */}
              <div className="p-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF4D00]/20 text-[#FF4D00] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#FF4D00] block uppercase tracking-wider">
                      {item.id} // {item.tag}
                    </span>
                    <h3
                      className="text-lg font-bold text-[#F5F0EB]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {item.category}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Columns */}
              <div className="divide-y divide-white/5">
                {/* Traditional Box */}
                <div className="p-5 bg-[#121110]/60 border-l-2 border-red-500/40 flex items-start gap-3.5">
                  <XCircle weight="fill" className="w-5 h-5 text-red-400/80 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#888884] block mb-1">
                      Traditional Agency
                    </span>
                    <h4
                      className="text-sm font-bold text-[#A09890] mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {item.traditional.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#706860] leading-relaxed">
                      {item.traditional.description}
                    </p>
                  </div>
                </div>

                {/* Maven Box */}
                <div className="p-5 bg-gradient-to-br from-[#181412] to-[#141210] border-l-2 border-[#FF4D00] flex items-start gap-3.5 relative shadow-[inset_0_1px_0_rgba(255,77,0,0.15)]">
                  <CheckCircle weight="fill" className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#14B8A6] font-bold">
                        Working With Maven Studio
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF4D00]/20 text-[#FF4D00] border border-[#FF4D00]/40 font-bold uppercase">
                        {item.maven.highlight}
                      </span>
                    </div>
                    <h4
                      className="text-sm sm:text-base font-bold text-[#F5F0EB] mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {item.maven.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#F5F0EB]/90 leading-relaxed font-medium">
                      {item.maven.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Elevated Bottom CTA Card ─── */}
        <div className="mt-16 md:mt-24 p-8 sm:p-12 md:p-16 rounded-3xl border border-[#FF4D00]/30 bg-gradient-to-r from-[#181210] via-[#141210] to-[#0e1413] relative overflow-hidden shadow-[0_0_80px_rgba(255,77,0,0.12)] flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Decorative glow lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent opacity-60" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#14B8A6]/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF4D00]/15 border border-[#FF4D00]/30 text-[#FF4D00] text-xs font-mono uppercase tracking-wider mb-4">
              <Lightning weight="fill" className="w-3.5 h-3.5" />
              <span>Ready To Upgrade?</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F0EB] mb-3 leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Stop paying for agency bureaucracy. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FF7A3D] to-[#14B8A6]">
                Experience design engineering.
              </span>
            </h3>
            <p
              className="text-[#A09890] text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We kick off in days, ship measurable output every week, and hand over 100% of the IP when we&apos;re done. Built to ship fast, built to last.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <MagneticButton
              intensity={0.3}
              onClick={() => {
                window.location.href = "mailto:mavenstudio.hello@gmail.com?subject=Project%20Inquiry%20-%20The%20Maven%20Way";
              }}
              className="px-8 py-5 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,77,0,0.4)] group bg-[#FF4D00] text-[#080807] hover:bg-[#ff5d17]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span>Start Your Sprint</span>
              <ArrowRight weight="bold" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
