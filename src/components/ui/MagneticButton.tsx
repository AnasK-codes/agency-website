"use client";

import { HTMLMotionProps, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice.current || !ref.current) return;
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
      onMouseEnter={() => !isTouchDevice.current && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isTouchDevice.current ? 0 : springX,
        y: isTouchDevice.current ? 0 : springY,
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
      {isHovered && !isTouchDevice.current && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-full opacity-50 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + x.get()}% ${50 + y.get()}%, rgba(255, 77, 0, 0.45), transparent 60%)`,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
