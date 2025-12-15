import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findFilesWithMultipleTitles = (dir) => {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory() && !file.name.startsWith(".") && file.name !== "node_modules") {
        findFilesWithMultipleTitles(path.join(dir, file.name));
      } else if (
        file.name.endsWith(".html") ||
        file.name.endsWith(".tsx") ||
        file.name.endsWith(".jsx")
      ) {
        try {
          const content = fs.readFileSync(path.join(dir, file.name), "utf8");
          const titleMatches = content.match(/<title[^>]*>[\s\S]*?<\/title>/gi);
          if (titleMatches && titleMatches.length > 1) {
            console.log(`Multiple titles found in: ${path.join(dir, file.name)}`);
            console.log(`Count: ${titleMatches.length}`);
            titleMatches.forEach((match, index) => {
              console.log(`  ${index + 1}: ${match.substring(0, 100)}...`);
            });
            console.log("---");
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
};

findFilesWithMultipleTitles(".");
console.log("Search completed.");
