"use client";

import { useEffect, useRef } from "react";
import { createEclipseIntro } from "./eclipseEngine";

/**
 * High-Fidelity Canvas Eclipse Animation Component
 * Implements the exact 18-layer volumetric big arc glow and particle physics
 * from preview.html without upward lift-off.
 */
export function GlowRing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const intro = createEclipseIntro(canvas, {
      speed: 1,
    });

    intro?.play();

    return () => {
      intro?.destroy();
    };
  }, []);

  return (
    <div className="lp-eclipse-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="lp-eclipse-canvas" />
    </div>
  );
}
