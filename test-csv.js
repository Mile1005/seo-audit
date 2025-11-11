// Test CSV loading
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replicate the CSV loading logic from lib/seo.ts
let csvTitleCache = null;

/**
 * Parse a CSV line properly handling quoted fields
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // Add the last field
  result.push(current);

  return result;
}

function loadCSVTitleData() {
  if (csvTitleCache) return csvTitleCache;

  csvTitleCache = new Map();

  try {
    const csvPath = path.join(process.cwd(), 'all-page-titles-complete.csv');

    if (!fs.existsSync(csvPath)) {
      console.warn('CSV file not found');
      return csvTitleCache;
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n');

    console.log('First few lines parsed:');
    for (let i = 1; i < Math.min(4, lines.length); i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = parseCSVLine(line);
      console.log(`Line ${i}: ${parts.length} parts`);
      console.log(`  URL: ${parts[0]}`);
      console.log(`  Locale: ${parts[1]}`);
      console.log(`  Final Title: ${parts[6]}`);
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = parseCSVLine(line);
      if (parts.length >= 8) {
        const url = parts[0];
        const locale = parts[1];
        const finalTitle = parts[6].replace(/^"|"$/g, '');

        // Extract page path
        let pagePath = url.replace('https://www.aiseoturbo.com', '');
        if (pagePath === '' || pagePath === '/') {
          pagePath = 'home';
        } else if (pagePath.startsWith('/fr') || pagePath.startsWith('/de') || pagePath.startsWith('/es') ||
                   pagePath.startsWith('/it') || pagePath.startsWith('/id')) {
          // Check if this is just a locale prefix (no path after it)
          const localePart = pagePath.substring(1, 3); // 'fr', 'de', etc.
          const rest = pagePath.substring(3); // should be empty or start with '/'
          if (rest === '' || rest === '/') {
            pagePath = 'home';
          } else {
            pagePath = rest.startsWith('/') ? rest.substring(1) : rest;
          }
        } else {
          pagePath = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath;
        }
        if (pagePath === '') pagePath = 'home';

        if (!csvTitleCache.has(pagePath)) {
          csvTitleCache.set(pagePath, new Map());
        }
        csvTitleCache.get(pagePath).set(locale, finalTitle);
      }
    }
  } catch (error) {
    console.warn('Error loading CSV data:', error);
  }

  return csvTitleCache;
}

function getLocalizedTitle(pagePath, locale) {
  const csvData = loadCSVTitleData();
  const pageTitles = csvData.get(pagePath);
  if (pageTitles) {
    return pageTitles.get(locale) || pageTitles.get('en') || null;
  }
  return null;
}

// Test the functions
console.log('Testing CSV loading...');
const csvData = loadCSVTitleData();
console.log('Loaded pages:', Array.from(csvData.keys()));

console.log('\nTesting homepage titles:');
['en', 'fr', 'de', 'es', 'it', 'id'].forEach(locale => {
  const title = getLocalizedTitle('home', locale);
  console.log(`${locale}: ${title}`);
});