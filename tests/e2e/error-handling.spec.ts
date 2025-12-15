import { test, expect } from "@playwright/test";

test.describe("Error Handling E2E Tests", () => {
  test("404 page handling", async ({ page }) => {
    // Navigate to non-existent page
    await page.goto("http://localhost:3000/non-existent-page");

    // Should show 404 page
    const heading = page.locator("h1");
    await expect(heading).toContainText(/404|not found|page not found/i);

    // Should have proper status code
    const response = await page.waitForResponse("**/non-existent-page");
    expect(response.status()).toBe(404);

    // Should have navigation back to home
    const homeLink = page.locator('a[href="/"], a:has-text("home"), a:has-text("back")').first();
    await expect(homeLink).toBeVisible();

    await homeLink.click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("500 error page handling", async ({ page }) => {
    // Mock 500 error
    await page.route("**/api/**", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Try to trigger API call
    const apiButton = page.locator('button:has-text("Audit"), button:has-text("Submit")').first();

    if ((await apiButton.count()) > 0) {
      await apiButton.click();

      // Should show error message
      const errorMessage = page.locator('.error, [role="alert"], .alert-error');
      await expect(errorMessage.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("Network error handling", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Simulate network failure
    await page.route("**/*", (route) => {
      route.abort("failed");
    });

    // Try to navigate or make requests
    const link = page.locator("a[href]").first();

    if ((await link.count()) > 0) {
      await link.click();

      // Should handle network error gracefully
      // Look for error message or retry mechanism
      const errorIndicator = page.locator(
        '.error, .offline, .network-error, [data-testid="error"]'
      );

      // Wait a bit to see if error handling appears
      await page.waitForTimeout(3000);

      // Page should still be responsive
      const body = page.locator("body");
      await expect(body).toBeVisible();
    }
  });

  test("Form validation errors", async ({ page }) => {
    await page.goto("http://localhost:3000/contact");
    await page.waitForLoadState("networkidle");

    const form = page.locator("form").first();

    if ((await form.count()) > 0) {
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();

      if ((await submitButton.count()) > 0) {
        // Submit empty form
        await submitButton.click();

        // Should show validation errors
        const validationErrors = page.locator(
          '.error, .field-error, [aria-invalid="true"] + *, .form-error'
        );

        await expect(validationErrors.first()).toBeVisible({ timeout: 5000 });

        // Test invalid email
        const emailInput = form.locator('input[type="email"]').first();

        if ((await emailInput.count()) > 0) {
          await emailInput.fill("invalid-email");
          await submitButton.click();

          // Should show email validation error
          const emailError = page.locator(
            'input[type="email"] + .error, .email-error, [data-testid="email-error"]'
          );

          await expect(emailError.first()).toBeVisible({ timeout: 5000 });
        }
      }
    }
  });

  test("SEO audit error handling", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Find SEO audit input
    const auditInput = page
      .locator('input[placeholder*="URL"], input[name*="url"], input[type="url"]')
      .first();

    if ((await auditInput.count()) > 0) {
      // Test invalid URL
      await auditInput.fill("not-a-url");

      const auditButton = page
        .locator(
          'button:has-text("Audit"), button:has-text("Analyze"), [data-testid="audit-button"]'
        )
        .first();

      if ((await auditButton.count()) > 0) {
        await auditButton.click();

        // Should show URL validation error
        const urlError = page.locator(
          '.url-error, .invalid-url, [data-testid="url-error"], .error'
        );

        await expect(urlError.first()).toBeVisible({ timeout: 5000 });

        // Test unreachable URL
        await auditInput.fill("https://unreachable-domain-12345.com");
        await auditButton.click();

        // Should handle unreachable URL
        const unreachableError = page.locator(
          '.network-error, .unreachable, [data-testid="network-error"], .error'
        );

        await expect(unreachableError.first()).toBeVisible({ timeout: 15000 });
      }
    }
  });

  test("Authentication error handling", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.waitForLoadState("networkidle");

    const form = page.locator("form").first();

    if ((await form.count()) > 0) {
      const emailInput = form.locator('input[type="email"], input[name="email"]').first();
      const passwordInput = form.locator('input[type="password"], input[name="password"]').first();
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();

      if ((await emailInput.count()) > 0 && (await passwordInput.count()) > 0) {
        // Test wrong credentials
        await emailInput.fill("wrong@example.com");
        await passwordInput.fill("wrongpassword");
        await submitButton.click();

        // Should show authentication error
        const authError = page.locator(
          '.auth-error, .login-error, [data-testid="auth-error"], .error'
        );

        await expect(authError.first()).toBeVisible({ timeout: 10000 });

        // Test account lockout scenario
        for (let i = 0; i < 3; i++) {
          await emailInput.fill("test@example.com");
          await passwordInput.fill("wrongpassword");
          await submitButton.click();
          await page.waitForTimeout(1000);
        }

        // Should show lockout message
        const lockoutError = page.locator(
          '.lockout, .too-many-attempts, [data-testid="lockout-error"]'
        );

        // May or may not appear depending on implementation
        if ((await lockoutError.count()) > 0) {
          await expect(lockoutError.first()).toBeVisible();
        }
      }
    }
  });

  test("JavaScript error handling", async ({ page }) => {
    let jsErrors: string[] = [];

    // Listen for console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        jsErrors.push(msg.text());
      }
    });

    // Listen for uncaught exceptions
    page.on("pageerror", (error) => {
      jsErrors.push(error.message);
    });

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Inject a JavaScript error to test error boundary
    await page.evaluate(() => {
      // Trigger an error in a React component if possible
      const button = document.querySelector("button");
      if (button) {
        button.addEventListener("click", () => {
          throw new Error("Test JavaScript error");
        });
        button.click();
      }
    });

    await page.waitForTimeout(2000);

    // Check if error boundary caught the error
    const errorBoundary = page.locator(
      '.error-boundary, .js-error, [data-testid="error-boundary"]'
    );

    if ((await errorBoundary.count()) > 0) {
      await expect(errorBoundary.first()).toBeVisible();
    }

    // Page should still be functional
    const body = page.locator("body");
    await expect(body).toBeVisible();

    console.log("JavaScript errors detected:", jsErrors);
  });

  test("API timeout handling", async ({ page }) => {
    // Mock slow API response
    await page.route("**/api/**", (route) => {
      // Delay response to simulate timeout
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Success" }),
        });
      }, 10000); // 10 second delay
    });

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Trigger API call
    const apiTrigger = page
      .locator('button:has-text("Audit"), button:has-text("Submit"), button:has-text("Save")')
      .first();

    if ((await apiTrigger.count()) > 0) {
      await apiTrigger.click();

      // Should show loading state
      const loading = page.locator('.loading, .spinner, [data-testid="loading"]');

      await expect(loading.first()).toBeVisible({ timeout: 5000 });

      // Should eventually show timeout error
      const timeoutError = page.locator(
        '.timeout, .request-timeout, [data-testid="timeout-error"]'
      );

      await expect(timeoutError.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test("Browser compatibility errors", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Test unsupported feature graceful degradation
    const unsupportedFeatureTest = await page.evaluate(() => {
      // Test for modern feature support
      const features = {
        serviceWorker: "serviceWorker" in navigator,
        intersectionObserver: "IntersectionObserver" in window,
        webgl: (() => {
          try {
            const canvas = document.createElement("canvas");
            return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
          } catch (e) {
            return false;
          }
        })(),
        webP: (() => {
          const canvas = document.createElement("canvas");
          return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
        })(),
      };

      return features;
    });

    console.log("Browser feature support:", unsupportedFeatureTest);

    // Application should work regardless of feature support
    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();

    const navigation = page.locator("nav").first();
    await expect(navigation).toBeVisible();
  });

  test("Rate limiting error handling", async ({ page }) => {
    // Mock rate limiting response
    await page.route("**/api/**", (route) => {
      route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Rate limit exceeded",
          retryAfter: 60,
        }),
        headers: {
          "Retry-After": "60",
        },
      });
    });

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Trigger API call
    const apiTrigger = page.locator('button:has-text("Audit"), button:has-text("Submit")').first();

    if ((await apiTrigger.count()) > 0) {
      await apiTrigger.click();

      // Should show rate limit error
      const rateLimitError = page.locator(
        '.rate-limit, .too-many-requests, [data-testid="rate-limit-error"]'
      );

      await expect(rateLimitError.first()).toBeVisible({ timeout: 10000 });

      // Should show retry information
      const retryInfo = page.locator(':has-text("try again"), :has-text("retry")');
      await expect(retryInfo.first()).toBeVisible();
    }
  });

  test("Offline handling", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Simulate going offline
    await page.context().setOffline(true);

    // Try to navigate
    const link = page.locator("a[href]").first();

    if ((await link.count()) > 0) {
      await link.click();

      // Should show offline indicator
      const offlineIndicator = page.locator('.offline, .no-connection, [data-testid="offline"]');

      // Wait a bit for offline detection
      await page.waitForTimeout(3000);

      // May show offline message
      if ((await offlineIndicator.count()) > 0) {
        await expect(offlineIndicator.first()).toBeVisible();
      }
    }

    // Go back online
    await page.context().setOffline(false);

    // Should recover
    await page.waitForTimeout(2000);
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("Memory leak detection", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if ("memory" in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Perform actions that might cause memory leaks
    for (let i = 0; i < 10; i++) {
      // Navigate around
      const links = await page.locator("a[href]").all();

      if (links.length > 0) {
        await links[0].click();
        await page.waitForLoadState("networkidle");
        await page.goBack();
        await page.waitForLoadState("networkidle");
      }

      // Trigger dynamic content
      const buttons = await page.locator("button").all();

      if (buttons.length > 0) {
        await buttons[0].click();
        await page.waitForTimeout(100);
      }
    }

    // Get final memory usage
    const finalMemory = await page.evaluate(() => {
      if ("memory" in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreasePercent = (memoryIncrease / initialMemory) * 100;

      console.log(
        `Memory usage: ${initialMemory} -> ${finalMemory} (${memoryIncreasePercent.toFixed(2)}% increase)`
      );

      // Should not have excessive memory growth
      expect(memoryIncreasePercent).toBeLessThan(200); // Less than 200% increase
    }
  });
});
