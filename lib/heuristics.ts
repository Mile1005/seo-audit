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
  const { targetKeyword, performance } = opts;

  // Calculate stats
  const wordCount = calculateWordCount(parsed.textBlocks);
  const readingTimeMin = calculateReadingTime(wordCount);

  // Calculate individual scores
  const titleMetaScore = calculateTitleMetaScore(parsed, targetKeyword);
  const headingsScore = calculateHeadingsScore(parsed);
  const answerabilityScore = calculateAnswerabilityScore(parsed, wordCount);
  const structureScore = calculateStructureScore(parsed);
  const schemaScore = calculateSchemaScore(parsed);
  const imagesScore = calculateImagesScore(parsed);
  const internalLinksScore = calculateInternalLinksScore(parsed);

  // Calculate overall score (average of all scores)
  const scores = {
    title_meta: titleMetaScore,
    headings: headingsScore,
    answerability: answerabilityScore,
    structure: structureScore,
    schema: schemaScore,
    images: imagesScore,
    internal_links: internalLinksScore,
    overall: Math.round(
      (titleMetaScore +
        headingsScore +
        answerabilityScore +
        structureScore +
        schemaScore +
        imagesScore +
        internalLinksScore) /
        7
    ),
  };

  // Generate issues
  const issues = generateIssues(parsed, targetKeyword, wordCount);

  // Generate quick wins
  const quickWins = generateQuickWins(issues);

  return {
    version: "1.0",
    url,
    fetched_at: new Date().toISOString(),
    scores,
    stats: {
      word_count: wordCount,
      reading_time_min: readingTimeMin,
      images_count: parsed.images.length,
      h2_count: parsed.h2.length,
      h3_count: parsed.h3.length,
      tables_count: parsed.tablesCount,
      lists_count: parsed.listsCount,
    },
    detected: {
      title: parsed.title,
      meta_description: parsed.metaDescription,
      canonical: parsed.canonical,
      h1: parsed.h1,
      h2: parsed.h2,
      h3: parsed.h3,
      json_ld_types: parsed.jsonLdTypes,
      images: parsed.images,
      internal_links: parsed.internalLinks,
    },
    issues,
    quick_wins: quickWins,
    performance: performance || {
      lcp: null,
      cls: null,
      inp: null,
      notes: ["Performance data not available"],
    },
    gsc_insights: {
      available: false,
      top_queries: [],
      ctr: null,
      impressions: null,
      clicks: null,
    },
  };
}

// Score calculation functions

function calculateTitleMetaScore(parsed: ParsedHtml, targetKeyword?: string): number {
  let score = 100;
  const issues: string[] = [];

  // Title length check (45-60 characters optimal)
  if (!parsed.title) {
    score -= 40;
    issues.push("Missing title tag");
  } else {
    const titleLength = parsed.title.length;
    if (titleLength < 30) {
      score -= 20;
      issues.push("Title too short");
    } else if (titleLength > 70) {
      score -= 15;
      issues.push("Title too long");
    } else if (titleLength < 45 || titleLength > 60) {
      score -= 10;
      issues.push("Title length not optimal");
    }

    // Keyword check
    if (targetKeyword && !parsed.title.toLowerCase().includes(targetKeyword.toLowerCase())) {
      score -= 20;
      issues.push("Target keyword not in title");
    }
  }

  // Meta description check
  if (!parsed.metaDescription) {
    score -= 30;
    issues.push("Missing meta description");
  } else {
    const metaLength = parsed.metaDescription.length;
    if (metaLength < 120) {
      score -= 15;
      issues.push("Meta description too short");
    } else if (metaLength > 160) {
      score -= 10;
      issues.push("Meta description too long");
    }

    // Keyword check for meta description
    if (
      targetKeyword &&
      !parsed.metaDescription.toLowerCase().includes(targetKeyword.toLowerCase())
    ) {
      score -= 15;
      issues.push("Target keyword not in meta description");
    }
  }

  // Technical SEO penalties
  if (parsed.hasNoindex) {
    score -= 50; // Major penalty for noindex
    issues.push("Page has noindex directive");
  }

  if (parsed.hasNofollow) {
    score -= 20; // Penalty for nofollow
    issues.push("Page has nofollow directive");
  }

  if (!parsed.canonical) {
    score -= 15;
    issues.push("Missing canonical URL");
  }

  return Math.max(0, score);
}

function calculateHeadingsScore(parsed: ParsedHtml): number {
  let score = 100;

  // H1 check
  if (!parsed.h1) {
    score -= 30;
  } else if (parsed.h1.length > 100) {
    score -= 10;
  }

  // Multiple H1 penalty
  if (parsed.h1Count > 1) {
    score -= 25;
  }

  // H2 count check (reasonable range: 2-8)
  if (parsed.h2.length === 0) {
    score -= 20;
  } else if (parsed.h2.length > 10) {
    score -= 15;
  }

  // H3 count check (reasonable range: 3-15)
  if (parsed.h3.length === 0) {
    score -= 10;
  } else if (parsed.h3.length > 20) {
    score -= 10;
  }

  return Math.max(0, score);
}

function calculateAnswerabilityScore(parsed: ParsedHtml, wordCount: number): number {
  let score = 100;

  // Word count check (minimum 300 words for good content)
  if (wordCount < 300) {
    score -= 30;
  } else if (wordCount < 500) {
    score -= 15;
  }

  // Check for clarity in first 100-150 words
  const firstTextBlock = parsed.textBlocks[0] || "";
  if (firstTextBlock.length < 100) {
    score -= 20;
  }

  return Math.max(0, score);
}

function calculateStructureScore(parsed: ParsedHtml): number {
  let score = 100;

  // Lists and tables check
  if (parsed.listsCount === 0 && parsed.tablesCount === 0) {
    score -= 20;
  }

  // Text blocks check (need substantial content)
  if (parsed.textBlocks.length < 3) {
    score -= 15;
  }

  // Viewport check
  if (!parsed.viewport) {
    score -= 25; // Major penalty for missing viewport
  }

  // Mixed content penalty
  if (parsed.mixedContentCandidates.length > 0) {
    score -= Math.min(30, parsed.mixedContentCandidates.length * 5); // Up to 30 point penalty
  }

  return Math.max(0, score);
}

function calculateSchemaScore(parsed: ParsedHtml): number {
  let score = 100;

  // JSON-LD types check
  if (parsed.jsonLdTypes.length === 0) {
    score -= 40;
  } else {
    // Bonus for common SEO types
    const seoTypes = ["Article", "WebPage", "Organization", "Product", "FAQPage"];
    const hasSeoType = parsed.jsonLdTypes.some((type) => seoTypes.includes(type));
    if (!hasSeoType) {
      score -= 20;
    }
  }

  return Math.max(0, score);
}

function calculateImagesScore(parsed: ParsedHtml): number {
  let score = 100;

  if (parsed.images.length === 0) {
    score -= 30;
  } else {
    // Check alt text percentage
    const imagesWithAlt = parsed.images.filter(
      (img) => img.alt && img.alt.trim().length > 0
    ).length;
    const altPercentage = (imagesWithAlt / parsed.images.length) * 100;

    if (altPercentage < 50) {
      score -= 30;
    } else if (altPercentage < 80) {
      score -= 15;
    }

    // Check for weak alt text
    const weakAltImages = parsed.images.filter(
      (img) =>
        img.alt &&
        img.alt.trim().length > 0 &&
        (img.alt.length < 10 ||
          ["image", "img", "photo", "picture", "graphic"].some((generic) =>
            img.alt!.toLowerCase().includes(generic)
          ))
    );

    if (weakAltImages.length > 0) {
      score -= Math.min(20, weakAltImages.length * 3); // Up to 20 point penalty
    }
  }

  return Math.max(0, score);
}

function calculateInternalLinksScore(parsed: ParsedHtml): number {
  let score = 100;

  // Internal links count check
  if (parsed.internalLinks.length === 0) {
    score -= 40;
  } else if (parsed.internalLinks.length < 3) {
    score -= 20;
  }

  // Anchor text quality check
  const linksWithGoodAnchors = parsed.internalLinks.filter(
    (link) => link.anchor && link.anchor.length > 3 && link.anchor.length < 100
  ).length;

  const anchorQualityPercentage = (linksWithGoodAnchors / parsed.internalLinks.length) * 100;
  if (anchorQualityPercentage < 50) {
    score -= 20;
  }

  return Math.max(0, score);
}

// Issue generation functions

function generateIssues(
  parsed: ParsedHtml,
  targetKeyword?: string,
  wordCount: number = 0
): AuditResult["issues"] {
  const issues: AuditResult["issues"] = [];

  // Title issues
  if (!parsed.title) {
    issues.push({
      id: "missing-title",
      category: "title_meta",
      severity: "high",
      found: "No title tag found",
      why_it_matters:
        "Title tags are crucial for SEO and user experience. They appear in search results and browser tabs.",
      recommendation: "Add a compelling title tag between 45-60 characters",
      snippet: "<title>Your Compelling Page Title Here</title>",
    });
  } else {
    const titleLength = parsed.title.length;
    if (titleLength < 45 || titleLength > 60) {
      issues.push({
        id: "title-length",
        category: "title_meta",
        severity: titleLength < 30 ? "high" : "medium",
        found: `Title is ${titleLength} characters long`,
        why_it_matters:
          "Optimal title length (45-60 characters) ensures full display in search results and improves click-through rates.",
        recommendation: "Optimize title length to 45-60 characters",
        snippet: `<title>${parsed.title.length > 60 ? parsed.title.substring(0, 57) + "..." : parsed.title}</title>`,
      });
    }

    if (targetKeyword && !parsed.title.toLowerCase().includes(targetKeyword.toLowerCase())) {
      issues.push({
        id: "keyword-missing-title",
        category: "title_meta",
        severity: "medium",
        found: "Target keyword not found in title",
        why_it_matters:
          "Including target keywords in titles helps with search rankings and user expectations.",
        recommendation: "Include the target keyword naturally in the title",
        snippet: `<title>${targetKeyword} - ${parsed.title}</title>`,
      });
    }
  }

  // Meta description issues
  if (!parsed.metaDescription) {
    issues.push({
      id: "missing-meta-description",
      category: "title_meta",
      severity: "high",
      found: "No meta description found",
      why_it_matters:
        "Meta descriptions appear in search results and influence click-through rates.",
      recommendation: "Add a compelling meta description between 150-160 characters",
      snippet:
        '<meta name="description" content="Your compelling meta description here that explains what this page is about." />',
    });
  } else {
    const metaLength = parsed.metaDescription.length;
    if (metaLength < 120 || metaLength > 160) {
      issues.push({
        id: "meta-description-length",
        category: "title_meta",
        severity: "medium",
        found: `Meta description is ${metaLength} characters long`,
        why_it_matters: "Optimal meta description length ensures full display in search results.",
        recommendation: "Optimize meta description to 150-160 characters",
        snippet: `<meta name="description" content="${metaLength > 160 ? parsed.metaDescription.substring(0, 157) + "..." : parsed.metaDescription}" />`,
      });
    }
  }

  // Headings issues
  if (!parsed.h1) {
    issues.push({
      id: "missing-h1",
      category: "headings",
      severity: "high",
      found: "No H1 heading found",
      why_it_matters:
        "H1 headings are crucial for SEO and help search engines understand page structure.",
      recommendation: "Add a single, descriptive H1 heading",
      snippet: "<h1>Your Main Page Heading</h1>",
    });
  } else if (parsed.h1Count > 1) {
    issues.push({
      id: "multiple-h1",
      category: "headings",
      severity: "high",
      found: `${parsed.h1Count} H1 headings found`,
      why_it_matters:
        "Multiple H1 headings can confuse search engines about the main topic of the page.",
      recommendation: "Use only one H1 heading per page",
      snippet:
        "<!-- Keep only the most important heading as H1 -->\n<h1>Main Page Topic</h1>\n<h2>Secondary Topic</h2>",
    });
  }

  if (parsed.h2.length === 0) {
    issues.push({
      id: "missing-h2",
      category: "headings",
      severity: "medium",
      found: "No H2 headings found",
      why_it_matters: "H2 headings help organize content and improve readability.",
      recommendation: "Add H2 headings to structure your content",
      snippet: "<h2>Section Heading</h2>",
    });
  }

  // Content issues
  if (wordCount < 300) {
    issues.push({
      id: "insufficient-content",
      category: "answerability",
      severity: "medium",
      found: `Only ${wordCount} words of content`,
      why_it_matters: "Thin content may not satisfy user intent and can hurt search rankings.",
      recommendation: "Add more comprehensive content (aim for 300+ words)",
      snippet: "Add more detailed paragraphs, examples, and explanations to your content.",
    });
  }

  // Schema issues
  if (parsed.jsonLdTypes.length === 0) {
    issues.push({
      id: "missing-schema",
      category: "schema",
      severity: "medium",
      found: "No structured data found",
      why_it_matters:
        "Structured data helps search engines understand your content and can enhance search results.",
      recommendation: "Add JSON-LD structured data",
      snippet: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Your Article Title"}</script>`,
    });
  } else {
    // Check for recommended schema types
    const hasArticle = parsed.jsonLdTypes.includes("Article");
    const hasFAQPage = parsed.jsonLdTypes.includes("FAQPage");

    if (!hasArticle) {
      issues.push({
        id: "missing-article-schema",
        category: "schema",
        severity: "medium",
        found: "No Article schema markup found",
        why_it_matters:
          "Article schema helps search engines understand your content type and can improve rich snippets.",
        recommendation: "Add Article schema markup for blog posts and articles",
        snippet: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Your Article Title","author":{"@type":"Person","name":"Author Name"},"publisher":{"@type":"Organization","name":"Your Site Name"},"datePublished":"2024-01-15","dateModified":"2024-01-15"}</script>`,
      });
    }

    if (!hasFAQPage && wordCount > 500) {
      issues.push({
        id: "missing-faq-schema",
        category: "schema",
        severity: "low",
        found: "No FAQPage schema markup found",
        why_it_matters:
          "FAQ schema can create rich snippets in search results and improve click-through rates.",
        recommendation: "Add FAQPage schema for content with questions and answers",
        snippet: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Your Question?","acceptedAnswer":{"@type":"Answer","text":"Your answer here."}}]}</script>`,
      });
    }
  }

  // Image issues
  const imagesWithoutAlt = parsed.images.filter((img) => !img.alt || img.alt.trim().length === 0);
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      id: "images-missing-alt",
      category: "images",
      severity: "medium",
      found: `${imagesWithoutAlt.length} images without alt text`,
      why_it_matters:
        "Alt text improves accessibility and helps search engines understand image content.",
      recommendation: "Add descriptive alt text to all images",
      snippet: '<img src="image.jpg" alt="Descriptive alt text here" />',
    });
  }

  // Check for weak alt text (too short or generic)
  const weakAltImages = parsed.images.filter(
    (img) =>
      img.alt &&
      img.alt.trim().length > 0 &&
      (img.alt.length < 10 ||
        ["image", "img", "photo", "picture", "graphic"].some((generic) =>
          img.alt!.toLowerCase().includes(generic)
        ))
  );

  if (weakAltImages.length > 0) {
    issues.push({
      id: "weak-alt-text",
      category: "images",
      severity: "low",
      found: `${weakAltImages.length} images with weak alt text`,
      why_it_matters:
        "Generic or short alt text doesn't provide meaningful information to users or search engines.",
      recommendation: "Use descriptive, specific alt text that explains the image content",
      snippet:
        '<!-- Instead of: alt="image" -->\n<img src="coffee-grinder.jpg" alt="Professional burr coffee grinder with stainless steel finish" />',
    });
  }

  // Internal links issues
  if (parsed.internalLinks.length === 0) {
    issues.push({
      id: "no-internal-links",
      category: "internal_links",
      severity: "medium",
      found: "No internal links found",
      why_it_matters: "Internal links help users navigate your site and distribute page authority.",
      recommendation: "Add relevant internal links to other pages on your site",
      snippet: '<a href="/related-page">Link to Related Content</a>',
    });
  }

  // Technical SEO issues

  // Meta robots issues
  if (parsed.hasNoindex) {
    issues.push({
      id: "noindex-found",
      category: "title_meta",
      severity: "high",
      found: "Page has noindex directive",
      why_it_matters:
        "noindex prevents search engines from indexing this page, making it invisible in search results.",
      recommendation: "Remove noindex unless this page should not appear in search results",
      snippet:
        '<!-- Remove or modify: -->\n<meta name="robots" content="noindex, nofollow" />\n<!-- To: -->\n<meta name="robots" content="index, follow" />',
    });
  }

  if (parsed.hasNofollow) {
    issues.push({
      id: "nofollow-found",
      category: "title_meta",
      severity: "medium",
      found: "Page has nofollow directive",
      why_it_matters:
        "nofollow prevents search engines from following links on this page, reducing link equity distribution.",
      recommendation: "Remove nofollow unless you want to prevent link equity from being passed",
      snippet:
        '<!-- Remove or modify: -->\n<meta name="robots" content="index, nofollow" />\n<!-- To: -->\n<meta name="robots" content="index, follow" />',
    });
  }

  // Viewport issues
  if (!parsed.viewport) {
    issues.push({
      id: "missing-viewport",
      category: "structure",
      severity: "high",
      found: "No viewport meta tag found",
      why_it_matters: "Viewport meta tag is essential for responsive design and mobile SEO.",
      recommendation: "Add viewport meta tag for proper mobile rendering",
      snippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    });
  }

  // Canonical issues
  if (!parsed.canonical) {
    issues.push({
      id: "missing-canonical",
      category: "title_meta",
      severity: "medium",
      found: "No canonical URL specified",
      why_it_matters:
        "Canonical URLs help prevent duplicate content issues and consolidate page authority.",
      recommendation: "Add canonical URL to prevent duplicate content issues",
      snippet: '<link rel="canonical" href="https://example.com/your-page-url" />',
    });
  } else if (!parsed.isCanonicalSelfReference) {
    issues.push({
      id: "canonical-not-self",
      category: "title_meta",
      severity: "low",
      found: "Canonical URL points to different page",
      why_it_matters:
        "Canonical URL should typically point to the current page unless this is a duplicate.",
      recommendation: "Verify canonical URL is correct for this page",
      snippet:
        '<!-- Ensure canonical points to this page: -->\n<link rel="canonical" href="https://example.com/current-page-url" />',
    });
  }

  // Mixed content issues
  if (parsed.mixedContentCandidates.length > 0) {
    issues.push({
      id: "mixed-content",
      category: "structure",
      severity: "high",
      found: `${parsed.mixedContentCandidates.length} HTTP resources on HTTPS page`,
      why_it_matters: "Mixed content can cause security warnings and affect user trust and SEO.",
      recommendation: "Update all resources to use HTTPS",
      snippet:
        '<!-- Change from: -->\n<img src="http://example.com/image.jpg" />\n<!-- To: -->\n<img src="https://example.com/image.jpg" />',
    });
  }

  return issues;
}

function generateQuickWins(issues: AuditResult["issues"]): AuditResult["quick_wins"] {
  const quickWins: AuditResult["quick_wins"] = [];

  // Map high-priority issues to quick wins
  const highPriorityIssues = issues.filter((issue) => issue.severity === "high");

  highPriorityIssues.slice(0, 5).forEach((issue) => {
    quickWins.push({
      issue_id: issue.id,
      estimated_impact: "high",
      action: issue.recommendation,
      snippet: issue.snippet,
    });
  });

  // Add medium priority issues if we have room
  const mediumPriorityIssues = issues.filter((issue) => issue.severity === "medium");
  const remainingSlots = 8 - quickWins.length;

  mediumPriorityIssues.slice(0, remainingSlots).forEach((issue) => {
    quickWins.push({
      issue_id: issue.id,
      estimated_impact: "medium",
      action: issue.recommendation,
      snippet: issue.snippet,
    });
  });

  return quickWins;
}
