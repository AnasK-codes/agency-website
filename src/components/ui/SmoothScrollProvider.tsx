"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

export function SmoothScrollProvider() {
  useEffect(() => {

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      autoResize: true,
    });
    
    // Expose lenis instance to the window for programmatic scrolling in other components
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = lenis;
    }

    // Keep GSAP ScrollTrigger in sync with Lenis-managed scroll position.
    // Without this, pinned sections and scrub animations can stutter because
    // ScrollTrigger reads window.scrollY which Lenis updates asynchronously.
    lenis.on("scroll", ScrollTrigger.update);

    const onRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const rafFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    let resizeObserver: ResizeObserver | null = null;
    let resizeTimeout: ReturnType<typeof setTimeout>;
    
    if (typeof document !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
          lenis.resize();
        }, 200);
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      clearTimeout(resizeTimeout);
      lenis.off("scroll", ScrollTrigger.update);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return null;
}
