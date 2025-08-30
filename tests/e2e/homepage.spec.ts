import { test, expect } from '@playwright/test';

test.describe('Homepage Conversion Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('Hero section CTA leads to audit tool', async ({ page }) => {
    // Find and click primary CTA button
    const primaryCTA = page.locator('[data-testid="hero-cta"], .hero-cta, button:has-text("Start Free Audit")').first();
    
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toBeEnabled();
    
    await primaryCTA.click();
    
    // Should navigate to audit page or show audit form
    await expect(page).toHaveURL(/.*\/(audit|seo-audit|dashboard).*/);
    
    // Verify audit form is present
    const auditForm = page.locator('form').first();
    await expect(auditForm).toBeVisible();
    
    const urlInput = page.locator('input[type="url"], input[placeholder*="website"], input[placeholder*="URL"]').first();
    await expect(urlInput).toBeVisible();
  });

  test('Secondary CTA leads to features page', async ({ page }) => {
    const secondaryCTA = page.locator('a:has-text("Learn More"), a:has-text("View Features"), .secondary-cta').first();
    
    if (await secondaryCTA.count() > 0) {
      await secondaryCTA.click();
      
      // Should navigate to features page
      await expect(page).toHaveURL(/.*\/features.*/);
      
      // Verify features content is loaded
      const featuresContent = page.locator('h1, h2').first();
      await expect(featuresContent).toBeVisible();
    }
  });

  test('Social proof elements are present', async ({ page }) => {
    // Check for testimonials
    const testimonials = page.locator('[data-testid="testimonials"], .testimonial, .testimonials-section');
    if (await testimonials.count() > 0) {
      await expect(testimonials.first()).toBeVisible();
    }
    
    // Check for stats/metrics
    const statsSection = page.locator('[data-testid="stats"], .stats, .metrics, .numbers');
    if (await statsSection.count() > 0) {
      await expect(statsSection.first()).toBeVisible();
    }
    
    // Check for company logos or customer logos
    const logoSection = page.locator('[data-testid="logos"], .logos, .customers, .clients');
    if (await logoSection.count() > 0) {
      await expect(logoSection.first()).toBeVisible();
    }
  });

  test('Newsletter signup functionality', async ({ page }) => {
    const newsletterForm = page.locator('form:has(input[type="email"])').first();
    
    if (await newsletterForm.count() > 0) {
      const emailInput = newsletterForm.locator('input[type="email"]');
      const submitButton = newsletterForm.locator('button[type="submit"], input[type="submit"]');
      
      await expect(emailInput).toBeVisible();
      await expect(submitButton).toBeVisible();
      
      // Test with valid email
      await emailInput.fill('test@example.com');
      await submitButton.click();
      
      // Check for success message or redirect
      await expect(page.locator('.success, .thank-you, [role="alert"]').first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('Pricing section leads to pricing page', async ({ page }) => {
    const pricingLink = page.locator('a:has-text("Pricing"), a[href*="pricing"]').first();
    
    if (await pricingLink.count() > 0) {
      await pricingLink.click();
      
      await expect(page).toHaveURL(/.*\/pricing.*/);
      
      // Verify pricing content
      const pricingCards = page.locator('.pricing-card, .plan, .tier');
      await expect(pricingCards.first()).toBeVisible();
    }
  });

  test('Mobile responsive behavior', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu should be present
    const mobileMenuTrigger = page.locator('[data-testid="mobile-menu"], .mobile-menu-trigger, .hamburger').first();
    if (await mobileMenuTrigger.count() > 0) {
      await expect(mobileMenuTrigger).toBeVisible();
      
      await mobileMenuTrigger.click();
      
      // Menu should open
      const mobileMenu = page.locator('[data-testid="mobile-nav"], .mobile-nav, .mobile-menu').first();
      await expect(mobileMenu).toBeVisible();
      
      // Should contain navigation links
      const navLinks = mobileMenu.locator('a');
      expect(await navLinks.count()).toBeGreaterThan(0);
    }
    
    // Hero CTA should still be visible and functional
    const mobileCTA = page.locator('[data-testid="hero-cta"], .hero-cta').first();
    await expect(mobileCTA).toBeVisible();
    
    // Touch targets should be adequate size (44px minimum)
    const interactiveElements = await page.locator('button, a, input').all();
    for (const element of interactiveElements.slice(0, 5)) {
      const boundingBox = await element.boundingBox();
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('Performance metrics on homepage', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Hero image should be loaded
    const heroImage = page.locator('img').first();
    if (await heroImage.count() > 0) {
      await expect(heroImage).toBeVisible();
      
      // Image should have loaded successfully
      const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
    
    // Check Core Web Vitals via Performance API
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const metrics: Record<string, number> = {};
          
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
          });
          
          resolve(metrics);
        });
        
        observer.observe({ entryTypes: ['paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve({}), 5000);
      });
    });
    
    console.log('Performance metrics:', metrics);
  });

  test('Error handling for broken links', async ({ page }) => {
    // Test clicking on a non-existent link
    await page.route('**/non-existent-page', route => {
      route.fulfill({
        status: 404,
        contentType: 'text/html',
        body: '<html><body><h1>404 Not Found</h1></body></html>'
      });
    });
    
    // If there's a link to a non-existent page, test error handling
    const links = await page.locator('a[href]').all();
    
    if (links.length > 0) {
      // Test first few links for basic functionality
      for (let i = 0; i < Math.min(links.length, 3); i++) {
        const link = links[i];
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('/') && !href.includes('#')) {
          // Internal link - should not return 404
          const response = await page.request.get(`http://localhost:3000${href}`);
          expect(response.status()).not.toBe(404);
        }
      }
    }
  });

  test('SEO metadata is present', async ({ page }) => {
    // Check title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    
    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    
    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    
    expect(ogTitle).toBeTruthy();
    expect(ogDescription).toBeTruthy();
    
    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
  });
});
