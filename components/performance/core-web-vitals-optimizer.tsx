'use client';

import { useEffect, useState } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

interface WebVitalsData {
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
  timestamp: number;
}

interface PerformanceOptimization {
  metric: string;
  current: number;
  target: number;
  status: 'good' | 'needs-improvement' | 'poor';
  suggestions: string[];
}

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

export function CoreWebVitalsOptimizer() {
  const [vitals, setVitals] = useState<WebVitalsData>({
    cls: null,
    inp: null,
    fcp: null,
    lcp: null,
    ttfb: null,
    timestamp: Date.now()
  });

  const [optimizations, setOptimizations] = useState<PerformanceOptimization[]>([]);

  useEffect(() => {
    // Collect Web Vitals
    const handleMetric = (metric: Metric) => {
      const value = metric.name === 'CLS' ? metric.value : Math.round(metric.value);
      
      setVitals(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: value,
        timestamp: Date.now()
      }));

      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.value),
          metric_id: metric.id,
          metric_delta: Math.round(metric.delta),
          custom_parameter: 'core_web_vitals'
        });
      }

      // Only log in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value));
      }
    };

    // Register observers
    onCLS(handleMetric);
    onINP(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);

    // Monitor LCP element and optimize
    optimizeLCP();
    
    // Monitor CLS and fix layout shifts
    optimizeCLS();
    
    // Optimize INP
    optimizeINP();

  }, []);

  // Generate optimization suggestions based on current metrics
  useEffect(() => {
    if (!vitals.lcp && !vitals.cls && !vitals.inp) return;

    const newOptimizations: PerformanceOptimization[] = [];

    // LCP optimizations
    if (vitals.lcp) {
      const status = vitals.lcp <= THRESHOLDS.LCP.good ? 'good' : 
                    vitals.lcp <= THRESHOLDS.LCP.poor ? 'needs-improvement' : 'poor';
      
      const suggestions = status !== 'good' ? [
        'Optimize hero images with modern formats (WebP/AVIF)',
        'Preload critical resources',
        'Reduce server response times',
        'Use content delivery network (CDN)',
        'Optimize critical rendering path'
      ] : ['LCP is performing well'];

      newOptimizations.push({
        metric: 'LCP',
        current: vitals.lcp,
        target: THRESHOLDS.LCP.good,
        status,
        suggestions
      });
    }

    // CLS optimizations
    if (vitals.cls !== null) {
      const status = vitals.cls <= THRESHOLDS.CLS.good ? 'good' : 
                    vitals.cls <= THRESHOLDS.CLS.poor ? 'needs-improvement' : 'poor';
      
      const suggestions = status !== 'good' ? [
        'Set explicit dimensions for images and video',
        'Avoid inserting content above existing content',
        'Use CSS transforms instead of layout-triggering properties',
        'Preload web fonts to avoid FOIT/FOUT'
      ] : ['CLS is performing well'];

      newOptimizations.push({
        metric: 'CLS',
        current: vitals.cls,
        target: THRESHOLDS.CLS.good,
        status,
        suggestions
      });
    }

    // INP optimizations
    if (vitals.inp) {
      const status = vitals.inp <= THRESHOLDS.INP.good ? 'good' : 
                    vitals.inp <= THRESHOLDS.INP.poor ? 'needs-improvement' : 'poor';
      
      const suggestions = status !== 'good' ? [
        'Break up long JavaScript tasks',
        'Use web workers for heavy computations',
        'Defer non-critical JavaScript',
        'Optimize third-party scripts'
      ] : ['INP is performing well'];

      newOptimizations.push({
        metric: 'INP',
        current: vitals.inp,
        target: THRESHOLDS.INP.good,
        status,
        suggestions
      });
    }

    setOptimizations(newOptimizations);
  }, [vitals]);

  return null; // This component handles optimizations in the background
}

// LCP Optimization functions
const optimizeLCP = () => {
  if (typeof window === 'undefined') return;

  // Monitor LCP element
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    
    if (lastEntry?.element) {
      const lcpElement = lastEntry.element;
      
      // Optimize LCP element
      if (lcpElement.tagName === 'IMG') {
        // Ensure images have proper loading attributes
        if (!lcpElement.loading || lcpElement.loading === 'lazy') {
          lcpElement.loading = 'eager';
        }
        
        // Add fetchpriority if supported
        if ('fetchPriority' in lcpElement) {
          lcpElement.fetchPriority = 'high';
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('[LCP Optimizer] Image optimized:', lcpElement.src);
        }
      }
      
      // Preload LCP resource if it's not already preloaded (only in production)
      const src = lcpElement.src || lcpElement.currentSrc;
      if (src && !document.querySelector(`link[href="${src}"]`) && process.env.NODE_ENV === 'production') {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = lcpElement.tagName === 'IMG' ? 'image' : 'fetch';
        preloadLink.href = src;
        
        if (lcpElement.tagName === 'IMG') {
          preloadLink.setAttribute('fetchpriority', 'high');
        }
        
        document.head.appendChild(preloadLink);
        console.log('[LCP Optimizer] Resource preloaded:', src);
      }
    }
  });

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.warn('[LCP Optimizer] PerformanceObserver not supported');
  }
};

// CLS Optimization functions
const optimizeCLS = () => {
  if (typeof window === 'undefined') return;

  // Monitor layout shifts
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as any;
      
      if (!layoutShift.hadRecentInput) {
        // Identify elements causing layout shift
        for (const source of layoutShift.sources || []) {
          const element = source.node;
          
          if (element && element.tagName === 'IMG') {
            // Fix images without dimensions
            if (!element.width || !element.height) {
              console.warn('[CLS Optimizer] Image without dimensions:', element.src);
              
              // Try to get natural dimensions
              element.onload = () => {
                if (!element.width) element.width = element.naturalWidth;
                if (!element.height) element.height = element.naturalHeight;
              };
            }
          }
          
          // Log layout shift sources
          console.log('[CLS Optimizer] Layout shift source:', {
            element: element?.tagName,
            className: element?.className,
            score: layoutShift.value
          });
        }
      }
    }
  });

  try {
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.warn('[CLS Optimizer] PerformanceObserver not supported');
  }

  // Fix common CLS issues
  fixImageDimensions();
  optimizeFonts();
};

// INP Optimization functions
const optimizeINP = () => {
  if (typeof window === 'undefined') return;

  // Break up long tasks (only warn for very long tasks in production)
  const longTaskObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Only warn for tasks longer than 100ms (instead of 50ms default)
      if (entry.duration > 100) {
        console.warn('[INP Optimizer] Long task detected:', {
          duration: Math.round(entry.duration),
          startTime: Math.round(entry.startTime)
        });
      }
    }
  });

  try {
    // Only monitor in production to reduce development noise
    if (process.env.NODE_ENV === 'production') {
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    }
  } catch (error) {
    console.warn('[INP Optimizer] PerformanceObserver not supported');
  }

  // Optimize event handlers
  optimizeEventHandlers();
};

// Helper functions
const fixImageDimensions = () => {
  const images = document.querySelectorAll('img:not([width]):not([height])');
  
  images.forEach((img: any) => {
    if (img.complete && img.naturalWidth) {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
    } else {
      img.addEventListener('load', () => {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      });
    }
  });
};

const optimizeFonts = () => {
  // Ensure font-display: swap is applied
  const fontFaces = document.querySelectorAll('link[rel="stylesheet"]');
  
  fontFaces.forEach((link: any) => {
    if (link.href.includes('fonts.googleapis.com')) {
      // Add display=swap parameter if missing
      if (!link.href.includes('display=swap')) {
        const url = new URL(link.href);
        url.searchParams.set('display', 'swap');
        link.href = url.toString();
      }
    }
  });
};

const optimizeEventHandlers = () => {
  // Use passive listeners for scroll events
  const elements = document.querySelectorAll('[data-scroll-listener]');
  
  elements.forEach((element) => {
    // Remove existing listeners and add passive ones
    const newElement = element.cloneNode(true);
    element.parentNode?.replaceChild(newElement, element);
    
    newElement.addEventListener('scroll', () => {
      // Handle scroll passively
    }, { passive: true });
  });
};

// Export utilities for manual optimization
export const webVitalsOptimizer = {
  optimizeLCP,
  optimizeCLS,
  optimizeINP,
  fixImageDimensions,
  optimizeFonts,
  optimizeEventHandlers
};

export default CoreWebVitalsOptimizer;
