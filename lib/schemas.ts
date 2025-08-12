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

// Explicit type definition to ensure all properties are required
export type AuditResultV1 = {
  version: "1.0";
  url: string;
  fetched_at: string;
  scores: {
    overall: number;
    title_meta: number;
    headings: number;
    answerability: number;
    structure: number;
    schema: number;
    images: number;
    internal_links: number;
  };
  stats: {
    word_count: number;
    reading_time_min: number;
    images_count: number;
    h2_count: number;
    h3_count: number;
    tables_count: number;
    lists_count: number;
  };
  detected: {
    title: string | null;
    meta_description: string | null;
    canonical: string | null;
    h1: string | null;
    h2: string[];
    h3: string[];
    json_ld_types: string[];
    images: { src: string; alt: string | null }[];
    internal_links: { href: string; anchor: string | null }[];
  };
  issues: {
    id: string;
    category: "title_meta" | "headings" | "answerability" | "structure" | "schema" | "images" | "internal_links";
    severity: "low" | "medium" | "high";
    found: string;
    why_it_matters: string;
    recommendation: string;
    snippet: string | null;
  }[];
  quick_wins: {
    issue_id: string;
    estimated_impact: "low" | "medium" | "high";
    action: string;
    snippet: string | null;
  }[];
  gsc_insights: {
    available: boolean;
    top_queries: {
      query: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }[];
    ctr: number | null;
    impressions: number | null;
    clicks: number | null;
  };
};

export const StartAuditInput = z.object({
  pageUrl: z.string().url(),
  targetKeyword: z.string().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal(''))
});


