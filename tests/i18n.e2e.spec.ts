import { test, expect } from '@playwright/test';

test.describe('i18n routing', () => {
  test('root (English) loads without redirect loop', async ({ page }) => {
    const resp = await page.goto('/');
    expect(resp?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/SEO Audit Tool|AI SEO Turbo/i);
  });

  test('French locale loads and stays prefixed', async ({ page }) => {
    const resp = await page.goto('/fr');
    expect(resp?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/fr\/?$/);
  });

  test('Localized subpage (/fr/pricing) resolves', async ({ page }) => {
    const resp = await page.goto('/fr/pricing');
    expect(resp?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/fr\/pricing/);
  });

  test('Unprefixed English pages resolve (as-needed)', async ({ page }) => {
    const resp = await page.goto('/pricing');
    expect(resp?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/pricing/);
  });
});
