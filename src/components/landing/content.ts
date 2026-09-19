/**
 * All copy and links for the landing page live here.
 * Change the brand, links or labels in this one file.
 */
export const content = {
  brand: {
    /** Small logo text in the navbar */
    name: "ArgusVPN",
    /** Giant wordmark in the hero (each letter is animated separately) */
    wordmark: "ARGUS",
  },
  nav: {
    links: [
      { label: "Why ArgusVPN?", href: "#why" },
      { label: "Cost", href: "#cost" },
      { label: "Support", href: "#support" },
      { label: "Become a partner", href: "#partner" },
      { label: "Blog", href: "#blog" },
    ],
    language: { code: "EN", label: "Change language, current language English" },
    login: { label: "Login", href: "#login" },
  },
  cta: {
    /** The original design says "Instal" - fix the spelling here if you want it exact. */
    label: "Install ArgusVPN",
    href: "#install",
  },
  hero: {
    tagline: "VPN that simply works",
    guarantee: "30-days money back guarantee",
  },
} as const;
