import { ParsedHtml } from "./parse";
import { calculateWordCount, calculateReadingTime } from "./parse";

export interface AuditOptions {
	targetKeyword?: string;
	performance?: {
		lcp: number | null;
		cls: number | null;
		inp: number | null;
		notes: string[];
	};
	gscInsights?: {
		available: boolean;
		top_queries: Array<{
			query: string;
			clicks: number;
			impressions: number;
			ctr: number;
			position: number;
		}>;
		ctr: number | null;
		impressions: number | null;
		clicks: number | null;
		message: string;
	};
}

export interface AuditResult {
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
		images: Array<{ src: string; alt: string | null }>;
		internal_links: Array<{ href: string; anchor: string | null }>;
	};
	issues: Array<{
		id: string;
		category:
			| "title_meta"
			| "headings"
			| "answerability"
			| "structure"
			| "schema"
			| "images"
			| "internal_links";
		severity: "low" | "medium" | "high";
		found: string;
		why_it_matters: string;
		recommendation: string;
		snippet: string | null;
	}>;
	quick_wins: Array<{
		issue_id: string;
		estimated_impact: "low" | "medium" | "high";
		action: string;
		snippet: string | null;
	}>;
	performance: {
		lcp: number | null; // Largest Contentful Paint (seconds)
		cls: number | null; // Cumulative Layout Shift
		inp: number | null; // Interaction to Next Paint (milliseconds)
		notes: string[]; // Performance notes and recommendations
	};
	gsc_insights: {
		available: boolean;
		top_queries: Array<{
			query: string;
			clicks: number;
			impressions: number;
			ctr: number;
			position: number;
		}>;
		ctr: number | null;
		impressions: number | null;
		clicks: number | null;
	};
	accessibility_issues: Array<{
		type: string;
		selector: string;
		message: string;
		snippet: string;
	}>;
}

/**
 * Calculates comprehensive SEO audit results
 * @param url - The URL being audited
 * @param parsed - Parsed HTML data
 * @param opts - Audit options including target keyword and performance data
 * @returns AuditResult with scores, issues, and recommendations
 */
export function calculateAudit(
	url: string,
	parsed: ParsedHtml,
	opts: AuditOptions = {}
): AuditResult {
	// ...existing code...
}

// Score calculation functions
// ...existing code...
