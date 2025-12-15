import { test, expect } from "vitest";
import { calculateAudit } from "../lib/heuristics";
import { ParsedHtml } from "../lib/parse";

test("missing meta description triggers high severity issue with snippet", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Guide",
    metaDescription: null,
    canonical: null,
    h1: "SEO Best Practices",
    h2: ["Technical SEO", "Content Strategy"],
    h3: ["Page Speed", "Mobile Optimization"],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["Comprehensive guide to SEO best practices for 2024."],
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
  const metaIssue = res.issues.find((i) => i.id === "missing-meta-description");

  expect(metaIssue).toBeTruthy();
  expect(metaIssue?.severity).toBe("high");
  expect(metaIssue?.category).toBe("title_meta");
  expect(metaIssue?.found).toContain("meta description");
  expect(metaIssue?.why_it_matters).toContain("search results");
  expect(metaIssue?.recommendation).toContain("Add");
  expect(metaIssue?.snippet).toContain('<meta name="description"');
  expect(metaIssue?.snippet).toContain('meta name="description"');
});

test("missing title triggers high severity issue", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: null,
    metaDescription: "Learn SEO best practices for 2024.",
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
  const titleIssue = res.issues.find((i) => i.id === "missing-title");

  expect(titleIssue).toBeTruthy();
  expect(titleIssue?.severity).toBe("high");
  expect(titleIssue?.category).toBe("title_meta");
  expect(titleIssue?.found).toContain("title");
  expect(titleIssue?.snippet).toContain("<title>");
});

test("missing H1 triggers high severity issue", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Guide",
    metaDescription: "Learn SEO best practices.",
    canonical: null,
    h1: null,
    h2: ["Subheading"],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["SEO content."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 0,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  const h1Issue = res.issues.find((i) => i.id === "missing-h1");

  expect(h1Issue).toBeTruthy();
  expect(h1Issue?.severity).toBe("high");
  expect(h1Issue?.category).toBe("headings");
  expect(h1Issue?.found).toContain("H1");
  expect(h1Issue?.snippet).toContain("<h1>");
});

test("multiple H1s trigger medium severity issue", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Guide",
    metaDescription: "Learn SEO best practices.",
    canonical: null,
    h1: "Main Heading",
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
    h1Count: 3, // Multiple H1s
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  const multipleH1Issue = res.issues.find((i) => i.id === "multiple-h1");

  expect(multipleH1Issue).toBeTruthy();
  expect(multipleH1Issue?.severity).toBe("high");
  expect(multipleH1Issue?.category).toBe("headings");
  expect(multipleH1Issue?.found).toContain("H1 headings found");
});

test("missing canonical URL triggers medium severity issue", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Guide",
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
  const canonicalIssue = res.issues.find((i) => i.id === "missing-canonical");

  expect(canonicalIssue).toBeTruthy();
  expect(canonicalIssue?.severity).toBe("medium");
  expect(canonicalIssue?.category).toBe("title_meta");
  expect(canonicalIssue?.found).toContain("canonical");
  expect(canonicalIssue?.snippet).toContain('<link rel="canonical"');
});

test("noindex directive triggers high severity issue", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Guide",
    metaDescription: "Learn SEO best practices.",
    canonical: null,
    h1: "SEO Guide",
    h2: [],
    h3: [],
    images: [],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["SEO content."],
    robots: "noindex, follow",
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: true,
    hasNofollow: false,
    accessibilityIssues: [],
  };

  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  const noindexIssue = res.issues.find((i) => i.id === "noindex-found");

  expect(noindexIssue).toBeTruthy();
  expect(noindexIssue?.severity).toBe("high");
  expect(noindexIssue?.category).toBe("title_meta");
  expect(noindexIssue?.found).toContain("noindex");
  expect(noindexIssue?.why_it_matters).toContain("search results");
});
