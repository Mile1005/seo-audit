'use client'

import dynamic from 'next/dynamic'

// Extremely lazy load all heavy components with proper loading states
export const DynamicFeaturesShowcase = dynamic(
  () => import("@/components/features/features-showcase").then(mod => ({ default: mod.FeaturesShowcase })),
  {
    loading: () => (
      <div className="h-64 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading features...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicInteractiveDemo = dynamic(
  () => import("@/components/demo/interactive-demo").then(mod => ({ default: mod.InteractiveDemo })),
  {
    loading: () => (
      <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading demo...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicTestimonialsCarousel = dynamic(
  () => import("@/components/testimonials/testimonials-carousel").then(mod => ({ default: mod.TestimonialsCarousel })),
  {
    loading: () => (
      <div className="h-48 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading testimonials...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicROICalculator = dynamic(
  () => import("@/components/pricing/roi-calculator").then(mod => ({ default: mod.ROICalculator })),
  {
    loading: () => (
      <div className="h-80 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading calculator...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicPricingCards = dynamic(
  () => import("@/components/pricing/pricing-cards").then(mod => ({ default: mod.PricingCards })),
  {
    loading: () => (
      <div className="h-64 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading pricing...</span>
      </div>
    ),
    ssr: false
  }
)
