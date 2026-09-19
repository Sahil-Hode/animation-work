/**
 * Decorative background: a huge neon ring (only its lower rim is visible)
 * plus a smaller crescent with an orbiting "comet" highlight.
 * Pure CSS - see the .lp-ring* and .lp-arc* rules in landing.css.
 */
export function GlowRing() {
  return (
    <div aria-hidden="true">
      <div className="lp-ring-wrap">
        <div className="lp-ring">
          <div className="lp-ring__halo" />
          <div className="lp-ring__fill" />
          <div className="lp-ring__rim" />
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
