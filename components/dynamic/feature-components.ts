"use client";

import dynamic from "next/dynamic";

// SEO Audit feature components using Next.js dynamic imports
export const DynamicAuditCategories = dynamic(
  () => import("@/components/features/seo-audit/audit-categories"),
  { ssr: false }
);

export const DynamicAuditPreview = dynamic(
  () => import("@/components/features/seo-audit/audit-preview"),
  { ssr: false }
);

export const DynamicTechnicalBreakdown = dynamic(
  () => import("@/components/features/seo-audit/technical-breakdown"),
  { ssr: false }
);

export const DynamicResultsShowcase = dynamic(
  () => import("@/components/features/seo-audit/results-showcase"),
  { ssr: false }
);
