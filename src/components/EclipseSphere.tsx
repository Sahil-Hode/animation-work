"use client";

import React from "react";

export function EclipseSphere() {
  // Crescent path calculated for radius 190, center (250, 250), from 12 o'clock (-90deg) to 4 o'clock (30deg),
  // with peak thickness of 22px at ~1:30 o'clock (-45deg), tapering smoothly to 0 at both tips.
  const crescentPath =
    "M 250.0 60.0 L 266.56 60.72 L 282.99 62.89 L 299.18 66.47 L 314.98 71.46 L 330.3 77.8 " +
    "L 345.0 85.46 L 358.98 94.36 L 372.13 104.45 L 384.35 115.65 L 395.55 127.87 L 405.64 141.02 " +
    "L 414.54 155.0 L 422.2 169.7 L 428.54 185.02 L 433.53 200.82 L 437.11 217.01 L 439.28 233.44 " +
    "L 440.0 250.0 L 439.28 266.56 L 437.11 282.99 L 433.53 299.18 L 428.54 314.98 L 422.2 330.3 " +
    "L 414.54 345.0 L 414.54 345.0 L 419.6 329.08 L 423.19 313.04 L 425.39 297.0 L 426.28 281.08 " +
    "L 425.94 265.39 L 424.44 250.0 L 421.89 234.96 L 418.35 220.32 L 413.89 206.08 L 408.57 192.28 " +
    "L 402.43 178.92 L 395.49 166.0 L 387.77 153.53 L 379.27 141.53 L 369.98 130.02 L 359.88 119.05 " +
    "L 348.97 108.66 L 337.22 98.93 L 324.64 89.94 L 311.22 81.8 L 297.0 74.61 L 282.0 68.49 " +
    "L 266.31 63.58 L 250.0 60.0 Z";

  return (
    <div className="lp-eclipse-sphere-wrap" aria-hidden="true">
      <svg
        className="lp-eclipse-sphere-svg"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Layer 1: Sphere body radial gradient */}
          <radialGradient id="es-sphere-body" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#02031a" stopOpacity="0.96" />
            <stop offset="60%" stopColor="#030825" stopOpacity="0.88" />
            <stop offset="82%" stopColor="#0c1a65" stopOpacity="0.45" />
            <stop offset="94%" stopColor="#1a1aff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2535ff" stopOpacity="0.40" />
          </radialGradient>

          {/* Layer 2: Main rim line linear gradient (electric-blue to violet, brighter on right) */}
          <linearGradient id="es-main-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d5cff" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#4f6eff" stopOpacity="0.65" />
            <stop offset="78%" stopColor="#6e62ff" stopOpacity="0.90" />
            <stop offset="100%" stopColor="#8a6bff" stopOpacity="1.0" />
          </linearGradient>

          {/* Layer 3: Second circle gradient (soft blue, lower-left brighter & violet) */}
          <linearGradient id="es-second-circle" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9a6bff" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#5d72ff" stopOpacity="0.50" />
            <stop offset="80%" stopColor="#3d5cff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3d5cff" stopOpacity="0.10" />
          </linearGradient>

          {/* Layer 4: Third circle partial arc gradient */}
          <linearGradient id="es-third-circle" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6d7bff" stopOpacity="0.40" />
            <stop offset="35%" stopColor="#4d5bff" stopOpacity="0.20" />
            <stop offset="60%" stopColor="#3d4bff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#3d4bff" stopOpacity="0.0" />
          </linearGradient>

          {/* Layer 5: Crescent fill gradient */}
          <linearGradient id="es-crescent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="1.0" />
            <stop offset="75%" stopColor="#c9c4ff" stopOpacity="0.90" />
            <stop offset="100%" stopColor="#859eff" stopOpacity="0.55" />
          </linearGradient>

          {/* Layer 6: Flare bloom gradient (white core, faint pink tint, lavender halo) */}
          <radialGradient id="es-flare-bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1.0" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="50%" stopColor="#ffb8f0" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#c9c4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3d5cff" stopOpacity="0.0" />
          </radialGradient>

          {/* Layer 7: Bottom glint gradient (subtle violet-pink) */}
          <linearGradient id="es-bottom-glint" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#a45cff" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#a45cff" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#ff4fd8" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#a45cff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a45cff" stopOpacity="0.0" />
          </linearGradient>

          {/* Filters for soft glows */}
          <filter id="es-rim-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="es-crescent-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.0" result="blueGlow" />
            <feColorMatrix
              in="blueGlow"
              type="matrix"
              values="0.2 0 0 0 0.15
                      0 0.4 0 0 0.35
                      0 0 1.0 0 1.0
                      0 0 0 0.85 0"
              result="tintedGlow"
            />
            <feMerge>
              <feMergeNode in="tintedGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="es-flare-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7.0" result="flareGlow" />
            <feMerge>
              <feMergeNode in="flareGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="es-glint-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.0" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Sphere body */}
        <circle cx="250" cy="250" r="190" fill="url(#es-sphere-body)" />

        {/* 2. Main rim line (1.8px, glowing electric-blue to violet) */}
        <circle
          cx="250"
          cy="250"
          r="190"
          fill="none"
          stroke="url(#es-main-rim)"
          strokeWidth="1.8"
          filter="url(#es-rim-glow)"
        />

        {/* 3. Second circle (~85% size, shifted slightly up and left) */}
        <g className="es-circle-drift-1">
          <circle
            cx="244"
            cy="240"
            r="161.5"
            fill="none"
            stroke="url(#es-second-circle)"
            strokeWidth="1.2"
          />
        </g>

        {/* 4. Third faint circle (~105% size, offset to lower-left, partial arc) */}
        <g className="es-circle-drift-2">
          <circle
            cx="246"
            cy="255"
            r="199.5"
            fill="none"
            stroke="url(#es-third-circle)"
            strokeWidth="1.0"
          />
        </g>

        {/* 7. Bottom glint: subtle violet-pink glow on lower rim */}
        <path
          d="M 336.3 419.3 A 190 190 0 0 1 163.7 419.3"
          fill="none"
          stroke="url(#es-bottom-glint)"
          strokeWidth="2.4"
          strokeLinecap="round"
          filter="url(#es-glint-glow)"
        />

        {/* 5 & 6. Bright crescent and flare group (slowly rotates along the rim) */}
        <g className="es-crescent-group">
          {/* Layer 5: Bright crescent on upper-right edge */}
          <path
            d={crescentPath}
            fill="url(#es-crescent-grad)"
            filter="url(#es-crescent-glow)"
          />

          {/* Layer 6: Flare hot bloom at the thickest point (~1:30 o'clock, 384, 116) */}
          <g transform="translate(384, 116) rotate(42)">
            <ellipse
              cx="0"
              cy="0"
              rx="40"
              ry="18"
              fill="url(#es-flare-bloom)"
              filter="url(#es-flare-glow)"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="20"
              ry="7"
              fill="#ffffff"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
