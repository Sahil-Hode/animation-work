import React from "react";

/**
 * EclipseSphere: Style Reference Matching Component
 *
 * Implements the cosmic planet / eclipse sphere matching Image 2 reference:
 * - Upper hemisphere visible with cut-to-cut alignment matching the big glowing arc.
 * - Everything below the arc is cleanly clipped / hidden as requested.
 * - Layer 1: Dark spherical body with deep navy & electric-blue glow
 * - Layer 2: Main rim perimeter with electric-blue to violet stroke
 * - Layer 3: Second inner circle (~85% size) with subtle drift
 * - Layer 4: Third faint circle (~105% size) with reverse drift
 * - Layer 5: Bright white-to-lavender crescent along upper-right quadrant
 * - Layer 6: Flare bloom at ~1:30 o'clock with white core and subtle pink halo
 */
export function EclipseSphere() {
  // Precomputed smooth cubic bezier SVG path for the upper-right crescent (12 to 4 o'clock)
  // Inner rim radius ~168px, outer rim radius 190px, peak thickness ~22px at ~1:30-2:00
  const crescentPath = "M 250.0 60.0 L 256.63 60.12 L 263.25 60.46 L 269.86 61.04 L 276.44 61.85 L 282.99 62.89 L 289.5 64.15 L 295.97 65.64 L 302.37 67.36 L 308.71 69.3 L 314.98 71.46 L 321.18 73.84 L 327.28 76.43 L 333.29 79.23 L 339.2 82.24 L 345.0 85.46 L 350.68 88.87 L 356.25 92.48 L 361.68 96.29 L 366.98 100.28 L 372.13 104.45 L 377.13 108.8 L 381.99 113.33 L 386.67 118.01 L 391.2 122.87 L 395.55 127.87 L 399.72 133.02 L 403.71 138.32 L 407.52 143.75 L 411.13 149.32 L 414.54 155.0 L 417.76 160.8 L 420.77 166.71 L 423.57 172.72 L 426.16 178.82 L 428.54 185.02 L 430.7 191.29 L 432.64 197.63 L 434.36 204.03 L 435.85 210.5 L 437.11 217.01 L 438.15 223.56 L 438.96 230.14 L 439.54 236.75 L 439.88 243.37 L 440.0 250.0 L 439.88 256.63 L 439.54 263.25 L 438.96 269.86 L 438.15 276.44 L 437.11 282.99 L 435.85 289.5 L 434.36 295.97 L 432.64 302.37 L 430.7 308.71 L 428.54 314.98 L 426.16 321.18 L 423.57 327.28 L 420.77 333.29 L 417.76 339.2 L 414.54 345.0 L 411.13 350.68 L 407.52 356.25 L 403.71 361.68 L 399.72 366.98 L 395.55 372.13 L 391.2 377.13 L 386.67 381.99 L 386.54 381.86 L 390.64 376.63 L 394.43 371.19 L 397.94 365.59 L 401.19 359.85 L 404.18 354.0 L 406.91 348.05 L 409.39 342.03 L 411.63 335.94 L 413.62 329.8 L 415.37 323.63 L 416.89 317.43 L 418.19 311.21 L 419.26 305.0 L 420.12 298.78 L 420.78 292.58 L 421.23 286.4 L 421.49 280.24 L 421.56 274.11 L 421.45 268.02 L 421.16 261.97 L 420.71 255.96 L 420.09 250.0 L 419.32 244.09 L 418.4 238.22 L 417.32 232.41 L 416.11 226.65 L 414.76 220.95 L 413.27 215.29 L 411.66 209.69 L 409.91 204.15 L 408.04 198.65 L 406.04 193.21 L 403.91 187.81 L 401.67 182.47 L 399.29 177.19 L 396.79 171.95 L 394.17 166.76 L 391.42 161.63 L 388.54 156.56 L 385.52 151.54 L 382.38 146.58 L 379.09 141.68 L 375.67 136.84 L 372.11 132.08 L 368.4 127.39 L 364.55 122.78 L 360.55 118.25 L 356.39 113.82 L 352.09 109.49 L 347.63 105.26 L 343.01 101.15 L 338.24 97.16 L 333.32 93.3 L 328.24 89.59 L 323.0 86.03 L 317.62 82.64 L 312.09 79.42 L 306.41 76.39 L 300.59 73.56 L 294.64 70.94 L 288.57 68.55 L 282.37 66.4 L 276.07 64.5 L 269.67 62.88 L 263.18 61.55 L 256.62 60.56 L 250.0 60.0 Z";

  return (
    <div className="lp-eclipse-sphere-wrap" aria-hidden="true">
      <svg
        className="lp-eclipse-sphere-svg"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arc Clip Path: cleanly hides all sphere elements below the big glowing arc */}
          <clipPath id="es-above-arc-clip">
            <path d="M -100 -100 L 600 -100 L 600 292 A 840 840 0 0 1 -100 292 Z" />
          </clipPath>

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
        </defs>

        {/* Clip everything below the arc so only the upper part is visible */}
        <g clipPath="url(#es-above-arc-clip)">
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
        </g>
      </svg>
    </div>
  );
}
