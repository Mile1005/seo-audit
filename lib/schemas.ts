import { z } from "zod";

export const AuditResultV1 = z.object({
  version: z.literal("1.0"),
  url: z.string().url(),
  fetched_at: z.string(),
  scores: z.object({
    overall: z.number().int().min(0).max(100),
    title_meta: z.number().int().min(0).max(100),
    headings: z.number().int().min(0).max(100),
    answerability: z.number().int().min(0).max(100),
    structure: z.number().int().min(0).max(100),
    schema: z.number().int().min(0).max(100),
    images: z.number().int().min(0).max(100),
    internal_links: z.number().int().min(0).max(100)
  }),
  stats: z.object({
    word_count: z.number().int().nonnegative(),
    reading_time_min: z.number().nonnegative(),
    images_count: z.number().int().nonnegative(),
    h2_count: z.number().int().nonnegative(),
    h3_count: z.number().int().nonnegative(),
    tables_count: z.number().int().nonnegative(),
    lists_count: z.number().int().nonnegative()
  }),
  detected: z.object({
    title: z.string().nullable(),
    meta_description: z.string().nullable(),
    canonical: z.string().nullable(),
    h1: z.string().nullable(),
    h2: z.array(z.string()),
    h3: z.array(z.string()),
    json_ld_types: z.array(z.string()),
    images: z.array(z.object({ src: z.string(), alt: z.string().nullable() })),
    internal_links: z.array(z.object({ href: z.string(), anchor: z.string().nullable() }))
  }),
  issues: z.array(
    z.object({
      id: z.string(),
      category: z.enum([
        "title_meta",
        "headings",
        "answerability",
        "structure",
        "schema",
        "images",
        "internal_links"
      ]),
      severity: z.enum(["low", "medium", "high"]),
      found: z.string(),
      why_it_matters: z.string(),
      recommendation: z.string(),
      snippet: z.string().nullable()
    })
  ),
  quick_wins: z.array(
    z.object({
      issue_id: z.string(),
      estimated_impact: z.enum(["low", "medium", "high"]),
      action: z.string(),
      snippet: z.string().nullable()
    })
  ),
  gsc_insights: z.object({
    available: z.boolean(),
    top_queries: z.array(
      z.object({
        query: z.string(),
        clicks: z.number().int().nonnegative(),
        impressions: z.number().int().nonnegative(),
        ctr: z.number().nonnegative(),
        position: z.number().nonnegative()
      })
    ),
    ctr: z.number().nullable(),
    impressions: z.number().int().nullable(),
    clicks: z.number().int().nullable()
  })
});

export type AuditResultV1 = z.infer<typeof AuditResultV1>;

export const StartAuditInput = z.object({
  pageUrl: z.string().url(),
  targetKeyword: z.string().min(1).optional(),
  email: z.string().email().optional()
});


