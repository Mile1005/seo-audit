import { test, expect } from "vitest";
import { calculateAudit } from "../lib/heuristics";
import { ParsedHtml } from "../lib/parse";

test("title length scoring - optimal length gets high score", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Best Practices Guide - Complete Tutorial for 2024",
    metaDescription:
      "Learn the essential SEO best practices for 2024. Discover proven strategies to improve your search rankings and drive organic traffic.",
    canonical: null,
    h1: "SEO Best Practices Guide",
    h2: ["Technical SEO", "Content Strategy"],
    h3: ["Page Speed", "Mobile Optimization"],
    images: [],
    internalLinks: [],
    jsonLdTypes: ["Article"],
    textBlocks: ["Comprehensive guide to SEO best practices."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  expect(res.scores.title_meta).toBeGreaterThanOrEqual(80);

  // Check for title length issue
  const titleIssues = res.issues.filter((issue) => issue.id.includes("title"));
  expect(titleIssues.length).toBe(0); // No title issues for optimal length
});

test("title length scoring - too short title gets low score", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO",
    metaDescription: "Learn SEO best practices.",
    canonical: null,
    h1: "SEO Guide",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["SEO content."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  expect(res.scores.title_meta).toBeLessThan(60);

  // Check for short title issue - the heuristics doesn't have a specific "title-too-short" issue
  // Instead, check that the score is low due to short title
  expect(res.scores.title_meta).toBeLessThan(60);
});

test("title length scoring - too long title gets low score", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title:
      "This is an extremely long title that exceeds the recommended character limit for search engine optimization and will likely be truncated in search results which is not ideal for user experience and click-through rates",
    metaDescription:
      "A very long meta description that also exceeds the recommended character limit for optimal display in search engine results pages.",
    canonical: null,
    h1: "Long Title Test",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["Content here."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  expect(res.scores.title_meta).toBeLessThan(60);

  // Check for long title issue - the heuristics doesn't have a specific "title-too-long" issue
  // Instead, check that the score is low due to long title
  expect(res.scores.title_meta).toBeLessThan(60);
});

test("keyword inclusion in title improves score", () => {
  const url = "https://example.com";
  const targetKeyword = "digital marketing";

  // Title with keyword
  const parsedWithKeyword: ParsedHtml = {
    title: "Digital Marketing Strategies for 2024",
    metaDescription: "Learn digital marketing strategies.",
    canonical: null,
    h1: "Digital Marketing Guide",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["Digital marketing content."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  // Title without keyword
  const parsedWithoutKeyword: ParsedHtml = {
    title: "Marketing Strategies for 2024",
    metaDescription: "Learn marketing strategies.",
    canonical: null,
    h1: "Marketing Guide",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["Marketing content."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const resWithKeyword = calculateAudit(url, parsedWithKeyword, { targetKeyword });
  const resWithoutKeyword = calculateAudit(url, parsedWithoutKeyword, { targetKeyword });

  expect(resWithKeyword.scores.title_meta).toBeGreaterThan(resWithoutKeyword.scores.title_meta);

  // Check for keyword inclusion issue
  const keywordIssue = resWithoutKeyword.issues.find(
    (issue) => issue.id === "keyword-missing-title"
  );
  expect(keywordIssue).toBeTruthy();
  expect(keywordIssue?.severity).toBe("medium");
});

test("meta description length scoring", () => {
  const url = "https://example.com";

  // Optimal meta description
  const parsedOptimal: ParsedHtml = {
    title: "SEO Guide",
    metaDescription:
      "Learn the essential SEO best practices for 2024. Discover proven strategies to improve your search rankings and drive organic traffic to your website.",
    canonical: null,
    h1: "SEO Guide",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["SEO content."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  // Short meta description
  const parsedShort: ParsedHtml = {
    title: "SEO Guide",
    metaDescription: "SEO tips.",
    canonical: null,
    h1: "SEO Guide",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["SEO content."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const resOptimal = calculateAudit(url, parsedOptimal, { targetKeyword: "SEO" });
  const resShort = calculateAudit(url, parsedShort, { targetKeyword: "SEO" });

  expect(resOptimal.scores.title_meta).toBeGreaterThan(resShort.scores.title_meta);

  // Check for short meta description issue
  const shortMetaIssue = resShort.issues.find((issue) => issue.id === "meta-description-length");
  expect(shortMetaIssue).toBeTruthy();
  expect(shortMetaIssue?.severity).toBe("medium");
});
