'use client';

import { useEffect } from 'react';
import { injectCriticalCSS, preloadNonCriticalCSS } from '@/lib/critical-css';

/**
 * CSS Optimizer Component
 * Removes unused CSS and optimizes critical rendering path for mobile
 */
export function CSSOptimizer() {
  useEffect(() => {
    // Inject critical CSS immediately for faster initial render
    injectCriticalCSS();

    // Remove unused CSS classes and optimize critical path
    const optimizeCSS = () => {
      // Remove unused Tailwind classes from DOM (for production only)
      if (process.env.NODE_ENV === 'production') {
        const unusedClasses = [
          // Animation classes that might not be used
          'animate-bounce',
          'animate-ping',
          // Large spacing classes for mobile
          'p-32', 'p-40', 'p-48', 'p-56', 'p-64',
          'm-32', 'm-40', 'm-48', 'm-56', 'm-64',
          // Rarely used position classes
          'top-96', 'left-96', 'right-96', 'bottom-96',
          // Large text sizes for mobile
          'text-8xl', 'text-9xl',
        ];
        
        // Remove unused styles from stylesheets
        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(element => {
          if (element instanceof HTMLStyleElement && element.sheet) {
            try {
              const rules = element.sheet.cssRules || element.sheet.rules;
              for (let i = rules.length - 1; i >= 0; i--) {
                const rule = rules[i];
                if (rule instanceof CSSStyleRule) {
                  const selector = rule.selectorText;
                  unusedClasses.forEach(className => {
                    if (selector.includes(className) && !document.querySelector(`.${className}`)) {
                      element.sheet?.deleteRule(i);
                    }
                  });
                }
              }
            } catch (e) {
              // Cross-origin stylesheets may throw errors, ignore them
            }
          }
        });
      }
    };

    // Optimize fonts loading for better mobile performance
    const optimizeFonts = () => {
      // Add font-display: swap to improve loading performance
      const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      fontLinks.forEach(link => {
        if (link instanceof HTMLLinkElement) {
          const href = link.href;
          if (!href.includes('display=swap')) {
            const separator = href.includes('?') ? '&' : '?';
            link.href = `${href}${separator}display=swap`;
          }
        }
      });

      // Preload critical fonts
      const preloadFont = (href: string, family: string) => {
        if (!document.querySelector(`link[rel="preload"][href*="${family}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          link.href = href;
          document.head.appendChild(link);
        }
      };

      // Only preload if using Google Fonts (adjust based on your fonts)
      // preloadFont('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', 'Inter');
    };

    // Optimize critical CSS loading path for mobile
    const optimizeCriticalCSS = () => {
      // Move non-critical CSS to load asynchronously
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach(link => {
        if (link instanceof HTMLLinkElement) {
          const href = link.href;
          
          // Skip critical CSS files (globals.css contains critical styles)
          if (href.includes('globals.css') || href.includes('critical')) {
            return;
          }
          
          // For mobile performance, load non-critical CSS with lower priority
          if (window.innerWidth <= 768) {
            // On mobile, defer non-critical CSS even more
            link.media = 'print';
            link.onload = function() {
              if (link instanceof HTMLLinkElement) {
                link.media = 'all';
              }
            };
          }
        }
      });
    };

    // Run optimizations after page load
    if (document.readyState === 'complete') {
      optimizeCSS();
      optimizeFonts();
      preloadNonCriticalCSS();
    } else {
      window.addEventListener('load', () => {
        optimizeCSS();
        optimizeFonts();
        preloadNonCriticalCSS();
      });
    }

    // Run critical CSS optimization immediately
    setTimeout(optimizeCriticalCSS, 100);

    // Mobile-specific CSS optimizations
    const optimizeForMobile = () => {
      if (window.innerWidth <= 768) {
        // Reduce animations on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
          @media (max-width: 768px) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Apply mobile optimizations
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);

    return () => {
      window.removeEventListener('resize', optimizeForMobile);
    };

  }, []);

  return null; // This is a utility component
}

export default CSSOptimizer;
