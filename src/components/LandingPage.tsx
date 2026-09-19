import "./landing.css";
import { display, sans } from "./fonts";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { GlassArcSection } from "./GlassArcSection";

export function LandingPage() {
  return (
    <div className={`${display.variable} ${sans.variable} lp-root`}>
      <Navbar />
      <main>
        <Hero />
        <GlassArcSection />
      </main>
    </div>
  );
}
