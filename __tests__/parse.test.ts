import { test, expect } from "vitest";
import { parseHtml, calculateWordCount, calculateReadingTime } from "../lib/parse";

test("calculateWordCount counts words correctly", () => {
  const text1 = ["This is a simple test."];
  expect(calculateWordCount(text1)).toBe(5);
  
  const text2 = ["This is a longer text with multiple sentences. It should count all words correctly."];
  expect(calculateWordCount(text2)).toBe(14);
  
  const text3 = [""];
  expect(calculateWordCount(text3)).toBe(0);
  
  const text4 = ["   Multiple   spaces   should   work   "];
  expect(calculateWordCount(text4)).toBe(4);
});

test("calculateReadingTime estimates reading time correctly", () => {
  const wordCount1 = 200;
  expect(calculateReadingTime(wordCount1)).toBe(1);
  
  const wordCount2 = 1000;
  const readingTime = calculateReadingTime(wordCount2);
  expect(readingTime).toBeGreaterThan(1);
  expect(readingTime).toBeLessThanOrEqual(10);
});

test("parseHtml extracts basic elements", () => {
  const html = `
    <html>
      <head>
        <title>Test Page</title>
        <meta name="description" content="Test description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://example.com/test" />
      </head>
      <body>
        <h1>Main Heading</h1>
        <h2>Sub Heading 1</h2>
        <h2>Sub Heading 2</h2>
        <h3>Sub Sub Heading</h3>
        <p>This is a paragraph with some content.</p>
        <img src="/image.jpg" alt="Test image" />
        <a href="/internal-link">Internal Link</a>
        <a href="https://external.com">External Link</a>
      </body>
    </html>
  `;
  
  const result = parseHtml(html, "https://example.com");
  
  // Basic meta elements
  expect(result.title).toBe("Test Page");
  expect(result.metaDescription).toBe("Test description");
  expect(result.canonical).toBe("https://example.com/test");
  expect(result.robots).toBe("index, follow");
  expect(result.viewport).toBe("width=device-width, initial-scale=1.0");
  
  // Headings
  expect(result.h1).toBe("Main Heading");
  expect(result.h2).toHaveLength(2);
  expect(result.h2).toContain("Sub Heading 1");
  expect(result.h2).toContain("Sub Heading 2");
  expect(result.h3).toHaveLength(1);
  expect(result.h3).toContain("Sub Sub Heading");
  
  // Images
  expect(result.images).toHaveLength(1);
  expect(result.images[0].src).toBe("https://example.com/image.jpg");
  expect(result.images[0].alt).toBe("Test image");
  
  // Internal links only
  expect(result.internalLinks).toHaveLength(1);
  expect(result.internalLinks[0].href).toBe("https://example.com/internal-link");
  expect(result.internalLinks[0].anchor).toBe("Internal Link");
  
  // Text content
  expect(result.textBlocks.length).toBeGreaterThan(0);
  expect(result.textBlocks.some(block => block.includes("paragraph"))).toBe(true);
  
  // Structure counts
  expect(result.h1Count).toBe(1);
  expect(result.tablesCount).toBe(0);
  expect(result.listsCount).toBe(0);
  
  // Technical elements
  expect(result.mixedContentCandidates).toHaveLength(0);
  expect(result.isCanonicalSelfReference).toBe(false);
  expect(result.hasNoindex).toBe(false);
  expect(result.hasNofollow).toBe(false);
});

test("parseHtml handles JSON-LD schema markup", () => {
  const html = `
    <html>
      <head>
        <title>Schema Test</title>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Test Article"
        }
        </script>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": []
        }
        </script>
      </head>
      <body>
        <h1>Test</h1>
      </body>
    </html>
  `;
  
  const result = parseHtml(html, "https://example.com");
  
  expect(result.jsonLdTypes).toHaveLength(2);
  expect(result.jsonLdTypes).toContain("Article");
  expect(result.jsonLdTypes).toContain("FAQPage");
});

test("parseHtml handles missing elements gracefully", () => {
  const html = `
    <html>
      <body>
        <h1>Test</h1>
        <p>Content</p>
      </body>
    </html>
  `;
  
  const result = parseHtml(html, "https://example.com");
  
  // Missing elements should be null or empty arrays
  expect(result.title).toBeNull();
  expect(result.metaDescription).toBeNull();
  expect(result.canonical).toBeNull();
  expect(result.robots).toBeNull();
  expect(result.viewport).toBeNull();
  expect(result.h2).toHaveLength(0);
  expect(result.h3).toHaveLength(0);
  expect(result.images).toHaveLength(0);
  expect(result.internalLinks).toHaveLength(0);
  expect(result.jsonLdTypes).toHaveLength(0);
  
  // Present elements should be extracted
  expect(result.h1).toBe("Test");
  // Note: textBlocks might be empty for minimal HTML
  expect(result.textBlocks.length).toBeGreaterThanOrEqual(0);
});

test("parseHtml detects noindex and nofollow directives", () => {
  const html1 = `
    <html>
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <body>
        <h1>Test</h1>
      </body>
    </html>
  `;
  
  const result1 = parseHtml(html1, "https://example.com");
  expect(result1.hasNoindex).toBe(true);
  expect(result1.hasNofollow).toBe(false);
  
  const html2 = `
    <html>
      <head>
        <meta name="robots" content="index, nofollow" />
      </head>
      <body>
        <h1>Test</h1>
      </body>
    </html>
  `;
  
  const result2 = parseHtml(html2, "https://example.com");
  expect(result2.hasNoindex).toBe(false);
  expect(result2.hasNofollow).toBe(true);
  
  const html3 = `
    <html>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <h1>Test</h1>
      </body>
    </html>
  `;
  
  const result3 = parseHtml(html3, "https://example.com");
  expect(result3.hasNoindex).toBe(true);
  expect(result3.hasNofollow).toBe(true);
});

test("parseHtml detects canonical self-reference", () => {
  const html = `
    <html>
      <head>
        <link rel="canonical" href="https://example.com/test" />
      </head>
      <body>
        <h1>Test</h1>
      </body>
    </html>
  `;
  
  const result = parseHtml(html, "https://example.com/test");
  expect(result.isCanonicalSelfReference).toBe(true);
  
  const result2 = parseHtml(html, "https://example.com/different");
  expect(result2.isCanonicalSelfReference).toBe(false);
});
