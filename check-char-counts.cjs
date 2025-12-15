const fs = require("fs");
const csv = fs.readFileSync("csv/all-page-titles-complete.csv", "utf8");
const lines = csv.split("\n");
const urls = [
  "billing/cancellation",
  "core-web-vitals-optimization-guide",
  "account-billing",
  "security-privacy",
  "api-integrations",
];

urls.forEach((url) => {
  const matches = lines.filter((l) => l.includes(url));
  console.log(`${url}: ${matches.length} matches`);
  if (matches.length > 0) {
    const parts = matches[0].split('","');
    const title = parts[3] || "";
    console.log(`  Sample: ${title.length} chars - "${title}"`);
  }
});
