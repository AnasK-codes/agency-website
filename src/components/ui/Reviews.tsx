"use client";

import { useMemo } from "react";
import CircularGallery from "@/components/ui/CircularGallery";

interface ReviewData {
  quote: string;
  name: string;
  role: string;
  company: string;
  tag: string;
  metric: string;
  accentColor: string;
  initials: string;
}

const reviewsData: ReviewData[] = [
  {
    quote:
      "We wanted an e-commerce platform that didn't feel like a standard catalog. Maven Studio engineered an interactive 3D color explorer for SkyPaints that completely transformed how our customers shop online. Our conversion rate more than doubled in the first month.",
    name: "Vikram Mehta",
    role: "Founder & Creative Director",
    company: "SkyPaints",
    tag: "E-COMMERCE 3D",
    metric: "+240% SALES CONVERSION",
    accentColor: "#3B82F6",
    initials: "VM",
  },
  {
    quote:
      "Building a digital healthcare ecosystem requires immense trust, flawless performance, and intuitive accessibility. Maven Studio delivered an ultra-responsive platform for Aarogya One that connects patients with doctors seamlessly. They truly care about the end-user experience.",
    name: "Dr. Siddharth Rao",
    role: "Co-Founder & Chief Medical Officer",
    company: "Aarogya One",
    tag: "HEALTHCARE PLATFORM",
    metric: "100K+ PATIENT BOOKINGS",
    accentColor: "#14B8A6",
    initials: "SR",
  },
  {
    quote:
      "Maven Studio didn't just redesign our platform; they redefined our entire brand identity. Our conversion rate surged by 310% within 60 days of launching the new WebGL experience.",
    name: "Elena Rostova",
    role: "VP of Product",
    company: "Synthetix AI",
    tag: "AI PLATFORM",
    metric: "+310% CONVERSION",
    accentColor: "#FF4D00",
    initials: "ER",
  },
  {
    quote:
      "The attention to physics-based motion and typography is unmatched. We regularly have investors and enterprise clients ask who built our site. Pure design engineering excellence.",
    name: "Marcus Chen",
    role: "Founder & CEO",
    company: "Lumina Quantum",
    tag: "QUANTUM TECH",
    metric: "10X ENGAGEMENT",
    accentColor: "#A855F7",
    initials: "MC",
  },
  {
    quote:
      "Working with Maven Studio felt like having a secret weapon. They delivered a custom Next.js architecture that loads in under half a second with flawless Core Web Vitals.",
    name: "Sarah Jenkins",
    role: "Head of Design",
    company: "Vertex Labs",
    tag: "DEV TOOLS",
    metric: "99/100 LIGHTHOUSE",
    accentColor: "#FF4D00",
    initials: "SJ",
  },
  {
    quote:
      "Their codebase is as beautiful as their designs. Clean TypeScript, modular animations, and rock-solid reliability. Maven Studio is the gold standard for web development.",
    name: "Julian Thorne",
    role: "VP of Engineering",
    company: "Nexus Protocol",
    tag: "WEB3 PROTOCOL",
    metric: "ZERO DOWNTIME",
    accentColor: "#14B8A6",
    initials: "JT",
  },
];

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length > maxChars) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

function generateReviewSvgDataUrl(review: ReviewData, index: number): string {
  const lines = wrapText(review.quote, 34);

  const safeTag = escapeXml(review.tag);
  const safeMetric = escapeXml(review.metric);
  const safeInitials = escapeXml(review.initials);
  const safeName = escapeXml(review.name);
  const safeRoleCompany = escapeXml(`${review.role}, ${review.company}`);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <radialGradient id="glow-${index}" cx="85%" cy="15%" r="65%">
        <stop offset="0%" stop-color="${review.accentColor}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#0c0c0b" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="border-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${review.accentColor}" stop-opacity="0.8"/>
        <stop offset="40%" stop-color="#2a2a24" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#151513" stop-opacity="0.9"/>
      </linearGradient>
    </defs>

    <!-- Background card -->
    <rect width="800" height="1000" rx="44" fill="#0d0d0c"/>
    <rect width="800" height="1000" rx="44" fill="url(#glow-${index})"/>
    <rect x="1" y="1" width="798" height="998" rx="43" fill="none" stroke="url(#border-${index})" stroke-width="2"/>

    <!-- Top Left Category Badge with Glowing Dot -->
    <rect x="64" y="60" width="240" height="46" rx="23" fill="#161614" stroke="#2a2a24" stroke-width="1.5"/>
    <circle cx="94" cy="83" r="5" fill="${review.accentColor}"/>
    <text x="114" y="88" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="${review.accentColor}" letter-spacing="1.5">${safeTag}</text>

    <!-- Top Right Metric Badge -->
    <rect x="496" y="60" width="240" height="46" rx="23" fill="${review.accentColor}" fill-opacity="0.18" stroke="${review.accentColor}" stroke-opacity="0.5" stroke-width="1.5"/>
    <text x="616" y="88" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#ffffff" letter-spacing="0.5">${safeMetric}</text>

    <!-- 5 Gold Stars -->
    <text x="64" y="165" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" fill="#FFC72C" letter-spacing="4">★★★★★</text>

    <!-- Giant Decorative Background Quote Mark -->
    <text x="54" y="340" font-family="Georgia, serif" font-size="180" font-weight="700" fill="${review.accentColor}" opacity="0.12">“</text>

    <!-- Multi-line Quote Text -->
    <text x="64" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="500" fill="#f5f0eb" letter-spacing="-0.3">
      ${lines.map((line, i) => `<tspan x="64" dy="${i === 0 ? 0 : 54}">${escapeXml(line)}</tspan>`).join("")}
    </text>

    <!-- Bottom Footer Separator Line -->
    <line x1="64" y1="780" x2="736" y2="780" stroke="#22221e" stroke-width="1.5"/>

    <!-- Author Avatar Circle -->
    <circle cx="112" cy="874" r="48" fill="${review.accentColor}" fill-opacity="0.22" stroke="${review.accentColor}" stroke-width="2"/>
    <text x="112" y="884" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" fill="#ffffff">${safeInitials}</text>

    <!-- Author Details -->
    <text x="184" y="864" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="700" fill="#ffffff">${safeName}</text>
    <text x="184" y="904" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#a0a09c">${safeRoleCompany}</text>

    <!-- Verified Badge -->
    <rect x="576" y="852" width="160" height="44" rx="14" fill="#141412" stroke="#2a2a24" stroke-width="1.5"/>
    <text x="656" y="880" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#888884" letter-spacing="1.5">VERIFIED</text>
  </svg>`;

  const base64 =
    typeof window !== "undefined" && window.btoa
      ? window.btoa(unescape(encodeURIComponent(svg)))
      : Buffer.from(svg, "utf8").toString("base64");

  return `data:image/svg+xml;base64,${base64}`;
}

export function Reviews() {
  const items = useMemo(() => {
    return reviewsData.map((review, index) => ({
      image: generateReviewSvgDataUrl(review, index),
      text: "",
    }));
  }, []);

  return (
    <section
      id="reviews"
      className="relative w-full py-28 md:py-36 overflow-hidden z-10"
      style={{ background: "#080807" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-px" style={{ background: "#FF4D00" }} />
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              color: "#14B8A6",
            }}
          >
            [ Testimonials ]
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2
              className="text-4xl md:text-6xl font-bold tracking-[-0.055em] mb-4"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#F5F0EB",
              }}
            >
              Client Praise
            </h2>
            <p
              className="text-base md:text-lg max-w-xl"
              style={{ fontFamily: "var(--font-dm-sans)", color: "#A0A09C" }}
            >
              Discover why industry leaders trust us to engineer their digital
              flagship platforms.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 rounded-full">
            <span>← Drag or Swipe to Rotate →</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-150 md:h-175">
        <CircularGallery
          items={items}
          bend={2}
          textColor="#F5F0EB"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
}
