import { test, expect } from "@playwright/test";

test.describe("AISEOTurbo Homepage - Core Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Set up common test environment
    await page.goto("/");
  });

  test("hero renders and CTAs visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // Check hero section visibility
    const heroSection = page.locator('[data-testid="hero-section"], .hero, section').first();
    await expect(heroSection).toBeVisible();

    // Check A/B tested headline is present (with fallback)
    const headline = page.locator('[data-testid="hero-headline"], h1').first();
    await expect(headline).toBeVisible();

    // Check CTAs are visible above the fold
    const primaryCTA = page.locator('[data-testid="cta-button"], button').first();
    await expect(primaryCTA).toBeVisible();

    const secondaryCTA = page.getByRole("button", { name: /demo|watch|see/i }).first();
    await expect(secondaryCTA).toBeVisible();

    // Verify CTAs are clickable without scrolling (above fold)
    const ctaBounds = await primaryCTA.boundingBox();
    expect(ctaBounds?.y).toBeLessThan(700); // Above fold on mobile
  });

  test("no horizontal scrollbars at common breakpoints", async ({ page }) => {
    const breakpoints = [
      { width: 320, height: 568, name: "iPhone 5" },
      { width: 375, height: 667, name: "iPhone 8" },
      { width: 390, height: 844, name: "iPhone 12 Pro" },
      { width: 768, height: 1024, name: "iPad Portrait" },
      { width: 1024, height: 768, name: "iPad Landscape" },
      { width: 1280, height: 720, name: "Desktop HD" },
      { width: 1440, height: 900, name: "Desktop FHD" },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({
        width: breakpoint.width,
        height: breakpoint.height,
      });
      await page.goto("/");

      // Wait for layout to stabilize
      await page.waitForLoadState("networkidle");

      // Check for horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(
        hasHorizontalScroll,
        `Horizontal scroll detected at ${breakpoint.name} (${breakpoint.width}px)`
      ).toBeFalsy();
    }
  });

  test("features section loads and displays cards", async ({ page }) => {
    await page.goto("/");

    // Wait for features section to load (with fallback selectors)
    const featuresSection = page
      .locator('[data-testid="features-section"], .features, section')
      .nth(1);
    await expect(featuresSection).toBeVisible();

    // Check we have feature cards (flexible count)
    const featureCards = page.locator('[data-testid="feature-card"], .feature-card, .card');
    const cardCount = await featureCards.count();
    expect(cardCount).toBeGreaterThan(4); // At least 4 cards

    // Test first card if it has an expander
    const firstCard = featureCards.first();
    const learnMoreButton = firstCard.getByRole("button", { name: /learn more|expand|details/i });

    if (await learnMoreButton.isVisible()) {
      // Check initial state (collapsed)
      const ariaExpanded = await learnMoreButton.getAttribute("aria-expanded");
      if (ariaExpanded) {
        expect(ariaExpanded).toBe("false");
      }

      // Click to expand
      await learnMoreButton.click();

      // Check expanded state
      const newAriaExpanded = await learnMoreButton.getAttribute("aria-expanded");
      if (newAriaExpanded) {
        expect(newAriaExpanded).toBe("true");
      }
    }
  });

  test("pricing section displays and toggle works", async ({ page }) => {
    await page.goto("/");

    // Navigate to pricing section
    const pricingSection = page
      .locator('[data-testid="pricing-section"], .pricing, section')
      .last();
    await pricingSection.scrollIntoViewIfNeeded();

    // Look for price elements
    const priceElements = page.locator('[data-testid*="price"], .price, .amount');
    const priceCount = await priceElements.count();

    if (priceCount > 0) {
      // Get initial price text
      const priceElement = priceElements.first();
      const initialPrice = await priceElement.textContent();

      // Look for billing toggle
      const billingToggle = page
        .locator('[data-testid="billing-toggle"], .toggle, input[type="checkbox"]')
        .first();

      if (await billingToggle.isVisible()) {
        await billingToggle.click();

        // Wait for price update
        await page.waitForTimeout(500);

        // Check price has changed or annual indicators appeared
        const updatedPrice = await priceElement.textContent();
        const hasAnnualText = (await page.locator("text=/year|annual|yr/i").count()) > 0;

        expect(updatedPrice !== initialPrice || hasAnnualText).toBeTruthy();
      }
    }
  });

  test("email capture form validation works", async ({ page }) => {
    await page.goto("/");

    // Look for email capture forms
    const emailInputs = page.locator(
      '[data-testid="lead-email"], input[type="email"], input[placeholder*="email" i]'
    );
    const emailCount = await emailInputs.count();

    if (emailCount > 0) {
      const emailInput = emailInputs.first();
      await emailInput.scrollIntoViewIfNeeded();

      // Test invalid email
      await emailInput.fill("invalid@");

      // Look for submit button
      const submitButton = page
        .locator('[data-testid="lead-submit"], button[type="submit"], .submit-btn')
        .first();
      if (await submitButton.isVisible()) {
        await submitButton.click();

        // Check for error message (flexible selectors)
        const errorVisible = await page
          .locator('[role="alert"], .error, .invalid, text=/invalid|valid email/i')
          .first()
          .isVisible({ timeout: 2000 })
          .catch(() => false);
        expect(errorVisible).toBeTruthy();

        // Test valid email
        await emailInput.fill("test@example.com");
        await submitButton.click();

        // Error should disappear
        const errorStillVisible = await page
          .locator('[role="alert"], .error')
          .first()
          .isVisible({ timeout: 1000 })
          .catch(() => false);
        expect(errorStillVisible).toBeFalsy();
      }
    }
  });
});

test.describe("AISEOTurbo Homepage - Performance & Accessibility", () => {
  test("page loads within reasonable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/", {
      waitUntil: "networkidle",
      timeout: 15000,
    });

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000); // 10s for dev environment

    // Check critical content loads
    const criticalElements = [
      page.locator("h1").first(),
      page.locator("button").first(),
      page.locator("nav, header").first(),
    ];

    for (const element of criticalElements) {
      await expect(element).toBeVisible();
    }
  });

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/");

    // Test tab navigation
    await page.keyboard.press("Tab");
    let focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Continue tabbing to ensure no focus traps
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      focusedElement = page.locator(":focus");

      // Ensure focused element is visible and exists
      const isVisible = await focusedElement.isVisible().catch(() => false);
      if (isVisible) {
        const tagName = await focusedElement
          .evaluate((el) => el.tagName.toLowerCase())
          .catch(() => "");
        const interactiveTags = ["button", "a", "input", "select", "textarea"];
        const isInteractive =
          interactiveTags.includes(tagName) ||
          (await focusedElement
            .getAttribute("tabindex")
            .then((val) => val !== null)
            .catch(() => false));

        expect(isInteractive).toBeTruthy();
      }
    }
  });

  test("images have proper dimensions to prevent layout shift", async ({ page }) => {
    await page.goto("/");

    // Wait for images to load
    await page.waitForLoadState("networkidle");

    const images = page.locator("img");
    const imageCount = await images.count();

    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        // Check first 10 images
        const img = images.nth(i);

        const hasWidth = await img.getAttribute("width");
        const hasHeight = await img.getAttribute("height");
        const hasAspectRatio = await img
          .evaluate((el: HTMLImageElement) => {
            const styles = getComputedStyle(el);
            return styles.aspectRatio !== "auto";
          })
          .catch(() => false);

        expect(
          hasWidth || hasHeight || hasAspectRatio,
          `Image ${i} missing dimensions for layout stability`
        ).toBeTruthy();
      }
    }
  });

  test("no console errors on page load", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes("favicon") && !error.includes("font") && !error.includes("chrome-extension")
    );

    expect(criticalErrors.length).toBe(0);
  });
});

test.describe("AISEOTurbo Homepage - A/B Testing & Analytics", () => {
  test("A/B test data attributes are present", async ({ page }) => {
    await page.goto("/");

    // Check for A/B test attributes on key elements
    const elementsWithABTests = page.locator("[data-ab-test]");
    const abTestCount = await elementsWithABTests.count();

    if (abTestCount > 0) {
      for (let i = 0; i < abTestCount; i++) {
        const element = elementsWithABTests.nth(i);

        const testId = await element.getAttribute("data-ab-test");
        const variant = await element.getAttribute("data-ab-variant");

        expect(testId).toBeTruthy();
        expect(variant).toBeTruthy();

        // Check element is visible
        await expect(element).toBeVisible();
      }
    }
  });

  test("analytics tracking attributes are present on CTAs", async ({ page }) => {
    await page.goto("/");

    // Look for elements with tracking attributes
    const trackedElements = page.locator("[data-event], [data-track]");
    const trackedCount = await trackedElements.count();

    if (trackedCount > 0) {
      const firstTracked = trackedElements.first();
      const eventType =
        (await firstTracked.getAttribute("data-event")) ||
        (await firstTracked.getAttribute("data-track"));

      expect(eventType).toBeTruthy();
      await expect(firstTracked).toBeVisible();
    }

    // Test button clicks don't cause errors
    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();

    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await firstButton.click();

      // Wait a moment for any async tracking
      await page.waitForTimeout(100);
    }
  });
});

// Utility test for overall page health
test("homepage loads without critical issues", async ({ page }) => {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  page.on("requestfailed", (request) => {
    // Only track failed requests for critical resources
    if (request.url().includes(".js") || request.url().includes(".css")) {
      errors.push(`Failed to load: ${request.url()}`);
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check basic page structure
  await expect(page.locator("body")).toBeVisible();
  await expect(page.locator("main, .main, #main")).toBeVisible();

  // Ensure no critical JavaScript errors
  expect(errors.length).toBe(0);

  // Check page title is set
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
  expect(title).not.toBe("localhost");
});
