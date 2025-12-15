import fs from "fs";

const content = fs.readFileSync("all-page-titles-complete.csv", "utf8");
const lines = content.split("\n");

console.log("Help page entries:");
lines.forEach((line) => {
  if (line.includes("/help") && !line.includes("/help/")) {
    const parts = line.split(",");
    if (parts.length >= 8) {
      console.log(`${parts[0]} -> ${parts[6]}`);
    }
  }
});
