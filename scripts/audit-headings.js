#!/usr/bin/env node

/**
 * Comprehensive Heading Hierarchy Audit Script
 * 
 * This script:
 * 1. Scans all page.tsx files and their imported components
 * 2. Traces all component imports recursively
 * 3. Extracts all heading elements (h1-h6)
 * 4. Checks for hierarchy violations (e.g., h2->h4 skip)
 * 5. Reports issues with file locations and line numbers
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRoot = path.join(__dirname, '..');
const appDir = path.join(appRoot, 'app');
const componentDir = path.join(appRoot, 'components');

// Cache to avoid circular imports
const processedFiles = new Set();
const importCache = new Map();

/**
 * Extract all h1-h6 tags from JSX/TSX content
 */
function extractHeadings(content, filePath) {
  const headings = [];
  
  // Match h1-h6 tags (handles multiline, attributes, etc.)
  const headingRegex = /<(h[1-6])(?:\s[^>]*)?>([^<]+)<\/\1>/gi;
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1][1]);
    const text = match[2].replace(/\n\s*/g, ' ').trim().substring(0, 50);
    
    // Calculate line number
    const lineNumber = content.substring(0, match.index).split('\n').length;
    
    headings.push({
      level,
      text,
      lineNumber,
      tag: match[1],
      file: filePath
    });
  }
  
  return headings;
}

/**
 * Extract component/import references from JSX
 * Handles: import X from 'path', <ComponentName />, <ComponentName>...</ComponentName>
 */
function extractImports(content) {
  const imports = [];
  
  // Match import statements
  const importRegex = /import\s+(?:\{[^}]+\}|[^'"\n]+)\s+from\s+['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  return imports;
}

/**
 * Resolve import path to actual file
 */
function resolveImportPath(importPath, fromFile) {
  // Handle relative imports
  if (importPath.startsWith('.')) {
    const dir = path.dirname(fromFile);
    let resolvedPath = path.join(dir, importPath);
    
    // Try with .tsx, .ts, .jsx, .js extensions
    for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
      if (fs.existsSync(resolvedPath + ext)) {
        return resolvedPath + ext;
      }
    }
    
    // Try index files
    for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
      if (fs.existsSync(path.join(resolvedPath, `index${ext}`))) {
        return path.join(resolvedPath, `index${ext}`);
      }
    }
  }
  
  // Handle absolute imports (from component directory)
  if (!importPath.startsWith('.') && !importPath.includes('/')) {
    // This might be a component
    const componentPath = path.join(componentDir, importPath);
    for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
      if (fs.existsSync(componentPath + ext)) {
        return componentPath + ext;
      }
    }
  }
  
  return null;
}

/**
 * Recursively process file and its imports
 */
function processFile(filePath, depth = 0) {
  if (processedFiles.has(filePath)) {
    return [];
  }
  
  if (depth > 10) {
    // Prevent infinite recursion
    return [];
  }
  
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  processedFiles.add(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let allHeadings = [];
    
    // Get headings from this file
    const fileHeadings = extractHeadings(content, filePath);
    allHeadings = allHeadings.concat(fileHeadings);
    
    // Find and process imports
    const imports = extractImports(content);
    
    for (const importPath of imports) {
      // Skip external packages and React
      if (!importPath.startsWith('.') && !importPath.includes('@/')) {
        continue;
      }
      
      const resolvedPath = resolveImportPath(importPath, filePath);
      if (resolvedPath) {
        const importedHeadings = processFile(resolvedPath, depth + 1);
        allHeadings = allHeadings.concat(importedHeadings);
      }
    }
    
    return allHeadings;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Check heading hierarchy for violations
 */
function checkHeadingHierarchy(headings) {
  const issues = [];
  
  if (headings.length === 0) {
    return issues;
  }
  
  // Sort headings by file and line number for logical order
  const sortedHeadings = [...headings].sort((a, b) => {
    if (a.file !== b.file) return a.file.localeCompare(b.file);
    return a.lineNumber - b.lineNumber;
  });
  
  // Check for hierarchy violations
  for (let i = 0; i < sortedHeadings.length - 1; i++) {
    const current = sortedHeadings[i];
    const next = sortedHeadings[i + 1];
    
    // If we skip levels (e.g., h2 to h4, or h3 to h1)
    const levelDiff = next.level - current.level;
    
    // Flag skips (jumping down more than 1 level)
    if (levelDiff > 1) {
      issues.push({
        type: 'HIERARCHY_SKIP',
        message: `Heading skip: ${current.tag} → ${next.tag}`,
        from: {
          level: current.level,
          text: current.text,
          file: path.relative(appRoot, current.file),
          line: current.lineNumber,
          tag: current.tag
        },
        to: {
          level: next.level,
          text: next.text,
          file: path.relative(appRoot, next.file),
          line: next.lineNumber,
          tag: next.tag
        }
      });
    }
    
    // Flag improper nesting (jumping back more than reasonable)
    if (levelDiff < -2) {
      issues.push({
        type: 'IMPROPER_NESTING',
        message: `Improper nesting jump: ${current.tag} → ${next.tag}`,
        from: {
          level: current.level,
          text: current.text,
          file: path.relative(appRoot, current.file),
          line: current.lineNumber,
          tag: current.tag
        },
        to: {
          level: next.level,
          text: next.text,
          file: path.relative(appRoot, next.file),
          line: next.lineNumber,
          tag: next.tag
        }
      });
    }
  }
  
  // Check if starts with h1
  if (sortedHeadings.length > 0 && sortedHeadings[0].level !== 1) {
    issues.push({
      type: 'MISSING_H1',
      message: `Page should start with h1, but found ${sortedHeadings[0].tag}`,
      firstHeading: {
        level: sortedHeadings[0].level,
        text: sortedHeadings[0].text,
        file: path.relative(appRoot, sortedHeadings[0].file),
        line: sortedHeadings[0].lineNumber,
        tag: sortedHeadings[0].tag
      }
    });
  }
  
  return issues;
}

/**
 * Find all page.tsx files
 */
function findAllPages(dir) {
  const pages = [];
  
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        traverse(fullPath);
      } else if (entry.name === 'page.tsx' || entry.name === 'page.jsx') {
        pages.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return pages;
}

/**
 * Main audit function
 */
function auditHeadings() {
  console.log('🔍 Starting Heading Hierarchy Audit...\n');
  
  const pages = findAllPages(appDir);
  
  if (pages.length === 0) {
    console.log('❌ No page.tsx files found');
    return;
  }
  
  console.log(`Found ${pages.length} page(s) to audit:\n`);
  
  let totalIssues = 0;
  const allResults = [];
  
  for (const page of pages) {
    const relativePath = path.relative(appRoot, page);
    const pageName = relativePath.replace(/\\page\.tsx$/, '').replace(/\\/g, '/') || 'homepage';
    
    console.log(`📄 Auditing: ${pageName || 'homepage'}`);
    
    // Reset cache for each page
    processedFiles.clear();
    
    // Get all headings including from imports
    const headings = processFile(page);
    
    if (headings.length === 0) {
      console.log('  ⚠️  No headings found\n');
      continue;
    }
    
    console.log(`  Found ${headings.length} heading(s)`);
    
    // Check hierarchy
    const issues = checkHeadingHierarchy(headings);
    
    if (issues.length === 0) {
      console.log('  ✅ No issues found\n');
    } else {
      console.log(`  ❌ ${issues.length} issue(s) found:\n`);
      
      for (const issue of issues) {
        console.log(`     ${issue.type}:`);
        
        if (issue.type === 'HIERARCHY_SKIP') {
          console.log(`     ${issue.from.tag} (line ${issue.from.line}): "${issue.from.text}"`);
          console.log(`     ↓ (SKIP)`);
          console.log(`     ${issue.to.tag} (line ${issue.to.line}): "${issue.to.text}"`);
          console.log(`     File: ${issue.to.file}\n`);
        } else if (issue.type === 'IMPROPER_NESTING') {
          console.log(`     ${issue.from.tag} (line ${issue.from.line}): "${issue.from.text}"`);
          console.log(`     ↓ (IMPROPER)`);
          console.log(`     ${issue.to.tag} (line ${issue.to.line}): "${issue.to.text}"`);
          console.log(`     File: ${issue.to.file}\n`);
        } else if (issue.type === 'MISSING_H1') {
          console.log(`     ${issue.firstHeading.tag} (line ${issue.firstHeading.line}): "${issue.firstHeading.text}"`);
          console.log(`     File: ${issue.firstHeading.file}\n`);
        }
      }
      
      totalIssues += issues.length;
      allResults.push({ page: pageName, issues });
    }
  }
  
  console.log('\n📊 Audit Summary:');
  console.log(`Total pages scanned: ${pages.length}`);
  console.log(`Total issues found: ${totalIssues}`);
  
  if (totalIssues > 0) {
    console.log('\n⚠️  Issues that need fixing:');
    for (const result of allResults) {
      if (result.issues.length > 0) {
        console.log(`  • ${result.page}: ${result.issues.length} issue(s)`);
      }
    }
  } else {
    console.log('\n✅ All pages have correct heading hierarchy!');
  }
}

// Run audit
auditHeadings();
