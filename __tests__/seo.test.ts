import { test, expect } from "vitest";
import { generateSEOMeta, generateStructuredData } from "../lib/seo";

test("generateSEOMeta generates proper metadata structure", () => {
  const meta = generateSEOMeta({
    title: "Test Page",
    description: "Test description",
    keywords: ["test", "seo"],
  });

  expect(meta).toHaveProperty("title");
  expect(meta.title).toContain("Test Page");
  expect(meta).toHaveProperty("description");
  expect(meta.description).toBe("Test description");
  expect(meta).toHaveProperty("keywords");
});

test("generateSEOMeta uses default values when not provided", () => {
  const meta = generateSEOMeta({});

  expect(meta).toHaveProperty("title");
  expect(meta.title).toContain("AISEOTurbo");
  expect(meta).toHaveProperty("description");
  expect(meta.description).toContain("Boost your website rankings");
});

test("generateStructuredData creates proper JSON-LD structure", () => {
  const structuredData = generateStructuredData("website", {
    name: "Test Site",
    url: "https://example.com",
  });

  expect(structuredData).toHaveProperty("@context");
  expect(structuredData["@context"]).toBe("https://schema.org");
  expect(structuredData).toHaveProperty("@type");
  expect(structuredData["@type"]).toBe("WebSite");
});

test("generateStructuredData handles different types", () => {
  const websiteData = generateStructuredData("website");
  const orgData = generateStructuredData("organization");
  const productData = generateStructuredData("product");
  const articleData = generateStructuredData("article");

  expect(websiteData["@type"]).toBe("WebSite");
  expect(orgData["@type"]).toBe("Organization");
  expect(productData["@type"]).toBe("SoftwareApplication");
  expect(articleData["@type"]).toBe("Article");
});
