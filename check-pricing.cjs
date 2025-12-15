const fs = require("fs");
const csv = fs.readFileSync("csv/all-page-titles-complete.csv", "utf8");
const lines = csv.split("\n").filter((l) => l.trim());
const matches = lines.filter((l) => l.includes("pricing"));
console.log("Pricing matches: " + matches.length);
matches.forEach((line) => {
  const parts = line.split('","');
  console.log(parts[1] + ": " + (parts[3] || "NO TITLE"));
});
