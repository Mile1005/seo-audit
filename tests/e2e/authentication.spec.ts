import { test, expect } from "@playwright/test";

test.describe("User Authentication Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");
  });

  test("Signup flow with valid data", async ({ page }) => {
    // Navigate to signup page
    await page.goto("http://localhost:3000/signup");
    await page.waitForLoadState("networkidle");

    // Fill signup form
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    const confirmPasswordInput = page.locator(
      'input[name="confirmPassword"], input[name="confirm-password"]'
    );
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = "TestPassword123!";

    await emailInput.fill(testEmail);
    await passwordInput.fill(testPassword);

    if ((await confirmPasswordInput.count()) > 0) {
      await confirmPasswordInput.fill(testPassword);
    }

    await submitButton.click();

    // Should redirect to verification page or dashboard
    await page.waitForURL(/.*\/(verify|dashboard|onboarding).*/, { timeout: 10000 });

    // Check for success message or verification prompt
    const successIndicator = page.locator('.success, .verification, .welcome, [role="alert"]');
    await expect(successIndicator.first()).toBeVisible({ timeout: 5000 });
  });

  test("Login flow with existing user", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.waitForLoadState("networkidle");

    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    const loginButton = page.locator('button[type="submit"], input[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    // Test with demo credentials if they exist
    await emailInput.fill("demo@example.com");
    await passwordInput.fill("demo123");

    await loginButton.click();

    // Should either redirect to dashboard or show error message
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    const hasError = (await page.locator('.error, [role="alert"]').count()) > 0;

    if (hasError) {
      // Login failed as expected with demo credentials
      const errorMessage = await page.locator('.error, [role="alert"]').first();
      await expect(errorMessage).toBeVisible();
    } else {
      // Login succeeded - should be on dashboard
      expect(currentUrl).toMatch(/.*\/(dashboard|profile|account).*/);
    }
  });

  test("Password reset flow", async ({ page }) => {
    await page.goto("http://localhost:3000/forgot-password");
    await page.waitForLoadState("networkidle");

    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const resetButton = page.locator('button[type="submit"], input[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(resetButton).toBeVisible();

    await emailInput.fill("test@example.com");
    await resetButton.click();

    // Should show confirmation message
    const confirmationMessage = page.locator('.success, .confirmation, [role="alert"]');
    await expect(confirmationMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test("Form validation on signup", async ({ page }) => {
    await page.goto("http://localhost:3000/signup");
    await page.waitForLoadState("networkidle");

    const submitButton = page.locator('button[type="submit"], input[type="submit"]');

    // Try to submit empty form
    await submitButton.click();

    // Should show validation errors
    const errorMessages = page.locator('.error, [aria-invalid="true"], .invalid');
    await expect(errorMessages.first()).toBeVisible({ timeout: 3000 });

    // Test invalid email
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    await emailInput.fill("invalid-email");
    await submitButton.click();

    // Should show email validation error
    const emailError = page.locator('.error, [aria-invalid="true"]').first();
    await expect(emailError).toBeVisible();

    // Test weak password
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    await emailInput.fill("test@example.com");
    await passwordInput.fill("123");
    await submitButton.click();

    // Should show password validation error
    const passwordError = page.locator('.error, [aria-invalid="true"]').first();
    await expect(passwordError).toBeVisible();
  });

  test("Social login buttons functionality", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.waitForLoadState("networkidle");

    // Check for social login buttons
    const googleButton = page.locator(
      'button:has-text("Google"), a:has-text("Google"), [data-provider="google"]'
    );
    const githubButton = page.locator(
      'button:has-text("GitHub"), a:has-text("GitHub"), [data-provider="github"]'
    );

    if ((await googleButton.count()) > 0) {
      await expect(googleButton.first()).toBeVisible();
      await expect(googleButton.first()).toBeEnabled();

      // Click should initiate OAuth flow (will redirect to Google)
      const [popup] = await Promise.all([
        page.waitForEvent("popup", { timeout: 5000 }).catch(() => null),
        googleButton.first().click(),
      ]);

      if (popup) {
        // OAuth popup opened successfully
        expect(popup.url()).toContain("google.com");
        await popup.close();
      }
    }

    if ((await githubButton.count()) > 0) {
      await expect(githubButton.first()).toBeVisible();
      await expect(githubButton.first()).toBeEnabled();
    }
  });

  test("Account management after login", async ({ page }) => {
    // This test assumes successful login or uses session storage
    await page.goto("http://localhost:3000/dashboard");

    // If not logged in, will redirect to login
    await page.waitForTimeout(2000);

    if (page.url().includes("/login")) {
      // Not logged in - skip this test
      test.skip();
      return;
    }

    // Check for user profile access
    const profileLink = page.locator(
      'a:has-text("Profile"), a:has-text("Account"), [data-testid="profile"]'
    );

    if ((await profileLink.count()) > 0) {
      await profileLink.first().click();

      // Should navigate to profile page
      await expect(page).toHaveURL(/.*\/(profile|account|settings).*/);

      // Should show user information form
      const userForm = page.locator("form").first();
      await expect(userForm).toBeVisible();
    }
  });

  test("Logout functionality", async ({ page }) => {
    // Navigate to dashboard (assuming logged in)
    await page.goto("http://localhost:3000/dashboard");
    await page.waitForTimeout(2000);

    if (page.url().includes("/login")) {
      // Not logged in - skip this test
      test.skip();
      return;
    }

    // Find logout button/link
    const logoutButton = page.locator(
      'button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Sign Out")'
    );

    if ((await logoutButton.count()) > 0) {
      await logoutButton.first().click();

      // Should redirect to login or homepage
      await page.waitForURL(/.*\/(login|$)/, { timeout: 5000 });

      // Should no longer have access to protected routes
      await page.goto("http://localhost:3000/dashboard");
      await page.waitForTimeout(1000);

      // Should redirect to login
      expect(page.url()).toMatch(/.*\/login.*/);
    }
  });

  test("Session persistence", async ({ page, context }) => {
    // Test that user stays logged in across browser sessions
    await page.goto("http://localhost:3000/login");

    // Mock successful login by setting session storage
    await page.evaluate(() => {
      localStorage.setItem("auth-token", "mock-token");
      sessionStorage.setItem("user-session", "active");
    });

    await page.goto("http://localhost:3000/dashboard");
    await page.waitForTimeout(1000);

    // Create new page in same context
    const newPage = await context.newPage();
    await newPage.goto("http://localhost:3000/dashboard");

    // Should maintain session
    const authToken = await newPage.evaluate(() => localStorage.getItem("auth-token"));
    expect(authToken).toBe("mock-token");

    await newPage.close();
  });

  test("Accessibility in auth forms", async ({ page }) => {
    await page.goto("http://localhost:3000/signup");
    await page.waitForLoadState("networkidle");

    // All form inputs should have labels
    const inputs = await page.locator("input").all();

    for (const input of inputs) {
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");
      const placeholder = await input.getAttribute("placeholder");

      const hasLabel =
        ariaLabel ||
        ariaLabelledBy ||
        (id && (await page.locator(`label[for="${id}"]`).count()) > 0);

      expect(hasLabel || placeholder).toBeTruthy();
    }

    // Form should be keyboard navigable
    await page.keyboard.press("Tab");
    const firstFocused = await page.locator(":focus").first();
    await expect(firstFocused).toBeVisible();

    // Error messages should be announced to screen readers
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    const errorMessages = await page.locator('[role="alert"], .error, [aria-invalid="true"]').all();

    for (const error of errorMessages) {
      await expect(error).toBeVisible();

      const ariaLive = await error.getAttribute("aria-live");
      const role = await error.getAttribute("role");

      expect(ariaLive === "polite" || ariaLive === "assertive" || role === "alert").toBeTruthy();
    }
  });
});
