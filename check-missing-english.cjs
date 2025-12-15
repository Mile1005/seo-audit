const fs = require("fs");
const csv = fs.readFileSync("csv/all-page-titles-complete.csv", "utf8");
const lines = csv.split("\n").filter((line) => line.trim());
const urls = new Map();

lines.forEach((line, index) => {
  if (index === 0) return; // skip header
  const cols = line.split('","').map((col) => col.replace(/^"|"$/g, ""));
  if (cols.length >= 2) {
    const url = cols[0];
    const locale = cols[1];
    // Extract the path part after domain
    let path = url.replace(/^https:\/\/www\.aiseoturbo\.com/, "");
    // Remove locale prefix if present
    path = path.replace(/^\/(fr|de|es|it|id)/, "");
    if (!urls.has(path)) urls.set(path, new Set());
    urls.get(path).add(locale);

    // Debug features
    if (path === "/features") {
      console.log(`Added ${locale} to ${path}`);
    }
  }
});

console.log("\nFeatures locales:", Array.from(urls.get("/features") || []));

let missingEnglish = [];
urls.forEach((locales, path) => {
  if (!locales.has("en")) {
    missingEnglish.push(path);
  }
});

console.log(`Total URLs missing English entries: ${missingEnglish.length}`);
missingEnglish.slice(0, 5).forEach((path) => console.log(path));
