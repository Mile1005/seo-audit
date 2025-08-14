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

/**
 * Fetches PageSpeed Insights data for a given URL
 * @param url - The URL to analyze
 * @param key - Optional PSI API key
 * @returns PSIResult with Core Web Vitals and performance notes
 */
export async function fetchPageSpeed(url: string, key?: string): Promise<PSIResult> {
  if (!key) {
    return {
      lcp: null,
      cls: null,
      inp: null,
      notes: ["PSI API key not provided - performance data unavailable"],
    };
  }

  try {
    console.log(`Fetching PageSpeed Insights for ${url}`);

    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`;
    const params = new URLSearchParams({
      url: url,
      key: key,
      strategy: "mobile", // Focus on mobile performance
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

    // Extract Core Web Vitals
    const lcp = extractLCP(data);
    const cls = extractCLS(data);
    const inp = extractINP(data);

    // Generate performance notes
    const notes = generatePerformanceNotes(data, lcp, cls, inp);

    console.log(`PSI data retrieved: LCP=${lcp}s, CLS=${cls}, INP=${inp}ms`);

    return {
      lcp,
      cls,
      inp,
      notes,
    };
  } catch (error) {
    console.error("PageSpeed Insights error:", error);
    return {
      lcp: null,
      cls: null,
      inp: null,
      notes: [`PSI API error: ${error instanceof Error ? error.message : "Unknown error"}`],
    };
  }
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
