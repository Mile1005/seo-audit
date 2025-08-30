'use client';

import { createDynamicComponent } from "@/lib/dynamic-imports";

// SEO Audit feature components (confirmed to exist with default exports)
export const DynamicAuditCategories = createDynamicComponent(() => 
  import("@/components/features/seo-audit/audit-categories")
);

export const DynamicAuditPreview = createDynamicComponent(() => 
  import("@/components/features/seo-audit/audit-preview")
);

export const DynamicTechnicalBreakdown = createDynamicComponent(() => 
  import("@/components/features/seo-audit/technical-breakdown")
);

export const DynamicResultsShowcase = createDynamicComponent(() => 
  import("@/components/features/seo-audit/results-showcase")
);
