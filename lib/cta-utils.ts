/**
 * Utility functions for handling CTA (Call-to-Action) navigation and tracking
 */

import { trackCTA } from "./analytics";

/**
 * Main CTA destinations mapping
 */
export const CTA_DESTINATIONS = {
  START_AUDIT: "/dashboard", // Where users go to start an audit
  FREE_TRIAL: "/signup", // Signup page for free trial
  DEMO: "/demo", // Demo page or modal
  PRICING: "/pricing", // Pricing page
  CONTACT: "/contact", // Contact page
  LOGIN: "/login", // Login page
  FEATURES: "/features", // Features overview
  BLOG: "/blog", // Blog/resources
} as const;

/**
 * Handle CTA click with navigation and analytics tracking
 */
export function handleCTAClick(
  destination: keyof typeof CTA_DESTINATIONS | string,
  ctaText: string,
  location: string,
  router?: any
) {
  // Track the CTA click
  trackCTA(ctaText, location);

  // Get the destination URL
  const url =
    destination in CTA_DESTINATIONS
      ? CTA_DESTINATIONS[destination as keyof typeof CTA_DESTINATIONS]
      : destination;

  // Navigate to destination
  if (typeof window !== "undefined") {
    if (router) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  }
}

/**
 * Get proper href for CTA links
 */
export function getCTAHref(destination: keyof typeof CTA_DESTINATIONS | string): string {
  return destination in CTA_DESTINATIONS
    ? CTA_DESTINATIONS[destination as keyof typeof CTA_DESTINATIONS]
    : destination;
}

/**
 * Common CTA button props generator
 */
export function createCTAProps(
  destination: keyof typeof CTA_DESTINATIONS | string,
  ctaText: string,
  location: string,
  options: {
    router?: any;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
  } = {}
) {
  const { router, className = "", variant = "primary" } = options;

  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-purple-500",
    secondary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 focus:ring-cyan-500",
    outline:
      "bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white backdrop-blur-sm focus:ring-white/50",
  };

  return {
    href: getCTAHref(destination),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      handleCTAClick(destination, ctaText, location, router);
    },
    className: `${baseClasses} ${variantClasses[variant]} ${className}`.trim(),
    "data-cta-text": ctaText,
    "data-cta-location": location,
    "data-cta-destination": destination,
  };
}
