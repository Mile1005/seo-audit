import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Skip rate limiting for localhost/development
function isLocalhost(ip: string, req: NextRequest): boolean {
  const localhostIPs = ["127.0.0.1", "::1", "localhost", "::ffff:127.0.0.1"];
  if (localhostIPs.includes(ip)) return true;

  // Check host header for localhost
  const host = req.headers.get("host") || "";
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) return true;

  // Check for development environment
  if (process.env.NODE_ENV === "development") return true;

  return false;
}

export function rateLimit(limit: number = 5, windowMs: number = 60000) {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

      // Skip rate limiting for localhost/admin
      if (isLocalhost(ip, req)) {
        return handler(req);
      }

      const now = Date.now();
      const windowStart = now - windowMs;

      // Clean up old entries
      for (const [key, value] of rateLimitMap.entries()) {
        if (value.lastReset < windowStart) {
          rateLimitMap.delete(key);
        }
      }

      // Get current rate limit data
      const current = rateLimitMap.get(ip) || { count: 0, lastReset: now };

      // Reset if window has expired
      if (current.lastReset < windowStart) {
        current.count = 0;
        current.lastReset = now;
      }

      // Increment count
      current.count++;
      rateLimitMap.set(ip, current);

      // Check if limit exceeded
      if (current.count > limit) {
        return NextResponse.json(
          {
            message: "Too many requests. Please try again later.",
            retryAfter: Math.ceil((windowMs - (now - current.lastReset)) / 1000),
          },
          {
            status: 429,
            headers: {
              "Retry-After": Math.ceil((windowMs - (now - current.lastReset)) / 1000).toString(),
            },
          }
        );
      }

      return handler(req);
    };
  };
}

// Input validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push("Password must contain at least one special character (@$!%*?&)");
  }

  return { valid: errors.length === 0, errors };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}
