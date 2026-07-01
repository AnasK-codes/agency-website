"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText = ({ text, className, delay = 0 }: SplitTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMobile(window.innerWidth < 768), 0);
    if (isInView) {
      controls.start("visible");
    }
    return () => clearTimeout(timer);
  }, [isInView, controls]);

  const words = text.split(" ");

  // Fallback for mobile if we want to avoid heavy split character animations
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <motion.div aria-hidden="true" className="flex flex-wrap gap-x-[0.25em]">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate={controls}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + wordIndex * 0.1,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
