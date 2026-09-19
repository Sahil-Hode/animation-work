#!/bin/bash

# 1. Update GlowRing.tsx
sed -i 's/<div className="lp-ring__rim" \/>/<div className="lp-ring__glow-left" \/><div className="lp-ring__glow-right" \/><div className="lp-ring__rim" \/>/' src/components/landing/GlowRing.tsx

# 2. Update landing.css background for .lp-hero
sed -i '/background: radial-gradient(/,/);/c\
  background:\
    radial-gradient(ellipse at 15% 0%, rgba(90,70,255,0.45), transparent 45%),\
    radial-gradient(ellipse at 85% 0%, rgba(90,70,255,0.45), transparent 45%),\
    radial-gradient(120% 80% at 50% 0%, #080830 0%, var(--bg-mid) 45%, var(--bg-deep) 100%);' src/components/landing/landing.css

# 3. Append the new localized glow rules to landing.css
cat << 'CSS_EOF' >> src/components/landing/landing.css

/* Localized strong glows at the top left/right intersections */
.lp-ring__glow-left,
.lp-ring__glow-right {
  position: absolute;
  top: 15%; /* Ring crosses here at ~14.3% and 85.7% width */
  width: 400px;
  height: 400px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  
  background:
    /* Layer 1 - WHITE CORE */
    radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 8%, rgba(220,215,255,0.8) 18%, transparent 45%),
    /* Layer 2 - PURPLE HALO */
    radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(200,190,255,0.8) 12%, rgba(100,80,255,0.6) 30%, rgba(30,50,255,0.35) 55%, transparent 75%),
    /* Layer 3 - LARGE ATMOSPHERIC BLUE GLOW */
    radial-gradient(circle, rgba(90,70,255,0.5) 0%, transparent 80%);
    
  filter: blur(10px);
}

.lp-ring__glow-left {
  left: 14%;
  /* Make the bloom vertical-ish and angled with the ring */
  transform: translate(-50%, -50%) scaleX(0.65) scaleY(1.4) rotate(-35deg);
}

.lp-ring__glow-right {
  left: 86%;
  transform: translate(-50%, -50%) scaleX(0.65) scaleY(1.4) rotate(35deg);
}
CSS_EOF

