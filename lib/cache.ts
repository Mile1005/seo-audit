import { cache } from "react";

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  maxSize?: number; // Maximum cache size
  revalidate?: number; // Next.js revalidation time
}

// Enhanced cache utility for performance optimization
export class PerformanceCache {
  private static instance: PerformanceCache;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private maxSize: number = 1000;

  static getInstance(): PerformanceCache {
    if (!PerformanceCache.instance) {
      PerformanceCache.instance = new PerformanceCache();
    }
    return PerformanceCache.instance;
  }

  // Enhanced memory cache with TTL
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const { ttl = 300 } = options; // Default 5 minutes TTL

    // Clean up expired entries if cache is getting full
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000, // Convert to milliseconds
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) return null;

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  // Remove expired entries
  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Clear all cache entries
  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0, // Could be enhanced with tracking
    };
  }
}

// React cache wrapper for server-side caching
export const cachedApiCall = cache(
  async <T>(
    url: string,
    options: RequestInit = {},
    cacheOptions: CacheOptions = {}
  ): Promise<T> => {
    const cacheKey = `api_${url}_${JSON.stringify(options)}`;
    const performanceCache = PerformanceCache.getInstance();

    // Try to get from cache first
    const cached = performanceCache.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from API
    const response = await fetch(url, {
      ...options,
      next: {
        revalidate: cacheOptions.revalidate || 60, // Default 1 minute revalidation
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the result
    performanceCache.set(cacheKey, data, cacheOptions);

    return data;
  }
);

// SEO data caching with longer TTL
export const cachedSEOData = cache(async (url: string): Promise<any> => {
  return cachedApiCall(
    `/api/seo-audit/get?url=${encodeURIComponent(url)}`,
    {},
    {
      ttl: 1800, // 30 minutes
      revalidate: 900, // 15 minutes revalidation
    }
  );
});

// User data caching with shorter TTL
export const cachedUserData = cache(async (userId: string): Promise<any> => {
  return cachedApiCall(
    `/api/private/me`,
    {},
    {
      ttl: 300, // 5 minutes
      revalidate: 60, // 1 minute revalidation
    }
  );
});

// Static data caching with very long TTL
export const cachedStaticData = cache(async (endpoint: string): Promise<any> => {
  return cachedApiCall(
    endpoint,
    {},
    {
      ttl: 86400, // 24 hours
      revalidate: 3600, // 1 hour revalidation
    }
  );
});

// Image metadata caching
export const cachedImageMeta = cache(async (imagePath: string): Promise<any> => {
  const cacheKey = `image_meta_${imagePath}`;
  const performanceCache = PerformanceCache.getInstance();

  const cached = performanceCache.get(cacheKey);
  if (cached) return cached;

  // Get image metadata (dimensions, format, etc.)
  const metadata = {
    path: imagePath,
    dimensions: { width: 0, height: 0 }, // Could be enhanced with actual detection
    format: imagePath.split(".").pop()?.toLowerCase(),
    timestamp: Date.now(),
  };

  performanceCache.set(cacheKey, metadata, { ttl: 3600 }); // 1 hour TTL

  return metadata;
});

// Component preload cache
export const preloadComponent = async (importFn: () => Promise<any>): Promise<void> => {
  try {
    await importFn();
  } catch (error) {
    console.warn("Component preload failed:", error);
  }
};

// Batch preload multiple components
export const batchPreloadComponents = async (
  importFns: Array<() => Promise<any>>
): Promise<void> => {
  await Promise.allSettled(importFns.map(preloadComponent));
};

export default PerformanceCache;
