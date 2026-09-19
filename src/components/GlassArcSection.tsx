"use client";

export function GlassArcSection() {
  return (
    <section className="glass-donut-section" aria-label="Glass donut">
      <div className="glass-donut" aria-hidden="true">
        <div className="glass-donut__body" />

        <svg className="glass-donut__svg" viewBox="0 0 720 360">
          <defs>
            <linearGradient id="outerRim" x1="112" y1="112" x2="606" y2="112" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3d5cff" stopOpacity="0" />
              <stop offset="0.12" stopColor="#3d5cff" stopOpacity="0.45" />
              <stop offset="0.34" stopColor="#c9c4ff" stopOpacity="0.88" />
              <stop offset="0.49" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="0.63" stopColor="#c9c4ff" stopOpacity="0.78" />
              <stop offset="0.86" stopColor="#3d5cff" stopOpacity="0.42" />
              <stop offset="1" stopColor="#3d5cff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="outerBlueGlow" x1="110" y1="142" x2="612" y2="142" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1a1aff" stopOpacity="0" />
              <stop offset="0.18" stopColor="#3d5cff" stopOpacity="0.3" />
              <stop offset="0.5" stopColor="#3d5cff" stopOpacity="0.62" />
              <stop offset="0.82" stopColor="#3d5cff" stopOpacity="0.26" />
              <stop offset="1" stopColor="#1a1aff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="middleArc" x1="154" y1="164" x2="568" y2="164" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3d5cff" stopOpacity="0" />
              <stop offset="0.22" stopColor="#3d5cff" stopOpacity="0.2" />
              <stop offset="0.52" stopColor="#c9c4ff" stopOpacity="0.4" />
              <stop offset="0.82" stopColor="#3d5cff" stopOpacity="0.18" />
              <stop offset="1" stopColor="#3d5cff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="innerArc" x1="180" y1="206" x2="540" y2="206" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ff4fd8" stopOpacity="0" />
              <stop offset="0.06" stopColor="#ff4fd8" stopOpacity="0.95" />
              <stop offset="0.14" stopColor="#7d5cff" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="#3d5cff" stopOpacity="0.28" />
              <stop offset="0.86" stopColor="#7d5cff" stopOpacity="0.35" />
              <stop offset="0.94" stopColor="#ff4fd8" stopOpacity="0.95" />
              <stop offset="1" stopColor="#ff4fd8" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="bodyFill" x1="360" y1="82" x2="360" y2="294" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3d5cff" stopOpacity="0.38" />
              <stop offset="0.42" stopColor="#1a1aff" stopOpacity="0.16" />
              <stop offset="1" stopColor="#1a1aff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="bodyBorder" x1="150" y1="142" x2="570" y2="142" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3d5cff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#c9c4ff" stopOpacity="0.28" />
              <stop offset="1" stopColor="#3d5cff" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="hotspotFill" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="0.38" stopColor="#ffd8f6" stopOpacity="0.82" />
              <stop offset="0.72" stopColor="#ff4fd8" stopOpacity="0.22" />
              <stop offset="1" stopColor="#ff4fd8" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="fadeMask" x1="0" y1="84" x2="0" y2="330" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" stopOpacity="1" />
              <stop offset="0.58" stopColor="white" stopOpacity="0.82" />
              <stop offset="1" stopColor="black" stopOpacity="0" />
            </linearGradient>

            <filter id="softBlueBlur" x="-20%" y="-70%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id="rimBloom" x="-16%" y="-80%" width="132%" height="240%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
            <filter id="hotspotBloom" x="-80%" y="-180%" width="260%" height="460%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id="pinkBloom" x="-220%" y="-220%" width="540%" height="540%">
              <feGaussianBlur stdDeviation="4" />
            </filter>

            <mask id="bottomFade">
              <rect width="720" height="360" fill="url(#fadeMask)" />
            </mask>
          </defs>

          <g mask="url(#bottomFade)">
            <path
              d="M 108 188 C 164 64 294 42 360 43 C 440 44 552 77 613 186"
              fill="none"
              stroke="url(#outerBlueGlow)"
              strokeLinecap="round"
              strokeWidth="34"
              filter="url(#softBlueBlur)"
              opacity="0.9"
            />
            <path
              d="M 126 187 C 177 81 292 60 360 60 C 441 60 546 88 622 184"
              fill="none"
              stroke="url(#bodyFill)"
              strokeLinecap="round"
              strokeWidth="78"
              opacity="0.66"
            />
            <path
              d="M 134 188 C 184 91 294 72 360 72 C 434 72 528 94 602 180"
              fill="none"
              stroke="url(#bodyBorder)"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <path
              d="M 105 180 C 158 69 286 47 360 47 C 446 48 552 78 631 178"
              fill="none"
              stroke="url(#outerRim)"
              strokeLinecap="round"
              strokeWidth="23"
              filter="url(#rimBloom)"
              opacity="0.88"
            />
            <path
              d="M 105 178 C 160 67 286 45 360 45 C 447 46 556 76 634 176"
              fill="none"
              stroke="url(#outerRim)"
              strokeLinecap="round"
              strokeWidth="9"
            />
            <path
              d="M 580 145 C 600 154 620 168 641 190"
              fill="none"
              stroke="#3d5cff"
              strokeLinecap="round"
              strokeWidth="4"
              opacity="0.38"
              filter="url(#softBlueBlur)"
            />
            <path
              d="M 158 199 C 214 121 304 103 360 103 C 427 103 508 128 565 198"
              fill="none"
              stroke="url(#middleArc)"
              strokeLinecap="round"
              strokeWidth="11"
              filter="url(#softBlueBlur)"
              opacity="0.78"
            />
            <path
              d="M 164 198 C 220 125 306 110 360 110 C 426 110 501 131 556 196"
              fill="none"
              stroke="url(#middleArc)"
              strokeLinecap="round"
              strokeWidth="3"
              opacity="0.86"
            />
            <path
              d="M 184 230 C 238 177 307 160 360 160 C 418 160 482 180 536 230"
              fill="none"
              stroke="url(#innerArc)"
              strokeLinecap="round"
              strokeWidth="7"
              filter="url(#softBlueBlur)"
              opacity="0.7"
            />
            <path
              d="M 188 229 C 241 181 309 166 360 166 C 417 166 478 184 532 229"
              fill="none"
              stroke="url(#innerArc)"
              strokeLinecap="round"
              strokeWidth="2.2"
            />

            <g className="glass-donut__hotspot">
              <ellipse
                cx="252"
                cy="70"
                rx="42"
                ry="9"
                fill="url(#hotspotFill)"
                filter="url(#hotspotBloom)"
                opacity="0.78"
                transform="rotate(-9 252 70)"
              />
              <ellipse
                cx="252"
                cy="70"
                rx="27"
                ry="4.2"
                fill="#ffffff"
                opacity="0.9"
                transform="rotate(-9 252 70)"
              />
            </g>

            <g className="glass-donut__pink glass-donut__pink--left">
              <path
                d="M 183 229 C 190 222 197 217 205 213"
                fill="none"
                stroke="#ff4fd8"
                strokeLinecap="round"
                strokeWidth="4.2"
                filter="url(#pinkBloom)"
              />
              <path
                d="M 183 229 C 190 222 197 217 205 213"
                fill="none"
                stroke="#ff4fd8"
                strokeLinecap="round"
                strokeWidth="1.9"
              />
            </g>

            <g className="glass-donut__pink glass-donut__pink--right">
              <path
                d="M 515 214 C 523 219 530 224 537 231"
                fill="none"
                stroke="#ff4fd8"
                strokeLinecap="round"
                strokeWidth="4.2"
                filter="url(#pinkBloom)"
              />
              <path
                d="M 515 214 C 523 219 530 224 537 231"
                fill="none"
                stroke="#ff4fd8"
                strokeLinecap="round"
                strokeWidth="1.9"
              />
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
}
