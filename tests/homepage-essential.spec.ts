import { test, expect } from "@playwright/test";

test.describe("AISEOTurbo Homepage - Essential Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("homepage loads with correct title and main content", async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/AISEOTurbo|SEO Audit/i);

    // Check main heading exists
    const mainHeading = page.locator("h1").first();
    await expect(mainHeading).toBeVisible();

    // Check main content area exists
    const mainContent = page.locator("main, section").first();
    await expect(mainContent).toBeVisible();
  });

  test("hero section displays correctly", async ({ page }) => {
    // Check hero section exists
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();

    // Check headline exists
    const headline = page.locator("h1");
    await expect(headline).toBeVisible();

    // Check for any CTA buttons in hero area
    const ctaButtons = heroSection.locator("button, a").filter({
      hasText: /audit|demo|start|get|try|free/i,
    });
    const ctaCount = await ctaButtons.count();
    expect(ctaCount, "Hero should have at least one CTA").toBeGreaterThan(0);
  });

  test("page has no critical console errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.waitForLoadState("networkidle");

    // Filter out common non-critical errors
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("manifest") &&
        !error.includes("sw.js") &&
        !error.toLowerCase().includes("network error")
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("responsive layout works on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    // Check no horizontal scroll
    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalScroll).toBeFalsy();

    // Check main content still visible
    const mainContent = page.locator("h1").first();
    await expect(mainContent).toBeVisible();
  });

  test("A/B testing framework is operational", async ({ page }) => {
    // Check for A/B test data attributes
    const abElements = page.locator("[data-ab-test], [data-ab-variant], [data-variant]");
    const abCount = await abElements.count();

    // Should have some A/B test elements if framework is active
    expect(abCount, "A/B testing framework should be present").toBeGreaterThan(0);
  });

  test("images have proper alt text for accessibility", async ({ page }) => {
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      const ariaLabel = await img.getAttribute("aria-label");
      const role = await img.getAttribute("role");

      // Images should have alt text, aria-label, or be decorative
      const hasAccessibilityText = alt !== null || ariaLabel !== null || role === "presentation";
      expect(hasAccessibilityText, `Image ${i} missing accessibility text`).toBeTruthy();
    }
  });

  test("page loads within reasonable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Check main content is visible
    await expect(page.locator("h1").first()).toBeVisible();

    const loadTime = Date.now() - startTime;

    // Reasonable load time for development (production should be much faster)
    expect(loadTime, "Page should load within 10 seconds").toBeLessThan(10000);
  });

  test("basic keyboard navigation works", async ({ page }) => {
    // Focus first interactive element
    await page.keyboard.press("Tab");

    // Check something is focused
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Try a few more tabs
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Should still have a focused element
    const stillFocused = page.locator(":focus");
    await expect(stillFocused).toBeVisible();
  });

  test("SEO meta tags are present", async ({ page }) => {
    // Check for basic SEO tags
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });
});

test.describe("AISEOTurbo - Mobile Specific Tests", () => {
  test.use({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro
  });

  test("mobile hero section displays properly", async ({ page }) => {
    await page.goto("/");

    // Check hero is visible on mobile
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();

    // Check headline fits in viewport
    const headline = page.locator("h1").first();
    await expect(headline).toBeVisible();

    const headlineBox = await headline.boundingBox();
    expect(headlineBox?.y, "Headline should be near top of viewport").toBeLessThan(200);
  });

  test("mobile layout has no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth, "Body should not exceed viewport width").toBeLessThanOrEqual(
      viewportWidth + 1
    );
  });
});
