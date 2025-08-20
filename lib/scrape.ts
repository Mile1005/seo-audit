import { fetch } from "undici";

// Realistic Chrome User-Agent and headers
const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

// Timeout and redirect configuration
const TIMEOUT = 15000; // 15 seconds (increased from 12)
const MAX_REDIRECTS = 5;

/**
 * Fetches HTML content from a URL with robust error handling and retries
 * @param url - The URL to fetch HTML from
 * @returns Promise<string> - The HTML content as a string
 */
export async function fetchHtml(url: string): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Fetching HTML from ${url} (attempt ${attempt}/${MAX_RETRIES})`);

      // Create a more robust timeout signal
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: DEFAULT_HEADERS,
          redirect: "follow",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Check for HTTP errors
        if (!response.ok) {
          const status = response.status;
          const statusText = response.statusText;

          // Don't retry on 4xx errors (except 429)
          if (status >= 400 && status < 500 && status !== 429) {
            throw new Error(`HTTP ${status}: ${statusText}`);
          }

          // Retry on 429 (rate limit) and 5xx errors
          if (status === 429 || status >= 500) {
            throw new Error(`HTTP ${status}: ${statusText}`);
          }
        }

        // Get the response body as text
        let html = await response.text();

        // Validate that we got actual HTML content
        if (!html || html.trim().length === 0) {
          throw new Error("Empty response received");
        }

        // Basic HTML validation
        if (!html.includes('<html') && !html.includes('<!DOCTYPE')) {
          console.warn(`Response from ${url} doesn't appear to be HTML. Content preview: ${html.substring(0, 200)}...`);
          // Don't throw here, some sites might return content without HTML tags
        }

        // Detect charset from Content-Type header
        const contentType = response.headers.get("content-type");
        let charset = "utf-8"; // default

        if (contentType) {
          const charsetMatch = contentType.match(/charset=([^;]+)/i);
          if (charsetMatch) {
            charset = charsetMatch[1].toLowerCase();
          }
        }

        // If charset is not UTF-8, try to detect from meta tag
        if (charset !== "utf-8" && charset !== "utf8") {
          const metaCharsetMatch = html.match(/<meta[^>]*charset=["']?([^"'>]+)/i);
          if (metaCharsetMatch) {
            const metaCharset = metaCharsetMatch[1].toLowerCase();
            if (metaCharset !== charset) {
              console.log(`Charset mismatch: header=${charset}, meta=${metaCharset}`);
              // Prefer meta charset over header charset
              charset = metaCharset;
            }
          }
        }

        // Convert to UTF-8 if needed
        if (charset !== "utf-8" && charset !== "utf8") {
          try {
            const decoder = new TextDecoder(charset);
            const encoder = new TextEncoder();
            const bytes = encoder.encode(html);
            html = decoder.decode(bytes);
          } catch (error) {
            console.warn(`Failed to convert charset ${charset}, using as-is:`, error);
          }
        }

        console.log(`Successfully fetched ${html.length} characters from ${url}`);
        return html;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      lastError = error as Error;
      
      // Provide more detailed error logging
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn(`Attempt ${attempt} failed for ${url}: Request timed out after ${TIMEOUT}ms`);
        } else if (error.message.includes('fetch failed')) {
          console.warn(`Attempt ${attempt} failed for ${url}: Network error - ${error.message}`);
        } else {
          console.warn(`Attempt ${attempt} failed for ${url}: ${error.message}`);
        }
      } else {
        console.warn(`Attempt ${attempt} failed for ${url}: Unknown error:`, error);
      }

      // Don't retry on the last attempt
      if (attempt === MAX_RETRIES) {
        break;
      }

      // Calculate exponential backoff delay
      const delay = BASE_DELAY * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // All retries failed - provide more helpful error message
  const errorDetails = lastError ? `: ${lastError.message}` : '';
  const errorMessage = `Failed to fetch HTML from ${url} after ${MAX_RETRIES} attempts${errorDetails}`;
  
  // Log the final failure with context
  console.error(`Final fetch failure for ${url}:`, {
    attempts: MAX_RETRIES,
    lastError: lastError?.message,
    lastErrorName: lastError?.name,
    url: url
  });
  
  throw new Error(errorMessage);
}

/**
 * Optional Playwright fallback for JavaScript-heavy sites
 * This is disabled by default and can be enabled via FEATURE_PLAYWRIGHT_FALLBACK=true
 *
 * Usage:
 * if (process.env.FEATURE_PLAYWRIGHT_FALLBACK === "true") {
 *   return await fetchHtmlWithPlaywright(url);
 * }
 */
export async function fetchHtmlWithPlaywright(url: string): Promise<string> {
  // This would require playwright dependency
  // import { chromium } from 'playwright';
  //
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto(url, { waitUntil: 'networkidle' });
  // const html = await page.content();
  // await browser.close();
  // return html;

  throw new Error(
    "Playwright fallback not implemented. Set FEATURE_PLAYWRIGHT_FALLBACK=true to enable."
  );
}
