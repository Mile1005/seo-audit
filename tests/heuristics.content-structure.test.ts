import { test, expect } from "vitest";
import { calculateAudit } from "../lib/heuristics";
import { ParsedHtml } from "../lib/parse";

test("content scoring - good word count gets high score", () => {
  const url = "https://example.com";
  const longContent = "This is a comprehensive article about SEO best practices. ".repeat(50);
  
  const parsed: ParsedHtml = {
    title: "SEO Best Practices Guide",
    metaDescription: "Learn SEO best practices for 2024.",
    canonical: null,
    h1: "SEO Best Practices Guide",
    h2: ["Technical SEO", "Content Strategy"],
    h3: ["Page Speed", "Mobile Optimization"],
    images: [{ src: "/image1.jpg", alt: "SEO diagram" }],
    internalLinks: [{ href: "/technical-seo", anchor: "Technical SEO Guide" }],
    jsonLdTypes: ["Article"],
    textBlocks: [longContent],
    robots: null,
    viewport: null,
    tablesCount: 1,
    listsCount: 2,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
  };
  
  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  
  expect(res.scores.answerability).toBeGreaterThanOrEqual(70);
  expect(res.scores.headings).toBeGreaterThanOrEqual(80);
  expect(res.stats.word_count).toBeGreaterThan(400);
});

test("image optimization scoring - images with alt text get high score", () => {
  const url = "https://example.com";
  const parsed: ParsedHtml = {
    title: "SEO Guide",
    metaDescription: "Learn SEO best practices.",
    canonical: null,
    h1: "SEO Guide",
    h2: [],
    h3: [],
    images: [
      { src: "/image1.jpg", alt: "SEO optimization flowchart" },
      { src: "/image2.jpg", alt: "Google Analytics dashboard" }
    ],
    internalLinks: [],
    jsonLdTypes: [],
    textBlocks: ["SEO content with images."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
  };
  
  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  
  expect(res.scores.images).toBeGreaterThanOrEqual(80);
  const altTextIssues = res.issues.filter(issue => issue.id === "missing-alt-text");
  expect(altTextIssues.length).toBe(0);
});

test("schema markup scoring - presence of schema gets high score", () => {
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
    jsonLdTypes: ["Article", "FAQPage"],
    textBlocks: ["SEO content with schema markup."],
    robots: null,
    viewport: null,
    tablesCount: 0,
    listsCount: 0,
    h1Count: 1,
    mixedContentCandidates: [],
    isCanonicalSelfReference: false,
    hasNoindex: false,
    hasNofollow: false,
  };
  
  const res = calculateAudit(url, parsed, { targetKeyword: "SEO" });
  
  expect(res.scores.schema).toBeGreaterThanOrEqual(80);
  const schemaIssues = res.issues.filter(issue => issue.category === "schema");
  expect(schemaIssues.length).toBe(0);
});
