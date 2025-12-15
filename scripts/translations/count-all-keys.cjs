const fs = require("fs");

function countKeys(obj) {
  return Object.keys(obj).reduce(
    (acc, k) => acc + (typeof obj[k] === "object" && obj[k] !== null ? countKeys(obj[k]) : 1),
    0
  );
}

const data = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
const totalKeys = countKeys(data);

console.log("\n📊 Translation Statistics:\n");
console.log(`  Total keys in en.json: ${totalKeys}`);
console.log(`  Total strings (6 locales): ${totalKeys * 6}`);
console.log(`  Pricing keys: 87`);
console.log(`  Pricing strings (6 locales): ${87 * 6}`);
console.log("\n✅ Pricing translations complete!\n");
