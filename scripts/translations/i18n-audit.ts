#!/usr/bin/env tsx
/**
 * Comprehensive i18n Audit Script
 * Scans the entire workspace for untranslated strings and generates a detailed report
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface UntranslatedItem {
  file: string;
  line: number;
  column: number;
  text: string;
  type: 'jsx-text' | 'string-literal' | 'template-literal' | 'attribute' | 'aria-label' | 'placeholder' | 'alt-text';
  severity: 'high' | 'medium' | 'low';
  context: string;
}

interface AuditReport {
  timestamp: string;
  totalFiles: number;
  totalIssues: number;
  coverage: number;
  issuesByType: Record<string, number>;
  issuesBySeverity: Record<string, number>;
  issues: UntranslatedItem[];
}

class I18nAuditor {
  private issues: UntranslatedItem[] = [];
  private filesScanned: Set<string> = new Set();
  private excludePatterns = [
    /node_modules/,
    /\.next/,
    /dist/,
    /build/,
    /\.git/,
    /coverage/,
    /test-results/,
    /playwright-report/,
  ];

  private i18nFunctions = ['t(', 'useTranslations(', 'getTranslations(', 'formatDate(', 'formatNumber('];

  async audit(rootDir: string): Promise<AuditReport> {
    console.log('🔍 Starting comprehensive i18n audit...\n');

    const patterns = [
      'app/**/*.{tsx,ts,jsx,js}',
      'components/**/*.{tsx,ts,jsx,js}',
      'lib/**/*.{tsx,ts,jsx,js}',
    ];

    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: rootDir, absolute: true });
      for (const file of files) {
        if (!this.shouldExclude(file)) {
          await this.scanFile(file);
        }
      }
    }

    return this.generateReport();
  }

  private shouldExclude(filePath: string): boolean {
    return this.excludePatterns.some(pattern => pattern.test(filePath));
  }

  private async scanFile(filePath: string): Promise<void> {
    this.filesScanned.add(filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Check if file uses i18n functions
    const usesI18n = this.i18nFunctions.some(fn => content.includes(fn));

    lines.forEach((line, lineIndex) => {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
        return;
      }

      // Check for hardcoded JSX text
      this.checkJSXText(filePath, line, lineIndex, usesI18n);

      // Check for hardcoded string literals
      this.checkStringLiterals(filePath, line, lineIndex, usesI18n);

      // Check for hardcoded attributes
      this.checkAttributes(filePath, line, lineIndex);

      // Check for aria-labels
      this.checkAriaLabels(filePath, line, lineIndex);

      // Check for placeholders
      this.checkPlaceholders(filePath, line, lineIndex);

      // Check for alt texts
      this.checkAltTexts(filePath, line, lineIndex);
    });
  }

  private checkJSXText(filePath: string, line: string, lineIndex: number, usesI18n: boolean): void {
    // Pattern: >[Text content]<
    const jsxTextRegex = />([^<>{}\n]+)</g;
    let match;

    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();
      
      // Skip if empty, only whitespace, or looks like a variable
      if (!text || text.length < 3 || /^[{}\[\]$]/.test(text) || /^\d+$/.test(text)) {
        continue;
      }

      // Skip if it's already using translation function
      if (line.includes('t(') || line.includes('{t(')) {
        continue;
      }

      // Only report if it contains letters (actual text content)
      if (/[a-zA-Z]{3,}/.test(text)) {
        this.addIssue({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'jsx-text',
          severity: 'high',
          context: line.trim(),
        });
      }
    }
  }

  private checkStringLiterals(filePath: string, line: string, lineIndex: number, usesI18n: boolean): void {
    // Pattern: "text" or 'text' but not in imports, requires, or type definitions
    if (line.includes('import ') || line.includes('from ') || line.includes('require(') || 
        line.includes('type ') || line.includes('interface ')) {
      return;
    }

    const stringRegex = /["']([^"']{3,})["']/g;
    let match;

    while ((match = stringRegex.exec(line)) !== null) {
      const text = match[1];
      
      // Skip certain patterns
      if (
        text.startsWith('/') || // URLs/paths
        text.startsWith('http') || // URLs
        text.includes('\\') || // Escaped chars
        /^[\w-]+$/.test(text) && text.length < 10 || // Identifiers
        /^\d+$/.test(text) || // Numbers
        text === 'utf-8' || text === 'application/json' || // Technical strings
        line.includes('className=') || line.includes('class=') // CSS classes
      ) {
        continue;
      }

      // Skip if already in translation function
      if (line.substring(0, match.index).includes('t(')) {
        continue;
      }

      // Only report user-facing strings
      if (/[a-zA-Z\s]{5,}/.test(text) && !text.includes('_') && !text.includes('-')) {
        this.addIssue({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'string-literal',
          severity: usesI18n ? 'high' : 'medium',
          context: line.trim(),
        });
      }
    }
  }

  private checkAttributes(filePath: string, line: string, lineIndex: number): void {
    // Check for title, label, value attributes with hardcoded text
    const attrRegex = /(title|label|value)=["']([^"']{3,})["']/g;
    let match;

    while ((match = attrRegex.exec(line)) !== null) {
      const text = match[2];
      
      if (/[a-zA-Z\s]{3,}/.test(text) && !line.includes('t(')) {
        this.addIssue({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'attribute',
          severity: 'medium',
          context: line.trim(),
        });
      }
    }
  }

  private checkAriaLabels(filePath: string, line: string, lineIndex: number): void {
    const ariaRegex = /aria-label=["']([^"']+)["']/g;
    let match;

    while ((match = ariaRegex.exec(line)) !== null) {
      const text = match[1];
      
      if (/[a-zA-Z\s]{3,}/.test(text) && !line.includes('t(')) {
        this.addIssue({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'aria-label',
          severity: 'high',
          context: line.trim(),
        });
      }
    }
  }

  private checkPlaceholders(filePath: string, line: string, lineIndex: number): void {
    const placeholderRegex = /placeholder=["']([^"']+)["']/g;
    let match;

    while ((match = placeholderRegex.exec(line)) !== null) {
      const text = match[1];
      
      if (/[a-zA-Z\s]{3,}/.test(text) && !line.includes('t(')) {
        this.addIssue({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'placeholder',
          severity: 'high',
          context: line.trim(),
        });
      }
    }
  }

  private checkAltTexts(filePath: string, line: string, lineIndex: number): void {
    const altRegex = /alt=["']([^"']+)["']/g;
    let match;

    while ((match = altRegex.exec(line)) !== null) {
      const text = match[1];
      
      if (/[a-zA-Z\s]{3,}/.test(text) && !line.includes('t(')) {
        this.addIssue({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'alt-text',
          severity: 'high',
          context: line.trim(),
        });
      }
    }
  }

  private addIssue(issue: UntranslatedItem): void {
    this.issues.push(issue);
  }

  private generateReport(): AuditReport {
    const issuesByType: Record<string, number> = {};
    const issuesBySeverity: Record<string, number> = {};

    this.issues.forEach(issue => {
      issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
      issuesBySeverity[issue.severity] = (issuesBySeverity[issue.severity] || 0) + 1;
    });

    const totalFiles = this.filesScanned.size;
    const totalIssues = this.issues.length;
    const coverage = totalIssues === 0 ? 100 : Math.max(0, 100 - (totalIssues / totalFiles * 10));

    return {
      timestamp: new Date().toISOString(),
      totalFiles,
      totalIssues,
      coverage: Math.round(coverage * 100) / 100,
      issuesByType,
      issuesBySeverity,
      issues: this.issues,
    };
  }
}

// Main execution
async function main() {
  const auditor = new I18nAuditor();
  const rootDir = process.cwd();
  
  const report = await auditor.audit(rootDir);

  // Console output
  console.log('📊 AUDIT RESULTS\n');
  console.log(`Total Files Scanned: ${report.totalFiles}`);
  console.log(`Total Issues Found: ${report.totalIssues}`);
  console.log(`Estimated Coverage: ${report.coverage}%\n`);

  console.log('Issues by Type:');
  Object.entries(report.issuesByType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  console.log('\nIssues by Severity:');
  Object.entries(report.issuesBySeverity).forEach(([severity, count]) => {
    console.log(`  ${severity}: ${count}`);
  });

  // Group issues by file
  const issuesByFile: Record<string, UntranslatedItem[]> = {};
  report.issues.forEach(issue => {
    const relativePath = path.relative(rootDir, issue.file);
    if (!issuesByFile[relativePath]) {
      issuesByFile[relativePath] = [];
    }
    issuesByFile[relativePath].push(issue);
  });

  console.log('\n\n📁 ISSUES BY FILE (Top 20):\n');
  const sortedFiles = Object.entries(issuesByFile)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 20);

  sortedFiles.forEach(([file, issues]) => {
    console.log(`\n${file} (${issues.length} issues)`);
    const sampleIssues = issues.slice(0, 5);
    sampleIssues.forEach(issue => {
      console.log(`  Line ${issue.line}: [${issue.type}] "${issue.text.substring(0, 60)}..."`);
    });
    if (issues.length > 5) {
      console.log(`  ... and ${issues.length - 5} more`);
    }
  });

  // Save detailed report
  const reportPath = path.join(rootDir, 'I18N_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n\n✅ Detailed report saved to: ${reportPath}`);

  // Generate markdown summary
  const mdReport = generateMarkdownReport(report, issuesByFile);
  const mdPath = path.join(rootDir, 'I18N_AUDIT_REPORT.md');
  fs.writeFileSync(mdPath, mdReport);
  console.log(`✅ Markdown report saved to: ${mdPath}`);
}

function generateMarkdownReport(report: AuditReport, issuesByFile: Record<string, UntranslatedItem[]>): string {
  const sortedFiles = Object.entries(issuesByFile).sort((a, b) => b[1].length - a[1].length);

  return `# i18n Audit Report

**Generated:** ${new Date(report.timestamp).toLocaleString()}

## Summary

- **Total Files Scanned:** ${report.totalFiles}
- **Total Issues Found:** ${report.totalIssues}
- **Estimated i18n Coverage:** ${report.coverage}%

## Issues by Type

| Type | Count |
|------|-------|
${Object.entries(report.issuesByType).map(([type, count]) => `| ${type} | ${count} |`).join('\n')}

## Issues by Severity

| Severity | Count |
|----------|-------|
${Object.entries(report.issuesBySeverity).map(([severity, count]) => `| ${severity} | ${count} |`).join('\n')}

## Detailed Issues by File

${sortedFiles.slice(0, 50).map(([file, issues]) => `
### ${file} (${issues.length} issues)

${issues.slice(0, 10).map(issue => `
- **Line ${issue.line}** [\`${issue.type}\`] [${issue.severity}]
  - Text: "${issue.text}"
  - Context: \`${issue.context}\`
`).join('\n')}

${issues.length > 10 ? `_...and ${issues.length - 10} more issues_\n` : ''}
`).join('\n---\n')}

## Recommendations

1. **High Priority (${report.issuesBySeverity.high || 0} issues)**
   - JSX text content in user-facing components
   - Form placeholders and labels
   - Aria labels for accessibility
   - Alt texts for images

2. **Medium Priority (${report.issuesBySeverity.medium || 0} issues)**
   - String literals in components
   - Component props with hardcoded text
   - Error messages and notifications

3. **Low Priority (${report.issuesBySeverity.low || 0} issues)**
   - Console logs and debug messages
   - Technical identifiers
   - Internal configuration strings

## Next Steps

1. Review and categorize each issue
2. Extract strings to \`messages/en.json\` with proper namespaces
3. Update components to use \`useTranslations()\` or \`getTranslations()\`
4. Run auto-translation for all locales (fr, it, es, id, de)
5. Test locale switching across all affected pages
6. Re-run this audit to verify 100% coverage
`;
}

main().catch(console.error);
