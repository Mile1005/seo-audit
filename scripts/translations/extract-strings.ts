/**
 * String Extraction Script for AI SEO Turbo
 * 
 * This script scans the entire codebase to extract all hardcoded strings
 * and generates a comprehensive en.json file with proper namespacing.
 * 
 * Usage: tsx scripts/extract-strings.ts
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ExtractedString {
  file: string;
  line: number;
  context: string;
  string: string;
  type: 'jsx' | 'string' | 'template' | 'meta';
}

interface TranslationKey {
  key: string;
  value: string;
  context: string;
}

const EXCLUDED_DIRS = [
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  'messages', // Already our translation files
];

const EXCLUDED_PATTERNS = [
  /^[A-Z_]+$/, // Constants like MAX_LENGTH
  /^[a-z]+(-[a-z]+)+$/, // CSS classes like text-center
  /^\d+$/, // Pure numbers
  /^#[0-9a-fA-F]{3,8}$/, // Hex colors
  /^(px|em|rem|%|vh|vw)$/,  // CSS units
  /^(true|false|null|undefined)$/,  // Boolean/null values
  /^https?:\/\//,  // URLs (keep in code)
  /^[\w-]+\.(png|jpg|jpeg|svg|gif|webp|ico)$/,  // Image paths
  /^\/[\/\w-]*$/,  // Route paths like /dashboard
  /^@\//,  // Import paths
];

const JSX_STRING_REGEX = />([\w\s!?.,'"-:;()]+)</g;
const TEMPLATE_STRING_REGEX = /`([^`]*)`/g;
const QUOTED_STRING_REGEX = /['"]([^'"]*)['"]/g;

class StringExtractor {
  private extractedStrings: ExtractedString[] = [];
  private translationMap: Map<string, TranslationKey> = new Map();

  /**
   * Check if a string should be excluded from extraction
   */
  private shouldExclude(str: string): boolean {
    if (!str || str.trim().length === 0) return true;
    if (str.trim().length < 2) return true;
    
    for (const pattern of EXCLUDED_PATTERNS) {
      if (pattern.test(str.trim())) return true;
    }
    
    // Exclude if it's mostly code (contains lots of special chars)
    const specialCharRatio = (str.match(/[{}[\]()<>=/\\]/g) || []).length / str.length;
    if (specialCharRatio > 0.3) return true;
    
    return false;
  }

  /**
   * Generate a translation key from a string
   */
  private generateKey(str: string, namespace: string): string {
    const cleaned = str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 5) // Max 5 words for key
      .join('_');
    
    return `${namespace}.${cleaned}`;
  }

  /**
   * Extract namespace from file path
   */
  private getNamespace(filePath: string): string {
    const relativePath = filePath.replace(process.cwd(), '');
    
    // App routes
    if (relativePath.includes('/app/dashboard')) return 'dashboard';
    if (relativePath.includes('/app/pricing')) return 'pricing';
    if (relativePath.includes('/app/features')) return 'features';
    if (relativePath.includes('/app/about')) return 'about';
    if (relativePath.includes('/app/contact')) return 'contact';
    if (relativePath.includes('/app/login') || relativePath.includes('/app/signup')) return 'auth';
    if (relativePath.includes('/app/blog')) return 'blog';
    
    // Components
    if (relativePath.includes('/components/audit')) return 'audit';
    if (relativePath.includes('/components/keywords')) return 'keywords';
    if (relativePath.includes('/components/backlinks')) return 'backlinks';
    if (relativePath.includes('/components/navigation')) return 'navigation';
    if (relativePath.includes('/components/forms')) return 'forms';
    if (relativePath.includes('/components/dashboard')) return 'dashboard';
    if (relativePath.includes('/components/pricing')) return 'pricing';
    if (relativePath.includes('/components/hero')) return 'hero';
    
    return 'common';
  }

  /**
   * Scan a file and extract all strings
   */
  private scanFile(filePath: string): void {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      const namespace = this.getNamespace(filePath);

      lines.forEach((line, index) => {
        // Extract JSX text content
        let match;
        while ((match = JSX_STRING_REGEX.exec(line)) !== null) {
          const str = match[1].trim();
          if (!this.shouldExclude(str)) {
            this.extractedStrings.push({
              file: filePath,
              line: index + 1,
              context: line.trim(),
              string: str,
              type: 'jsx',
            });
            
            const key = this.generateKey(str, namespace);
            if (!this.translationMap.has(key)) {
              this.translationMap.set(key, {
                key,
                value: str,
                context: `${filePath}:${index + 1}`,
              });
            }
          }
        }

        // Extract quoted strings
        while ((match = QUOTED_STRING_REGEX.exec(line)) !== null) {
          const str = match[1].trim();
          if (!this.shouldExclude(str) && str.length > 3) {
            // Check if it's likely a user-facing string
            if (/^[A-Z]/.test(str) || str.includes(' ')) {
              this.extractedStrings.push({
                file: filePath,
                line: index + 1,
                context: line.trim(),
                string: str,
                type: 'string',
              });
              
              const key = this.generateKey(str, namespace);
              if (!this.translationMap.has(key)) {
                this.translationMap.set(key, {
                  key,
                  value: str,
                  context: `${filePath}:${index + 1}`,
                });
              }
            }
          }
        }
      });
    } catch (error) {
      console.error(`Error scanning file ${filePath}:`, error);
    }
  }

  /**
   * Scan all files in the project
   */
  async scanProject(): Promise<void> {
    console.log('🔍 Scanning project for hardcoded strings...\n');

    const patterns = [
      'app/**/*.{tsx,ts,jsx,js}',
      'components/**/*.{tsx,ts,jsx,js}',
      'lib/**/*.{tsx,ts,jsx,js}',
    ];

    for (const pattern of patterns) {
      const files = await glob(pattern, {
        ignore: EXCLUDED_DIRS.map(dir => `**/${dir}/**`),
        cwd: process.cwd(),
      });

      console.log(`📂 Found ${files.length} files matching ${pattern}`);
      files.forEach((file: string) => this.scanFile(path.join(process.cwd(), file)));
    }

    console.log(`\n✅ Extracted ${this.translationMap.size} unique strings`);
  }

  /**
   * Build nested translation object from flat keys
   */
  private buildNestedObject(translations: Map<string, TranslationKey>): any {
    const result: any = {};

    translations.forEach((value, key) => {
      const parts = key.split('.');
      let current = result;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = value.value;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    });

    return result;
  }

  /**
   * Generate the en.json file
   */
  async generateTranslationFile(): Promise<void> {
    const outputPath = path.join(process.cwd(), 'messages', 'en-extracted.json');
    const nested = this.buildNestedObject(this.translationMap);

    // Sort keys alphabetically
    const sortedNested = this.sortObjectKeys(nested);

    fs.writeFileSync(
      outputPath,
      JSON.stringify(sortedNested, null, 2),
      'utf-8'
    );

    console.log(`\n📝 Generated translation file: ${outputPath}`);
    console.log(`📊 Total keys: ${this.translationMap.size}`);
    
    // Print statistics
    const namespaces = new Set<string>();
    this.translationMap.forEach((_, key) => {
      const namespace = key.split('.')[0];
      namespaces.add(namespace);
    });
    
    console.log(`📦 Namespaces: ${Array.from(namespaces).join(', ')}`);
  }

  /**
   * Generate a detailed report
   */
  generateReport(): void {
    const reportPath = path.join(process.cwd(), 'scripts', 'extraction-report.txt');
    let report = 'String Extraction Report\n';
    report += '='.repeat(50) + '\n\n';
    report += `Total unique strings extracted: ${this.translationMap.size}\n\n`;

    const byNamespace: Record<string, number> = {};
    this.translationMap.forEach((_, key) => {
      const namespace = key.split('.')[0];
      byNamespace[namespace] = (byNamespace[namespace] || 0) + 1;
    });

    report += 'Strings by namespace:\n';
    Object.entries(byNamespace)
      .sort((a, b) => b[1] - a[1])
      .forEach(([ns, count]) => {
        report += `  ${ns}: ${count}\n`;
      });

    report += '\n' + '='.repeat(50) + '\n';
    report += 'Sample extracted strings:\n\n';

    Array.from(this.translationMap.entries())
      .slice(0, 20)
      .forEach(([key, value]) => {
        report += `${key}:\n`;
        report += `  Value: "${value.value}"\n`;
        report += `  Context: ${value.context}\n\n`;
      });

    fs.writeFileSync(reportPath, report, 'utf-8');
    console.log(`\n📄 Detailed report generated: ${reportPath}`);
  }

  private sortObjectKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj;

    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = this.sortObjectKeys(obj[key]);
        return result;
      }, {});
  }
}

// Run the extraction
async function main() {
  console.log('🚀 AI SEO Turbo String Extraction Tool\n');
  
  const extractor = new StringExtractor();
  await extractor.scanProject();
  await extractor.generateTranslationFile();
  extractor.generateReport();
  
  console.log('\n✨ Extraction complete!');
  console.log('\nNext steps:');
  console.log('1. Review messages/en-extracted.json');
  console.log('2. Merge relevant strings into messages/en.json');
  console.log('3. Remove false positives (code strings, class names, etc.)');
  console.log('4. Translate to other languages');
  console.log('5. Update components to use useTranslations() hook');
}

main().catch(console.error);
