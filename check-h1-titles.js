import puppeteer from 'puppeteer';

async function checkH1Titles() {
  const browser = await puppeteer.launch();
  const locales = ['en', 'it', 'de', 'fr', 'es', 'id'];

  console.log('🔍 Checking H1 titles across locales:\n');

  for (const locale of locales) {
    const page = await browser.newPage();
    const url = locale === 'en' ? 'http://localhost:3000/help/seo-tools' : `http://localhost:3000/${locale}/help/seo-tools`;

    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      const h1Text = await page.$eval('h1', el => el.textContent.trim());
      console.log(`${locale.toUpperCase()}: ${h1Text}`);
    } catch (error) {
      console.log(`${locale.toUpperCase()}: Error - ${error.message}`);
    }

    await page.close();
  }

  await browser.close();
}

checkH1Titles().catch(console.error);