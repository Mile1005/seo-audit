// Unified audit related TypeScript interfaces (Phase 1)
// TODO Phase 4: extend with persistence identifiers & diff metadata

export interface CoreScores {
  overall: number;
  performance: number;
  accessibility: number;
  seo: number;
  best_practices: number;
}

export interface AuditStats {
  internal_links: number;
  external_links: number;
  images_count: number;
  images_size: number;
  scripts_count: number;
  scripts_size: number;
  text_size: number;
  text_rate: number;
  word_count: number;
  reading_time_min: number;
  tables_count?: number;
  lists_count?: number;
}

export interface HeadingTags {
  h1: string[];
  h2: string[];
  h3: string[];
}

export interface CheckGroup {
  passed_checks: string[];
  failed_checks: string[];
}

export interface PerformanceMetrics {
  first_contentful_paint: number;
  largest_contentful_paint: number;
  total_blocking_time: number;
  cumulative_layout_shift: number;
  speed_index: number;
  time_to_interactive: number;
  max_potential_first_input_delay: number;
  performance_score: number;
}

export interface Issue {
  title: string;
  description: string;
  severity: "high" | "medium" | "low" | string;
  recommendation?: string;
  location?: string;
  selector?: string;
  current_value?: string;
  expected_value?: string;
  impact?: string;
  effort?: string;
  category?: string;
}

export interface QuickWin {
  title: string;
  description: string;
  location?: string;
  selector?: string;
  current_value?: string;
  recommended_value?: string;
  priority?: string;
  impact?: string;
  effort?: string;
  category?: string;
}

export interface ComprehensiveResults {
  url?: string; // optional in nested usage
  fetched_at?: string;
  scores: CoreScores;
  stats: AuditStats;
  h_tags: HeadingTags;
  social_meta: {
    og_title: string | null;
    og_url: string | null;
    og_description: string | null;
    og_image: string | null;
    twitter_card: string | null;
    twitter_title: string | null;
    twitter_description: string | null;
  };
  accessibility: CheckGroup;
  indexability: CheckGroup;
  seo_checks: CheckGroup;
  performance_metrics: PerformanceMetrics;
  performance_opportunities: any; // string[] or richer objects later
  performance_diagnostics: any; // string[] or richer objects later
  issues: Issue[];
  quick_wins: QuickWin[];
  json_ld_types?: string[]; // future phase
  tables_count?: number; // added in phase 3 augmentation (mirrors stats but exposed top-level if needed)
  lists_count?: number;
}

export interface PageData {
  title: string;
  metaDescription: string;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  wordCount: number;
  imagesTotal: number;
  imagesWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  loadTime: number; // ms
  canonical: string | null;
  noindex: boolean;
}

export interface StructuredRecommendation {
  type: "critical" | "warning" | "suggestion";
  category: string;
  title: string;
  description: string;
  priority: number;
}

export interface AuditResultUnified {
  auditId: string;
  status: "processing" | "completed" | "failed";
  url: string;
  score: number; // overall
  timestamp: string; // ISO
  pageData: PageData;
  comprehensiveResults: ComprehensiveResults; // main dataset
  recommendations: StructuredRecommendation[];
  // Optional extras returned by original start route (legacy)
  keyword?: string | null;
  email?: string | null;
  robotsTxt?: string | null;
  sitemapXml?: string | null;
}

export interface AuditStoreRecord {
  status: "processing" | "completed" | "failed";
  ownerId?: string;
  data?: AuditResultUnified;
  error?: string;
  stage?: string;
  progress?: number; // 0-100
  message?: string;
  startedAt: number;
  updatedAt: number;
}
