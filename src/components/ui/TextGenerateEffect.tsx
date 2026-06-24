"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  let wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const renderWords = () => {
    return (
      <motion.div ref={ref}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              variants={{
                hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              initial="hidden"
              animate={controls}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.1,
              }}
              className="inline-block whitespace-pre"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-inherit leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
