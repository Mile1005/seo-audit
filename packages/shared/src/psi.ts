import { fetch } from "undici";

export interface PSIResult {
	lcp: number | null; // Largest Contentful Paint (seconds)
	cls: number | null; // Cumulative Layout Shift
	inp: number | null; // Interaction to Next Paint (milliseconds)
	notes: string[]; // Performance notes and recommendations
}

export interface PSIResponse {
	loadingExperience?: {
		metrics?: {
			LARGEST_CONTENTFUL_PAINT_MS?: {
				percentile: number;
			};
			CUMULATIVE_LAYOUT_SHIFT_SCORE?: {
				percentile: number;
			};
			INTERACTION_TO_NEXT_PAINT_MS?: {
				percentile: number;
			};
		};
	};
	lighthouseResult?: {
		audits?: {
			"largest-contentful-paint"?: {
				numericValue: number;
				displayValue: string;
			};
			"cumulative-layout-shift"?: {
				numericValue: number;
				displayValue: string;
			};
			"interaction-to-next-paint"?: {
				numericValue: number;
				displayValue: string;
			};
			"first-contentful-paint"?: {
				numericValue: number;
				displayValue: string;
			};
			"total-blocking-time"?: {
				numericValue: number;
				displayValue: string;
			};
			"speed-index"?: {
				numericValue: number;
				displayValue: string;
			};
		};
		categories?: {
			performance?: {
				score: number;
			};
		};
	};
}

// In-memory cache for PSI results (simple, per-process)
const psiCache = new Map<string, { result: PSIResult; timestamp: number }>();
// Make cache TTL configurable via env, default to 30 min
const PSI_CACHE_TTL =
	(typeof process !== "undefined" && process.env.PSI_CACHE_TTL
		? parseInt(process.env.PSI_CACHE_TTL, 10)
		: 30 * 60) * 1000; // 30 minutes default

// Monitoring for PSI API failures
let psiFailureCount = 0;
let psiFailureWindowStart = Date.now();
const PSI_FAILURE_WINDOW = 10 * 60 * 1000; // 10 minutes
const PSI_FAILURE_THRESHOLD = 5;

/**
 * Fetches PageSpeed Insights data for a given URL, with retry and strategy support
 * @param url - The URL to analyze
 * @param key - Optional PSI API key
 * @param strategy - "mobile" (default) or "desktop"
 * @param maxRetries - Number of retries on failure (default 2)
 * @returns PSIResult with Core Web Vitals and performance notes
 */
export async function fetchPageSpeed(
	url: string,
	key?: string,
	strategy: "mobile" | "desktop" = "mobile",
	maxRetries = 2
): Promise<PSIResult> {
	// ...existing code...
}

/**
 * Extracts Largest Contentful Paint value from PSI response
 */
function extractLCP(data: PSIResponse): number | null {
	// ...existing code...
}

/**
 * Extracts Cumulative Layout Shift value from PSI response
 */
function extractCLS(data: PSIResponse): number | null {
	// ...existing code...
}

/**
 * Extracts Interaction to Next Paint value from PSI response
 */
function extractINP(data: PSIResponse): number | null {
	// ...existing code...
}

/**
 * Generates performance notes based on PSI data
 */
function generatePerformanceNotes(
	data: PSIResponse,
	lcp: number | null,
	cls: number | null,
	inp: number | null
): string[] {
	// ...existing code...
}
