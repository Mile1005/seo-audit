#!/usr/bin/env node

/**
 * Auto-generate layout.tsx files with hreflang support
 * 
 * This script creates layout.tsx files for directories that:
 * 1. Are in [locale] route
 * 2. Have page.tsx but no layout.tsx
 * 3. Need hreflang implementation
 */

import { fileURLToPath } from 'url';
import { dirname, join, relative, basename } from 'path';
import { readdir, writeFile, stat } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const appDir = join(rootDir, 'app');

const LAYOUT_TEMPLATE = (routeName, needsNoIndex = false) => `import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return ${needsNoIndex ? `{
    ...generateSEOMeta({
      ...pageSEO['${routeName}'],
      locale: locale as Locale,
      path: '/${routeName}',
    }),
    robots: {
      index: false,
      follow: false,
    },
  }` : `generateSEOMeta({
    ...pageSEO['${routeName}'],
    locale: locale as Locale,
    path: '/${routeName}',
  })`};
}

export default async function ${toPascalCase(routeName)}Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return children
}
`;

function toPascalCase(str) {
  return str
    .split(/[-_/]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

async function findDirectoriesNeedingLayout(dir, relativePath = '', results = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    let hasPageTsx = false;
    let hasLayoutTsx = false;
    
    for (const entry of entries) {
      if (entry.name === 'page.tsx' || entry.name === 'page.js') {
        hasPageTsx = true;
      }
      if (entry.name === 'layout.tsx' || entry.name === 'layout.js') {
        hasLayoutTsx = true;
      }
    }
    
    // If has page but no layout, and is in [locale] route
    if (hasPageTsx && !hasLayoutTsx && relativePath.includes('[locale]')) {
      const routePath = relativePath
        .replace(/\\/g, '/')
        .replace('[locale]/', '')
        .replace('[locale]', '');
      
      results.push({
        dir,
        relativePath,
        routePath: routePath || 'home',
      });
    }
    
    // Recursively check subdirectories
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relPath = join(relativePath, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        await findDirectoriesNeedingLayout(fullPath, relPath, results);
      }
    }
  } catch (error) {
    console.error(`Error reading ${dir}:`, error.message);
  }
  
  return results;
}

async function generateLayoutFiles() {
  console.log('🔍 Finding directories that need layout.tsx files...\n');
  
  const directories = await findDirectoriesNeedingLayout(appDir, 'app');
  
  console.log(`Found ${directories.length} directories needing layout.tsx:\n`);
  
  // Filter out directories we want to skip
  const skipPatterns = [
    /\[slug\]/,  // Dynamic routes - handle separately
    /dashboard/,  // Dashboard pages might have different needs
  ];
  
  const filteredDirs = directories.filter(dir => 
    !skipPatterns.some(pattern => pattern.test(dir.routePath))
  );
  
  console.log(`Processing ${filteredDirs.length} directories (${directories.length - filteredDirs.length} skipped):\n`);
  
  for (const { dir, routePath } of filteredDirs) {
    const layoutPath = join(dir, 'layout.tsx');
    const routeName = routePath.replace(/^\//, '') || 'home';
    
    // Determine if page should be noindex
    const noIndexPatterns = [/login/, /signup/, /forgot-password/, /reset-password/, /verify-email/, /onboarding/];
    const needsNoIndex = noIndexPatterns.some(pattern => pattern.test(routePath));
    
    const content = LAYOUT_TEMPLATE(routeName, needsNoIndex);
    
    try {
      await writeFile(layoutPath, content, 'utf-8');
      console.log(`✅ Created: ${relative(rootDir, layoutPath)}`);
      console.log(`   Route: /${routeName}`);
      console.log(`   SEO Key: pageSEO['${routeName}']`);
      if (needsNoIndex) console.log(`   🔒 noindex: true`);
      console.log();
    } catch (error) {
      console.error(`❌ Failed to create ${layoutPath}:`, error.message);
    }
  }
  
  console.log(`\n✨ Generated ${filteredDirs.length} layout.tsx files!`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`1. Add missing SEO configs to lib/seo.ts for new routes`);
  console.log(`2. Review generated files and adjust as needed`);
  console.log(`3. Run: node scripts/analyze-pages-hreflang.mjs to verify`);
}

generateLayoutFiles().catch(console.error);
