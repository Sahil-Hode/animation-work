import "./landing.css";
import { display, sans } from "./fonts";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

export function LandingPage() {
  return (
    <div className={`${display.variable} ${sans.variable} lp-root`}>
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
