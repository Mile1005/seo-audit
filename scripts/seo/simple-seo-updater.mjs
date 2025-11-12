#!/usr/bin/env node

/**
 * Simple CSV to pageSEO updater
 */

import { readFileSync, writeFileSync } from 'fs';

const csvContent = readFileSync('all-page-titles-complete.csv', 'utf8');
const lines = csvContent.split('\n');

const pageTitles = new Map();

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const parts = line.split(',');
  if (parts.length >= 8) {
    const url = parts[0];
    const locale = parts[1];
    const finalTitle = parts[6].replace(/^"|"$/g, '');

    // Extract page path
    let path = url.replace('https://www.aiseoturbo.com', '');
    if (path === '' || path === '/') {
      path = 'home';
    } else if (path.startsWith('/fr/') || path.startsWith('/de/') || path.startsWith('/es/') ||
               path.startsWith('/it/') || path.startsWith('/id/')) {
      path = path.substring(4);
    }
    path = path.startsWith('/') ? path.substring(1) : path;
    if (path === '') path = 'home';

    if (!pageTitles.has(path)) {
      pageTitles.set(path, {});
    }
    pageTitles.get(path)[locale] = finalTitle;
  }
}

console.log('Found pages:', Array.from(pageTitles.keys()));

// Generate new pageSEO object
let newPageSEO = 'export const pageSEO = {\n';

for (const [pagePath, localeTitles] of pageTitles) {
  newPageSEO += `  '${pagePath}': {\n`;
  for (const [locale, title] of Object.entries(localeTitles)) {
    newPageSEO += `    '${locale}': {\n`;
    newPageSEO += `      title: '${title.replace(/'/g, "\\'")}',\n`;
    newPageSEO += `      description: 'SEO description for ${pagePath}',\n`; // Placeholder
    newPageSEO += `      keywords: ['SEO'],\n`; // Placeholder
    newPageSEO += `      ogImage: '/logo.png'\n`;
    newPageSEO += `    },\n`;
  }
  newPageSEO += `  },\n`;
}

newPageSEO += '};\n';

// Read current seo.ts
let seoContent = readFileSync('lib/seo.ts', 'utf8');

// Replace pageSEO
const pageSEORegex = /export const pageSEO = \{[\s\S]*?\};/;
seoContent = seoContent.replace(pageSEORegex, newPageSEO);

writeFileSync('lib/seo.ts', seoContent, 'utf8');
console.log('✅ Updated pageSEO with localized titles');