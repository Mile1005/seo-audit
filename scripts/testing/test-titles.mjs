#!/usr/bin/env node

// Test script to verify CSV title loading
import { getLocalizedTitle } from './lib/seo.ts';

console.log('Testing CSV title loading...');

// Test some sample titles
const testCases = [
  { path: 'home', locale: 'en' },
  { path: 'home', locale: 'fr' },
  { path: 'features', locale: 'en' },
  { path: 'features', locale: 'de' },
  { path: 'pricing', locale: 'en' },
  { path: 'pricing', locale: 'es' },
];

testCases.forEach(({ path, locale }) => {
  const title = getLocalizedTitle(path, locale);
  console.log(`${path} (${locale}): ${title ? title.substring(0, 50) + '...' : 'NOT FOUND'}`);
});

console.log('Test complete!');