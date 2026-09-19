import type { CSSProperties } from "react";

type BrandWordProps = {
  id?: string;
  /** The text that is spread across the screen, e.g. "ARGUS" */
  word: string;
  /** Accessible name read by screen readers (letters are hidden from them) */
  label: string;
};

export function BrandWord({ id, word, label }: BrandWordProps) {
  return (
    <h1 id={id} className="lp-wordmark" aria-label={label}>
      {Array.from(word).map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          style={{ "--i": i } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
