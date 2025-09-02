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
  resources?: PreloadResource[];
  enabled?: boolean;
}

// Critical resources that should be preloaded immediately (reduced for mobile)
const CRITICAL_RESOURCES: PreloadResource[] = [
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

    // Create preload links with error handling
    const createPreloadLink = (resource: PreloadResource): HTMLLinkElement | null => {
      // Avoid duplicate preload links
      if (document.querySelector(`link[rel="preload"][href="${resource.href}"]`)) {
        return null;
      }

      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        link.dataset.autoPreload = 'true';
        
        if (resource.crossOrigin) {
          link.crossOrigin = resource.crossOrigin;
        }
        
        if (resource.fetchPriority) {
          (link as any).fetchPriority = resource.fetchPriority;
        }
        
        if (resource.type) {
          link.type = resource.type;
        }
        
        if (resource.media) {
          link.media = resource.media;
        }

        // Add error handling
        link.onerror = () => {
          console.warn(`Failed to preload resource: ${resource.href}`);
        };

        return link;
      } catch (error) {
        console.warn(`Error creating preload link for ${resource.href}:`, error);
        return null;
      }
    };

    // Intelligent DNS prefetching
    const addDNSPrefetch = (domain: string) => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      }
    };

    // Intelligent preconnecting
    const addPreconnect = (url: string) => {
      if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    };

    // Add DNS prefetch for critical domains
    DNS_PREFETCH_DOMAINS.forEach(addDNSPrefetch);
    
    // Add preconnect for critical domains (higher priority)
    PRECONNECT_DOMAINS.forEach(addPreconnect);

    // Progressive resource loading
    const loadResourcesProgressively = () => {
      // Reduce resource loading on mobile and slow connections
      if (isMobile || isSlowConnection) {
        // Only load critical resources on mobile/slow connections
        const criticalOnly = CRITICAL_RESOURCES.slice(0, 1);
        criticalOnly.forEach(resource => {
          const link = createPreloadLink(resource);
          if (link) document.head.appendChild(link);
        });
        return;
      }

      // Load critical resources immediately for desktop
      CRITICAL_RESOURCES.forEach(resource => {
        const link = createPreloadLink(resource);
        if (link) document.head.appendChild(link);
      });
      
      // Load additional resources with delay for non-critical
      setTimeout(() => {
        resources.forEach(resource => {
          const link = createPreloadLink(resource);
          if (link) document.head.appendChild(link);
        });
      }, 1000);
    };

    // Use requestIdleCallback for non-blocking resource loading
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadResourcesProgressively, { timeout: 2000 });
    } else {
      setTimeout(loadResourcesProgressively, 500);
    }

    // Cleanup function
    return () => {
      // Remove preload links that are no longer needed
      document.querySelectorAll('link[rel="preload"][data-auto-preload="true"]').forEach(link => {
        link.remove();
      });
    };
  }, [resources, enabled]);

  return null; // This is a utility component
}

// Hook for programmatic resource preloading
export function useResourcePreloader() {
  const preloadResource = (resource: PreloadResource) => {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    
    if (resource.crossOrigin) {
      link.crossOrigin = resource.crossOrigin;
    }
    
    document.head.appendChild(link);
  };

  const preloadImage = (src: string, priority: 'high' | 'low' = 'low') => {
    preloadResource({
      href: src,
      as: 'image',
      fetchPriority: priority
    });
  };

  const preloadFont = (href: string) => {
    preloadResource({
      href,
      as: 'font',
      crossOrigin: 'anonymous'
    });
  };

  return {
    preloadResource,
    preloadImage,
    preloadFont
  };
}

// Intelligent route prefetching based on user behavior
export function useRoutePrefetching() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mobile optimization - reduce prefetching on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    let prefetchTimeout: NodeJS.Timeout;
    
    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.hostname === window.location.hostname) {
        clearTimeout(prefetchTimeout);
        
        // Delay prefetch to avoid unnecessary requests
        prefetchTimeout = setTimeout(() => {
          if (!document.querySelector(`link[rel="prefetch"][href="${link.href}"]`)) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
          }
        }, 100);
      }
    };

    const handleMouseLeave = () => {
      clearTimeout(prefetchTimeout);
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      clearTimeout(prefetchTimeout);
    };
  }, []);
}

export default ResourcePreloader;
