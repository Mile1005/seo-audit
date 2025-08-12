import { request } from "undici";

const DEFAULT_TIMEOUT_MS = 10000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchHtml(url: string): Promise<string> {
  // Optional Playwright fallback (documented in README). Not enabled by default.
  // if (process.env.FEATURE_PLAYWRIGHT_FALLBACK === "true") {
  //   const { chromium } = await import("playwright");
  //   const browser = await chromium.launch();
  //   const page = await browser.newPage();
  //   await page.goto(url, { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
  //   const html = await page.content();
  //   await browser.close();
  //   return html;
  // }

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
  } as const;

  const maxAttempts = 4;
  let attempt = 0;
  let lastErr: any;
  while (attempt < maxAttempts) {
    try {
      console.log(`Fetching URL: ${url} (attempt ${attempt + 1}/${maxAttempts})`);
      
      const res = await request(url, {
        method: "GET",
        headers,
        maxRedirections: 3,
        headersTimeout: DEFAULT_TIMEOUT_MS,
        bodyTimeout: DEFAULT_TIMEOUT_MS,
        throwOnError: false
      });
      
      console.log(`Response status: ${res.statusCode}`);
      
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        console.log('Successfully fetched HTML');
        const buffer = await res.body.arrayBuffer();
        const text = Buffer.from(buffer).toString("utf-8");
        return text;
      }
      
      if (res.statusCode && (res.statusCode === 429 || res.statusCode >= 500)) {
        console.log(`Server error ${res.statusCode}, retrying...`);
        const delay = Math.pow(2, attempt) * 1000;
        await sleep(delay);
        attempt++;
        continue;
      }
      
      throw new Error(`HTTP ${res.statusCode}`);
      
    } catch (err) {
      console.error(`Fetch attempt ${attempt + 1} failed:`, err);
      lastErr = err;
      
      // Special handling for connection reset errors
      if (err instanceof Error && (err.message.includes('ECONNRESET') || err.message.includes('socket hang up'))) {
        console.log('Connection reset detected, waiting longer before retry...');
        const delay = Math.pow(2, attempt) * 2000; // Double the delay for connection errors
        await sleep(delay);
      } else {
        const delay = Math.pow(2, attempt) * 1000;
        await sleep(delay);
      }
      
      attempt++;
    }
  }
  throw new Error(`Failed to fetch HTML: ${lastErr?.message || String(lastErr)}`);
}


