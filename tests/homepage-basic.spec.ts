import { test, expect } from "@playwright/test";

test.describe("AISEOTurbo Homepage - Essential Tests", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");

    // Check page loads
    await expect(page).toHaveTitle(/AISEOTurbo/i);

    // Check main content areas exist
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("main, .main, section").first()).toBeVisible();

    // Check navigation exists
    await expect(page.locator("nav, header, .nav").first()).toBeVisible();
  });

  test("hero section renders on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // Check hero content exists
    const heroHeading = page.locator("h1").first();
    await expect(heroHeading).toBeVisible();

    // Check CTAs exist and are above fold
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    const firstButton = buttons.first();
    await expect(firstButton).toBeVisible();

    // Verify button is above fold
    const buttonPos = await firstButton.boundingBox();
    expect(buttonPos?.y).toBeLessThan(800);
  });

  test("no horizontal scroll at common breakpoints", async ({ page }) => {
    const breakpoints = [320, 375, 768, 1024, 1280, 1440];

    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      await page.waitForLoadState("networkidle");

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll, `Horizontal scroll at ${width}px`).toBeFalsy();
    }
  });

  test("navigation and footer render", async ({ page }) => {
    await page.goto("/");

    // Check navigation elements
    const navLinks = page.locator("nav a, header a");
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Check footer exists
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("form inputs work when present", async ({ page }) => {
    await page.goto("/");

    // Look for any email inputs
    const emailInputs = page.locator('input[type="email"], input[placeholder*="email" i]');
    const emailCount = await emailInputs.count();

    if (emailCount > 0) {
      const emailInput = emailInputs.first();
      await emailInput.scrollIntoViewIfNeeded();

      // Test typing in the input
      await emailInput.fill("test@example.com");
      const value = await emailInput.inputValue();
      expect(value).toBe("test@example.com");

      // Clear the input
      await emailInput.fill("");
    }
  });

  test("images have alt text or proper attributes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      const alt = await img.getAttribute("alt");
      const ariaLabel = await img.getAttribute("aria-label");
      const role = await img.getAttribute("role");

      // Image should have alt text, aria-label, or be decorative
      const isAccessible = alt !== null || ariaLabel !== null || role === "presentation";
      expect(isAccessible, `Image ${i} needs alt text or aria-label`).toBeTruthy();
    }
  });

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/");

    // Tab through first few focusable elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");

      const focused = page.locator(":focus");
      const isFocused = (await focused.count()) > 0;

      if (isFocused) {
        await expect(focused).toBeVisible();
      }
    }
  });

  test("page performance basics", async ({ page }) => {
    const start = Date.now();

    await page.goto("/", { waitUntil: "networkidle" });

    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10000); // 10 seconds for dev

    // Check no console errors
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);

    // Filter out non-critical errors
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("favicon") && !error.includes("font") && !error.includes("chrome-extension")
    );

    expect(criticalErrors.length).toBe(0);
  });

  test("responsive layout stability", async ({ page }) => {
    await page.goto("/");

    // Test layout at different sizes
    const sizes = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1280, height: 720 }, // Desktop
    ];

    for (const size of sizes) {
      await page.setViewportSize(size);
      await page.waitForTimeout(500); // Let layout settle

      // Check main content is visible
      const main = page.locator("main, .main, section").first();
      await expect(main).toBeVisible();

      // Check no elements overflow horizontally
      const body = await page.locator("body").boundingBox();
      expect(body?.width).toBeLessThanOrEqual(size.width + 20); // Small tolerance
    }
  });
});

// A/B Testing specific tests
test.describe("A/B Testing Infrastructure", () => {
  test("A/B test attributes present when implemented", async ({ page }) => {
    await page.goto("/");

    // Look for A/B test data attributes
    const abElements = page.locator("[data-ab-test]");
    const abCount = await abElements.count();

    // If A/B tests are implemented, check they work
    if (abCount > 0) {
      const firstABElement = abElements.first();

      const testId = await firstABElement.getAttribute("data-ab-test");
      const variant = await firstABElement.getAttribute("data-ab-variant");

      expect(testId).toBeTruthy();
      expect(variant).toBeTruthy();

      // Refresh and check consistency
      const initialVariant = variant;
      await page.reload();

      const newVariant = await firstABElement.getAttribute("data-ab-variant");
      expect(newVariant).toBe(initialVariant);
    }
  });

  test("analytics tracking attributes when implemented", async ({ page }) => {
    await page.goto("/");

    // Look for tracking attributes
    const trackedElements = page.locator("[data-event], [data-track], [data-analytics]");
    const trackedCount = await trackedElements.count();

    if (trackedCount > 0) {
      const firstTracked = trackedElements.first();
      await expect(firstTracked).toBeVisible();

      // Click shouldn't cause errors
      if (
        (await firstTracked.getAttribute("role")) === "button" ||
        (await firstTracked.evaluate((el) => el.tagName.toLowerCase())) === "button"
      ) {
        await firstTracked.click();
        await page.waitForTimeout(100);
      }
    }
  });
});
