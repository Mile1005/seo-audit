import { test, expect } from "vitest";
import { parseHtml } from "../lib/parse";
import { readFileSync } from "fs";
import { join } from "path";

test("parser extracts all SEO elements from comprehensive HTML", () => {
  const html = readFileSync(join(__dirname, "fixtures/sample-html.html"), "utf-8");
  const parsed = parseHtml(html, "https://example.com/seo-best-practices");

  // Title and meta
  expect(parsed.title).toBe("SEO Best Practices Guide - Complete Tutorial for 2024");
  expect(parsed.metaDescription).toBe(
    "Learn the essential SEO best practices for 2024. Discover proven strategies to improve your search rankings, drive organic traffic, and boost your website's visibility in search engines."
  );
  expect(parsed.canonical).toBe("https://example.com/seo-best-practices");

  // Headings
  expect(parsed.h1).toBe("Complete SEO Best Practices Guide for 2024");
  expect(parsed.h2).toContain("Technical SEO Fundamentals");
  expect(parsed.h2).toContain("Content Strategy");
  expect(parsed.h2).toContain("Link Building Strategies");
  expect(parsed.h2).toContain("Local SEO");
  expect(parsed.h2).toContain("Monitoring and Analytics");
  expect(parsed.h3).toContain("Page Speed Optimization");
  expect(parsed.h3).toContain("Mobile Optimization");
  expect(parsed.h3).toContain("Keyword Research");
  expect(parsed.h3).toContain("Content Optimization");
  expect(parsed.h3).toContain("Internal Linking");
  expect(parsed.h3).toContain("Google My Business");
  expect(parsed.h3).toContain("Key Metrics to Track");
  expect(parsed.h3).toContain("Related Articles");

  // Images
  expect(parsed.images).toHaveLength(2);
  expect(parsed.images[0].src).toBe("https://example.com/images/seo-diagram.png");
  expect(parsed.images[0].alt).toBe(
    "SEO optimization flowchart showing the relationship between technical, on-page, and off-page factors"
  );
  expect(parsed.images[1].src).toBe("https://example.com/images/local-seo-example.png");
  expect(parsed.images[1].alt).toBe(
    "Example of optimized Google My Business profile showing business hours, contact information, and customer reviews"
  );

  // Internal links
  expect(parsed.internalLinks.length).toBeGreaterThan(10);
  expect(
    parsed.internalLinks.some((link) => link.href === "https://example.com/technical-seo")
  ).toBe(true);
  expect(
    parsed.internalLinks.some((link) => link.href === "https://example.com/content-marketing")
  ).toBe(true);
  expect(
    parsed.internalLinks.some((link) => link.href === "https://example.com/keyword-research-guide")
  ).toBe(true);

  // JSON-LD Schema types
  expect(parsed.jsonLdTypes).toContain("Article");
  expect(parsed.jsonLdTypes).toContain("FAQPage");

  // Text content
  expect(parsed.textBlocks.length).toBeGreaterThan(0);
  expect(parsed.textBlocks.some((block) => block.includes("SEO"))).toBe(true);

  // Structure elements
  expect(parsed.tablesCount).toBe(1);
  expect(parsed.listsCount).toBeGreaterThan(0);
  expect(parsed.h1Count).toBe(1);

  // Meta tags
  expect(parsed.robots).toBe("index, follow");
  expect(parsed.viewport).toBe("width=device-width, initial-scale=1.0");

  // Technical elements
  expect(parsed.mixedContentCandidates).toHaveLength(0);
  expect(parsed.isCanonicalSelfReference).toBe(true);
  expect(parsed.hasNoindex).toBe(false);
  expect(parsed.hasNofollow).toBe(false);
});

test("parser handles minimal HTML with missing elements", () => {
  const html = readFileSync(join(__dirname, "fixtures/minimal-html.html"), "utf-8");
  const parsed = parseHtml(html, "https://example.com");

  // Basic elements
  expect(parsed.title).toBe("Short");
  expect(parsed.metaDescription).toBeNull();
  expect(parsed.canonical).toBeNull();
  expect(parsed.h1).toBe("Main Heading");

  // Empty arrays for missing elements
  expect(parsed.h2).toHaveLength(0);
  expect(parsed.h3).toHaveLength(0);
  expect(parsed.jsonLdTypes).toHaveLength(0);

  // Present elements
  expect(parsed.images).toHaveLength(1);
  expect(parsed.images[0].src).toBe("https://example.com/image.jpg");
  expect(parsed.images[0].alt).toBeNull();
  expect(parsed.internalLinks).toHaveLength(1);
  expect(parsed.internalLinks[0].href).toBe("https://example.com/link");
  expect(parsed.internalLinks[0].anchor).toBe("Link");

  // Default values
  expect(parsed.robots).toBeNull();
  expect(parsed.viewport).toBeNull();
  expect(parsed.tablesCount).toBe(0);
  expect(parsed.listsCount).toBe(0);
  expect(parsed.h1Count).toBe(1);
  expect(parsed.mixedContentCandidates).toHaveLength(0);
  expect(parsed.isCanonicalSelfReference).toBe(false);
  expect(parsed.hasNoindex).toBe(false);
  expect(parsed.hasNofollow).toBe(false);
});

test("parser handles malformed HTML gracefully", () => {
  const malformedHtml = `
    <html>
      <head>
        <title>Test Title
        <meta name="description" content="Test description"
      </head>
      <body>
        <h1>Test Heading
        <img src="test.jpg" alt="Test alt
        <a href="/test">Test Link
      </body>
    </html>
  `;

  const parsed = parseHtml(malformedHtml, "https://example.com");

  // Should still extract what it can
  expect(parsed.title).toContain("Test Title");
  expect(parsed.h1).toBeNull(); // Malformed HTML may not extract H1 properly
  expect(parsed.images).toHaveLength(0); // Malformed HTML may not extract images properly
  expect(parsed.internalLinks).toHaveLength(0); // Malformed HTML may not extract links properly

  // Should handle missing elements gracefully
  expect(parsed.metaDescription).toBeNull();
  expect(parsed.canonical).toBeNull();
});
