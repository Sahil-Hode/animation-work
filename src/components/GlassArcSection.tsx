"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GlassArcSection - Futuristic Glassmorphic Arc / Energy Dome Section
 * Styled strictly with Tailwind CSS and SVG. Completely separate from Hero.
 */
export function GlassArcSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Glassmorphic Arc Showcase"
      className="relative w-full min-h-[720px] sm:min-h-[820px] lg:min-h-[920px] overflow-hidden bg-[#02030d] flex items-center justify-center py-24 select-none isolation-isolate"
    >
      {/* Background Ambient Cosmic Vignette & Grid Depth */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(15,23,60,0.45)_0%,rgba(2,3,13,0.95)_75%,#02030d_100%)] z-0"
        aria-hidden="true"
      />

      {/* Floating Ambient Stardust Particles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-blue-300/60 shadow-[0_0_8px_rgba(147,197,253,0.8)] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute top-[28%] right-[18%] w-2 h-2 rounded-full bg-indigo-200/50 shadow-[0_0_10px_rgba(199,210,254,0.7)] animate-[pulse_5s_ease-in-out_1s_infinite]" />
        <div className="absolute top-[65%] left-[16%] w-1.5 h-1.5 rounded-full bg-blue-200/50 shadow-[0_0_8px_rgba(191,219,254,0.6)] animate-[pulse_6s_ease-in-out_2s_infinite]" />
        <div className="absolute top-[72%] right-[24%] w-1 h-1 rounded-full bg-violet-200/60 shadow-[0_0_6px_rgba(233,213,255,0.8)] animate-[pulse_4.5s_ease-in-out_0.5s_infinite]" />
        <div className="absolute top-[45%] left-[8%] w-1 h-1 rounded-full bg-cyan-200/40 shadow-[0_0_6px_rgba(165,243,252,0.6)] animate-[pulse_5.5s_ease-in-out_3s_infinite]" />
        <div className="absolute top-[38%] right-[10%] w-1.5 h-1.5 rounded-full bg-blue-100/50 shadow-[0_0_8px_rgba(224,231,255,0.7)] animate-[pulse_4.2s_ease-in-out_1.5s_infinite]" />
      </div>

      {/* Main Glassmorphic Dome / Arc Visual Centerpiece */}
      <div
        className={`relative w-[560px] h-[560px] sm:w-[720px] sm:h-[720px] md:w-[860px] md:h-[860px] lg:w-[1040px] lg:h-[1040px] xl:w-[1200px] xl:h-[1200px] flex items-center justify-center pointer-events-none transition-all duration-1000 ease-out z-10 ${
          isRevealed
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        {/* Layer 1: Large Atmospheric Blue & Violet Glow behind the Dome */}
        <div
          className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle_at_50%_36%,rgba(59,130,246,0.24)_0%,rgba(99,102,241,0.16)_40%,rgba(15,23,42,0)_72%)] blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Layer 2: Translucent Glass Interior Disc */}
        <div
          className="absolute inset-[4%] rounded-full bg-gradient-to-b from-blue-500/[0.14] via-indigo-950/[0.08] to-transparent backdrop-blur-[6px] border border-blue-400/[0.12] shadow-[inset_0_2px_28px_rgba(255,255,255,0.08),0_25px_60px_rgba(0,0,25,0.6)] overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle Inner Glass Radial Vignette */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.12)_0%,rgba(15,23,42,0.4)_65%,rgba(2,3,13,0.85)_100%)] pointer-events-none" />

          {/* Internal Glass Reflection Crescent */}
          <div className="absolute top-[3%] left-[10%] right-[10%] h-[42%] rounded-full bg-gradient-to-b from-white/[0.22] via-blue-300/[0.06] to-transparent blur-xl pointer-events-none" />

          {/* Soft Secondary Reflection Arc */}
          <div className="absolute top-[8%] left-[18%] right-[18%] h-[24%] rounded-full bg-gradient-to-b from-blue-100/[0.15] to-transparent blur-md pointer-events-none" />
        </div>

        {/* Layer 3: Base Circular SVG Geometry & Gradient Defs */}
        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Primary Glowing Rim Linear Gradient */}
            <linearGradient id="glassArcRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#818cf8" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>

            {/* Upper Apex Radial Flare */}
            <radialGradient id="apexFlareGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#e0e7ff" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#818cf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>

            {/* Rotating Star Highlight Gradient */}
            <radialGradient id="starHighlightGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#c7d2fe" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 3a. Subtle Full Circular Base Rim (Electric Blue / Subtle Violet) */}
          <circle
            cx="500"
            cy="500"
            r="460"
            fill="none"
            stroke="rgba(99, 102, 241, 0.25)"
            strokeWidth="1.8"
            className="transition-opacity duration-1000"
          />

          {/* 3b. Inner Concentric Subtle Rim */}
          <circle
            cx="500"
            cy="500"
            r="438"
            fill="none"
            stroke="rgba(59, 130, 246, 0.14)"
            strokeWidth="1.2"
          />

          {/* 3c. Outer Soft Bloom Ring */}
          <circle
            cx="500"
            cy="500"
            r="460"
            fill="none"
            stroke="rgba(129, 140, 248, 0.18)"
            strokeWidth="8"
            className="blur-[6px]"
          />

          {/* 3d. Strongly Illuminated Upper Glowing Arc Section */}
          <circle
            cx="500"
            cy="500"
            r="460"
            fill="none"
            stroke="url(#glassArcRimGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="720 2200"
            strokeDashoffset="180"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] drop-shadow-[0_0_24px_rgba(165,180,252,0.8)] drop-shadow-[0_0_48px_rgba(99,102,241,0.55)]"
          />

          {/* 3e. Upper Apex White / Lavender Intense Core Highlight */}
          <ellipse
            cx="500"
            cy="40"
            rx="46"
            ry="7"
            fill="url(#apexFlareGrad)"
            className="drop-shadow-[0_0_18px_rgba(255,255,255,1)] drop-shadow-[0_0_42px_rgba(199,210,254,0.9)]"
          />
        </svg>

        {/* Layer 4: Smooth Rotating Highlight along the Circular Border */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_26s_linear_infinite]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible">
            {/* Travelling Luminous Tapered Arc Segment */}
            <circle
              cx="500"
              cy="500"
              r="460"
              fill="none"
              stroke="url(#glassArcRimGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="260 2630"
              strokeDashoffset="0"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] drop-shadow-[0_0_20px_rgba(129,140,248,0.7)]"
            />

            {/* Glowing Traveling Highlight Starlet */}
            <circle
              cx="500"
              cy="40"
              r="7.5"
              fill="url(#starHighlightGrad)"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,1)] drop-shadow-[0_0_25px_rgba(165,180,252,0.85)]"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
