"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InfiniteRibbonProps {
  repeat?: number;
  duration?: number;
  reverse?: boolean;
  rotation?: number;
  className?: string;
  items: string[];
}

const ribbonAnimationStyles = `
@keyframes iconiq-infinite-ribbon {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes iconiq-infinite-ribbon-reverse {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .iconiq-infinite-ribbon-track {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

function InfiniteRibbon({
  repeat = 5,
  duration = 22,
  reverse = false,
  rotation = 0,
  className,
  items,
}: InfiniteRibbonProps) {
  const repeatCount = Math.max(1, Math.floor(repeat));
  const animationName = reverse
    ? "iconiq-infinite-ribbon-reverse"
    : "iconiq-infinite-ribbon";

  const marqueeContent = items.map((text, i) => (
    <React.Fragment key={i}>
      <span
        className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.04em]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          color: "#F5F0EB",
        }}
      >
        {text}
      </span>
      <span className="text-2xl" style={{ color: "#FF4D00" }}>
        ✦
      </span>
    </React.Fragment>
  ));

  return (
    <div
      className={cn(
        "w-[110%] max-w-[110%] -left-[5%] overflow-hidden py-4 select-none flex",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <span className="sr-only">Marquee</span>
      <div
        aria-hidden="true"
        className="iconiq-infinite-ribbon-track flex w-max whitespace-nowrap items-center"
        style={
          {
            "--ribbon-duration": `${Math.max(0.1, duration)}s`,
            animation: `${animationName} var(--ribbon-duration) linear infinite`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: repeatCount * 2 }, (_, index) => (
          <div className="flex gap-10 items-center mr-10" key={index}>
            {marqueeContent}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const items = [
    "Defy Generic",
    "No Templates",
    "Digital Excellence",
    "Premium Aesthetics",
  ];

  return (
    <section
      className="py-32 overflow-hidden border-y relative flex flex-col justify-center items-center w-full"
      style={{
        background: "#111110",
        borderColor: "rgba(255, 77, 0, 0.1)",
      }}
    >
      <style>{ribbonAnimationStyles}</style>
      
      {/* Front rotated ribbon */}
      <InfiniteRibbon 
        items={items} 
        duration={35} 
        rotation={3} 
        className="absolute z-10 bg-[#111110] border-y border-[rgba(255,77,0,0.15)]" 
      />
      
      {/* Back rotated ribbon (reversed) */}
      <InfiniteRibbon 
        items={items} 
        duration={35} 
        reverse={true} 
        rotation={-3} 
        className="absolute bg-[#111110] border-y border-[rgba(255,77,0,0.1)] opacity-50" 
      />
    </section>
  );
}
