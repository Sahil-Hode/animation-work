"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { content } from "./content";
import { CTAButton } from "./CTAButton";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="lp-nav">
      <nav className="lp-nav__bar" aria-label="Main">
        <Link href="/" className="lp-nav__logo" aria-label={`${content.brand.name} home`}>
          {content.brand.name}
        </Link>

        {/* Desktop links */}
        <ul className="lp-nav__links">
          {content.nav.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="lp-nav__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="lp-nav__actions">
          <button
            type="button"
            className="lp-nav__lang"
            aria-label={content.nav.language.label}
          >
            {content.nav.language.code}
          </button>
          <Link href={content.nav.login.href} className="lp-nav__link">
            {content.nav.login.label}
          </Link>
          <CTAButton href={content.cta.href} size="sm">
            {content.cta.label}
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lp-nav__toggle"
          aria-expanded={open}
          aria-controls="lp-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          data-open={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile panel */}
      <div id="lp-nav-panel" className="lp-nav__panel" data-open={open}>
        <ul>
          {content.nav.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="lp-nav__panel-link" onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={content.nav.login.href}
              className="lp-nav__panel-link"
              onClick={close}
            >
              {content.nav.login.label}
            </Link>
          </li>
        </ul>
        <CTAButton href={content.cta.href} size="lg" onClick={close}>
          {content.cta.label}
        </CTAButton>
      </div>
    </header>
  );
}
