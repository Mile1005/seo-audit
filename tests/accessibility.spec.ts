import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Accessibility test configuration
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const CRITICAL_PAGES = [
  "/",
  "/features",
  "/features/seo-audit",
  "/features/competitor-analysis",
  "/pricing",
  "/contact",
  "/login",
  "/signup",
];

test.describe("Accessibility Compliance Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set up accessibility testing
    await page.addInitScript(() => {
      // Disable animations for consistent testing
      const style = document.createElement("style");
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: -0.01ms !important;
          animation-iteration-count: 1 !important;
          background-attachment: initial !important;
          scroll-behavior: auto !important;
          transition-duration: 0.01ms !important;
          transition-delay: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    });
  });

  CRITICAL_PAGES.forEach((pagePath) => {
    test(`WCAG 2.1 AA compliance for ${pagePath}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${pagePath}`);

      // Wait for page to be fully loaded
      await page.waitForLoadState("networkidle");

      // Run axe accessibility tests
      const accessibilityScanResults = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

      // Assert no critical or serious violations
      const criticalAndSeriousViolations = accessibilityScanResults.violations.filter(
        (violation) => violation.impact === "critical" || violation.impact === "serious"
      );

      // Log all violations for monitoring
      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          `⚠️ Accessibility violations found on ${pagePath}:`,
          accessibilityScanResults.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
          }))
        );
      }

      // Only fail on critical and serious violations
      expect(criticalAndSeriousViolations).toEqual([]);

      // Log accessibility score
      const passCount = accessibilityScanResults.passes.length;
      const violationCount = accessibilityScanResults.violations.length;
      const incompleteCount = accessibilityScanResults.incomplete.length;

      console.log(`Accessibility results for ${pagePath}:`, {
        passes: passCount,
        violations: violationCount,
        incomplete: incompleteCount,
        score: passCount / (passCount + violationCount + incompleteCount),
      });
    });
  });

  test("Keyboard navigation functionality", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Test tab navigation through interactive elements
    const focusableElements = await page
      .locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      .all();

    for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
      await page.keyboard.press("Tab");

      // Check if focused element is visible
      const focusedElement = await page.locator(":focus").first();
      await expect(focusedElement).toBeVisible();
    }

    // Test skip links
    await page.keyboard.press("Home");
    await page.keyboard.press("Tab");

    const skipLink = page.locator('a[href^="#"]').first();
    if ((await skipLink.count()) > 0) {
      await skipLink.press("Enter");

      // Verify focus moved to target
      const targetId = await skipLink.getAttribute("href");
      if (targetId) {
        const target = page.locator(targetId);
        await expect(target).toBeFocused();
      }
    }
  });

  test("Screen reader compatibility", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Check for proper ARIA labels and descriptions
    const interactiveElements = await page
      .locator('button, input, select, textarea, [role="button"], [role="link"]')
      .all();

    for (const element of interactiveElements) {
      const accessibleName =
        (await element.getAttribute("aria-label")) ||
        (await element.getAttribute("aria-labelledby")) ||
        (await element.textContent());

      expect(accessibleName).toBeTruthy();
    }

    // Check for live regions
    const liveRegions = await page.locator("[aria-live]").all();
    expect(liveRegions.length).toBeGreaterThan(0);

    // Check heading hierarchy
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    let lastLevel = 0;

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName);
      const level = parseInt(tagName.substring(1));

      if (lastLevel > 0) {
        expect(level - lastLevel).toBeLessThanOrEqual(1);
      }

      lastLevel = level;
    }
  });

  test("Focus management in modals and dropdowns", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Test modal focus trap (if modals exist)
    const modalTrigger = page.locator("[data-modal-trigger]").first();
    if ((await modalTrigger.count()) > 0) {
      await modalTrigger.click();

      // Wait for modal to appear
      const modal = page.locator('[role="dialog"]').first();
      await expect(modal).toBeVisible();

      // Check if focus is trapped within modal
      const focusableInModal = await modal
        .locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
        .all();

      if (focusableInModal.length > 1) {
        // Tab to last element
        for (let i = 0; i < focusableInModal.length - 1; i++) {
          await page.keyboard.press("Tab");
        }

        // Tab again should wrap to first element
        await page.keyboard.press("Tab");
        await expect(focusableInModal[0]).toBeFocused();

        // Shift+Tab should wrap to last element
        await page.keyboard.press("Shift+Tab");
        await expect(focusableInModal[focusableInModal.length - 1]).toBeFocused();
      }

      // Escape should close modal
      await page.keyboard.press("Escape");
      await expect(modal).not.toBeVisible();
    }
  });

  test("Color contrast validation", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Check contrast ratios for text elements
    const textElements = await page.locator("p, span, div, h1, h2, h3, h4, h5, h6").all();

    for (let i = 0; i < Math.min(textElements.length, 20); i++) {
      const element = textElements[i];
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
        };
      });

      // Skip if no text content
      const textContent = await element.textContent();
      if (!textContent?.trim()) continue;

      // Parse RGB values and calculate contrast
      const colorMatch = styles.color.match(/rgb\((\d+), (\d+), (\d+)\)/);
      const bgMatch = styles.backgroundColor.match(/rgb\((\d+), (\d+), (\d+)\)/);

      if (colorMatch && bgMatch) {
        const textColor = `#${parseInt(colorMatch[1]).toString(16).padStart(2, "0")}${parseInt(colorMatch[2]).toString(16).padStart(2, "0")}${parseInt(colorMatch[3]).toString(16).padStart(2, "0")}`;
        const bgColor = `#${parseInt(bgMatch[1]).toString(16).padStart(2, "0")}${parseInt(bgMatch[2]).toString(16).padStart(2, "0")}${parseInt(bgMatch[3]).toString(16).padStart(2, "0")}`;

        // Inject contrast calculation function
        const contrastRatio = await page.evaluate(
          ({ fg, bg }) => {
            const getLuminance = (color: string) => {
              const hex = color.replace("#", "");
              const r = parseInt(hex.substr(0, 2), 16) / 255;
              const g = parseInt(hex.substr(2, 2), 16) / 255;
              const b = parseInt(hex.substr(4, 2), 16) / 255;

              const sRGB = [r, g, b].map((c) => {
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
              });

              return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
            };

            const l1 = getLuminance(fg);
            const l2 = getLuminance(bg);
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);

            return (lighter + 0.05) / (darker + 0.05);
          },
          { fg: textColor, bg: bgColor }
        );

        // Check if meets WCAG AA requirements
        const fontSize = parseFloat(styles.fontSize);
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && styles.fontSize.includes("bold"));
        const requiredRatio = isLargeText ? 3.0 : 4.5;

        expect(contrastRatio).toBeGreaterThanOrEqual(requiredRatio);
      }
    }
  });

  test("Form accessibility and validation", async ({ page }) => {
    // Test contact form
    await page.goto("http://localhost:3000/contact");
    await page.waitForLoadState("networkidle");

    // Check all form controls have labels
    const formControls = await page.locator("input, select, textarea").all();

    for (const control of formControls) {
      const id = await control.getAttribute("id");
      const ariaLabel = await control.getAttribute("aria-label");
      const ariaLabelledBy = await control.getAttribute("aria-labelledby");

      const hasLabel =
        ariaLabel ||
        ariaLabelledBy ||
        (id && (await page.locator(`label[for="${id}"]`).count()) > 0);

      expect(hasLabel).toBeTruthy();
    }

    // Test form validation announcements
    const submitButton = page.locator('button[type="submit"]').first();
    if ((await submitButton.count()) > 0) {
      await submitButton.click();

      // Check for error announcements
      const errorMessages = await page
        .locator('[role="alert"], .error, [aria-invalid="true"]')
        .all();

      if (errorMessages.length > 0) {
        // Verify error messages are associated with form fields
        for (const error of errorMessages) {
          const isVisible = await error.isVisible();
          expect(isVisible).toBeTruthy();
        }
      }
    }
  });

  test("Image accessibility", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const images = await page.locator("img").all();

    for (const img of images) {
      const alt = await img.getAttribute("alt");
      const role = await img.getAttribute("role");
      const ariaLabel = await img.getAttribute("aria-label");

      // All images should have alt attribute
      expect(alt).not.toBeNull();

      // Decorative images should have empty alt or role="presentation"
      if (alt === "" || role === "presentation") {
        // Decorative image - should not have aria-label
        expect(ariaLabel).toBeNull();
      } else {
        // Informative image - should have meaningful alt text
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(0);
      }
    }
  });

  test("Mobile accessibility", async ({ page, browserName }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Test touch target sizes (minimum 44x44px)
    const interactiveElements = await page
      .locator('button, a, input, select, textarea, [role="button"], [role="link"]')
      .all();

    for (const element of interactiveElements) {
      const boundingBox = await element.boundingBox();

      if (boundingBox) {
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }

    // Test mobile-specific navigation
    const mobileMenu = page.locator("[data-mobile-menu]").first();
    if ((await mobileMenu.count()) > 0) {
      const isVisible = await mobileMenu.isVisible();
      expect(isVisible).toBeTruthy();
    }
  });
});

// Performance and accessibility integration tests
test.describe("Performance Impact on Accessibility", () => {
  test("Fast loading with screen reader content", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds for good accessibility (relaxed for development)
    expect(loadTime).toBeLessThan(10000);

    // Check that accessibility content is immediately available
    const skipLink = page.locator('a[href^="#"]').first();
    if ((await skipLink.count()) > 0) {
      await expect(skipLink).toBeVisible();
    }

    const headings = await page.locator("h1").all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test("Accessibility with JavaScript disabled", async ({ page }) => {
    // Create a new context with JavaScript disabled
    const context = await page.context().browser()?.newContext({
      javaScriptEnabled: false,
    });

    if (!context) return;

    const newPage = await context.newPage();

    await newPage.goto("http://localhost:3000");

    // Basic content should still be accessible
    const mainHeading = newPage.locator("h1").first();
    await expect(mainHeading).toBeVisible();

    // Navigation should work
    const navLinks = await newPage.locator("nav a").all();
    expect(navLinks.length).toBeGreaterThan(0);

    // Forms should be functional
    const forms = await newPage.locator("form").all();
    for (const form of forms) {
      const action = await form.getAttribute("action");
      expect(action).toBeTruthy();
    }

    await context.close();
  });
});
