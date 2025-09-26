import Redis from 'ioredis'

let client: Redis | null = null
let connected = false
let connectionError: Error | null = null

// In-memory fallback store for when Redis is unavailable
const memoryStore = new Map<string, { value: string; expires?: number }>()

export function getRedis(): Redis | null {
  if (client && connected) return client
  
  const url = process.env.REDIS_URL || process.env.REDIS_KV_URL
  if (!url) {
    console.warn('REDIS_URL not configured, using memory fallback')
    return null
  }
  
  if (!client) {
    try {
      client = new Redis(url, {
        connectTimeout: 5000, // 5 second timeout
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        enableReadyCheck: false,
        showFriendlyErrorStack: true
      })

      client.on('connect', () => {
        connected = true
        connectionError = null
        console.log('Redis connected successfully')
      })

      client.on('error', (error) => {
        connected = false
        connectionError = error
        console.warn('Redis connection error:', error.message)
      })

      client.on('close', () => {
        connected = false
        console.warn('Redis connection closed')
      })
    } catch (error) {
      connectionError = error as Error
      console.warn('Failed to create Redis client:', error)
      return null
    }
  }
  
  return client
}

// Safe Redis operations with memory fallback
export async function safeGet(key: string): Promise<string | null> {
  const redis = getRedis()
  
  if (redis && connected) {
    try {
      return await redis.get(key)
    } catch (error) {
      console.warn(`Redis GET error for ${key}:`, error)
    }
  }
  
  // Fallback to memory store
  const item = memoryStore.get(key)
  if (item && (!item.expires || Date.now() < item.expires)) {
    return item.value
  }
  
  if (item && item.expires && Date.now() >= item.expires) {
    memoryStore.delete(key)
  }
  
  return null
}

export async function safeSet(key: string, value: string, ex?: number): Promise<boolean> {
  const redis = getRedis()
  
  if (redis && connected) {
    try {
      if (ex) {
        await redis.set(key, value, 'EX', ex)
      } else {
        await redis.set(key, value)
      }
      return true
    } catch (error) {
      console.warn(`Redis SET error for ${key}:`, error)
    }
  }
  
  // Fallback to memory store
  const expires = ex ? Date.now() + (ex * 1000) : undefined
  memoryStore.set(key, { value, expires })
  return true
}

export async function safeDel(key: string): Promise<boolean> {
  const redis = getRedis()
  
  if (redis && connected) {
    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.warn(`Redis DEL error for ${key}:`, error)
    }
  }
  
  // Fallback to memory store
  memoryStore.delete(key)
  return true
}

// Health check
export function getRedisHealth(): { connected: boolean; error?: string } {
  return {
    connected,
    error: connectionError?.message
  }
}
