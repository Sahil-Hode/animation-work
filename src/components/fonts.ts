import { Inter, Michroma } from "next/font/google";

/** Wide, geometric display face for the wordmark and the navbar logo. */
export const display = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

/** Clean UI sans for links, buttons and the tagline. */
export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
