'use client';

import { useEffect } from 'react';
import { batchPreloadComponents } from '@/lib/cache';

// Critical components that should be preloaded (reduced list for mobile performance)
const criticalComponents = [
  () => import('@/components/features/features-showcase'),
  () => import('@/components/testimonials/testimonials-carousel'),
];

// Feature page components to preload on demand (reduced for mobile)
const featureComponents = [
  () => import('@/components/features/seo-audit/audit-categories'),
  () => import('@/components/features/seo-audit/audit-preview'),
];

// Heavy components to load later (non-critical)
const heavyComponents = [
  () => import('@/components/pricing/pricing-cards'),
  () => import('@/components/demo/interactive-demo'),
  () => import('@/components/features/seo-audit/technical-breakdown'),
  () => import('@/components/features/seo-audit/results-showcase'),
];

export function ComponentPreloader({ strategy = 'idle' }: { strategy?: 'idle' | 'immediate' | 'hover' }) {
  useEffect(() => {
    const preloadCritical = async () => {
      if (strategy === 'immediate') {
        await batchPreloadComponents(criticalComponents);
      } else if (strategy === 'idle') {
        // Use multiple strategies for optimal loading
        if ('requestIdleCallback' in window) {
          // Load critical components when browser is idle
          window.requestIdleCallback(() => {
            batchPreloadComponents(criticalComponents);
          }, { timeout: 2000 });
          
          // Load heavy components with lower priority
          window.requestIdleCallback(() => {
            batchPreloadComponents(heavyComponents);
          }, { timeout: 5000 });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            batchPreloadComponents(criticalComponents);
          }, 1000);
          
          setTimeout(() => {
            batchPreloadComponents(heavyComponents);
          }, 3000);
        }
      }
    };

    preloadCritical();
  }, [strategy]);

  // Intelligent preloading based on user interactions
  useEffect(() => {
    const preloadOnInteraction = () => {
      let hasInteracted = false;
      
      const handleInteraction = () => {
        if (!hasInteracted) {
          hasInteracted = true;
          // Preload feature components on first user interaction
          batchPreloadComponents(featureComponents);
          
          // Remove listeners after first interaction
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('scroll', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        }
      };
      
      // Listen for various user interactions
      document.addEventListener('click', handleInteraction, { passive: true });
      document.addEventListener('scroll', handleInteraction, { passive: true });
      document.addEventListener('keydown', handleInteraction, { passive: true });
      document.addEventListener('touchstart', handleInteraction, { passive: true });
    };

    // Delay to ensure DOM is ready
    setTimeout(preloadOnInteraction, 500);
  }, []);

  // Preload components when user hovers over related links
  useEffect(() => {
    const preloadOnHover = () => {
      const relevantLinks = document.querySelectorAll('a[href*="/features"], a[href*="/pricing"], a[href*="/demo"]');
      
      relevantLinks.forEach(link => {
        let hasPreloaded = false;
        
        const handleMouseEnter = () => {
          if (!hasPreloaded) {
            hasPreloaded = true;
            const href = link.getAttribute('href');
            
            if (href?.includes('/features')) {
              batchPreloadComponents(featureComponents);
            } else if (href?.includes('/pricing')) {
              batchPreloadComponents([() => import('@/components/pricing/pricing-cards')]);
            } else if (href?.includes('/demo')) {
              batchPreloadComponents([() => import('@/components/demo/interactive-demo')]);
            }
          }
        };
        
        link.addEventListener('mouseenter', handleMouseEnter, { 
          once: true, 
          passive: true 
        });
      });
    };

    // Delay to ensure DOM is ready
    setTimeout(preloadOnHover, 1000);
  }, []);

  return null; // This is a utility component with no render
}

// Hook for manual component preloading
export function useComponentPreloader() {
  const preloadCritical = () => batchPreloadComponents(criticalComponents);
  const preloadFeatures = () => batchPreloadComponents(featureComponents);
  const preloadHeavy = () => batchPreloadComponents(heavyComponents);
  
  return {
    preloadCritical,
    preloadFeatures,
    preloadHeavy,
    preloadAll: () => Promise.all([preloadCritical(), preloadFeatures(), preloadHeavy()])
  };
}

export default ComponentPreloader;
