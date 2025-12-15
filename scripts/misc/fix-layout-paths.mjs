#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdir, readFile, writeFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const appDir = join(rootDir, "app", "[locale]");

async function fixLayoutFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await fixLayoutFiles(fullPath);
    } else if (entry.name === "layout.tsx") {
      let content = await readFile(fullPath, "utf-8");

      // Fix pageSEO keys - remove app/ prefix
      content = content.replace(/pageSEO\['app\/([^']+)'\]/g, "pageSEO['$1']");

      // Fix paths - remove app/ prefix
      content = content.replace(/path: '\/app\/([^']+)'/g, "path: '/$1'");

      await writeFile(fullPath, content, "utf-8");
      console.log(`Fixed: ${fullPath}`);
    }
  }
}

console.log("🔧 Fixing layout.tsx files...\n");
fixLayoutFiles(appDir)
  .then(() => console.log("\n✅ All files fixed!"))
  .catch(console.error);
