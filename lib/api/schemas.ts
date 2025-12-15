import { z } from "zod";

// Project schemas
export const CreateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  domain: z.string().url("Valid domain URL is required"),
  description: z.string().optional(),
  settings: z
    .object({
      trackingEnabled: z.boolean().default(true),
      auditFrequency: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
      keywords: z.array(z.string()).default([]),
    })
    .optional(),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const ProjectIdSchema = z.object({
  id: z.string().uuid("Invalid project ID"),
});

// Keyword schemas
export const AddKeywordSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  keyword: z.string().min(1, "Keyword is required").max(200),
  country: z.string().length(2, "Country code must be 2 characters").default("US"),
  device: z.enum(["DESKTOP", "MOBILE"]).default("DESKTOP"),
  targetUrl: z.string().url().optional(),
});

export const KeywordBulkSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  keywords: z
    .array(
      z.object({
        keyword: z.string().min(1).max(200),
        country: z.string().length(2).default("US"),
        device: z.enum(["DESKTOP", "MOBILE"]).default("DESKTOP"),
        targetUrl: z.string().url().optional(),
      })
    )
    .min(1, "At least one keyword is required")
    .max(100, "Maximum 100 keywords per batch"),
});

// Audit schemas
export const StartAuditSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  auditType: z.enum(["full", "technical", "content", "performance"]).default("full"),
  pages: z.array(z.string().url()).optional(),
  settings: z
    .object({
      includeSubdomains: z.boolean().default(false),
      maxPages: z.number().min(1).max(10000).default(100),
      includeImages: z.boolean().default(true),
      includeExternal: z.boolean().default(false),
    })
    .optional(),
});

// Backlink schemas
export const BacklinkAnalysisSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  domain: z.string().url("Valid domain is required"),
  includeSubdomains: z.boolean().default(true),
  freshness: z.enum(["live", "historic", "fresh"]).default("fresh"),
});

// Pagination schema
export const PaginationSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default("1"),
  limit: z.string().regex(/^\d+$/).transform(Number).default("10"),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Filter schemas
export const DateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const KeywordFilterSchema = PaginationSchema.extend({
  status: z.enum(["ACTIVE", "PAUSED", "ARCHIVED"]).optional(),
  country: z.string().length(2).optional(),
  device: z.enum(["DESKTOP", "MOBILE"]).optional(),
  positionMin: z.string().regex(/^\d+$/).transform(Number).optional(),
  positionMax: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().optional(),
});

// Response schemas for type safety
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  meta: z
    .object({
      page: z.number().optional(),
      limit: z.number().optional(),
      total: z.number().optional(),
      totalPages: z.number().optional(),
    })
    .optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type AddKeywordInput = z.infer<typeof AddKeywordSchema>;
export type KeywordBulkInput = z.infer<typeof KeywordBulkSchema>;
export type StartAuditInput = z.infer<typeof StartAuditSchema>;
export type BacklinkAnalysisInput = z.infer<typeof BacklinkAnalysisSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
export type KeywordFilterInput = z.infer<typeof KeywordFilterSchema>;
export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & { data?: T };
