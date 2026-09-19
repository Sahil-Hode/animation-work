import { BrandWord } from "./BrandWord";
import { content } from "./content";
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

      <div className="lp-grain" aria-hidden="true" />
    </section>
  );
}
