'use client'

import dynamic from 'next/dynamic'

// Extremely lazy load all heavy components with proper loading states
export const DynamicFeaturesShowcase = dynamic(
  () => import("../features/features-showcase"),
  {
    loading: () => (
      <div className="h-64 bg-gray-900 dark:bg-gray-900 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading features...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicInteractiveDemo = dynamic(
  () => import("../demo/interactive-demo"),
  {
    loading: () => (
      <div className="h-96 bg-gray-900 dark:bg-gray-900 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading demo...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicTestimonialsCarousel = dynamic(
  () => import("../testimonials/testimonials-carousel"),
  {
    loading: () => (
      <div className="h-48 bg-gray-900 dark:bg-gray-900 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading testimonials...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicROICalculator = dynamic(
  () => import("../pricing/roi-calculator"),
  {
    loading: () => (
      <div className="h-80 bg-gray-900 dark:bg-gray-900 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading calculator...</span>
      </div>
    ),
    ssr: false
  }
)

export const DynamicPricingCards = dynamic(
  () => import("../pricing/pricing-cards"),
  {
    loading: () => (
      <div className="h-64 bg-gray-900 dark:bg-gray-900 animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading pricing...</span>
      </div>
    ),
    ssr: false
  }
)
