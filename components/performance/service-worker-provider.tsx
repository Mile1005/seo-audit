'use client';

import { useEffect, useState } from 'react';

interface SwStats {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  cacheStats: Record<string, number>;
  lastUpdate?: string;
}

export function ServiceWorkerProvider() {
  const [swStats, setSwStats] = useState<SwStats>({
    isSupported: false,
    isRegistered: false,
    isOnline: true,
    cacheStats: {}
  });

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      setSwStats(prev => ({ ...prev, isSupported: true }));
      registerServiceWorker();
    }

    // Online/offline detection
    const handleOnline = () => setSwStats(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setSwStats(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      setSwStats(prev => ({ 
        ...prev, 
        isRegistered: true,
        lastUpdate: new Date().toISOString()
      }));

      console.log('[SW] Service Worker registered successfully:', registration);

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              console.log('[SW] New version available');
              if (confirm('A new version is available. Reload to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });

      // Get cache stats periodically
      setInterval(async () => {
        const stats = await getCacheStats();
        setSwStats(prev => ({ ...prev, cacheStats: stats }));
      }, 30000); // Every 30 seconds

    } catch (error) {
      console.error('[SW] Service Worker registration failed:', error);
    }
  };

  const getCacheStats = async (): Promise<Record<string, number>> => {
    if (!navigator.serviceWorker.controller) return {};

    return new Promise((resolve) => {
      const channel = new MessageChannel();
      
      channel.port1.onmessage = (event) => {
        resolve(event.data || {});
      };

      navigator.serviceWorker.controller!.postMessage(
        { type: 'CACHE_STATS' },
        [channel.port2]
      );

      // Timeout fallback
      setTimeout(() => resolve({}), 5000);
    });
  };

  const clearCache = async () => {
    if (!navigator.serviceWorker.controller) return;

    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
    
    // Update stats after clearing
    setTimeout(async () => {
      const stats = await getCacheStats();
      setSwStats(prev => ({ ...prev, cacheStats: stats }));
    }, 1000);
  };

  const preloadRoutes = (routes: string[]) => {
    if (!navigator.serviceWorker.controller) return;

    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_ROUTES',
      routes
    });
  };

  // Expose utilities to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).swUtils = {
        stats: swStats,
        clearCache,
        preloadRoutes,
        getCacheStats
      };
    }
  }, [swStats]);

  return null; // This is a utility component
}

// Hook for components to use service worker features
export function useServiceWorker() {
  const [isOnline, setIsOnline] = useState(true);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Get registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(setSwRegistration);
    }

    // Online status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const preloadRoute = (route: string) => {
    if (swRegistration && swRegistration.active) {
      swRegistration.active.postMessage({
        type: 'PRELOAD_ROUTES',
        routes: [route]
      });
    }
  };

  const showNotification = async (title: string, options: NotificationOptions = {}) => {
    if (!swRegistration || !('Notification' in window)) return;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return swRegistration.showNotification(title, {
        icon: '/favicon.ico',
        badge: '/images/badge.png',
        ...options
      });
    }
  };

  return {
    isOnline,
    isRegistered: !!swRegistration,
    preloadRoute,
    showNotification
  };
}

// Background sync hook for offline form submissions
export function useBackgroundSync() {
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(setSwRegistration);
    }
  }, []);

  const scheduleSync = async (tag: string, data?: any) => {
    if (!swRegistration || !('serviceWorker' in navigator)) {
      console.warn('[SW] Background sync not supported');
      return false;
    }

    try {
      // TypeScript doesn't have sync types, so we'll use any
      await (swRegistration as any).sync?.register(tag);
      
      // Store data in IndexedDB for the sync event
      if (data) {
        // This would integrate with IndexedDB
        console.log('[SW] Sync scheduled:', tag, data);
      }
      
      return true;
    } catch (error) {
      console.error('[SW] Failed to schedule sync:', error);
      return false;
    }
  };

  return { scheduleSync };
}

export default ServiceWorkerProvider;
