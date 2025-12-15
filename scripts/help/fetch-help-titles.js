import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "http://localhost:3000"; // Assuming the app is running locally
const helpPages = [
  "/help/api/authentication",
  "/help/getting-started",
  "/help/troubleshooting",
  "/help/features/seo-audit",
  "/help/account-billing",
  "/help/security-privacy",
  "/help/api-integrations",
  "/help/billing",
  "/help/security",
  "/help/seo-tools",
  "/help/seo-tools-features",
];

async function fetchPageTitle(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);
    const title = $("title").text().trim();
    return title || "NO TITLE FOUND";
  } catch (error) {
    return `ERROR: ${error.code || error.message}`;
  }
}

async function checkHelpPageTitles() {
  console.log("Fetching help page titles from localhost:3000...\n");

  for (const page of helpPages) {
    const fullUrl = `${BASE_URL}${page}`;
    const title = await fetchPageTitle(fullUrl);
    console.log(`${page}: ${title}`);
  }
}

checkHelpPageTitles().catch(console.error);
