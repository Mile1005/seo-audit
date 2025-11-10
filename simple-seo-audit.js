#!/usr/bin/env node

/**
 * Simple SEO Audit Script - Canonicals and Hrefs Only
 * Focuses on checking canonical URLs and hreflang consistency
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Simple SEO Audit - Canonicals & Hrefs Only');
console.log('============================================\n');

// Check if we have the required CSV files
const canonicalsFile = 'canonicals_canonicalised.csv';
const hreflangFile = 'hreflang_not_using_canonical.csv';

let canonicalIssues = 0;
let hreflangIssues = 0;

console.log('📊 Checking Canonical URLs...');

// Read canonicals CSV
if (fs.existsSync(canonicalsFile)) {
  const canonicalsData = fs.readFileSync(canonicalsFile, 'utf8');
  const lines = canonicalsData.split('\n').filter(line => line.trim());

  console.log(`Found ${lines.length - 1} canonical URLs to check`);

  // Check for issues (simplified check)
  lines.slice(1).forEach((line, index) => {
    const columns = line.split(',');
    if (columns.length >= 5) {
      const address = columns[0].replace(/"/g, '');
      const canonicalUrl = columns[4].replace(/"/g, '');

      // Check if canonical URL contains locale prefix for non-root pages
      if (address.includes('/en/') && !canonicalUrl.includes('/en/')) {
        console.log(`❌ ${address} - Canonical should include locale prefix`);
        canonicalIssues++;
      }
    }
  });
} else {
  console.log('⚠️  Canonicals CSV file not found');
}

console.log('\n🌐 Checking Hreflang URLs...');

// Read hreflang CSV
if (fs.existsSync(hreflangFile)) {
  const hreflangData = fs.readFileSync(hreflangFile, 'utf8');
  const lines = hreflangData.split('\n').filter(line => line.trim());

  console.log(`Found ${lines.length - 1} hreflang URLs to check`);

  // Check for issues (simplified check)
  lines.slice(1).forEach((line, index) => {
    const columns = line.split(',');
    if (columns.length >= 5) {
      const address = columns[0].replace(/"/g, '');
      const htmlHreflang1 = columns[3].replace(/"/g, '');
      const htmlHreflang1Url = columns[4].replace(/"/g, '');

      // Check if hreflang URLs are consistent with canonical pattern
      if (address.includes('/en/') && htmlHreflang1 === 'en' && !htmlHreflang1Url.includes('/en/')) {
        console.log(`❌ ${address} - Hreflang URL should include locale prefix`);
        hreflangIssues++;
      }
    }
  });
} else {
  console.log('⚠️  Hreflang CSV file not found');
}

console.log('\n📈 Audit Results:');
console.log('================');
console.log(`Canonical Issues: ${canonicalIssues}`);
console.log(`Hreflang Issues: ${hreflangIssues}`);
console.log(`Total Issues: ${canonicalIssues + hreflangIssues}`);

if (canonicalIssues + hreflangIssues === 0) {
  console.log('\n✅ All canonical and hreflang URLs look good!');
} else {
  console.log('\n⚠️  Issues found. Check the details above.');
}

console.log('\n🎯 Quick Fix Summary:');
console.log('- Ensure all canonical URLs use locale prefixes (/en/, /fr/, etc.)');
console.log('- Ensure hreflang URLs match canonical URL patterns');
console.log('- Default locale should use /en/ prefix for consistency');