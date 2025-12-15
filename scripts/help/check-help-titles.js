import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, "all-page-titles-complete.csv");
const csvContent = fs.readFileSync(csvPath, "utf8");
const lines = csvContent.split("\n").filter((line) => line.trim());

// Parse CSV lines (simple parsing for this test)
const titles = {};
lines.forEach((line) => {
  const parts = line.split(",");
  if (parts.length >= 3) {
    const url = parts[0].replace(/"/g, "");
    const title = parts[1].replace(/"/g, "");
    const locale = parts[2].replace(/"/g, "");
    if (!titles[locale]) titles[locale] = {};
    titles[locale][url] = title;
  }
});

// Check help pages
const helpPages = [
  "https://www.aiseoturbo.com/help/api/authentication",
  "https://www.aiseoturbo.com/help/getting-started",
  "https://www.aiseoturbo.com/help/troubleshooting",
  "https://www.aiseoturbo.com/help/features/seo-audit",
  "https://www.aiseoturbo.com/help/account-billing",
  "https://www.aiseoturbo.com/help/security-privacy",
];

console.log("Help page titles in CSV:");
helpPages.forEach((url) => {
  const title = titles["en"]?.[url];
  console.log(`${url}: ${title || "NOT FOUND"}`);
});

console.log(
  "\nTotal English help pages in CSV:",
  Object.keys(titles["en"] || {}).filter((url) => url.includes("/help/")).length
);
