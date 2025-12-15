export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSeconds?: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as unknown as {
  __rateLimitBuckets?: Map<string, Bucket>;
};

const buckets = globalForRateLimit.__rateLimitBuckets ?? new Map<string, Bucket>();
if (process.env.NODE_ENV !== "production") globalForRateLimit.__rateLimitBuckets = buckets;

function isLocalKey(key: string): boolean {
  return (
    key === "unknown" ||
    key.startsWith("ip:127.0.0.1") ||
    key.startsWith("ip:::1") ||
    key.startsWith("ip:localhost")
  );
}

export function checkRateLimit(params: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const { key, limit, windowMs } = params;

  if (process.env.NODE_ENV === "development" && isLocalKey(key)) {
    return { allowed: true, remaining: limit, resetAt: Date.now() + windowMs };
  }

  const now = Date.now();
  const current = buckets.get(key);
  const resetAt = current?.resetAt && current.resetAt > now ? current.resetAt : now + windowMs;
  const count = current?.resetAt && current.resetAt > now ? current.count : 0;

  const nextCount = count + 1;
  buckets.set(key, { count: nextCount, resetAt });

  const allowed = nextCount <= limit;
  const remaining = Math.max(0, limit - nextCount);
  const retryAfterSeconds = allowed ? undefined : Math.max(1, Math.ceil((resetAt - now) / 1000));

  return { allowed, remaining, resetAt, retryAfterSeconds };
}
