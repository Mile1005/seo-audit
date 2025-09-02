'use client';

import { useEffect, useState } from 'react';
import { LazyWrapper } from '@/components/ui/lazy-wrapper';

interface LazyPageSectionProps {
  children: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
  className?: string;
}

/**
 * Optimized page section wrapper for mobile performance
 * Implements progressive loading based on priority and viewport
 */
export function LazyPageSection({ 
  children, 
  priority = 'medium',
  className = ''
}: LazyPageSectionProps) {
  const [shouldLoad, setShouldLoad] = useState(priority === 'high');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (shouldLoad || priority === 'high') return;

    const loadSection = () => {
      // On mobile, be more conservative with loading
      const delay = isMobile ? {
        medium: 2000,
        low: 4000
      } : {
        medium: 1000,
        low: 2000
      };

      setTimeout(() => {
        setShouldLoad(true);
      }, delay[priority] || 1000);
    };

    // Use intersection observer for smarter loading
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: isMobile ? '50px 0px' : '100px 0px',
          threshold: 0.1
        }
      );

      const element = document.querySelector(`[data-section-priority="${priority}"]`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    } else {
      // Fallback for browsers without IntersectionObserver
      loadSection();
    }
  }, [priority, shouldLoad, isMobile]);

  if (!shouldLoad) {
    return (
      <div 
        className={`min-h-[200px] ${className}`}
        data-section-priority={priority}
      >
        {/* Minimal loading placeholder for SEO */}
      </div>
    );
  }

  return (
    <LazyWrapper
      className={className}
      rootMargin={isMobile ? '20px 0px' : '50px 0px'}
      fadeIn={true}
      slideIn={false}
      animationDuration={200}
    >
      <div data-section-priority={priority}>
        {children}
      </div>
    </LazyWrapper>
  );
}

export default LazyPageSection;
