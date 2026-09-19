import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  /** "light" = white pill with glow, "glass" = translucent pill */
  variant?: "light" | "glass";
  size?: "sm" | "lg";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function CTAButton({
  href,
  children,
  variant = "light",
  size = "sm",
  className = "",
  onClick,
}: CTAButtonProps) {
  const classes = ["lp-btn", `lp-btn--${variant}`, `lp-btn--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
