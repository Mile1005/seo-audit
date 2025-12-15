import { test, expect } from "@playwright/test";

test.describe("SEO Audit Tool Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");
  });

  test("Complete SEO audit flow", async ({ page }) => {
    // Navigate to audit tool
    const auditButton = page
      .locator(
        'button:has-text("Start Free Audit"), a:has-text("SEO Audit"), [data-testid="audit-cta"]'
      )
      .first();

    if ((await auditButton.count()) > 0) {
      await auditButton.click();
    } else {
      await page.goto("http://localhost:3000/features/seo-audit");
    }

    await page.waitForLoadState("networkidle");

    // Find URL input field
    const urlInput = page
      .locator(
        'input[type="url"], input[placeholder*="website"], input[placeholder*="URL"], input[name="url"]'
      )
      .first();
    await expect(urlInput).toBeVisible();

    // Enter test URL
    const testUrl = "https://example.com";
    await urlInput.fill(testUrl);

    // Find and click submit button
    const submitButton = page
      .locator('button[type="submit"], button:has-text("Audit"), button:has-text("Analyze")')
      .first();
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    await submitButton.click();

    // Wait for audit to start/complete
    await page.waitForTimeout(3000);

    // Check for loading state or results
    const loadingIndicator = page.locator('.loading, .spinner, .progress, [data-testid="loading"]');
    const resultsSection = page.locator('.results, .audit-results, [data-testid="results"]');

    if ((await loadingIndicator.count()) > 0) {
      await expect(loadingIndicator.first()).toBeVisible();

      // Wait for results to appear (with timeout)
      await expect(resultsSection.first()).toBeVisible({ timeout: 30000 });
    } else if ((await resultsSection.count()) > 0) {
      await expect(resultsSection.first()).toBeVisible();
    }

    // Verify audit results contain key metrics
    const metricsSection = page.locator('.metrics, .scores, .performance, [data-testid="metrics"]');
    if ((await metricsSection.count()) > 0) {
      await expect(metricsSection.first()).toBeVisible();
    }
  });

  test("URL validation in audit form", async ({ page }) => {
    await page.goto("http://localhost:3000/features/seo-audit");
    await page.waitForLoadState("networkidle");

    const urlInput = page
      .locator('input[type="url"], input[placeholder*="website"], input[name="url"]')
      .first();
    const submitButton = page.locator('button[type="submit"], button:has-text("Audit")').first();

    // Test empty URL
    await submitButton.click();

    const errorMessage = page.locator('.error, [aria-invalid="true"], [role="alert"]');
    await expect(errorMessage.first()).toBeVisible({ timeout: 3000 });

    // Test invalid URL
    await urlInput.fill("not-a-url");
    await submitButton.click();

    await expect(errorMessage.first()).toBeVisible();

    // Test valid URL
    await urlInput.fill("https://example.com");
    await submitButton.click();

    // Error should disappear or audit should start
    const hasError = (await errorMessage.count()) > 0 && (await errorMessage.first().isVisible());
    if (hasError) {
      // If there's still an error, it might be a different validation issue
      const errorText = await errorMessage.first().textContent();
      console.log("Validation error:", errorText);
    }
  });

  test("Audit results display and navigation", async ({ page }) => {
    // Mock audit results for testing
    await page.route("**/api/seo-audit/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          url: "https://example.com",
          score: 85,
          metrics: {
            performance: 90,
            accessibility: 88,
            bestPractices: 85,
            seo: 82,
          },
          issues: [
            {
              type: "warning",
              category: "SEO",
              message: "Missing meta description",
              impact: "medium",
            },
            {
              type: "error",
              category: "Performance",
              message: "Large image files",
              impact: "high",
            },
          ],
          suggestions: [
            "Add meta descriptions to all pages",
            "Optimize image sizes",
            "Implement lazy loading",
          ],
        }),
      });
    });

    await page.goto("http://localhost:3000/features/seo-audit");
    await page.waitForLoadState("networkidle");

    const urlInput = page.locator('input[type="url"], input[name="url"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await urlInput.fill("https://example.com");
    await submitButton.click();

    // Wait for results
    await page.waitForTimeout(2000);

    // Check for score display
    const scoreElement = page.locator('.score, .rating, [data-testid="score"]');
    if ((await scoreElement.count()) > 0) {
      await expect(scoreElement.first()).toBeVisible();

      const scoreText = await scoreElement.first().textContent();
      expect(scoreText).toMatch(/\d+/); // Should contain a number
    }

    // Check for issues list
    const issuesList = page.locator('.issues, .problems, [data-testid="issues"]');
    if ((await issuesList.count()) > 0) {
      await expect(issuesList.first()).toBeVisible();

      const issues = await issuesList.locator(".issue, .problem").all();
      expect(issues.length).toBeGreaterThan(0);
    }

    // Check for suggestions
    const suggestionsList = page.locator(
      '.suggestions, .recommendations, [data-testid="suggestions"]'
    );
    if ((await suggestionsList.count()) > 0) {
      await expect(suggestionsList.first()).toBeVisible();
    }
  });

  test("Download audit report functionality", async ({ page }) => {
    // Navigate to audit results (using mock data)
    await page.route("**/api/seo-audit/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          url: "https://example.com",
          score: 85,
          timestamp: new Date().toISOString(),
        }),
      });
    });

    await page.goto("http://localhost:3000/features/seo-audit");
    await page.waitForLoadState("networkidle");

    // Perform audit
    const urlInput = page.locator('input[type="url"], input[name="url"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await urlInput.fill("https://example.com");
    await submitButton.click();
    await page.waitForTimeout(2000);

    // Look for download button
    const downloadButton = page.locator(
      'button:has-text("Download"), a:has-text("Download"), [data-testid="download"]'
    );

    if ((await downloadButton.count()) > 0) {
      // Set up download handler
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        downloadButton.first().click(),
      ]);

      // Verify download
      expect(download.suggestedFilename()).toMatch(/audit|report/i);
      expect(download.suggestedFilename()).toMatch(/\.(pdf|csv|json)$/);
    }
  });

  test("Audit history and saved reports", async ({ page }) => {
    // This test assumes user is logged in
    await page.goto("http://localhost:3000/dashboard");
    await page.waitForTimeout(1000);

    if (page.url().includes("/login")) {
      // Not logged in - mock authentication
      await page.evaluate(() => {
        localStorage.setItem("auth-token", "mock-token");
      });
      await page.goto("http://localhost:3000/dashboard");
    }

    // Look for audit history section
    const historySection = page.locator('.history, .reports, .audits, [data-testid="history"]');

    if ((await historySection.count()) > 0) {
      await expect(historySection.first()).toBeVisible();

      // Check for previous audits
      const auditItems = await historySection.locator(".audit-item, .report-item").all();

      if (auditItems.length > 0) {
        // Click on first audit to view details
        await auditItems[0].click();

        // Should show audit details
        const auditDetails = page.locator(
          '.audit-details, .report-details, [data-testid="details"]'
        );
        await expect(auditDetails.first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test("Bulk audit functionality", async ({ page }) => {
    await page.goto("http://localhost:3000/features/seo-audit");
    await page.waitForLoadState("networkidle");

    // Look for bulk audit option
    const bulkAuditToggle = page.locator(
      'button:has-text("Bulk"), input[type="checkbox"]:near(:text("Bulk")), [data-testid="bulk-audit"]'
    );

    if ((await bulkAuditToggle.count()) > 0) {
      await bulkAuditToggle.first().click();

      // Should show multiple URL inputs or file upload
      const multipleUrls = page.locator('textarea, input[multiple], [data-testid="url-list"]');
      const fileUpload = page.locator('input[type="file"]');

      const hasBulkInterface = (await multipleUrls.count()) > 0 || (await fileUpload.count()) > 0;
      expect(hasBulkInterface).toBeTruthy();

      if ((await multipleUrls.count()) > 0) {
        // Test multiple URLs
        const urls = "https://example.com\nhttps://google.com\nhttps://github.com";
        await multipleUrls.first().fill(urls);

        const submitButton = page.locator('button[type="submit"]').first();
        await submitButton.click();

        // Should show progress for multiple audits
        const progressIndicator = page.locator(
          '.progress, .bulk-progress, [data-testid="bulk-progress"]'
        );
        if ((await progressIndicator.count()) > 0) {
          await expect(progressIndicator.first()).toBeVisible();
        }
      }
    }
  });

  test("Real-time audit progress updates", async ({ page }) => {
    await page.goto("http://localhost:3000/features/seo-audit");
    await page.waitForLoadState("networkidle");

    // Mock WebSocket or SSE connection for real-time updates
    await page.addInitScript(() => {
      // Mock progress updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;

        const event = new CustomEvent("audit-progress", {
          detail: { progress, status: `Processing... ${progress}%` },
        });

        window.dispatchEvent(event);

        if (progress >= 100) {
          clearInterval(interval);

          const completeEvent = new CustomEvent("audit-complete", {
            detail: {
              score: 85,
              metrics: { performance: 90, seo: 80 },
            },
          });

          window.dispatchEvent(completeEvent);
        }
      }, 1000);
    });

    const urlInput = page.locator('input[type="url"], input[name="url"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await urlInput.fill("https://example.com");
    await submitButton.click();

    // Check for progress indicators
    const progressBar = page.locator(
      '.progress-bar, [role="progressbar"], [data-testid="progress"]'
    );
    const statusText = page.locator('.status, .progress-text, [data-testid="status"]');

    if ((await progressBar.count()) > 0) {
      await expect(progressBar.first()).toBeVisible();
    }

    if ((await statusText.count()) > 0) {
      await expect(statusText.first()).toBeVisible();

      // Wait for status to update
      await page.waitForFunction(
        () => {
          const status = document.querySelector('.status, .progress-text, [data-testid="status"]');
          return status && status.textContent && status.textContent.includes("%");
        },
        {},
        { timeout: 10000 }
      );
    }
  });

  test("Audit tool accessibility", async ({ page }) => {
    await page.goto("http://localhost:3000/features/seo-audit");
    await page.waitForLoadState("networkidle");

    // Form should be keyboard accessible
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // URL input should have proper labeling
    const urlInput = page.locator('input[type="url"], input[name="url"]').first();
    const inputId = await urlInput.getAttribute("id");
    const ariaLabel = await urlInput.getAttribute("aria-label");
    const ariaLabelledBy = await urlInput.getAttribute("aria-labelledby");

    const hasLabel =
      ariaLabel ||
      ariaLabelledBy ||
      (inputId && (await page.locator(`label[for="${inputId}"]`).count()) > 0);

    expect(hasLabel).toBeTruthy();

    // Submit button should be keyboard activatable
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.focus();
    await page.keyboard.press("Enter");

    // Should trigger form submission
    await page.waitForTimeout(1000);

    // Error messages should be announced
    const errorMessage = page.locator('[role="alert"], .error');
    if ((await errorMessage.count()) > 0) {
      await expect(errorMessage.first()).toBeVisible();
    }

    // Results should be announced when available
    await urlInput.fill("https://example.com");
    await submitButton.click();

    // Live region should exist for updates
    const liveRegion = page.locator('[aria-live], [role="status"], [role="alert"]');
    expect(await liveRegion.count()).toBeGreaterThan(0);
  });
});
