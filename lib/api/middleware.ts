import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Rate limiters for different endpoints
const rateLimiters = {
  // Standard API calls - 100 requests per minute
  standard: new RateLimiterMemory({
    points: 100,
    duration: 60,
  }),

  // Heavy operations - 10 requests per minute
  heavy: new RateLimiterMemory({
    points: 10,
    duration: 60,
  }),

  // Bulk operations - 5 requests per minute
  bulk: new RateLimiterMemory({
    points: 5,
    duration: 60,
  }),
};

// Skip rate limiting for localhost/development
function isLocalhost(ip: string, req: NextRequest): boolean {
  const localhostIPs = ["127.0.0.1", "::1", "localhost", "::ffff:127.0.0.1", "anonymous"];
  if (localhostIPs.includes(ip)) return true;

  // Check host header for localhost
  const host = req.headers.get("host") || "";
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) return true;

  // Check for development environment
  if (process.env.NODE_ENV === "development") return true;

  return false;
}

export type RateLimitType = keyof typeof rateLimiters;

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    name?: string | null;
  };
}

// Authentication middleware
export async function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      // For now, we'll use a simple header-based auth
      // In production, integrate with your NextAuth setup
      const authHeader = req.headers.get("authorization");
      const userId = req.headers.get("x-user-id");

      if (!authHeader && !userId) {
        return NextResponse.json(
          { success: false, error: "Authentication required" },
          { status: 401 }
        );
      }

      // For development, allow test user
      let user;
      if (userId) {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, name: true },
        });
      } else {
        // Try to find admin user for testing
        user = await prisma.user.findFirst({
          where: { email: "admin@aiseoturbo.com" },
          select: { id: true, email: true, name: true },
        });
      }

      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 401 });
      }

      // Add user to request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = user;

      return await handler(authenticatedReq);
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
  };
}

// Rate limiting middleware
export function withRateLimit(limitType: RateLimitType = "standard") {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      try {
        const key = req.headers.get("x-forwarded-for") || req.ip || "anonymous";

        // Skip rate limiting for localhost/admin
        if (isLocalhost(key, req)) {
          return await handler(req);
        }

        const rateLimiter = rateLimiters[limitType];
        await rateLimiter.consume(key);
        return await handler(req);
      } catch (rejRes: any) {
        const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;

        const response = NextResponse.json(
          {
            success: false,
            error: "Rate limit exceeded",
            retryAfter: secs,
          },
          { status: 429 }
        );

        response.headers.set("Retry-After", String(secs));
        return response;
      }
    };
  };
}

// Input validation middleware
export function withValidation<T>(schema: z.ZodSchema<T>) {
  return function (handler: (req: NextRequest, data: T) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      try {
        let data: any;

        if (req.method === "GET") {
          // Parse query parameters
          const url = new URL(req.url);
          const params = Object.fromEntries(url.searchParams.entries());
          data = await schema.parseAsync(params);
        } else {
          // Parse JSON body with error handling
          try {
            // Check if there's a body to parse
            const contentType = req.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              data = await schema.parseAsync({});
            } else {
              const body = await req.json();
              data = await schema.parseAsync(body);
            }
          } catch (jsonError) {
            console.error("Validation middleware JSON error:", jsonError);
            // During build time, just pass empty object
            data = await schema.parseAsync({});
          }
        }

        return await handler(req, data);
      } catch (error) {
        console.error("Validation middleware error:", error);
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              success: false,
              error: "Validation failed",
              details: error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
              })),
            },
            { status: 400 }
          );
        }

        console.error("Validation middleware error:", error);
        return NextResponse.json(
          { success: false, error: "Invalid request data" },
          { status: 400 }
        );
      }
    };
  };
}

// Project access control middleware
export function withProjectAccess() {
  return function (
    handler: (req: AuthenticatedRequest, projectId: string) => Promise<NextResponse>
  ) {
    return async (req: AuthenticatedRequest) => {
      try {
        // Extract project ID from URL or body
        let projectId: string;

        if (req.method === "GET") {
          const url = new URL(req.url);
          projectId =
            url.pathname
              .split("/")
              .find(
                (segment, index, array) => array[index - 1] === "projects" && segment !== "projects"
              ) || "";
        } else {
          const body = await req.json();
          projectId = body.projectId || "";
        }

        if (!projectId) {
          return NextResponse.json(
            { success: false, error: "Project ID is required" },
            { status: 400 }
          );
        }

        // Verify user has access to the project
        const project = await prisma.project.findFirst({
          where: {
            id: projectId,
            OR: [
              { ownerId: req.user.id },
              {
                members: {
                  some: { userId: req.user.id },
                },
              },
            ],
          },
        });

        if (!project) {
          return NextResponse.json(
            { success: false, error: "Project not found or access denied" },
            { status: 404 }
          );
        }

        return await handler(req, projectId);
      } catch (error) {
        console.error("Project access error:", error);
        return NextResponse.json(
          { success: false, error: "Internal server error" },
          { status: 500 }
        );
      }
    };
  };
}

// Error handling wrapper
export function withErrorHandling(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error("API Error:", error);

      // Database connection errors
      if (error instanceof Error && error.message.includes("connect")) {
        return NextResponse.json(
          { success: false, error: "Database connection failed" },
          { status: 503 }
        );
      }

      // Generic server error
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
  };
}

// Compose multiple middlewares
export function compose(...middlewares: Array<(handler: any) => any>) {
  return middlewares.reduce((acc, middleware) => middleware(acc));
}
