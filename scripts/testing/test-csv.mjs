#!/usr/bin/env node

// Simple test for CSV loading
import { readFileSync } from "fs";
import { join } from "path";

console.log("Testing CSV file access...");

try {
  const csvPath = join(process.cwd(), "all-page-titles-complete.csv");
  console.log("CSV path:", csvPath);

  const csvContent = readFileSync(csvPath, "utf8");
  const lines = csvContent.split("\n");

  console.log(`CSV loaded: ${lines.length} lines`);

  // Test first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    console.log(`Line ${i}: ${lines[i].substring(0, 100)}...`);
  }

  console.log("✅ CSV file access works!");
} catch (error) {
  console.error("❌ Error:", error.message);
}
