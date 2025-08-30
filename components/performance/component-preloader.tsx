'use client';

import { useEffect } from 'react';
import { batchPreloadComponents } from '@/lib/cache';

// Critical components that should be preloaded
const criticalComponents = [
  () => import('@/components/features/features-showcase'),
  () => import('@/components/testimonials/testimonials-carousel'),
  () => import('@/components/pricing/pricing-cards'),
  () => import('@/components/demo/interactive-demo')
];

// Feature page components to preload on demand
const featureComponents = [
  () => import('@/components/features/seo-audit/audit-categories'),
  () => import('@/components/features/seo-audit/audit-preview'),
  () => import('@/components/features/seo-audit/technical-breakdown'),
  () => import('@/components/features/seo-audit/results-showcase')
];

export function ComponentPreloader({ strategy = 'idle' }: { strategy?: 'idle' | 'immediate' | 'hover' }) {
  useEffect(() => {
    const preloadCritical = async () => {
      if (strategy === 'immediate') {
        await batchPreloadComponents(criticalComponents);
      } else if (strategy === 'idle') {
        // Wait for idle time before preloading
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            batchPreloadComponents(criticalComponents);
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            batchPreloadComponents(criticalComponents);
          }, 1000);
        }
      }
    };

    preloadCritical();
  }, [strategy]);

  // Preload feature components when user navigates to features
  useEffect(() => {
    const preloadOnNavigation = () => {
      const featuresLinks = document.querySelectorAll('a[href*="/features"]');
      
      featuresLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          batchPreloadComponents(featureComponents);
        }, { once: true });
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(preloadOnNavigation, 500);
  }, []);

  return null; // This is a utility component with no render
}

// Hook for manual component preloading
export function useComponentPreloader() {
  const preloadCritical = () => batchPreloadComponents(criticalComponents);
  const preloadFeatures = () => batchPreloadComponents(featureComponents);
  
  return {
    preloadCritical,
    preloadFeatures,
    preloadAll: () => Promise.all([preloadCritical(), preloadFeatures()])
  };
}

export default ComponentPreloader;
