import fs from "fs";

const content = fs.readFileSync("all-page-titles-complete.csv", "utf8");
const lines = content.split("\n");

const englishHelpSubPages = lines.filter(
  (line) => line.includes("/help/") && line.split(",")[1] === "en"
);
console.log("English help sub-pages:", englishHelpSubPages.length);

if (englishHelpSubPages.length > 0) {
  console.log("First few:");
  englishHelpSubPages.slice(0, 3).forEach((line) => {
    const parts = line.split(",");
    console.log(`${parts[0]}`);
  });
}
