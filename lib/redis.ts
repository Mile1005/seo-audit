import Redis from 'ioredis'

let client: Redis | null = null

export function getRedis(): Redis {
  if (client) return client
  const url = process.env.REDIS_URL || process.env.REDIS_KV_URL
  if (!url) throw new Error('REDIS_URL not configured')
  client = new Redis(url)
  return client
}
