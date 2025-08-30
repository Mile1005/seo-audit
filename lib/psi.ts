import { fetch } from "undici";

export interface PSIResult {
  lcp: number | null; // Largest Contentful Paint (seconds)
  cls: number | null; // Cumulative Layout Shift
  inp: number | null; // Interaction to Next Paint (milliseconds)
  fcp: number | null; // First Contentful Paint (seconds)
  tbt: number | null; // Total Blocking Time (milliseconds)
  si: number | null; // Speed Index (seconds)
  performanceScore: number | null; // Overall performance score (0-100)
  notes: string[]; // Performance notes and recommendations
  opportunities: string[]; // Performance improvement opportunities
  diagnostics: string[]; // Performance diagnostics
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
  if (!key) {
    return {
      lcp: null,
      cls: null,
      inp: null,
      fcp: null,
      tbt: null,
      si: null,
      performanceScore: null,
      notes: ["PSI API key not provided - performance data unavailable"],
      opportunities: [],
      diagnostics: []
    };
  }

  // Check cache first
  const cacheKey = `${url}|${key}|${strategy}`;
  const now = Date.now();
  const cached = psiCache.get(cacheKey);
  if (cached && now - cached.timestamp < PSI_CACHE_TTL) {
    return cached.result;
  }

  let lastError: any = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        // Exponential backoff: 1s, 2s, 4s...
        await new Promise((res) => setTimeout(res, 1000 * Math.pow(2, attempt - 1)));
      }
      console.log(
        `Fetching PageSpeed Insights for ${url} (strategy=${strategy}, attempt ${attempt + 1})`
      );

      const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`;
      const params = new URLSearchParams({
        url: url,
        key: key,
        strategy,
        category: "performance",
        prettyPrint: "false",
      });

      const response = await fetch(`${psiUrl}?${params}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`PSI API error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as PSIResponse;

      // Extract Core Web Vitals and additional metrics
      const lcp = extractLCP(data);
      const cls = extractCLS(data);
      const inp = extractINP(data);
      const fcp = extractFCP(data);
      const tbt = extractTBT(data);
      const si = extractSpeedIndex(data);
      const performanceScore = extractPerformanceScore(data);

      // Generate performance notes, opportunities, and diagnostics
      const notes = generatePerformanceNotes(data, lcp, cls, inp);
      const opportunities = generatePerformanceOpportunities(data, lcp, cls, inp, fcp, tbt, si);
      const diagnostics = generatePerformanceDiagnostics(data, performanceScore);

      const result: PSIResult = {
        lcp,
        cls,
        inp,
        fcp,
        tbt,
        si,
        performanceScore,
        notes,
        opportunities,
        diagnostics
      };

      // Store in cache
      psiCache.set(cacheKey, { result, timestamp: now });

      console.log(`PSI data retrieved: LCP=${lcp}s, CLS=${cls}, INP=${inp}ms`);
      return result;
    } catch (error) {
      lastError = error;
      // Monitoring logic
      const now = Date.now();
      if (now - psiFailureWindowStart > PSI_FAILURE_WINDOW) {
        psiFailureWindowStart = now;
        psiFailureCount = 0;
      }
      psiFailureCount++;
      if (psiFailureCount >= PSI_FAILURE_THRESHOLD) {
        console.warn(
          `PSI API has failed ${psiFailureCount} times in the last 10 minutes. Check API quota or service health.`
        );
        // In production, send alert to monitoring system here
      }
      console.error(
        `PageSpeed Insights error (attempt ${attempt + 1}):`,
        error
      );
      if (attempt === maxRetries) {
        return {
          lcp: null,
          cls: null,
          inp: null,
          fcp: null,
          tbt: null,
          si: null,
          performanceScore: null,
          notes: [
            `PSI API error after ${maxRetries + 1} attempts: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          ],
          opportunities: [],
          diagnostics: []
        };
      }
    }
  }
  // Should never reach here
  return {
    lcp: null,
    cls: null,
    inp: null,
    fcp: null,
    tbt: null,
    si: null,
    performanceScore: null,
    notes: [
      `PSI API error: ${
        lastError instanceof Error ? lastError.message : "Unknown error"
      }`,
    ],
    opportunities: [],
    diagnostics: []
  };
}

/**
 * Extracts First Contentful Paint value from PSI response
 */
function extractFCP(data: PSIResponse): number | null {
  if (data.lighthouseResult?.audits?.["first-contentful-paint"]?.numericValue) {
    return data.lighthouseResult.audits["first-contentful-paint"].numericValue / 1000; // Convert to seconds
  }
  return null;
}

/**
 * Extracts Total Blocking Time value from PSI response
 */
function extractTBT(data: PSIResponse): number | null {
  if (data.lighthouseResult?.audits?.["total-blocking-time"]?.numericValue) {
    return data.lighthouseResult.audits["total-blocking-time"].numericValue; // Already in milliseconds
  }
  return null;
}

/**
 * Extracts Speed Index value from PSI response
 */
function extractSpeedIndex(data: PSIResponse): number | null {
  if (data.lighthouseResult?.audits?.["speed-index"]?.numericValue) {
    return data.lighthouseResult.audits["speed-index"].numericValue / 1000; // Convert to seconds
  }
  return null;
}

/**
 * Extracts Performance Score from PSI response
 */
function extractPerformanceScore(data: PSIResponse): number | null {
  if (data.lighthouseResult?.categories?.performance?.score !== undefined) {
    return Math.round(data.lighthouseResult.categories.performance.score * 100);
  }
  return null;
}

/**
 * Generates performance improvement opportunities
 */
function generatePerformanceOpportunities(
  data: PSIResponse,
  lcp: number | null,
  cls: number | null,
  inp: number | null,
  fcp: number | null,
  tbt: number | null,
  si: number | null
): string[] {
  const opportunities: string[] = [];

  // Check each metric and suggest improvements
  if (lcp && lcp > 2.5) {
    opportunities.push(`Optimize Largest Contentful Paint: currently ${lcp.toFixed(2)}s, target ≤2.5s`);
  }
  
  if (cls && cls > 0.1) {
    opportunities.push(`Reduce Cumulative Layout Shift: currently ${cls.toFixed(3)}, target ≤0.1`);
  }
  
  if (inp && inp > 200) {
    opportunities.push(`Improve Interaction to Next Paint: currently ${inp}ms, target ≤200ms`);
  }
  
  if (fcp && fcp > 1.8) {
    opportunities.push(`Optimize First Contentful Paint: currently ${fcp.toFixed(2)}s, target ≤1.8s`);
  }
  
  if (tbt && tbt > 200) {
    opportunities.push(`Reduce Total Blocking Time: currently ${tbt}ms, target ≤200ms`);
  }
  
  if (si && si > 3.4) {
    opportunities.push(`Improve Speed Index: currently ${si.toFixed(2)}s, target ≤3.4s`);
  }

  return opportunities;
}

/**
 * Generates performance diagnostics
 */
function generatePerformanceDiagnostics(
  data: PSIResponse,
  performanceScore: number | null
): string[] {
  const diagnostics: string[] = [];

  if (performanceScore !== null) {
    if (performanceScore >= 90) {
      diagnostics.push("Performance is excellent - maintain current optimization level");
    } else if (performanceScore >= 70) {
      diagnostics.push("Performance is good - minor optimizations could improve score");
    } else if (performanceScore >= 50) {
      diagnostics.push("Performance needs improvement - focus on Core Web Vitals optimization");
    } else {
      diagnostics.push("Performance is poor - comprehensive optimization required");
    }
  }

  // Add general diagnostics
  diagnostics.push("Consider optimizing images, enabling compression, and reducing JavaScript execution time");

  return diagnostics;
}

/**
 * Extracts Largest Contentful Paint value from PSI response
 */
function extractLCP(data: PSIResponse): number | null {
  // Try loading experience first (field data)
  if (data.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile) {
    return data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000; // Convert to seconds
  }

  // Fall back to lab data
  if (data.lighthouseResult?.audits?.["largest-contentful-paint"]?.numericValue) {
    return data.lighthouseResult.audits["largest-contentful-paint"].numericValue / 1000; // Convert to seconds
  }

  return null;
}

/**
 * Extracts Cumulative Layout Shift value from PSI response
 */
function extractCLS(data: PSIResponse): number | null {
  // Try loading experience first (field data)
  if (data.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile) {
    return data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100; // Convert to decimal
  }

  // Fall back to lab data
  if (data.lighthouseResult?.audits?.["cumulative-layout-shift"]?.numericValue) {
    return data.lighthouseResult.audits["cumulative-layout-shift"].numericValue;
  }

  return null;
}

/**
 * Extracts Interaction to Next Paint value from PSI response
 */
function extractINP(data: PSIResponse): number | null {
  // Try loading experience first (field data)
  if (data.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT_MS?.percentile) {
    return data.loadingExperience.metrics.INTERACTION_TO_NEXT_PAINT_MS.percentile; // Already in milliseconds
  }

  // Fall back to lab data
  if (data.lighthouseResult?.audits?.["interaction-to-next-paint"]?.numericValue) {
    return data.lighthouseResult.audits["interaction-to-next-paint"].numericValue;
  }

  return null;
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
  const notes: string[] = [];

  // Overall performance score
  const performanceScore = data.lighthouseResult?.categories?.performance?.score;
  if (performanceScore !== undefined) {
    const scorePercent = Math.round(performanceScore * 100);
    if (scorePercent >= 90) {
      notes.push(`Excellent performance score: ${scorePercent}/100`);
    } else if (scorePercent >= 70) {
      notes.push(`Good performance score: ${scorePercent}/100`);
    } else if (scorePercent >= 50) {
      notes.push(`Fair performance score: ${scorePercent}/100 - consider optimization`);
    } else {
      notes.push(`Poor performance score: ${scorePercent}/100 - significant optimization needed`);
    }
  }

  // LCP analysis
  if (lcp !== null) {
    if (lcp <= 2.5) {
      notes.push(`LCP is excellent: ${lcp.toFixed(2)}s (target: ≤2.5s)`);
    } else if (lcp <= 4.0) {
      notes.push(`LCP needs improvement: ${lcp.toFixed(2)}s (target: ≤2.5s)`);
    } else {
      notes.push(`LCP is poor: ${lcp.toFixed(2)}s (target: ≤2.5s) - optimize loading performance`);
    }
  }

  // CLS analysis
  if (cls !== null) {
    if (cls <= 0.1) {
      notes.push(`CLS is excellent: ${cls.toFixed(3)} (target: ≤0.1)`);
    } else if (cls <= 0.25) {
      notes.push(`CLS needs improvement: ${cls.toFixed(3)} (target: ≤0.1)`);
    } else {
      notes.push(`CLS is poor: ${cls.toFixed(3)} (target: ≤0.1) - fix layout shifts`);
    }
  }

  // INP analysis
  if (inp !== null) {
    if (inp <= 200) {
      notes.push(`INP is excellent: ${inp}ms (target: ≤200ms)`);
    } else if (inp <= 500) {
      notes.push(`INP needs improvement: ${inp}ms (target: ≤200ms)`);
    } else {
      notes.push(`INP is poor: ${inp}ms (target: ≤200ms) - optimize interactivity`);
    }
  }

  // Additional metrics
  const fcp = data.lighthouseResult?.audits?.["first-contentful-paint"]?.numericValue;
  if (fcp !== undefined) {
    const fcpSeconds = fcp / 1000;
    if (fcpSeconds > 1.8) {
      notes.push(`First Contentful Paint is slow: ${fcpSeconds.toFixed(2)}s (target: ≤1.8s)`);
    }
  }

  const tbt = data.lighthouseResult?.audits?.["total-blocking-time"]?.numericValue;
  if (tbt !== undefined) {
    if (tbt > 200) {
      notes.push(
        `Total Blocking Time is high: ${tbt}ms (target: ≤200ms) - reduce main thread work`
      );
    }
  }

  const speedIndex = data.lighthouseResult?.audits?.["speed-index"]?.numericValue;
  if (speedIndex !== undefined) {
    const speedIndexSeconds = speedIndex / 1000;
    if (speedIndexSeconds > 3.4) {
      notes.push(`Speed Index is slow: ${speedIndexSeconds.toFixed(2)}s (target: ≤3.4s)`);
    }
  }

  return notes;
}
