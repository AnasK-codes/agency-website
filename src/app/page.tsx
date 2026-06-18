import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Philosophy } from "@/components/ui/Philosophy";
import { Marquee } from "@/components/ui/Marquee";
import { Process } from "@/components/ui/Process";
import { Work } from "@/components/ui/Work";
import { Services } from "@/components/ui/Services";
import { Footer } from "@/components/ui/Footer";
import { Loader } from "@/components/ui/Loader";
import { CTA } from "@/components/ui/CTA";

export default function Home() {
  return (
    <main className="w-full min-h-[100dvh] overflow-x-clip" style={{ background: "#080807" }}>
      {/* Initial GSAP Splash Loader */}
      <Loader />
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Philosophy Scrub Reveal */}
      <Philosophy />

      {/* Infinite Marquee */}
      <Marquee />

      {/* Process Sticky Scroll */}
      <Process />

      {/* Horizontal Scroll Portfolio */}
      <Work />

      {/* Services Bento Grid */}
      <Services />

      {/* Massive CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
