'use client';

import { useEffect } from 'react';
import { initializePerformanceMonitoring } from '@/lib/performance';

/**
 * Performance monitoring initializer component
 * This component initializes Core Web Vitals monitoring on page load
 */
export function PerformanceInitializer() {
  useEffect(() => {
    // Initialize performance monitoring with configuration
    const monitor = initializePerformanceMonitoring({
      enableAnalytics: process.env.NODE_ENV === 'production',
      enableConsoleLogging: process.env.NODE_ENV === 'development',
      thresholds: {
        lcp: 2500,
        inp: 200,  // Using INP instead of FID
        cls: 0.1,
        fcp: 1800,
        ttfb: 600,
      },
    });

    // Preload critical resources for better performance
    if (typeof window !== 'undefined') {
      // Preload critical images
      const criticalImages = [
        '/images/hero/hero-laptop-dashboard.webp',
        '/images/mockups/mobile-audit-interface.webp',
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload critical fonts if any
      const criticalFonts: string[] = [
        // Add your critical font paths here
      ];
      
      criticalFonts.forEach((href: string) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });
    }

    // Cleanup on unmount
    return () => {
      // Performance monitoring cleanup if needed
    };
  }, []);

  // This component doesn't render anything
  return null;
}

export default PerformanceInitializer;
