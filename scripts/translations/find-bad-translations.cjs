const fs = require("fs");
const path = require("path");

// Configuration
const MESSAGES_DIR = path.join(__dirname, "../../messages");
const LOCALES = ["fr", "it", "es", "id", "de"]; // Excluding 'en' as it's the source
const EN_PATH = path.join(MESSAGES_DIR, "en.json");

// Regex for "symbol-like" or corrupted text
// Matches: Replacement char (�), Mojibake sequences (Ã...), or empty brackets like [] or {}
const DIRTY_REGEX = /�|Ã[a-z]|â[€\u0080-\u009F]|\[\]|\{\}/;

function flattenKeys(obj, prefix = "") {
  let keys = {};
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(keys, flattenKeys(obj[key], newKey));
    } else {
      keys[newKey] = obj[key];
    }
  }
  return keys;
}

function checkTranslations() {
  console.log("🏥 Starting Translation Health Check...\n");

  if (!fs.existsSync(EN_PATH)) {
    console.error("❌ Critical: messages/en.json not found!");
    process.exit(1);
  }

  const enRaw = JSON.parse(fs.readFileSync(EN_PATH, "utf8"));
  const enKeys = flattenKeys(enRaw);
  const enKeySet = new Set(Object.keys(enKeys));

  console.log(`✅ Loaded Source (EN): ${enKeySet.size} keys\n`);

  LOCALES.forEach((locale) => {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Warning: Missing locale file for ${locale}`);
      return;
    }

    const targetRaw = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const targetKeys = flattenKeys(targetRaw);

    let missingCount = 0;
    let dirtyCount = 0;
    let emptyCount = 0;
    let dirtyKeysList = [];
    let emptyKeysList = [];

    // 1. Check for Missing Keys (Present in EN but not in Target)
    enKeySet.forEach((key) => {
      if (!(key in targetKeys)) {
        missingCount++;
      }
    });

    // 2. Check for Dirty/Corrupted/Empty Values
    Object.entries(targetKeys).forEach(([key, value]) => {
      if (typeof value === "string" && (!value || value.trim() === "")) {
        emptyCount++;
        emptyKeysList.push(key);
      } else if (DIRTY_REGEX.test(value)) {
        dirtyCount++;
        dirtyKeysList.push({ key, value });
      } else if (value === key && !key.includes("brand")) {
        // Often a bug where key is pasted as value (ignoring brand names)
        dirtyCount++;
        dirtyKeysList.push({ key, value: "EQUALS_KEY" });
      }
    });

    console.log(`Results for [ ${locale.toUpperCase()} ]:`);
    console.log(`   🔴 Missing Keys: ${missingCount}`);
    console.log(`   ⚠️  Empty Values: ${emptyCount}`);
    console.log(`   ☢️  Corrupted/Dirty: ${dirtyCount}`);

    if (emptyKeysList.length > 0) {
      console.log(`      Empty keys:`);
      emptyKeysList.slice(0, 5).forEach((key) => {
        console.log(`      - ${key}`);
      });

      // Generate a cleanup list file for empty keys
      const emptyReportPath = path.join(__dirname, `empty-keys-${locale}.json`);
      fs.writeFileSync(emptyReportPath, JSON.stringify(emptyKeysList, null, 2));
      console.log(
        `      (Full empty list saved to scripts/translations/empty-keys-${locale}.json)`
      );
    }

    if (dirtyKeysList.length > 0) {
      console.log(`      Examples of dirty keys to delete:`);
      dirtyKeysList.slice(0, 3).forEach((item) => {
        console.log(`      - ${item.key}: "${item.value}"`);
      });

      // Generate a cleanup list file
      const reportPath = path.join(__dirname, `cleanup-report-${locale}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(dirtyKeysList, null, 2));
      console.log(
        `      (Full dirty list saved to scripts/translations/cleanup-report-${locale}.json)`
      );
    }
    console.log("---------------------------------------------------");
  });
}

checkTranslations();
