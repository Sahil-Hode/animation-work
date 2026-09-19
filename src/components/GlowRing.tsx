/**
 * Decorative background: a huge neon ring (only its lower rim is visible)
 * plus an inner rotating donut/torus with a bright white/lavender highlight
 * that travels around its circumference, clipped so only the upper arc is visible.
 */
export function GlowRing() {
  return (
    <div aria-hidden="true">
      {/* Outer Big Glow Ring */}
      <div className="lp-ring-wrap">
        <div className="lp-ring">
          <div className="lp-ring__halo" />
          <div className="lp-ring__fill" />
          <div className="lp-ring__rim">
            <svg
              className="lp-ring__svg"
              viewBox="0 0 1000 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="lp-head-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur1" />
                  <feGaussianBlur stdDeviation="16" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Linear gradient: low/zero opacity at bottom center (y=1000), expanding at navbar sides (y<=350) */}
                <linearGradient id="lp-navbar-taper" x1="0" y1="1000" x2="0" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="80%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Base thin crisp white ring trail (left & right paths) */}
              <path
                className="lp-ring__path lp-ring__path--left"
                d="M 500 990 A 490 490 0 0 1 500 10"
              />
              <path
                className="lp-ring__path lp-ring__path--right"
                d="M 500 990 A 490 490 0 0 0 500 10"
              />

              {/* Tapered widening stroke: thin at bottom center, expanding in width & glow toward navbar */}
              <path
                className="lp-ring__taper lp-ring__path--left"
                d="M 500 990 A 490 490 0 0 1 500 10"
                stroke="url(#lp-navbar-taper)"
              />
              <path
                className="lp-ring__taper lp-ring__path--right"
                d="M 500 990 A 490 490 0 0 0 500 10"
                stroke="url(#lp-navbar-taper)"
              />

              {/* Luminous leading-edge heads (temporary extra brightness during reveal) */}
              <path
                className="lp-ring__head lp-ring__head--left"
                d="M 500 990 A 490 490 0 0 1 500 10"
              />
              <path
                className="lp-ring__head lp-ring__head--right"
                d="M 500 990 A 490 490 0 0 0 500 10"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Inner Donut Container (Positions, reveals, and clips the rotating object) */}
      <div className="lp-arc">
        <svg
          className="lp-donut__svg"
          viewBox="0 0 600 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Multi-layer glowing filters for donut highlight and rim */}
            <filter id="lp-donut-highlight-blur-wide" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="b1" />
              <feGaussianBlur stdDeviation="24" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="lp-donut-highlight-blur-mid" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="mb1" />
              <feGaussianBlur stdDeviation="10" result="mb2" />
              <feMerge>
                <feMergeNode in="mb2" />
                <feMergeNode in="mb1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="lp-donut-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="g1" />
              <feGaussianBlur stdDeviation="8" result="g2" />
              <feMerge>
                <feMergeNode in="g2" />
                <feMergeNode in="g1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Torus body radial gradient for 3D depth and dark center */}
            <radialGradient id="lp-donut-body-grad" cx="300" cy="300" r="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(5, 7, 25, 0.0)" />
              <stop offset="78%" stopColor="rgba(15, 30, 160, 0.06)" />
              <stop offset="86%" stopColor="rgba(40, 85, 255, 0.26)" />
              <stop offset="95%" stopColor="rgba(60, 120, 255, 0.38)" />
              <stop offset="100%" stopColor="rgba(25, 60, 210, 0.12)" />
            </radialGradient>

            {/* Subtle atmospheric rim bloom gradient */}
            <radialGradient id="lp-donut-rim-bloom" cx="300" cy="300" r="275" gradientUnits="userSpaceOnUse">
              <stop offset="72%" stopColor="rgba(120, 80, 255, 0.0)" />
              <stop offset="82%" stopColor="rgba(80, 110, 255, 0.2)" />
              <stop offset="93%" stopColor="rgba(140, 90, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(40, 70, 255, 0.0)" />
            </radialGradient>

            {/* Moving Highlight Gradients: Pure White Core -> Pale Lavender -> Violet -> Electric Blue */}
            <linearGradient id="lp-highlight-core" x1="180" y1="50" x2="420" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4070ff" stopOpacity="0" />
              <stop offset="25%" stopColor="#baa0ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="75%" stopColor="#eeddff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3060ff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="lp-highlight-halo" x1="140" y1="50" x2="460" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2550ff" stopOpacity="0" />
              <stop offset="20%" stopColor="#8055ff" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#ffd8fc" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#7550ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2040ff" stopOpacity="0" />
            </linearGradient>

            {/* Viewport clip path ensuring lower portion below y=290 is strictly invisible */}
            <clipPath id="lp-arc-viewport-clip">
              <rect x="-100" y="-100" width="800" height="390" />
            </clipPath>
          </defs>

          {/* Viewport clip ensures lower portions never show behind tagline */}
          <g clipPath="url(#lp-arc-viewport-clip)">
            {/* The Entire Donut Object Rotates 360° continuously around its center (300, 300) */}
            <g className="lp-donut__spinner">
              {/* Layer 3: Atmospheric Bloom Ring */}
              <circle
                cx="300"
                cy="300"
                r="237.5"
                stroke="url(#lp-donut-rim-bloom)"
                strokeWidth="65"
                fill="none"
              />

              {/* Layer 1 & 2: Torus Body between r=215 and r=260 (Dark center, luminous body) */}
              <circle
                cx="300"
                cy="300"
                r="237.5"
                stroke="url(#lp-donut-body-grad)"
                strokeWidth="45"
                fill="none"
              />

              {/* Outer Electric Blue Circular Rim */}
              <circle
                className="lp-donut__outer-rim"
                cx="300"
                cy="300"
                r="260"
                fill="none"
                stroke="#6fa0ff"
                strokeWidth="2.2"
                strokeOpacity="0.85"
                filter="url(#lp-donut-glow)"
              />

              {/* Inner Concentric Electric Blue Rim */}
              <circle
                className="lp-donut__inner-rim"
                cx="300"
                cy="300"
                r="215"
                fill="none"
                stroke="#4575ff"
                strokeWidth="1.6"
                strokeOpacity="0.65"
                filter="url(#lp-donut-glow)"
              />

              {/* LAYER 4: The Rotating Luminous White/Lavender Highlight attached to the rim */}
              {/* Highlight Outer Flare Halo */}
              <path
                className="lp-donut__hl-halo"
                d="M 151 87 A 260 260 0 0 1 449 87"
                stroke="url(#lp-highlight-halo)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                filter="url(#lp-donut-highlight-blur-wide)"
              />

              {/* Highlight Mid Lavender Bloom */}
              <path
                className="lp-donut__hl-mid"
                d="M 181 68 A 260 260 0 0 1 419 68"
                stroke="url(#lp-highlight-halo)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                filter="url(#lp-donut-highlight-blur-mid)"
              />

              {/* Highlight Crisp Pure White Core */}
              <path
                className="lp-donut__hl-core"
                d="M 211 56 A 260 260 0 0 1 389 56"
                stroke="url(#lp-highlight-core)"
                strokeWidth="3.4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Brilliant Highlight Focal Star Flare */}
              <circle
                className="lp-donut__hl-star"
                cx="300"
                cy="40"
                r="3.5"
                fill="#ffffff"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
