"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { ArrowUpRight } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useGSAP(() => {
    gsap.fromTo(
      ".cta-element",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  const handleSend = () => {
    if (!name.trim() || !message.trim()) return;
    
    const phoneNumber = "917470655352"; 
    const text = `Hi! I'm ${name}.\n\nHere are some details about my project:\n${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <section
      ref={containerRef}
      className="relative py-40 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center overflow-hidden border-t"
      style={{
        background: "#080807",
        borderColor: "rgba(255, 77, 0, 0.15)",
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none" style={{ background: "#FF4D00" }} />

      <div className="w-full max-w-4xl flex flex-col items-center text-center relative z-10">
        <h2
          className="cta-element text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.05em] mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
        >
          Let&apos;s Build <br />
          <span style={{ color: "#FF4D00" }}>The Extraordinary.</span>
        </h2>
        
        <p
          className="cta-element text-lg md:text-xl max-w-2xl mb-16 leading-[1.6]"
          style={{ fontFamily: "var(--font-dm-sans)", color: "#A09890" }}
        >
          Ready to defy the generic? Tell us about your vision, and let&apos;s engineer a digital experience that commands attention.
        </p>

        <div className="w-full flex flex-col gap-6 cta-element">
          <div className="relative group w-full">
            <input
              type="text"
              placeholder="Your Name / Company"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-xl md:text-2xl outline-none transition-colors duration-300 focus:border-[#FF4D00] placeholder:text-white/20"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
            />
          </div>

          <div className="relative group w-full mb-10">
            <textarea
              placeholder="Tell us about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-xl md:text-2xl outline-none transition-colors duration-300 focus:border-[#FF4D00] placeholder:text-white/20 resize-none"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#F5F0EB" }}
            />
          </div>

          <div className="flex justify-center w-full">
            <MagneticButton
              intensity={0.3}
              onClick={handleSend}
              className="group px-10 py-5 rounded-full text-lg font-bold cursor-none"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                background: "#FF4D00",
                color: "#F5F0EB",
                boxShadow: "0 0 40px rgba(255, 77, 0, 0.3)",
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <span>Send via WhatsApp</span>
                <ArrowUpRight
                  weight="bold"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1"
                />
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
