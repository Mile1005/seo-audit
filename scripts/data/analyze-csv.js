import fs from "fs";

const content = fs.readFileSync("all-page-titles-complete.csv", "utf8");
const lines = content.split("\n");

console.log("Header:", lines[0]);
console.log("First data line:", lines[1]);
console.log("Parts when split by comma:", lines[1].split(",").length, "parts");

lines[1].split(",").forEach((part, i) => {
  console.log(`${i}: ${part.substring(0, 50)}`);
});
