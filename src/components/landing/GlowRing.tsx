/**
 * Decorative background: a huge neon ring (only its lower rim is visible)
 * plus a smaller crescent with an orbiting "comet" highlight.
 */
export function GlowRing() {
  return (
    <div aria-hidden="true">
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

      <div className="lp-arc">
        <div className="lp-arc__shape" />
        <div className="lp-arc__orbit">
          <div className="lp-arc__comet" />
        </div>
      </div>
    </div>
  );
}
