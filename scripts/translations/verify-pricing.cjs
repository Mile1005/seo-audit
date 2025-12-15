const fs = require("fs");

function countKeys(obj) {
  return Object.keys(obj).reduce(
    (acc, k) => acc + (typeof obj[k] === "object" && obj[k] !== null ? countKeys(obj[k]) : 1),
    0
  );
}

const locales = ["en", "fr", "es", "de", "it", "id"];

console.log("\n📊 Pricing Translation Key Count:\n");

locales.forEach((locale) => {
  const data = JSON.parse(fs.readFileSync(`messages/${locale}.json`, "utf8"));
  const pricingKeys = countKeys(data.pricing);
  console.log(`  ${locale}: ${pricingKeys} keys`);
});

console.log("\n✅ All locales should have the same number of pricing keys\n");
