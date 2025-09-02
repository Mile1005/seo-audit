'use client';

import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: 'script' | 'style' | 'font' | 'image' | 'document' | 'fetch';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  fetchPriority?: 'high' | 'low' | 'auto';
  media?: string;
}

interface ResourcePreloaderProps {
  resources: PreloadResource[];
  enabled?: boolean;
}

// Critical resources that should be preloaded immediately
const CRITICAL_RESOURCES: PreloadResource[] = [
  // Hero images (only preload existing ones)
  {
    href: '/images/hero/hero-laptop-dashboard.svg',
    as: 'image',
    fetchPriority: 'high'
  }
];

// DNS prefetch domains (only essential ones)
const DNS_PREFETCH_DOMAINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Preconnect domains (more important than prefetch)
const PRECONNECT_DOMAINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

export function ResourcePreloader({ resources = [], enabled = true }: ResourcePreloaderProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Mobile-optimized resource loading strategy
    const isMobile = window.innerWidth <= 768;
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g');

    // Reduce resource loading on mobile and slow connections
    if (isMobile || isSlowConnection) {
      // Only load critical resources on mobile/slow connections
      const criticalOnly = CRITICAL_RESOURCES.slice(0, 1); // Further reduce
      criticalOnly.forEach(resource => createPreloadLink(resource));
      return;
    }

    // Create preload links with error handling
    const createPreloadLink = (resource: PreloadResource) => {
      // Avoid duplicate preload links
      if (document.querySelector(`link[rel="preload"][href="${resource.href}"]`)) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      link.dataset.autoPreload = 'true';
      
      if (resource.type) link.type = resource.type;
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
      if (resource.fetchPriority) link.setAttribute('fetchpriority', resource.fetchPriority);
      if (resource.media) link.media = resource.media;
      
      // Add error handling to avoid console errors
      link.onerror = () => {
        console.warn(`[Preloader] Failed to preload resource: ${resource.href}`);
      };
      
      return link;
    };

    // Create DNS prefetch links
    const createDnsPrefetchLink = (domain: string) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      return link;
    };

    // Create preconnect links
    const createPreconnectLink = (domain: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      return link;
    };

    const fragment = document.createDocumentFragment();
    
    // Add critical resources first
    CRITICAL_RESOURCES.forEach(resource => {
      const link = createPreloadLink(resource);
      if (link) fragment.appendChild(link);
    });
    
    // Add custom resources
    resources.forEach(resource => {
      const link = createPreloadLink(resource);
      if (link) fragment.appendChild(link);
    });
    
    // Add DNS prefetch links
    DNS_PREFETCH_DOMAINS.forEach(domain => {
      fragment.appendChild(createDnsPrefetchLink(domain));
    });
    
    // Add preconnect links
    PRECONNECT_DOMAINS.forEach(domain => {
      fragment.appendChild(createPreconnectLink(domain));
    });
    
    // Add all links to head
    document.head.appendChild(fragment);
    
    console.log('[Preloader] Resources preloaded:', {
      critical: CRITICAL_RESOURCES.length,
      custom: resources.length,
      dnsPrefetch: DNS_PREFETCH_DOMAINS.length,
      preconnect: PRECONNECT_DOMAINS.length
    });

  }, [resources, enabled]);

  return null; // This component doesn't render anything
}

// Hook for programmatic resource preloading
export function useResourcePreloader() {
  const preloadResource = (resource: PreloadResource) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.type) link.type = resource.type;
    if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
    if (resource.fetchPriority) link.setAttribute('fetchpriority', resource.fetchPriority);
    
    document.head.appendChild(link);
  };

  const preloadImage = (src: string, priority: 'high' | 'low' = 'low') => {
    preloadResource({
      href: src,
      as: 'image',
      fetchPriority: priority
    });
  };

  const preloadScript = (src: string, priority: 'high' | 'low' = 'low') => {
    preloadResource({
      href: src,
      as: 'script',
      fetchPriority: priority
    });
  };

  const preloadFont = (src: string, type = 'font/woff2') => {
    preloadResource({
      href: src,
      as: 'font',
      type,
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    });
  };

  const prefetchRoute = (route: string) => {
    if (typeof window === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    link.as = 'document';
    
    document.head.appendChild(link);
  };

  return {
    preloadResource,
    preloadImage,
    preloadScript,
    preloadFont,
    prefetchRoute
  };
}

// Intelligent route prefetching based on user behavior
export function useIntelligentPrefetch() {
  const { prefetchRoute } = useResourcePreloader();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let prefetchTimer: NodeJS.Timeout;
    const prefetchedRoutes = new Set<string>();

    const handleMouseEnter = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && !prefetchedRoutes.has(link.href)) {
        prefetchTimer = setTimeout(() => {
          prefetchRoute(link.href);
          prefetchedRoutes.add(link.href);
          console.log('[Prefetch] Route prefetched:', link.href);
        }, 100); // Small delay to avoid unnecessary prefetches
      }
    };

    const handleMouseLeave = () => {
      if (prefetchTimer) {
        clearTimeout(prefetchTimer);
      }
    };

    // Add event listeners with delegation
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Prefetch visible links after idle time
    const prefetchVisibleLinks = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      
      links.forEach((link) => {
        const href = (link as HTMLAnchorElement).href;
        
        if (!prefetchedRoutes.has(href)) {
          // Check if link is in viewport
          const rect = link.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            prefetchRoute(href);
            prefetchedRoutes.add(href);
          }
        }
      });
    };

    // Prefetch visible links after 2 seconds of idle time
    const idleTimer = setTimeout(prefetchVisibleLinks, 2000);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      clearTimeout(prefetchTimer);
      clearTimeout(idleTimer);
    };
  }, [prefetchRoute]);
}

// Performance observer for monitoring resource loading
export function useResourcePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          // Log slow resources
          if (resourceEntry.duration > 1000) {
            console.warn('[Performance] Slow resource:', {
              name: resourceEntry.name,
              duration: Math.round(resourceEntry.duration),
              size: resourceEntry.transferSize,
              type: resourceEntry.initiatorType
            });
          }
          
          // Track critical resources
          if (resourceEntry.name.includes('critical') || 
              resourceEntry.name.includes('font') ||
              resourceEntry.name.includes('hero')) {
            console.log('[Performance] Critical resource loaded:', {
              name: resourceEntry.name,
              duration: Math.round(resourceEntry.duration),
              size: resourceEntry.transferSize
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);
}

export default ResourcePreloader;
