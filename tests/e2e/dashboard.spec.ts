import { test, expect } from "@playwright/test";

test.describe("Dashboard E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto("http://localhost:3000/login");
    await page.waitForLoadState("networkidle");

    // Fill login form if present
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();

    if ((await emailInput.count()) > 0) {
      await emailInput.fill("test@example.com");
      await passwordInput.fill("password123");
      await submitButton.click();

      // Wait for redirect to dashboard
      await page.waitForURL("**/dashboard", { timeout: 10000 });
    } else {
      // Navigate directly to dashboard
      await page.goto("http://localhost:3000/dashboard");
    }

    await page.waitForLoadState("networkidle");
  });

  test("Dashboard loads and displays user data", async ({ page }) => {
    // Should be on dashboard
    await expect(page).toHaveURL(/.*dashboard.*/);

    // Should have dashboard heading
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/dashboard|overview|welcome/i);

    // Should have navigation
    const nav = page.locator("nav, .navigation, .sidebar").first();
    await expect(nav).toBeVisible();

    // Should have main content area
    const main = page.locator("main, .main-content, .dashboard-content").first();
    await expect(main).toBeVisible();
  });

  test("Audit history display", async ({ page }) => {
    // Look for audit history section
    const auditHistory = page
      .locator('.audit-history, [data-testid="audit-history"], .recent-audits, .history')
      .first();

    if ((await auditHistory.count()) > 0) {
      await expect(auditHistory).toBeVisible();

      // Should have audit items or empty state
      const auditItems = page.locator('.audit-item, .audit-entry, [data-testid="audit-item"]');

      const emptyState = page.locator('.no-audits, .empty-state, :has-text("No audits")');

      // Either should have audit items or empty state
      const hasItems = (await auditItems.count()) > 0;
      const hasEmptyState = (await emptyState.count()) > 0;

      expect(hasItems || hasEmptyState).toBeTruthy();

      if (hasItems) {
        // Check first audit item
        const firstAudit = auditItems.first();
        await expect(firstAudit).toBeVisible();

        // Should have URL
        const auditUrl = firstAudit.locator('.url, .audit-url, [data-testid="audit-url"]');
        await expect(auditUrl.first()).toBeVisible();

        // Should have date
        const auditDate = firstAudit.locator('.date, .audit-date, [data-testid="audit-date"]');
        await expect(auditDate.first()).toBeVisible();

        // Should have score or status
        const auditScore = firstAudit.locator(
          '.score, .audit-score, .status, [data-testid="audit-score"]'
        );
        await expect(auditScore.first()).toBeVisible();
      }
    }
  });

  test("Start new audit from dashboard", async ({ page }) => {
    // Look for new audit button or form
    const newAuditTrigger = page
      .locator(
        'button:has-text("New Audit"), button:has-text("Start Audit"), .new-audit-btn, [data-testid="new-audit"]'
      )
      .first();

    const auditInput = page
      .locator('input[placeholder*="URL"], input[name*="url"], input[type="url"]')
      .first();

    if ((await newAuditTrigger.count()) > 0) {
      await newAuditTrigger.click();

      // Should show audit form or modal
      const auditForm = page.locator('form, .audit-form, [data-testid="audit-form"]').first();
      await expect(auditForm).toBeVisible();

      // Fill and submit
      const urlInput = auditForm.locator('input[type="url"], input[name="url"]').first();

      if ((await urlInput.count()) > 0) {
        await urlInput.fill("https://example.com");

        const submitBtn = auditForm
          .locator('button[type="submit"], button:has-text("Audit")')
          .first();
        await submitBtn.click();

        // Should show loading or results
        const loadingOrResults = page.locator(".loading, .results, .audit-progress");
        await expect(loadingOrResults.first()).toBeVisible({ timeout: 10000 });
      }
    } else if ((await auditInput.count()) > 0) {
      // Direct input on dashboard
      await auditInput.fill("https://example.com");

      const auditButton = page
        .locator('button:has-text("Audit"), button:has-text("Analyze")')
        .first();
      await auditButton.click();

      // Should show progress or results
      const progress = page.locator(".loading, .progress, .audit-running");
      await expect(progress.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("Dashboard statistics and metrics", async ({ page }) => {
    // Look for statistics cards
    const statsCards = page.locator(
      '.stats, .metrics, .dashboard-stats, .stat-card, [data-testid="stats"]'
    );

    if ((await statsCards.count()) > 0) {
      // Should have multiple stat cards
      expect(await statsCards.count()).toBeGreaterThan(0);

      // Check first stat card
      const firstStat = statsCards.first();
      await expect(firstStat).toBeVisible();

      // Should have a number/value
      const statValue = firstStat.locator(".value, .stat-value, .number");
      await expect(statValue.first()).toBeVisible();

      // Should have a label
      const statLabel = firstStat.locator(".label, .stat-label, .title");
      await expect(statLabel.first()).toBeVisible();
    }

    // Look for charts or graphs
    const charts = page.locator('.chart, .graph, canvas, svg, [data-testid="chart"]');

    if ((await charts.count()) > 0) {
      await expect(charts.first()).toBeVisible();
    }
  });

  test("User profile and settings access", async ({ page }) => {
    // Look for user menu or profile link
    const userMenu = page
      .locator(
        '.user-menu, .profile-menu, [data-testid="user-menu"], button:has-text("Profile"), a:has-text("Settings")'
      )
      .first();

    if ((await userMenu.count()) > 0) {
      await userMenu.click();

      // Should show dropdown or navigate to profile
      const profileLink = page
        .locator('a:has-text("Profile"), a:has-text("Settings"), a:has-text("Account")')
        .first();

      if ((await profileLink.count()) > 0) {
        await profileLink.click();

        // Should navigate to profile page
        await expect(page).toHaveURL(/.*profile.*|.*settings.*|.*account.*/);

        // Should have profile form
        const profileForm = page.locator("form, .profile-form, .settings-form").first();
        await expect(profileForm).toBeVisible();
      }
    }
  });

  test("Dashboard navigation and sidebar", async ({ page }) => {
    // Check for sidebar navigation
    const sidebar = page.locator('.sidebar, .nav-sidebar, [data-testid="sidebar"]').first();

    if ((await sidebar.count()) > 0) {
      await expect(sidebar).toBeVisible();

      // Should have navigation links
      const navLinks = sidebar.locator("a, .nav-link, button");
      expect(await navLinks.count()).toBeGreaterThan(0);

      // Test navigation
      const firstLink = navLinks.first();
      const linkText = await firstLink.textContent();

      await firstLink.click();
      await page.waitForLoadState("networkidle");

      // Should navigate somewhere
      const currentUrl = page.url();
      expect(currentUrl).toContain("localhost:3000");

      console.log(`Navigated via sidebar to: ${currentUrl} (clicked: ${linkText})`);
    }

    // Check for breadcrumbs
    const breadcrumbs = page
      .locator('.breadcrumbs, .breadcrumb, [data-testid="breadcrumbs"]')
      .first();

    if ((await breadcrumbs.count()) > 0) {
      await expect(breadcrumbs).toBeVisible();

      const breadcrumbLinks = breadcrumbs.locator("a");
      expect(await breadcrumbLinks.count()).toBeGreaterThan(0);
    }
  });

  test("Dashboard responsive behavior", async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Should still be functional
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();

    // Mobile menu should be present
    const mobileMenu = page
      .locator('.mobile-menu, .hamburger, [data-testid="mobile-menu"]')
      .first();

    if ((await mobileMenu.count()) > 0) {
      await expect(mobileMenu).toBeVisible();
      await mobileMenu.click();

      // Navigation should appear
      const mobileNav = page.locator('.mobile-nav, .nav-drawer, [data-testid="mobile-nav"]');
      await expect(mobileNav.first()).toBeVisible();
    }

    // Reset to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await page.waitForLoadState("networkidle");
  });

  test("Dashboard data filtering and search", async ({ page }) => {
    // Look for search or filter functionality
    const searchInput = page
      .locator(
        'input[type="search"], input[placeholder*="Search"], .search-input, [data-testid="search"]'
      )
      .first();

    if ((await searchInput.count()) > 0) {
      await searchInput.fill("example.com");

      // Results should filter
      await page.waitForTimeout(1000);

      // Check if results changed
      const results = page.locator(".audit-item, .result-item, .search-result");

      if ((await results.count()) > 0) {
        // At least one result should contain the search term
        const resultTexts = await results.allTextContents();
        const hasMatchingResult = resultTexts.some((text) =>
          text.toLowerCase().includes("example.com")
        );

        expect(hasMatchingResult).toBeTruthy();
      }
    }

    // Look for filter dropdowns
    const filterDropdown = page.locator('select, .filter-dropdown, [data-testid="filter"]').first();

    if ((await filterDropdown.count()) > 0) {
      await filterDropdown.click();

      // Should have filter options
      const filterOptions = page.locator("option, .filter-option");
      expect(await filterOptions.count()).toBeGreaterThan(1);

      // Select first option
      await filterOptions.nth(1).click();

      // Results should update
      await page.waitForTimeout(1000);
    }
  });

  test("Dashboard performance monitoring", async ({ page }) => {
    const startTime = Date.now();

    await page.reload();
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Dashboard should load quickly
    expect(loadTime).toBeLessThan(5000);

    // Check for performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName("first-paint")[0]?.startTime || 0,
        firstContentfulPaint:
          performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
      };
    });

    console.log("Dashboard performance metrics:", performanceMetrics);

    // Should have reasonable paint times
    if (performanceMetrics.firstContentfulPaint > 0) {
      expect(performanceMetrics.firstContentfulPaint).toBeLessThan(3000);
    }
  });

  test("Dashboard data export functionality", async ({ page }) => {
    // Look for export button
    const exportButton = page
      .locator(
        'button:has-text("Export"), button:has-text("Download"), .export-btn, [data-testid="export"]'
      )
      .first();

    if ((await exportButton.count()) > 0) {
      // Set up download listener
      const downloadPromise = page.waitForEvent("download");

      await exportButton.click();

      // Should trigger download
      const download = await downloadPromise;

      // Check download properties
      expect(download.suggestedFilename()).toBeTruthy();
      expect(download.suggestedFilename()).toMatch(/\.(csv|json|pdf|xlsx)$/);

      console.log(`Export triggered: ${download.suggestedFilename()}`);
    }
  });

  test("Dashboard real-time updates", async ({ page }) => {
    // Check if dashboard has real-time features
    const realtimeElements = page.locator(
      '.live, .real-time, [data-testid="realtime"], .auto-refresh'
    );

    if ((await realtimeElements.count()) > 0) {
      // Get initial state
      const initialContent = await page.locator("main").textContent();

      // Wait for potential updates
      await page.waitForTimeout(5000);

      // Check if content might have updated
      const updatedContent = await page.locator("main").textContent();

      console.log("Real-time update check:", {
        hasRealtimeElements: (await realtimeElements.count()) > 0,
        contentChanged: initialContent !== updatedContent,
      });
    }
  });

  test("Dashboard accessibility", async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();

    expect(headings.length).toBeGreaterThan(0);

    // Should start with h1
    const firstHeading = headings[0];
    const tagName = await firstHeading.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("h1");

    // Check for skip links
    const skipLink = page.locator('a:has-text("Skip to"), [data-testid="skip-link"]').first();

    if ((await skipLink.count()) > 0) {
      // Skip link should be focusable
      await skipLink.focus();
      await expect(skipLink).toBeFocused();
    }

    // Check for landmarks
    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible();

    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();

    // Check for proper button labels
    const buttons = await page.locator("button").all();

    for (const button of buttons.slice(0, 5)) {
      const buttonText = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");
      const title = await button.getAttribute("title");

      // Button should have accessible name
      expect(buttonText || ariaLabel || title).toBeTruthy();
    }
  });

  test("Dashboard error states", async ({ page }) => {
    // Mock API error
    await page.route("**/api/dashboard/**", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Should show error state
    const errorState = page.locator(
      '.error-state, .dashboard-error, [data-testid="error-state"], .error'
    );

    await expect(errorState.first()).toBeVisible({ timeout: 10000 });

    // Should have retry mechanism
    const retryButton = page
      .locator('button:has-text("Retry"), button:has-text("Try Again"), .retry-btn')
      .first();

    if ((await retryButton.count()) > 0) {
      await expect(retryButton).toBeVisible();
    }
  });
});
