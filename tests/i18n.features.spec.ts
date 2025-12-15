import { test, expect } from "@playwright/test";

test.describe("localized features routing", () => {
  const slugs = [
    "seo-audit",
    "site-crawler",
    "keyword-tracking",
    "competitor-analysis",
    "ai-assistant",
  ];

  for (const locale of ["fr", "it", "es", "id", "de"]) {
    for (const slug of slugs) {
      test(`${locale}/features/${slug} resolves`, async ({ page }) => {
        const resp = await page.goto(`/${locale}/features/${slug}`);
        expect(resp?.ok()).toBeTruthy();
        await expect(page).toHaveURL(new RegExp(`\/${locale}\/features\/${slug}`));
      });
    }
  }
});
