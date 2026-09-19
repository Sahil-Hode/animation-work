/**
 * Decorative background: a huge neon ring (only its lower rim is visible)
 * plus an inner rotating donut/torus with a refined, subtle luminous highlight
 * that travels around its circumference, softly fading before reaching the tagline.
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

      {/* Inner Donut Container (Positions, reveals, and softly masks the rotating object) */}
      <div className="lp-arc">
        <svg
          className="lp-donut__svg"
          viewBox="0 0 600 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft, refined glowing filter for the rotating highlight */}
            <filter id="lp-donut-hl-bloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="b1" />
              <feGaussianBlur stdDeviation="12" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle glow filter for the rims */}
            <filter id="lp-donut-rim-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="g1" />
              <feMerge>
                <feMergeNode in="g1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Sleek torus body gradient with deep dark center */}
            <radialGradient id="lp-donut-body-grad" cx="300" cy="300" r="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(5, 7, 25, 0.0)" />
              <stop offset="82%" stopColor="rgba(20, 45, 160, 0.04)" />
              <stop offset="90%" stopColor="rgba(40, 80, 230, 0.18)" />
              <stop offset="97%" stopColor="rgba(50, 100, 255, 0.26)" />
              <stop offset="100%" stopColor="rgba(30, 65, 200, 0.08)" />
            </radialGradient>

            {/* Refined Highlight Gradient: White Core -> Pale Lavender -> Soft Cyan-Blue */}
            <linearGradient id="lp-highlight-core" x1="220" y1="40" x2="380" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4570ff" stopOpacity="0" />
              <stop offset="30%" stopColor="#c5b5ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="70%" stopColor="#eeddff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4570ff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="lp-highlight-halo" x1="190" y1="40" x2="410" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2550ff" stopOpacity="0" />
              <stop offset="25%" stopColor="#8055ff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ffd4fc" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#7550ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2040ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* The Entire Donut Object Rotates 360° continuously around its center (300, 300) */}
          <g className="lp-donut__spinner">
            {/* Torus Body between r=218 and r=260 (Clean, dark center, subtle translucent body) */}
            <circle
              cx="300"
              cy="300"
              r="239"
              stroke="url(#lp-donut-body-grad)"
              strokeWidth="42"
              fill="none"
            />

            {/* Outer Electric Blue Circular Rim */}
            <circle
              className="lp-donut__outer-rim"
              cx="300"
              cy="300"
              r="260"
              fill="none"
              stroke="#6595ff"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              filter="url(#lp-donut-rim-glow)"
            />

            {/* Inner Concentric Electric Blue Rim */}
            <circle
              className="lp-donut__inner-rim"
              cx="300"
              cy="300"
              r="218"
              fill="none"
              stroke="#4070ff"
              strokeWidth="1.3"
              strokeOpacity="0.5"
              filter="url(#lp-donut-rim-glow)"
            />

            {/* ROTATING LUMINOUS HIGHLIGHT (Balanced & Refined, NOT blinding) */}
            {/* Soft Lavender Halo */}
            <path
              className="lp-donut__hl-halo"
              d="M 205 60 A 260 260 0 0 1 395 60"
              stroke="url(#lp-highlight-halo)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              filter="url(#lp-donut-hl-bloom)"
            />

            {/* Crisp Pure White Core */}
            <path
              className="lp-donut__hl-core"
              d="M 233 48 A 260 260 0 0 1 367 48"
              stroke="url(#lp-highlight-core)"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Focal Specular Star */}
            <circle
              className="lp-donut__hl-star"
              cx="300"
              cy="40"
              r="2.5"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
