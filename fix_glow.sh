#!/bin/bash

# 1. Clean up GlowRing.tsx
sed -i 's/<div className="lp-ring__glow-left" \/><div className="lp-ring__glow-right" \/>//g' src/components/landing/GlowRing.tsx

# 2. Re-write the .lp-ring__rim styles in landing.css
# We will use awk or perl to replace the block, or just sed.
perl -0777 -i -pe 's/\/\* =========================================================\n   LOCALIZED TOP GLOW\n   ========================================================= \*\/(.*?)\/\* ---------- Inner crescent \+ comet ---------- \*\//\/* ---------- Inner crescent + comet ---------- *\//s' src/components/landing/landing.css

# Now we need to define .lp-ring__rim and its ::before properly.
# Let's just append them, ensuring we override any existing .lp-ring__rim

cat << 'CSS_EOF' >> src/components/landing/landing.css

/* =========================================================
   ACTUAL RING WITH CONIC-MASKED GLOW
   ========================================================= */

.lp-ring__rim {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: clamp(2px, 0.25vw, 4px) solid rgba(255, 255, 255, 0.96);
  box-shadow:
    0 0 5px 1px rgba(255, 255, 255, 0.95),
    0 0 15px 2px rgba(200, 190, 255, 0.4);
  pointer-events: none;
  z-index: 2;
}

.lp-ring__rim::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 1);
  box-shadow:
    0 0 12px 4px rgba(255, 255, 255, 1),
    0 0 25px 8px rgba(245, 235, 255, 0.95),
    0 0 50px 15px rgba(190, 170, 255, 0.80),
    0 0 90px 30px rgba(110, 90, 255, 0.55),
    0 0 150px 60px rgba(40, 60, 255, 0.25);
  
  /* Mask to top-left (~300-330deg) and top-right (~30-60deg).
     Softly fades out along the curve. */
  -webkit-mask-image: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 15deg,
    rgba(0,0,0,1) 40deg,
    rgba(0,0,0,1) 50deg,
    transparent 75deg,
    transparent 285deg,
    rgba(0,0,0,1) 310deg,
    rgba(0,0,0,1) 320deg,
    transparent 345deg,
    transparent 360deg
  );
  mask-image: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 15deg,
    rgba(0,0,0,1) 40deg,
    rgba(0,0,0,1) 50deg,
    transparent 75deg,
    transparent 285deg,
    rgba(0,0,0,1) 310deg,
    rgba(0,0,0,1) 320deg,
    transparent 345deg,
    transparent 360deg
  );
  pointer-events: none;
}
CSS_EOF

