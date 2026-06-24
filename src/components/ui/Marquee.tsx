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
          ...(i % 2 === 0
            ? { color: "#F5F0EB" }
            : {
                color: "transparent",
                WebkitTextStroke: "1px rgba(245, 240, 235, 0.8)",
              }),
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
    "Pixel Perfect",
    "Award-Worthy",
    "Custom Built",
    "Made To Impress",
  ];

  return (
    <section
      className="py-20 md:py-32 overflow-hidden border-y relative flex flex-col justify-center items-center w-full"
      style={{
        background: "#111110",
        borderColor: "rgba(255, 77, 0, 0.1)",
      }}
    >
      <style>{ribbonAnimationStyles}</style>
      
      {/* Rotated wrapper for parallel ribbons */}
      <div className="relative w-full flex flex-col gap-6 transform -rotate-2">
        <InfiniteRibbon 
          items={items} 
          duration={35} 
          className="bg-[#111110] border-y border-[rgba(255,77,0,0.15)] shadow-[0_0_40px_rgba(0,0,0,0.5)]" 
        />
        
        <InfiniteRibbon 
          items={items} 
          duration={35} 
          reverse={true} 
          className="bg-[#111110] border-y border-[rgba(255,77,0,0.1)] opacity-80" 
        />
      </div>
    </section>
  );
}
