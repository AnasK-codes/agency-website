"use client";

import { HTMLMotionProps, motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  intensity?: number;
}

export function MagneticButton({ children, className, intensity = 0.4, style: externalStyle, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    return false;
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * intensity);
    y.set((e.clientY - centerY) * intensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isTouchDevice ? 0 : springX,
        y: isTouchDevice ? 0 : springY,
        ...(externalStyle ?? {}),
      }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Subtle hover glow that tracks cursor — only on pointer devices */}
      {isHovered && !isTouchDevice && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-full opacity-50 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + x.get()}% ${50 + y.get()}%, rgba(255, 77, 0, 0.45), transparent 60%)`,
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">{children}</span>
    </motion.button>
  );
}
