import { test, expect, devices } from '@playwright/test';

// Test common mobile devices
const mobileDevices = [
  { name: 'iPhone 12', ...devices['iPhone 12'] },
  { name: 'iPhone SE', ...devices['iPhone SE'] },
  { name: 'Pixel 5', ...devices['Pixel 5'] },
  { name: 'Galaxy S21', ...devices['Galaxy S21'] },
  { name: 'iPad', ...devices['iPad'] },
  { name: 'iPad Pro', ...devices['iPad Pro'] }
];

mobileDevices.forEach(device => {
  test.describe(`Mobile Testing - ${device.name}`, () => {
    test.use({ ...device });

    test(`Homepage mobile experience on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Page should load and be responsive
      const title = await page.title();
      expect(title).toBeTruthy();
      
      // Main heading should be visible
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      // Check text is readable (not too small)
      const headingStyles = await heading.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: parseFloat(styles.fontSize),
          lineHeight: styles.lineHeight
        };
      });
      
      expect(headingStyles.fontSize).toBeGreaterThanOrEqual(20); // Minimum for mobile
      
      // Touch targets should be large enough (44px minimum)
      const buttons = await page.locator('button, a[href]').all();
      
      for (const button of buttons.slice(0, 5)) { // Check first 5
        const boundingBox = await button.boundingBox();
        if (boundingBox) {
          expect(boundingBox.height).toBeGreaterThanOrEqual(44);
          expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test(`Mobile navigation on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Look for mobile menu trigger
      const mobileMenuTrigger = page.locator(
        '[data-testid="mobile-menu"], .mobile-menu, .hamburger, [aria-label*="menu"], button[aria-expanded]'
      ).first();
      
      if (await mobileMenuTrigger.count() > 0) {
        // Should be visible and tappable
        await expect(mobileMenuTrigger).toBeVisible();
        
        const boundingBox = await mobileMenuTrigger.boundingBox();
        expect(boundingBox!.height).toBeGreaterThanOrEqual(44);
        
        // Tap to open menu
        await mobileMenuTrigger.tap();
        
        // Menu should appear
        const mobileMenu = page.locator(
          '[data-testid="mobile-nav"], .mobile-nav, [role="navigation"] ul, nav ul'
        );
        
        await expect(mobileMenu.first()).toBeVisible();
        
        // Menu items should be tappable
        const menuItems = await mobileMenu.locator('a, button').all();
        
        for (const item of menuItems.slice(0, 3)) {
          const itemBox = await item.boundingBox();
          if (itemBox) {
            expect(itemBox.height).toBeGreaterThanOrEqual(44);
          }
        }
        
        // Close menu (tap trigger again or tap outside)
        await mobileMenuTrigger.tap();
        
        // Menu should close
        await expect(mobileMenu.first()).toBeHidden();
      }
    });

    test(`Mobile form interaction on ${device.name}`, async ({ page }) => {
      // Test contact form if available
      await page.goto('http://localhost:3000/contact');
      await page.waitForLoadState('networkidle');
      
      const form = page.locator('form').first();
      
      if (await form.count() > 0) {
        const inputs = await form.locator('input, textarea, select').all();
        
        for (const input of inputs.slice(0, 3)) {
          // Input should be large enough for mobile
          const inputBox = await input.boundingBox();
          if (inputBox) {
            expect(inputBox.height).toBeGreaterThanOrEqual(44);
          }
          
          // Should be able to focus and type
          await input.tap();
          await expect(input).toBeFocused();
          
          if (await input.getAttribute('type') === 'email') {
            await input.fill('test@example.com');
            expect(await input.inputValue()).toBe('test@example.com');
          } else if ((await input.getAttribute('type')) === 'text' || (await input.evaluate(el => el.tagName)) === 'TEXTAREA') {
            await input.fill('Test input');
            expect(await input.inputValue()).toBe('Test input');
          }
        }
        
        // Submit button should be tappable
        const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();
        
        if (await submitButton.count() > 0) {
          const buttonBox = await submitButton.boundingBox();
          expect(buttonBox!.height).toBeGreaterThanOrEqual(44);
          expect(buttonBox!.width).toBeGreaterThanOrEqual(88); // Wide enough for text
        }
      }
    });

    test(`Mobile scroll behavior on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Get initial scroll position
      const initialScrollY = await page.evaluate(() => window.scrollY);
      expect(initialScrollY).toBe(0);
      
      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500));
      
      // Check new position
      const scrolledY = await page.evaluate(() => window.scrollY);
      expect(scrolledY).toBeGreaterThan(0);
      
      // Test touch scrolling
      await page.touchscreen.tap(200, 400);
      
      // Swipe up (scroll down)
      await page.touchscreen.tap(200, 400);
      await page.touchscreen.tap(200, 200);
      
      // Should have scrolled further
      const finalScrollY = await page.evaluate(() => window.scrollY);
      expect(finalScrollY).toBeGreaterThanOrEqual(scrolledY);
      
      // Test horizontal scrolling if content is wide
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      if (hasHorizontalScroll) {
        console.warn(`${device.name}: Content overflows horizontally`);
      }
    });

    test(`Mobile performance on ${device.name}`, async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Mobile should load reasonably fast
      expect(loadTime).toBeLessThan(8000); // More lenient for mobile
      
      // Check paint timing
      const paintTimings = await page.evaluate(() => {
        const paintEntries = performance.getEntriesByType('paint');
        return paintEntries.reduce((acc, entry) => {
          acc[entry.name] = entry.startTime;
          return acc;
        }, {} as Record<string, number>);
      });
      
      if (paintTimings['first-contentful-paint']) {
        expect(paintTimings['first-contentful-paint']).toBeLessThan(3000);
      }
      
      console.log(`${device.name} performance:`, {
        loadTime,
        paintTimings
      });
    });

    test(`Mobile orientation change on ${device.name}`, async ({ page, context }) => {
      // Skip for non-mobile devices
      if (!device.name.includes('iPhone') && !device.name.includes('Pixel') && !device.name.includes('Galaxy')) {
        test.skip();
      }
      
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Portrait mode (default)
      let viewport = page.viewportSize();
      expect(viewport!.height).toBeGreaterThan(viewport!.width);
      
      // Rotate to landscape
      await page.setViewportSize({ 
        width: viewport!.height, 
        height: viewport!.width 
      });
      
      await page.waitForTimeout(1000); // Allow reflow
      
      // Check layout adapts
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      // Navigation should still work
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
      
      // Content should not overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBeFalsy();
    });

    test(`Mobile accessibility on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Check for proper ARIA labels on mobile-specific elements
      const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu').first();
      
      if (await mobileMenu.count() > 0) {
        const ariaLabel = await mobileMenu.getAttribute('aria-label');
        const ariaExpanded = await mobileMenu.getAttribute('aria-expanded');
        
        expect(ariaLabel || ariaExpanded).toBeTruthy();
      }
      
      // Focus should be visible on mobile
      const focusableElements = await page.locator('a, button, input, select, textarea').all();
      
      for (const element of focusableElements.slice(0, 3)) {
        await element.focus();
        
        const focusStyles = await element.evaluate(el => {
          const styles = window.getComputedStyle(el, ':focus');
          return {
            outline: styles.outline,
            outlineColor: styles.outlineColor,
            boxShadow: styles.boxShadow
          };
        });
        
        // Should have some kind of focus indicator
        const hasFocusIndicator = 
          focusStyles.outline !== 'none' || 
          focusStyles.boxShadow !== 'none' ||
          focusStyles.outlineColor !== 'transparent';
        
        expect(hasFocusIndicator).toBeTruthy();
      }
    });

    test(`Mobile SEO audit tool on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Find SEO audit input/form
      const auditInput = page.locator(
        'input[placeholder*="URL"], input[name*="url"], input[type="url"]'
      ).first();
      
      if (await auditInput.count() > 0) {
        // Input should be properly sized for mobile
        const inputBox = await auditInput.boundingBox();
        expect(inputBox!.height).toBeGreaterThanOrEqual(44);
        
        // Should be able to enter URL
        await auditInput.tap();
        await auditInput.fill('https://example.com');
        
        const value = await auditInput.inputValue();
        expect(value).toBe('https://example.com');
        
        // Find and tap audit button
        const auditButton = page.locator(
          'button:has-text("Audit"), button:has-text("Analyze"), [data-testid="audit-button"]'
        ).first();
        
        if (await auditButton.count() > 0) {
          const buttonBox = await auditButton.boundingBox();
          expect(buttonBox!.height).toBeGreaterThanOrEqual(44);
          
          await auditButton.tap();
          
          // Should show loading or results
          const loadingOrResults = page.locator(
            '.loading, .spinner, .results, [data-testid="loading"], [data-testid="results"]'
          );
          
          await expect(loadingOrResults.first()).toBeVisible({ timeout: 5000 });
        }
      }
    });

    test(`Mobile image handling on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      const images = await page.locator('img').all();
      
      for (const img of images.slice(0, 5)) {
        // Images should have alt text
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
        
        // Images should load
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
        
        // Images should be responsive
        const styles = await img.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            maxWidth: computed.maxWidth,
            width: computed.width,
            height: computed.height
          };
        });
        
        // Should use responsive sizing
        expect(styles.maxWidth).toMatch(/100%|auto/);
      }
    });

    test(`Mobile keyboard interaction on ${device.name}`, async ({ page }) => {
      // Skip if device doesn't have physical keyboard simulation
      if (!device.name.includes('iPad')) {
        test.skip();
      }
      
      await page.goto('http://localhost:3000/contact');
      await page.waitForLoadState('networkidle');
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.locator(':focus').first();
      await expect(focusedElement).toBeVisible();
      
      // Continue tabbing through interactive elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        
        const currentFocus = await page.locator(':focus').first();
        
        if (await currentFocus.count() > 0) {
          await expect(currentFocus).toBeVisible();
          
          // Should have visible focus indicator
          const focusStyles = await currentFocus.evaluate(el => {
            const styles = window.getComputedStyle(el, ':focus');
            return styles.outline !== 'none' || styles.boxShadow !== 'none';
          });
          
          expect(focusStyles).toBeTruthy();
        }
      }
      
      // Test Enter key on buttons
      const button = page.locator('button').first();
      
      if (await button.count() > 0) {
        await button.focus();
        await page.keyboard.press('Enter');
        
        // Button should respond (check for navigation, modal, etc.)
        await page.waitForTimeout(1000);
      }
    });
  });
});

// Cross-device compatibility tests
test.describe('Cross-Device Compatibility', () => {
  test('Layout consistency across devices', async ({ browser }) => {
    const deviceConfigs = [
      { name: 'Mobile', ...devices['iPhone 12'] },
      { name: 'Tablet', ...devices['iPad'] },
      { name: 'Desktop', viewport: { width: 1920, height: 1080 } }
    ];
    
    const screenshots: { device: string; screenshot: Buffer }[] = [];
    
    for (const device of deviceConfigs) {
      const context = await browser.newContext(device);
      const page = await context.newPage();
      
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Take screenshot for comparison
      const screenshot = await page.screenshot({
        fullPage: true,
        quality: 80
      });
      
      screenshots.push({
        device: device.name,
        screenshot
      });
      
      // Basic layout checks
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
      
      await context.close();
    }
    
    console.log(`Generated ${screenshots.length} device screenshots for comparison`);
  });

  test('Touch vs mouse interaction', async ({ browser }) => {
    // Mobile (touch)
    const mobileContext = await browser.newContext(devices['iPhone 12']);
    const mobilePage = await mobileContext.newPage();
    
    await mobilePage.goto('http://localhost:3000');
    await mobilePage.waitForLoadState('networkidle');
    
    // Test touch interactions
    const mobileButton = mobilePage.locator('button').first();
    
    if (await mobileButton.count() > 0) {
      await mobileButton.tap();
      // Should work with touch
    }
    
    await mobileContext.close();
    
    // Desktop (mouse)
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const desktopPage = await desktopContext.newPage();
    
    await desktopPage.goto('http://localhost:3000');
    await desktopPage.waitForLoadState('networkidle');
    
    // Test mouse interactions
    const desktopButton = desktopPage.locator('button').first();
    
    if (await desktopButton.count() > 0) {
      await desktopButton.hover();
      await desktopButton.click();
      // Should work with mouse
    }
    
    await desktopContext.close();
  });

  test('Network conditions impact', async ({ browser }) => {
    // Simulate slow 3G for mobile
    const slowContext = await browser.newContext({
      ...devices['iPhone 12'],
      // Simulate slow network
      offline: false
    });
    
    const slowPage = await slowContext.newPage();
    
    // Throttle network
    await slowPage.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      route.continue();
    });
    
    const startTime = Date.now();
    
    await slowPage.goto('http://localhost:3000');
    await slowPage.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should still be usable on slow connections
    expect(loadTime).toBeLessThan(15000); // 15 seconds max
    
    // Content should be visible
    const heading = slowPage.locator('h1').first();
    await expect(heading).toBeVisible();
    
    await slowContext.close();
  });
});
