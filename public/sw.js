const CACHE_NAME = 'seo-audit-v1.1';
const STATIC_CACHE = 'seo-audit-static-v1.1';
const DYNAMIC_CACHE = 'seo-audit-dynamic-v1.1';
const API_CACHE = 'seo-audit-api-v1.1';
const IMAGES_CACHE = 'seo-audit-images-v1.1';

// Critical assets to cache immediately for maximum performance
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
  // Critical images
  '/images/hero/hero-laptop-dashboard.svg',
  '/logo.svg',
  // Critical CSS chunks
  '/_next/static/css/',
  // Critical JS chunks
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main.js'
];

// API endpoints to cache aggressively
const CACHEABLE_APIS = [
  '/api/seo-audit/get',
  '/api/ops/health',
  '/api/ops/metrics',
  '/api/auth/session',
  '/api/case-studies'
];

// Performance-first cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first', 
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => typeof url === 'string'));
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - handle different caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // API requests - Network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Static assets - Cache first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Images - Stale while revalidate
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Pages - Network first with cache fallback
  if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request));
    return;
  }

  // Default - Network first
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Handle API requests with intelligent caching
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const isCacheableApi = CACHEABLE_APIS.some(api => url.pathname.startsWith(api));
  
  if (!isCacheableApi) {
    return fetch(request);
  }

  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
      
      // Add cache headers
      const response = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-cache': 'NETWORK',
          'sw-cache-time': new Date().toISOString()
        }
      });
      
      return response;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // Fallback to cache
    console.log('[SW] Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Add stale indicator
      const response = new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: {
          ...Object.fromEntries(cachedResponse.headers.entries()),
          'sw-cache': 'CACHE-STALE',
          'sw-cache-fallback': 'true'
        }
      });
      
      return response;
    }
    
    // No cache available
    throw error;
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Failed to fetch static asset:', request.url);
    throw error;
  }
}

// Handle images with stale-while-revalidate
async function handleImageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Start fetch in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    // Update in background
    fetchPromise;
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return fetchPromise || new Response('Image not found', { status: 404 });
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Offline fallback page
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Offline - AI SEO Turbo</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .offline { color: #666; }
        </style>
      </head>
      <body>
        <div class="offline">
          <h1>You're offline</h1>
          <p>Please check your internet connection and try again.</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Helper functions
function isStaticAsset(pathname) {
  return pathname.startsWith('/_next/static/') ||
         pathname.startsWith('/static/') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.woff2') ||
         pathname.endsWith('.woff');
}

function isImageRequest(request) {
  return request.destination === 'image' ||
         /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(request.url);
}

function isPageRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'audit-submission') {
    event.waitUntil(processAuditSubmissions());
  }
});

// Process queued audit submissions
async function processAuditSubmissions() {
  // This would integrate with IndexedDB to process queued submissions
  console.log('[SW] Processing queued audit submissions...');
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/images/badge.png',
      tag: 'audit-notification',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Results'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Cache management utilities
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'CACHE_STATS':
        event.ports[0].postMessage(getCacheStats());
        break;
      case 'CLEAR_CACHE':
        event.waitUntil(clearAllCaches());
        break;
      case 'PRELOAD_ROUTES':
        event.waitUntil(preloadRoutes(event.data.routes));
        break;
    }
  }
});

async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = keys.length;
  }
  
  return stats;
}

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('[SW] All caches cleared');
}

async function preloadRoutes(routes) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  for (const route of routes) {
    try {
      const response = await fetch(route);
      if (response.ok) {
        await cache.put(route, response);
      }
    } catch (error) {
      console.log('[SW] Failed to preload route:', route);
    }
  }
}
