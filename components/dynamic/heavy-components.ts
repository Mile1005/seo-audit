"use client";

import { createDynamicComponent } from "@/lib/dynamic-imports";

// Feature components - heavy imports for code splitting
export const DynamicFeaturesShowcase = createDynamicComponent(() =>
  import("@/components/features/features-showcase").then((m) => ({ default: m.FeaturesShowcase }))
);

// Pricing components
export const DynamicPricingCards = createDynamicComponent(() =>
  import("@/components/pricing/pricing-cards").then((m) => ({ default: m.PricingCards }))
);

export const DynamicROICalculator = createDynamicComponent(() =>
  import("@/components/pricing/roi-calculator").then((m) => ({ default: m.ROICalculator }))
);

// Testimonials components
export const DynamicTestimonialsCarousel = createDynamicComponent(() =>
  import("@/components/testimonials/testimonials-carousel").then((m) => ({
    default: m.TestimonialsCarousel,
  }))
);

export const DynamicCaseStudyPreview = createDynamicComponent(() =>
  import("@/components/testimonials/case-study-preview").then((m) => ({
    default: m.CaseStudyPreview,
  }))
);

// Interactive demo component
export const DynamicInteractiveDemo = createDynamicComponent(() =>
  import("@/components/demo/interactive-demo").then((m) => ({ default: m.InteractiveDemo }))
);

// Mobile Performance Optimization Comments
// These components are optimized for mobile Core Web Vitals
// - Reduced bundle size through selective loading
// - Lazy loading with intersection observer
// - Priority-based component loading
