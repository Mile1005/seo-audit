import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Compatibility', () => {
  const browsers = ['chromium', 'firefox', 'webkit'];
  
  browsers.forEach(browserName => {
    test.describe(`${browserName} compatibility`, () => {
      test(`Homepage loads correctly in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Basic page structure should be present
        const title = await page.title();
        expect(title).toBeTruthy();
        
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
        
        // Navigation should be present
        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible();
        
        // CSS should be loaded (check computed styles)
        const bodyStyles = await page.locator('body').evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontFamily: styles.fontFamily,
            backgroundColor: styles.backgroundColor,
            margin: styles.margin
          };
        });
        
        expect(bodyStyles.fontFamily).toBeTruthy();
        expect(bodyStyles.fontFamily).not.toBe('Times'); // Should not be default serif
      });

      test(`JavaScript functionality works in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Test interactive elements
        const buttons = await page.locator('button').all();
        
        if (buttons.length > 0) {
          const firstButton = buttons[0];
          await expect(firstButton).toBeEnabled();
          
          // Click should work
          await firstButton.click();
          // Button should respond (might navigate, show modal, etc.)
        }
        
        // Test form interactions
        const inputs = await page.locator('input').all();
        
        if (inputs.length > 0) {
          const firstInput = inputs[0];
          await firstInput.fill('test input');
          
          const value = await firstInput.inputValue();
          expect(value).toBe('test input');
        }
      });

      test(`Mobile viewport in ${browserName}`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Mobile navigation should work
        const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, .hamburger').first();
        
        if (await mobileMenu.count() > 0) {
          await expect(mobileMenu).toBeVisible();
          await mobileMenu.click();
          
          // Menu should open
          const mobileNav = page.locator('[data-testid="mobile-nav"], .mobile-nav').first();
          await expect(mobileNav).toBeVisible();
        }
        
        // Content should be readable on mobile
        const bodyText = await page.locator('body').evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight
          };
        });
        
        const fontSize = parseFloat(bodyText.fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum readable size
      });

      test(`CSS Grid and Flexbox support in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Check for CSS Grid support
        const gridSupport = await page.evaluate(() => {
          return CSS.supports('display', 'grid');
        });
        
        expect(gridSupport).toBeTruthy();
        
        // Check for Flexbox support
        const flexSupport = await page.evaluate(() => {
          return CSS.supports('display', 'flex');
        });
        
        expect(flexSupport).toBeTruthy();
        
        // Test actual grid/flex layouts
        const gridElements = await page.locator('[style*="grid"], .grid').all();
        const flexElements = await page.locator('[style*="flex"], .flex').all();
        
        // At least some layout should use modern CSS
        expect(gridElements.length + flexElements.length).toBeGreaterThan(0);
      });

      test(`Modern JavaScript features in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Test ES6+ features support
        const jsFeatures = await page.evaluate(() => {
          return {
            arrow_functions: (() => true)(),
            template_literals: `test ${1 + 1}` === 'test 2',
            destructuring: (() => {
              const [a] = [1];
              return a === 1;
            })(),
            promises: typeof Promise !== 'undefined',
            async_await: (async () => true)() instanceof Promise,
            fetch: typeof fetch !== 'undefined',
            intersectionObserver: typeof IntersectionObserver !== 'undefined'
          };
        });
        
        expect(jsFeatures.arrow_functions).toBeTruthy();
        expect(jsFeatures.template_literals).toBeTruthy();
        expect(jsFeatures.destructuring).toBeTruthy();
        expect(jsFeatures.promises).toBeTruthy();
        expect(jsFeatures.async_await).toBeTruthy();
        expect(jsFeatures.fetch).toBeTruthy();
        
        // Log browser capabilities
        console.log(`${browserName} JS features:`, jsFeatures);
      });

      test(`Form submission in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000/contact');
        await page.waitForLoadState('networkidle');
        
        const form = page.locator('form').first();
        
        if (await form.count() > 0) {
          // Fill out form
          const emailInput = form.locator('input[type="email"], input[name="email"]').first();
          const messageInput = form.locator('textarea, input[name="message"]').first();
          const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();
          
          if (await emailInput.count() > 0) {
            await emailInput.fill('test@example.com');
          }
          
          if (await messageInput.count() > 0) {
            await messageInput.fill('Test message from automated test');
          }
          
          if (await submitButton.count() > 0) {
            await submitButton.click();
            
            // Should show some response (success/error message)
            const response = page.locator('.success, .error, [role="alert"]');
            await expect(response.first()).toBeVisible({ timeout: 10000 });
          }
        }
      });

      test(`Performance in ${browserName}`, async ({ page }) => {
        const startTime = Date.now();
        
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        // Should load reasonably fast across all browsers
        expect(loadTime).toBeLessThan(5000);
        
        // Check memory usage (if available)
        const memoryInfo = await page.evaluate(() => {
          if ('memory' in performance) {
            return (performance as any).memory;
          }
          return null;
        });
        
        if (memoryInfo) {
          console.log(`${browserName} memory usage:`, memoryInfo);
          
          // Basic memory checks
          expect(memoryInfo.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
        }
      });

      test(`WebAPI support in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        const webApiSupport = await page.evaluate(() => {
          return {
            serviceWorker: 'serviceWorker' in navigator,
            webWorkers: typeof Worker !== 'undefined',
            websockets: typeof WebSocket !== 'undefined',
            webgl: (() => {
              try {
                const canvas = document.createElement('canvas');
                return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
              } catch (e) {
                return false;
              }
            })(),
            geolocation: 'geolocation' in navigator,
            localStorage: typeof Storage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            indexedDB: typeof indexedDB !== 'undefined',
            notifications: 'Notification' in window,
            pushManager: 'serviceWorker' in navigator && 'PushManager' in window
          };
        });
        
        // Log API support for each browser
        console.log(`${browserName} WebAPI support:`, webApiSupport);
        
        // Essential APIs should be supported
        expect(webApiSupport.localStorage).toBeTruthy();
        expect(webApiSupport.sessionStorage).toBeTruthy();
        
        // Modern APIs (may vary by browser)
        if (browserName === 'webkit') {
          // Safari might have different support levels
          console.log('Safari-specific API support noted');
        }
      });

      test(`CSS features in ${browserName}`, async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        const cssSupport = await page.evaluate(() => {
          return {
            customProperties: CSS.supports('--test', '1'),
            grid: CSS.supports('display', 'grid'),
            flexbox: CSS.supports('display', 'flex'),
            transforms: CSS.supports('transform', 'translateX(1px)'),
            transitions: CSS.supports('transition', 'all 1s'),
            animations: CSS.supports('animation', 'test 1s'),
            calc: CSS.supports('width', 'calc(100% - 10px)'),
            vhVw: CSS.supports('height', '100vh'),
            sticky: CSS.supports('position', 'sticky'),
            clipPath: CSS.supports('clip-path', 'circle(50%)'),
            backdropFilter: CSS.supports('backdrop-filter', 'blur(5px)')
          };
        });
        
        console.log(`${browserName} CSS support:`, cssSupport);
        
        // Essential CSS features
        expect(cssSupport.flexbox).toBeTruthy();
        expect(cssSupport.transforms).toBeTruthy();
        expect(cssSupport.transitions).toBeTruthy();
        
        // Modern CSS features (may vary)
        if (!cssSupport.grid) {
          console.warn(`${browserName} does not support CSS Grid`);
        }
        
        if (!cssSupport.customProperties) {
          console.warn(`${browserName} does not support CSS Custom Properties`);
        }
      });
    });
  });

  test('Progressive enhancement fallbacks', async ({ page }) => {
    // Test with various browser capabilities disabled
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Test with images disabled
    await page.route('**/*.{png,jpg,jpeg,gif,webp,avif,svg}', route => {
      route.abort();
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Page should still be functional
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Test with CSS disabled
    await page.addStyleTag({
      content: `
        * {
          all: unset !important;
          display: block !important;
          color: black !important;
          background: white !important;
        }
        a { text-decoration: underline !important; }
        button { border: 1px solid black !important; padding: 5px !important; }
      `
    });
    
    // Content should still be readable
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText!.length).toBeGreaterThan(100);
  });

  test('Responsive design across devices', async ({ page }) => {
    const devices = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Large Desktop', width: 2560, height: 1440 }
    ];
    
    for (const device of devices) {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Content should be visible and readable
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      // Navigation should be appropriate for device
      if (device.width < 768) {
        // Mobile - should have mobile menu
        const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, .hamburger');
        if (await mobileMenu.count() > 0) {
          await expect(mobileMenu.first()).toBeVisible();
        }
      } else {
        // Desktop - should have full navigation
        const desktopNav = page.locator('nav a');
        expect(await desktopNav.count()).toBeGreaterThan(0);
      }
      
      // Text should be readable size
      const bodyStyles = await page.locator('body').evaluate(el => {
        const styles = window.getComputedStyle(el);
        return parseFloat(styles.fontSize);
      });
      
      expect(bodyStyles).toBeGreaterThanOrEqual(14);
      
      console.log(`${device.name} (${device.width}x${device.height}): Font size ${bodyStyles}px`);
    }
  });
});
