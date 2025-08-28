import * as cheerio from "cheerio";
import { URL } from "url";

export interface ComprehensiveAuditResult {
  url: string;
  fetched_at: string;
  
  // Core Scores
  scores: {
    overall: number;
    performance: number;
    accessibility: number;
    seo: number;
    best_practices: number;
  };
  
  // Detailed Statistics
  stats: {
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
  };
  
  // H Tags Analysis
  h_tags: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  
  // Social Media Meta Tags
  social_meta: {
    og_title: string | null;
    og_url: string | null;
    og_description: string | null;
    og_image: string | null;
    twitter_card: string | null;
    twitter_title: string | null;
    twitter_description: string | null;
  };
  
  // Accessibility Checks
  accessibility: {
    passed_checks: string[];
    failed_checks: string[];
  };
  
  // Indexability Checks
  indexability: {
    passed_checks: string[];
    failed_checks: string[];
  };
  
  // SEO Checks
  seo_checks: {
    passed_checks: string[];
    failed_checks: string[];
  };
  
  // Performance Metrics
  performance_metrics: {
    first_contentful_paint: number;
    largest_contentful_paint: number;
    total_blocking_time: number;
    cumulative_layout_shift: number;
    speed_index: number;
    time_to_interactive: number;
    max_potential_first_input_delay: number;
  };
  
  // Performance Opportunities
  performance_opportunities: string[];
  
  // Performance Diagnostics
  performance_diagnostics: string[];
  
  // Issues and Quick Wins
  issues: Array<{
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    recommendation: string;
  }>;
  
  quick_wins: Array<{
    title: string;
    description: string;
  }>;
}

export function performComprehensiveAudit(html: string, baseUrl: string): ComprehensiveAuditResult {
  const $ = cheerio.load(html);
  const baseUrlObj = new URL(baseUrl);
  
  // Extract basic elements
  const title = $("title").first().text().trim() || null;
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || null;
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;
  
  // Extract headings
  const h1 = $("h1").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const h2 = $("h2").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  const h3 = $("h3").map((_, el) => $(el).text().trim()).get().filter(Boolean);
  
  // Extract images and calculate size
  const images = $("img");
  const imagesCount = images.length;
  const imagesSize = imagesCount * 51200; // Mock calculation
  
  // Extract scripts and calculate size
  const scripts = $("script");
  const scriptsCount = scripts.length;
  const scriptsSize = scriptsCount * 10500; // Mock calculation
  
  // Extract links
  const allLinks = $("a[href]");
  const internalLinks = allLinks.filter((_, el) => {
    const href = $(el).attr("href");
    if (!href) return false;
    try {
      const url = new URL(href, baseUrl);
      return url.hostname === baseUrlObj.hostname;
    } catch {
      return href.startsWith("/") || href.startsWith("./");
    }
  }).length;
  const externalLinks = allLinks.length - internalLinks;
  
  // Calculate text statistics
  const textBlocks = $("body").text();
  const textSize = textBlocks.length;
  const wordCount = textBlocks.split(/\s+/).filter(word => word.length > 0).length;
  const readingTimeMin = Math.ceil(wordCount / 200);
  const textRate = wordCount / Math.max(textSize, 1);
  
  // Extract social media meta tags
  const socialMeta = {
    og_title: $('meta[property="og:title"]').attr("content") || null,
    og_url: $('meta[property="og:url"]').attr("content") || null,
    og_description: $('meta[property="og:description"]').attr("content") || null,
    og_image: $('meta[property="og:image"]').attr("content") || null,
    twitter_card: $('meta[name="twitter:card"]').attr("content") || null,
    twitter_title: $('meta[name="twitter:title"]').attr("content") || null,
    twitter_description: $('meta[name="twitter:description"]').attr("content") || null,
  };
  
  // Perform accessibility checks
  const accessibility = performAccessibilityChecks($);
  
  // Perform indexability checks
  const indexability = performIndexabilityChecks($);
  
  // Perform SEO checks
  const seoChecks = performSEOChecks($, title, metaDescription, canonical);
  
  // Calculate performance metrics (mock data for now)
  const performanceMetrics = {
    first_contentful_paint: 0.7,
    largest_contentful_paint: 0.7,
    total_blocking_time: 60,
    cumulative_layout_shift: 0.021,
    speed_index: 0.7,
    time_to_interactive: 1.0,
    max_potential_first_input_delay: 110
  };
  
  // Generate performance opportunities
  const performanceOpportunities = [
    "Use efficient cache lifetimes - Est savings of 4 KiB",
    "Eliminate render-blocking resources - Est savings of 390 ms",
    "Reduce unused CSS - Est savings of 12 KiB",
    "Reduce unused JavaScript - Est savings of 90 KiB",
    "Legacy JavaScript - Est savings of 13 KiB"
  ];
  
  // Generate performance diagnostics
  const performanceDiagnostics = [
    "Document request latency",
    "Optimize DOM size",
    "Duplicated JavaScript",
    "Font display",
    "Forced reflow",
    "Improve image delivery"
  ];
  
  // Generate issues
  const issues = generateIssues($, title, metaDescription, canonical, h1, images);
  
  // Generate quick wins
  const quickWins = generateQuickWins(issues);
  
  // Calculate scores
  const scores = calculateScores(accessibility, indexability, seoChecks, performanceMetrics);
  
  return {
    url: baseUrl,
    fetched_at: new Date().toISOString(),
    scores,
    stats: {
      internal_links: internalLinks,
      external_links: externalLinks,
      images_count: imagesCount,
      images_size: imagesSize,
      scripts_count: scriptsCount,
      scripts_size: scriptsSize,
      text_size: textSize,
      text_rate: textRate,
      word_count: wordCount,
      reading_time_min: readingTimeMin
    },
    h_tags: {
      h1,
      h2,
      h3
    },
    social_meta: socialMeta,
    accessibility,
    indexability,
    seo_checks: seoChecks,
    performance_metrics: performanceMetrics,
    performance_opportunities: performanceOpportunities,
    performance_diagnostics: performanceDiagnostics,
    issues,
    quick_wins: quickWins
  };
}

function performAccessibilityChecks($: cheerio.CheerioAPI) {
  const passedChecks: string[] = [];
  const failedChecks: string[] = [];
  
  // Check HTML lang attribute
  const htmlLang = $("html").attr("lang");
  if (htmlLang) {
    passedChecks.push("HTML lang attribute");
  } else {
    failedChecks.push("HTML lang attribute");
  }
  
  // Check for deprecated elements
  const deprecatedElements = $("blink, marquee");
  if (deprecatedElements.length === 0) {
    passedChecks.push("No deprecated elements");
  } else {
    failedChecks.push("No deprecated elements");
  }
  
  // Check images have alt text
  const imagesWithoutAlt = $("img").filter((_, el) => !$(el).attr("alt"));
  if (imagesWithoutAlt.length === 0) {
    passedChecks.push("Images have alt text");
  } else {
    failedChecks.push("Images have alt text");
  }
  
  // Check links have discernible text
  const linksWithoutText = $("a").filter((_, el) => !$(el).text().trim());
  if (linksWithoutText.length === 0) {
    passedChecks.push("Links have discernible text");
  } else {
    failedChecks.push("Links have discernible text");
  }
  
  // Check unique ID attributes
  const ids = $("[id]").map((_, el) => $(el).attr("id")).get();
  const uniqueIds = [...new Set(ids)];
  if (ids.length === uniqueIds.length) {
    passedChecks.push("Unique ID attributes");
  } else {
    failedChecks.push("Unique ID attributes");
  }
  
  // Check document has title
  if ($("title").length > 0) {
    passedChecks.push("Document has title");
  } else {
    failedChecks.push("Document has title");
  }
  
  // Check buttons without discernible text
  const buttonsWithoutText = $("button").filter((_, el) => !$(el).text().trim());
  if (buttonsWithoutText.length > 0) {
    failedChecks.push("Buttons without discernible text");
  }
  
  return { passed_checks: passedChecks, failed_checks: failedChecks };
}

function performIndexabilityChecks($: cheerio.CheerioAPI) {
  const passedChecks: string[] = [];
  const failedChecks: string[] = [];
  
  // Check head contains only valid HTML elements
  const headElements = $("head").children();
  const validHeadElements = headElements.filter((_, el) => {
    const tagName = el.tagName.toLowerCase();
    return ["title", "meta", "link", "script", "style", "base"].includes(tagName);
  });
  if (headElements.length === validHeadElements.length) {
    passedChecks.push("<head> contains only valid HTML elements");
  } else {
    failedChecks.push("<head> contains only valid HTML elements");
  }
  
  // Check canonical URL is valid
  const canonical = $('link[rel="canonical"]').attr("href");
  if (canonical && canonical.startsWith("http")) {
    passedChecks.push("Canonical URL is valid");
  } else {
    failedChecks.push("Canonical URL is valid");
  }
  
  // Check canonical link element has valid attributes
  const canonicalLink = $('link[rel="canonical"]');
  if (canonicalLink.length > 0 && canonicalLink.attr("href")) {
    passedChecks.push("Canonical Link element has valid attributes");
  } else {
    failedChecks.push("Canonical Link element has valid attributes");
  }
  
  // Check no meta robots tag
  const robotsMeta = $('meta[name="robots"]');
  if (robotsMeta.length === 0) {
    passedChecks.push("No meta robots tag");
  } else {
    failedChecks.push("No meta robots tag");
  }
  
  // Check head contains a noscript tag
  const noscriptInHead = $("head noscript");
  if (noscriptInHead.length > 0) {
    failedChecks.push("<head> contains a <noscript> tag");
  }
  
  return { passed_checks: passedChecks, failed_checks: failedChecks };
}

function performSEOChecks($: cheerio.CheerioAPI, title: string | null, metaDescription: string | null, canonical: string | null) {
  const passedChecks: string[] = [];
  const failedChecks: string[] = [];
  
  // Check title length
  if (title && title.length >= 10 && title.length <= 60) {
    passedChecks.push("Title Length");
  } else {
    failedChecks.push("Title Length");
  }
  
  // Check canonical tag present
  if (canonical) {
    passedChecks.push("Canonical Tag Present");
  } else {
    failedChecks.push("Canonical Tag Present");
  }
  
  // Check H1 tag
  const h1Count = $("h1").length;
  if (h1Count === 1) {
    passedChecks.push("H1 Tag");
  } else {
    failedChecks.push("H1 Tag");
  }
  
  // Check images have alt text
  const imagesWithoutAlt = $("img").filter((_, el) => !$(el).attr("alt"));
  if (imagesWithoutAlt.length === 0) {
    passedChecks.push("Images Have Alt Text");
  } else {
    failedChecks.push("Images Have Alt Text");
  }
  
  // Check no HTTPS to HTTP links
  const httpLinks = $("a[href^='http://']");
  if (httpLinks.length === 0) {
    passedChecks.push("No HTTPS to HTTP Links");
  } else {
    failedChecks.push("No HTTPS to HTTP Links");
  }
  
  // Check good content rate
  const textContent = $("body").text();
  const htmlContent = $("body").html() || "";
  const contentRate = textContent.length / Math.max(htmlContent.length, 1);
  if (contentRate > 0.1) {
    passedChecks.push("Good Content Rate");
  } else {
    failedChecks.push("Good Content Rate");
  }
  
  // Check minimal render blocking resources
  const renderBlockingResources = $("script[src], link[rel='stylesheet']").length;
  if (renderBlockingResources <= 10) {
    passedChecks.push("Minimal Render Blocking Resources");
  } else {
    failedChecks.push("Minimal Render Blocking Resources");
  }
  
  // Check social media tags present
  const socialTags = $('meta[property^="og:"], meta[name^="twitter:"]');
  if (socialTags.length > 0) {
    passedChecks.push("Social Media Tags Present");
  } else {
    failedChecks.push("Social Media Tags Present");
  }
  
  // Check missing description
  if (!metaDescription) {
    failedChecks.push("Missing Description");
  }
  
  // Check no favicon
  const favicon = $('link[rel="icon"], link[rel="shortcut icon"]');
  if (favicon.length === 0) {
    failedChecks.push("No Favicon");
  }
  
  // Check missing structured data
  const structuredData = $('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    failedChecks.push("Missing Structured Data");
  }
  
  return { passed_checks: passedChecks, failed_checks: failedChecks };
}

function generateIssues($: cheerio.CheerioAPI, title: string | null, metaDescription: string | null, canonical: string | null, h1: string[], images: cheerio.Cheerio<any>) {
  const issues: Array<{
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    recommendation: string;
  }> = [];
  
  // Missing meta description
  if (!metaDescription) {
    issues.push({
      title: "Missing Meta Description",
      description: "Your page does not have a meta description. This is important for SEO as it provides a summary of your page content.",
      severity: "medium",
      recommendation: "Add a compelling meta description between 150-160 characters."
    });
  }
  
  // Missing favicon
  const favicon = $('link[rel="icon"], link[rel="shortcut icon"]');
  if (favicon.length === 0) {
    issues.push({
      title: "Missing Favicon",
      description: "Your page does not have a favicon. A favicon helps with brand recognition and improves user experience.",
      severity: "low",
      recommendation: "Add a favicon to improve brand recognition and user experience."
    });
  }
  
  // Missing structured data
  const structuredData = $('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    issues.push({
      title: "Missing Structured Data",
      description: "Your page does not have structured data. Structured data helps search engines understand your content better.",
      severity: "medium",
      recommendation: "Add structured data (JSON-LD) to help search engines understand your content."
    });
  }
  
  // Buttons without discernible text
  const buttonsWithoutText = $("button").filter((_, el) => !$(el).text().trim());
  if (buttonsWithoutText.length > 0) {
    issues.push({
      title: "Buttons without discernible text",
      description: "All buttons must have discernible text to be accessible to screen readers.",
      severity: "medium",
      recommendation: "Add aria-label or text content to buttons for better accessibility."
    });
  }
  
  return issues;
}

function generateQuickWins(issues: Array<{
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
}>) {
  return issues.slice(0, 4).map(issue => ({
    title: issue.title,
    description: issue.recommendation
  }));
}

function calculateScores(
  accessibility: { passed_checks: string[]; failed_checks: string[] },
  indexability: { passed_checks: string[]; failed_checks: string[] },
  seoChecks: { passed_checks: string[]; failed_checks: string[] },
  performanceMetrics: any
) {
  // Calculate accessibility score
  const accessibilityTotal = accessibility.passed_checks.length + accessibility.failed_checks.length;
  const accessibilityScore = accessibilityTotal > 0 ? Math.round((accessibility.passed_checks.length / accessibilityTotal) * 100) : 100;
  
  // Calculate indexability score
  const indexabilityTotal = indexability.passed_checks.length + indexability.failed_checks.length;
  const indexabilityScore = indexabilityTotal > 0 ? Math.round((indexability.passed_checks.length / indexabilityTotal) * 100) : 100;
  
  // Calculate SEO score
  const seoTotal = seoChecks.passed_checks.length + seoChecks.failed_checks.length;
  const seoScore = seoTotal > 0 ? Math.round((seoChecks.passed_checks.length / seoTotal) * 100) : 100;
  
  // Mock performance score
  const performanceScore = 100;
  
  // Mock best practices score
  const bestPracticesScore = 100;
  
  // Calculate overall score
  const overallScore = Math.round((accessibilityScore + indexabilityScore + seoScore + performanceScore + bestPracticesScore) / 5);
  
  return {
    overall: overallScore,
    performance: performanceScore,
    accessibility: accessibilityScore,
    seo: seoScore,
    best_practices: bestPracticesScore
  };
}
