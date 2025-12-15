import Redis from "ioredis";

let client: Redis | null = null;
let connected = false;
let connectionError: Error | null = null;

// In-memory fallback store for when Redis is unavailable
const memoryStore = new Map<string, { value: string; expires?: number }>();

export function getRedis(): Redis | null {
  if (client && connected) return client;

  const url = process.env.REDIS_URL || process.env.REDIS_KV_URL;
  if (!url) {
    console.warn("REDIS_URL not configured, using memory fallback");
    return null;
  }

  if (!client) {
    try {
      client = new Redis(url, {
        connectTimeout: 5000, // 5 second timeout
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        showFriendlyErrorStack: true,
      });

      client.on("connect", () => {
        connected = true;
        connectionError = null;
        console.log("Redis connected successfully");
      });

      client.on("error", (error) => {
        connected = false;
        connectionError = error;
        console.warn("Redis connection error:", error.message);
      });

      client.on("close", () => {
        connected = false;
        console.warn("Redis connection closed");
      });
    } catch (error) {
      connectionError = error as Error;
      console.warn("Failed to create Redis client:", error);
      return null;
    }
  }

  return client;
}

// Safe Redis operations with memory fallback
export async function safeGet(key: string): Promise<string | null> {
  const redis = getRedis();

  if (redis && connected) {
    try {
      return await redis.get(key);
    } catch (error) {
      console.warn(`Redis GET error for ${key}:`, error);
    }
  }

  // Fallback to memory store
  const item = memoryStore.get(key);
  if (item && (!item.expires || Date.now() < item.expires)) {
    return item.value;
  }

  if (item && item.expires && Date.now() >= item.expires) {
    memoryStore.delete(key);
  }

  return null;
}

export async function safeSet(key: string, value: string, ex?: number): Promise<boolean> {
  const redis = getRedis();

  if (redis && connected) {
    try {
      if (ex) {
        await redis.set(key, value, "EX", ex);
      } else {
        await redis.set(key, value);
      }
      return true;
    } catch (error) {
      console.warn(`Redis SET error for ${key}:`, error);
    }
  }

  // Fallback to memory store
  const expires = ex ? Date.now() + ex * 1000 : undefined;
  memoryStore.set(key, { value, expires });
  return true;
}

export async function safeDel(key: string): Promise<boolean> {
  const redis = getRedis();

  if (redis && connected) {
    try {
      await redis.del(key);
      return true;
    } catch (error) {
      console.warn(`Redis DEL error for ${key}:`, error);
    }
  }

  // Fallback to memory store
  memoryStore.delete(key);
  return true;
}

// Health check
export function getRedisHealth(): { connected: boolean; error?: string } {
  return {
    connected,
    error: connectionError?.message,
  };
}

/**
 * Locale-aware cache operations
 * These functions automatically include locale in cache keys
 */

/**
 * Get cached value with locale support
 * @param key - Base cache key
 * @param locale - User's locale (e.g., 'en', 'es')
 * @returns Cached value or null
 */
export async function safeGetWithLocale(
  key: string,
  locale: string = "en"
): Promise<string | null> {
  const localeKey = `${key}:${locale}`;
  return safeGet(localeKey);
}

/**
 * Set cached value with locale support
 * @param key - Base cache key
 * @param locale - User's locale
 * @param value - Value to cache
 * @param ex - Expiration in seconds
 * @returns Success boolean
 */
export async function safeSetWithLocale(
  key: string,
  locale: string = "en",
  value: string,
  ex?: number
): Promise<boolean> {
  const localeKey = `${key}:${locale}`;
  return safeSet(localeKey, value, ex);
}

/**
 * Delete cached value with locale support
 * @param key - Base cache key
 * @param locale - User's locale
 * @returns Success boolean
 */
export async function safeDelWithLocale(key: string, locale: string = "en"): Promise<boolean> {
  const localeKey = `${key}:${locale}`;
  return safeDel(localeKey);
}

/**
 * Delete all cached values for a key across all locales
 * @param key - Base cache key
 * @returns Success boolean
 */
export async function safeDelAllLocales(key: string): Promise<boolean> {
  const locales = ["en", "es", "fr", "de", "it", "id"];
  const promises = locales.map((locale) => safeDelWithLocale(key, locale));
  await Promise.all(promises);
  return true;
}
