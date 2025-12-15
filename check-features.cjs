const fs = require("fs");
const csv = fs.readFileSync("csv/all-page-titles-complete.csv", "utf8");
const lines = csv.split("\n").filter((l) => l.trim());
const matches = lines.filter(
  (l) =>
    l.includes("features") &&
    !l.includes("ai-assistant") &&
    !l.includes("competitor-analysis") &&
    !l.includes("seo-audit") &&
    !l.includes("site-crawler")
);
console.log("Features matches: " + matches.length);
matches.slice(0, 2).forEach((line) => {
  const parts = line.split('","');
  console.log(parts[1] + ": " + (parts[3] || "NO TITLE"));
});
