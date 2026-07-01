import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Philosophy } from "@/components/ui/Philosophy";
import { Marquee } from "@/components/ui/Marquee";
import { Process } from "@/components/ui/Process";
import { Work } from "@/components/ui/Work";
import { Reviews } from "@/components/ui/Reviews";
import { Services } from "@/components/ui/Services";
import { Comparison } from "@/components/ui/Comparison";
import { Pricing } from "@/components/ui/Pricing";
import { FAQ } from "@/components/ui/FAQ";
import { Footer } from "@/components/ui/Footer";
import { Loader } from "@/components/ui/Loader";
import { CTA } from "@/components/ui/CTA";

export default function Home() {
  return (
    <main
      className="w-full min-h-dvh overflow-x-clip"
      style={{ background: "#080807" }}
    >
      {/* Initial GSAP Splash Loader */}
      <Loader />
      {/* Global Navigation */}
      <Navbar />

      {/* ─── Global Fixed Ambient Glow Blobs ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-right warm orange bloom */}
        <div
          className="absolute top-[-5%] right-[-5%] w-[30vw] h-[30vw] max-w-100 max-h-100 rounded-full"
          style={{
            background: "#FF4D00",
            opacity: 0.08,
            filter: "blur(80px)",
            mixBlendMode: "screen",
          }}
        />
        {/* Mid-left teal cool bloom */}
        <div
          className="absolute top-[35%] left-[-5%] w-[25vw] h-[25vw] max-w-87.5 max-h-87.5 rounded-full"
          style={{
            background: "#14B8A6",
            opacity: 0.1,
            filter: "blur(70px)",
            mixBlendMode: "screen",
          }}
        />
        {/* Bottom-right ember bloom */}
        <div
          className="absolute bottom-[-5%] right-[10%] w-[25vw] h-[25vw] max-w-87.5 max-h-87.5 rounded-full"
          style={{
            background: "#FF4D00",
            opacity: 0.1,
            filter: "blur(80px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 w-full">
        <Hero />
      </div>

      {/* ─── Dark mid-section block: Philosophy + Marquee + Process ─── */}
      <div className="relative w-full overflow-x-clip z-10">
        {/* Philosophy Scrub Reveal */}
        <Philosophy />

        {/* Infinite Marquee */}
        <Marquee />

        {/* Process Sticky Scroll */}
        <Process />
      </div>

      {/* Horizontal Scroll Portfolio */}
      <Work />

      {/* Client Reviews / Testimonials Section */}
      <Reviews />

      {/* ─── Dark lower-section block: Services + Comparison + Pricing + FAQ + CTA ─── */}
      <div className="relative w-full overflow-x-clip z-10">
        {/* Services Bento Grid */}
        <Services />

        {/* Traditional vs Maven Studio Comparison */}
        <Comparison />

        {/* Engagement Models & Pricing */}
        <Pricing />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Massive CTA Section */}
        <CTA />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
