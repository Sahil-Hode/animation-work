import { BrandWord } from "./BrandWord";
import { content } from "./content";
import { CTAButton } from "./CTAButton";
import { GlowRing } from "./GlowRing";

export function Hero() {
  return (
    <section className="lp-hero" aria-labelledby="lp-hero-title">
      <GlowRing />

      <BrandWord
        id="lp-hero-title"
        word={content.brand.wordmark}
        label={content.brand.name}
      />

      <div className="lp-bottom">
        <p className="lp-tagline">{content.hero.tagline}</p>
        <CTAButton href={content.cta.href} size="lg" className="lp-bottom__cta">
          {content.cta.label}
        </CTAButton>
        <p className="lp-guarantee">{content.hero.guarantee}</p>
      </div>

      <div className="lp-grain" aria-hidden="true" />
    </section>
  );
}
