"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import {
  Check,
  Sparkle,
  ArrowRight,
  Lightning,
  Star,
  ShieldCheck,
  Code,
  Cpu,
  Rocket,
  Crown,
  Clock,
  Infinity as InfinityIcon,
  Buildings,
  Checks,
  Users,
  Handshake,
  LockKeyOpen,
  FastForward,
} from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  timeHorizon: string;
  targetAudience: string;
  description: string;
  popular?: boolean;
  accentColor: string;
  highlightMetric: string;
  features: {
    text: string;
    icon: React.ReactNode;
  }[];
  ctaText: string;
  subject: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "01",
    name: "Ignition Sprint",
    badge: "FIXED SCOPE",
    tagline: "Validate & Launch Fast",
    timeHorizon: "4–6 Weeks Delivery",
    targetAudience: "For seed-stage founders & new product initiatives needing immediate, high-impact market validation.",
    description: "A complete, production-ready web application built from scratch with bespoke design and robust architecture.",
    accentColor: "#14B8A6",
    highlightMetric: "100% Production Ready",
    features: [
      { text: "Complete UI/UX product discovery & wireframing", icon: <Sparkle weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
      { text: "Bespoke Obsidian Ember design system (Zero templates)", icon: <Code weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
      { text: "Full-stack Next.js 16 + TypeScript high-speed build", icon: <Rocket weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
      { text: "Up to 3 core integrations (Stripe, Supabase, OpenAI, etc.)", icon: <Cpu weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
      { text: "Custom physics-based motion & micro-interactions", icon: <Lightning weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
      { text: "Edge-optimized global deployment & CI/CD pipeline", icon: <ShieldCheck weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
      { text: "30-day post-launch code warranty & bug fixes", icon: <Checks weight="duotone" className="w-4 h-4 text-[#14B8A6]" /> },
    ],
    ctaText: "Launch Your Sprint",
    subject: "Ignition Sprint Inquiry - Maven Studio",
  },
  {
    id: "02",
    name: "Growth Partnership",
    badge: "MOST POPULAR // RECOMMENDED",
    tagline: "Your Embedded Technical Arm",
    timeHorizon: "Ongoing Sprints • Pause Anytime",
    targetAudience: "For scaling Series A+ brands & ambitious product teams needing continuous senior engineering firepower.",
    description: "Your dedicated senior design engineering powerhouse. Continuous weekly shipping, direct Slack access, and rapid iteration.",
    popular: true,
    accentColor: "#FF4D00",
    highlightMetric: "2x Shipping Velocity",
    features: [
      { text: "Dedicated senior design engineer + UI/UX architect", icon: <Crown weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
      { text: "Weekly sprint deliverables, code reviews & live demos", icon: <FastForward weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
      { text: "Continuous feature iteration, A/B testing & motion polish", icon: <Lightning weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
      { text: "Custom AI / LLM integrations & complex backend scaling", icon: <Cpu weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
      { text: "Guaranteed 99+ Core Web Vitals & Lighthouse performance", icon: <Star weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
      { text: "Direct private Slack/Discord channel with lead builders", icon: <Users weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
      { text: "Same-day priority response & expedited SLAs", icon: <Clock weight="duotone" className="w-4 h-4 text-[#FF4D00]" /> },
    ],
    ctaText: "Claim Your Engineering Slot",
    subject: "Growth Partnership Inquiry - Maven Studio",
  },
  {
    id: "03",
    name: "Enterprise Takeover",
    badge: "FULL POD",
    tagline: "End-to-End Technical Ownership",
    timeHorizon: "Custom Roadmap & Pods",
    targetAudience: "For established tech companies & high-growth scale-ups requiring full autonomous squad ownership.",
    description: "A complete multidisciplinary engineering pod embedded into your organization. We take complete roadmap accountability.",
    accentColor: "#FF7A3D",
    highlightMetric: "Complete Autonomous Squad",
    features: [
      { text: "Full autonomous engineering pod (3+ senior engineers)", icon: <Buildings weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
      { text: "Dedicated technical product manager & QA lead included", icon: <Users weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
      { text: "Enterprise system architecture & legacy modernization", icon: <Code weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
      { text: "Custom WebGL shaders, 3D Canvas & micro-frontends", icon: <Sparkle weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
      { text: "SOC-2 compliance ready & enterprise security standards", icon: <ShieldCheck weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
      { text: "Executive technical advisory & C-suite strategic roadmapping", icon: <Handshake weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
      { text: "100% comprehensive codebase & IP transfer with zero lock", icon: <LockKeyOpen weight="duotone" className="w-4 h-4 text-[#FF7A3D]" /> },
    ],
    ctaText: "Schedule Enterprise Discovery",
    subject: "Enterprise Takeover Inquiry - Maven Studio",
  },
];

const assurances = [
  {
    title: "100% IP & Code Ownership",
    description: "You own every single line of code, design asset, and architecture document from day one. Zero licensing traps or vendor lock-in.",
    icon: <LockKeyOpen weight="duotone" className="w-6 h-6 text-[#14B8A6]" />,
  },
  {
    title: "Direct Engineer Access",
    description: "No project coordinators or communication middlemen. You collaborate directly with the lead senior engineers building your product.",
    icon: <Users weight="duotone" className="w-6 h-6 text-[#FF4D00]" />,
  },
  {
    title: "Agile Scalability",
    description: "Scale your engineering firepower up, down, or pause between major milestones with zero administrative friction.",
    icon: <FastForward weight="duotone" className="w-6 h-6 text-[#FF7A3D]" />,
  },
];

export function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".pricing-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );

        gsap.fromTo(
          ".assurance-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".assurance-grid",
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 md:px-16 lg:px-24 w-full border-t overflow-x-clip"
      style={{
        background: "#080807",
        borderColor: "rgba(255, 77, 0, 0.15)",
      }}
    >
      {/* ─── Ambient Background Glows ─── */}
      <div
        className="absolute top-1/4 right-1/3 w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none opacity-[0.06] blur-[160px]"
        style={{ background: "radial-gradient(circle, #FF4D00 0%, #14B8A6 100%)" }}
      />
      <div
        className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full pointer-events-none opacity-[0.05] blur-[140px]"
        style={{ background: "#14B8A6" }}
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
              [ ENGAGEMENT MODELS ]
            </span>
            <span className="w-8 h-[1px]" style={{ background: "#FF4D00" }} />
          </div>

          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.04em] leading-[1.02] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
          >
            Clear Engagements. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FF7A3D] to-[#14B8A6]">
              Zero Surprises.
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed text-[#A09890]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Fixed-scope validation sprints, dedicated growth partnerships, or complete enterprise takeover — engineered for velocity and absolute transparency.
          </p>
        </div>

        {/* ─── Cards Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20 md:mb-28">
          {pricingPlans.map((plan, index) => {
            const isPopular = plan.popular;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`pricing-card flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-500 relative ${
                  isPopular
                    ? "bg-gradient-to-b from-[#181311] via-[#121110] to-[#0d0d0c] border-2 border-[#FF4D00]/70 shadow-[0_0_60px_rgba(255,77,0,0.22)] lg:-translate-y-4 z-20"
                    : "bg-[#0d0d0c]/90 border border-white/10 hover:border-white/20 hover:bg-[#111110] z-10"
                } ${isHovered && !isPopular ? "shadow-[0_20px_50px_rgba(0,0,0,0.8)] -translate-y-1" : ""}`}
              >
                {/* Glowing Top Accent for Popular Card */}
                {isPopular && (
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent shadow-[0_0_15px_#FF4D00]" />
                )}

                {/* Top Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span
                    className={`text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      isPopular
                        ? "bg-gradient-to-r from-[#FF4D00] to-[#FF7A3D] text-[#080807] shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                        : "bg-white/5 text-[#A09890] border border-white/10"
                    }`}
                  >
                    {isPopular && <Star weight="fill" className="inline-block w-3 h-3 mr-1 -mt-0.5" />}
                    {plan.badge}
                  </span>
                  <span className="text-xs font-mono text-[#706860]">#{plan.id}</span>
                </div>

                {/* Card Header & Title */}
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#F5F0EB] mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {plan.name}
                  </h3>

                  <div
                    className="text-sm font-mono tracking-wider uppercase font-semibold mb-3 flex items-center gap-2"
                    style={{ color: plan.accentColor }}
                  >
                    <span>{plan.tagline}</span>
                  </div>

                  <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/5 text-xs font-mono text-[#F5F0EB]/90 mb-5">
                    ⏱️ <span className="text-[#A09890]">Horizon:</span> <span className="font-semibold text-white">{plan.timeHorizon}</span>
                  </div>

                  <p
                    className="text-sm sm:text-base text-[#A09890] leading-relaxed mb-6 pb-6 border-b border-white/10"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {plan.description}
                  </p>

                  {/* Target Audience Pill */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-8">
                    <span className="text-[11px] uppercase tracking-widest text-[#706860] font-mono font-bold block mb-1">
                      Ideal For:
                    </span>
                    <p className="text-xs sm:text-sm text-[#F5F0EB]/80 italic leading-relaxed">
                      &ldquo;{plan.targetAudience}&rdquo;
                    </p>
                  </div>

                  {/* Features Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs uppercase tracking-widest text-[#888884] font-mono font-bold">
                      Deliverables Included:
                    </span>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 font-bold uppercase"
                      style={{ color: plan.accentColor }}
                    >
                      {plan.highlightMetric}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3.5 mb-10">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-sm text-[#F5F0EB]/90 font-medium">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isPopular ? "bg-[#FF4D00]/15" : "bg-white/5"
                          }`}
                        >
                          {feature.icon}
                        </div>
                        <span className="leading-snug" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-4 mt-auto">
                  <MagneticButton
                    intensity={0.25}
                    onClick={() => {
                      window.location.href = `mailto:mavenstudio.hello@gmail.com?subject=${encodeURIComponent(plan.subject)}`;
                    }}
                    className={`w-full py-4 sm:py-5 rounded-full font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-lg ${
                      isPopular
                        ? "bg-[#FF4D00] text-[#080807] hover:bg-[#ff5d17] hover:shadow-[0_0_35px_rgba(255,77,0,0.5)]"
                        : "bg-white/10 text-[#F5F0EB] hover:bg-white/15 hover:border-white/30 border border-white/10"
                    }`}
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight
                      weight="bold"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </MagneticButton>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Maven Assurances Mini-Grid ─── */}
        <div className="assurance-grid pt-12 border-t border-white/10">
          <div className="text-center mb-12">
            <span
              className="text-xs uppercase tracking-[0.25em] font-mono text-[#888884] font-semibold"
            >
              [ THE MAVEN GUARANTEE ]
            </span>
            <h3
              className="text-xl md:text-2xl font-bold text-[#F5F0EB] mt-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Engineered with absolute accountability.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {assurances.map((assurance, index) => (
              <div
                key={index}
                className="assurance-card p-6 md:p-8 rounded-2xl bg-[#0e0d0c]/60 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    {assurance.icon}
                  </div>
                  <h4
                    className="text-base sm:text-lg font-bold text-[#F5F0EB]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {assurance.title}
                  </h4>
                </div>
                <p
                  className="text-sm text-[#A09890] leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {assurance.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom inquiry link */}
        <div className="mt-16 text-center">
          <p
            className="text-[#A09890] text-sm md:text-base inline-flex items-center gap-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Need a bespoke enterprise scope or legacy modernization?
            <a
              href="mailto:mavenstudio.hello@gmail.com?subject=Custom%20Enterprise%20Architecture%20Inquiry"
              className="text-[#14B8A6] underline underline-offset-4 font-semibold hover:text-[#2dd4bf] transition-colors"
            >
              Let&apos;s build a custom roadmap →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
