#!/usr/bin/env node

/**
 * AISEOTurbo Internationalization Automation Script (Simplified Version)
 *
 * This script demonstrates the automation concept for the 5-step formula.
 * For production use, install additional dependencies: @babel/parser @babel/traverse @babel/generator @babel/types
 */

console.log("Script starting...");

import fs from "fs";
import path from "path";

// Configuration
const CONFIG = {
  supportedLanguages: ["de", "it", "id", "es", "fr"],
  sourceLanguage: "en",
  messagesDir: "./messages",
  componentsDir: "./app",
};

class I18nAutomator {
  constructor() {
    // In production, initialize OpenAI client here
    // this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Simplified content detection using regex (production would use AST)
   */
  detectUntranslatedContent(componentPath) {
    console.log(`🔍 Analyzing ${componentPath} for untranslated content...`);

    const content = fs.readFileSync(componentPath, "utf-8");

    // Simple regex patterns for hardcoded strings
    const jsxTextPattern = />([^><{}$]+)</g;
    const stringLiteralPattern = /"([^"{}]+)"/g;

    const untranslatedStrings = [];
    const seen = new Set();

    // Find JSX text content
    let match;
    while ((match = jsxTextPattern.exec(content)) !== null) {
      const text = match[1].trim();
      if (text.length > 3 && !seen.has(text) && !text.includes("t(")) {
        untranslatedStrings.push({
          text,
          type: "jsx-text",
          line: this.getLineNumber(content, match.index),
        });
        seen.add(text);
      }
    }

    return { untranslatedStrings, namespace: this.extractNamespace(componentPath) };
  }

  /**
   * Simplified transformation using string replacement
   */
  transformComponent(componentPath, untranslatedStrings, namespace) {
    console.log(`🔄 Transforming ${componentPath} to use t() functions...`);

    let content = fs.readFileSync(componentPath, "utf-8");
    const translationKeys = {};

    // Ensure useTranslations import
    if (!content.includes("useTranslations")) {
      const importMatch = /import.*from ['"']next-intl['"'];?/;
      if (importMatch.test(content)) {
        content = content.replace(importMatch, (match) => {
          return match + `\nconst { useTranslations } = require('next-intl');`;
        });
      } else {
        content = `import { useTranslations } from 'next-intl';\n\n${content}`;
      }
    }

    // Add t() hook if not present
    if (!content.includes("const t = useTranslations(")) {
      const componentMatch = /export default function (\w+)/;
      const match = content.match(componentMatch);
      if (match) {
        const hookLine = `  const t = useTranslations('${namespace}');\n\n`;
        content = content.replace(/export default function \w+\([^)]*\) \{/, (match) => {
          return match + `\n${hookLine}`;
        });
      }
    }

    // Replace hardcoded strings with t() calls
    let keyCounter = 0;
    untranslatedStrings.forEach(({ text, type }) => {
      const key = this.generateTranslationKey(text, keyCounter++);
      translationKeys[key] = text;

      if (type === "jsx-text") {
        // Replace JSX text
        const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const jsxPattern = new RegExp(`>([^><]*${escapedText}[^><]*)<`, "g");
        content = content.replace(jsxPattern, (match) => {
          return match.replace(text, `{t('${key}')}`);
        });
      }
    });

    fs.writeFileSync(componentPath, content);
    return translationKeys;
  }

  /**
   * Update English source file
   */
  updateEnglishSource(namespace, translationKeys) {
    console.log(`📝 Updating messages/en.json with new keys...`);

    const enPath = path.join(CONFIG.messagesDir, "en.json");
    const enContent = JSON.parse(fs.readFileSync(enPath, "utf-8"));

    // Navigate to namespace
    const parts = namespace.split(".");
    let current = enContent;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }

    const sectionName = parts[parts.length - 1];
    if (!current[sectionName]) current[sectionName] = {};

    Object.assign(current[sectionName], translationKeys);

    fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
  }

  /**
   * Mock translation (production would use AI)
   */
  async bulkTranslate(namespace, translationKeys) {
    console.log(`🌍 Mock translating to ${CONFIG.supportedLanguages.length} languages...`);

    // In production, this would call OpenAI API
    // For demo, we'll create mock translations
    const translations = {};

    const mockTranslations = {
      de: Object.keys(translationKeys).reduce((acc, key) => {
        acc[key] = `[DE] ${translationKeys[key]}`;
        return acc;
      }, {}),
      it: Object.keys(translationKeys).reduce((acc, key) => {
        acc[key] = `[IT] ${translationKeys[key]}`;
        return acc;
      }, {}),
      id: Object.keys(translationKeys).reduce((acc, key) => {
        acc[key] = `[ID] ${translationKeys[key]}`;
        return acc;
      }, {}),
      es: Object.keys(translationKeys).reduce((acc, key) => {
        acc[key] = `[ES] ${translationKeys[key]}`;
        return acc;
      }, {}),
      fr: Object.keys(translationKeys).reduce((acc, key) => {
        acc[key] = `[FR] ${translationKeys[key]}`;
        return acc;
      }, {}),
    };

    CONFIG.supportedLanguages.forEach((lang) => {
      translations[lang] = mockTranslations[lang];
    });

    return translations;
  }

  /**
   * Update all language files
   */
  updateLanguageFiles(namespace, translations) {
    console.log(`💾 Updating language files...`);

    Object.entries(translations).forEach(([lang, keys]) => {
      const filePath = path.join(CONFIG.messagesDir, `${lang}.json`);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Navigate to namespace
      const parts = namespace.split(".");
      let current = content;

      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }

      const sectionName = parts[parts.length - 1];
      if (!current[sectionName]) current[sectionName] = {};

      Object.assign(current[sectionName], keys);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    });
  }

  /**
   * Main automation function
   */
  async automateComponent(componentPath) {
    console.log(`🚀 Starting internationalization automation for ${componentPath}\n`);

    try {
      // Step 1: Detect content
      const { untranslatedStrings, namespace } = this.detectUntranslatedContent(componentPath);
      console.log(`📋 Found ${untranslatedStrings.length} untranslated strings\n`);

      if (untranslatedStrings.length === 0) {
        console.log(`✅ No untranslated content found in ${componentPath}`);
        return;
      }

      // Step 2: Transform component
      const translationKeys = this.transformComponent(
        componentPath,
        untranslatedStrings,
        namespace
      );
      console.log(`🔄 Generated ${Object.keys(translationKeys).length} translation keys\n`);

      // Step 3: Update English source
      this.updateEnglishSource(namespace, translationKeys);
      console.log(`📝 Updated messages/en.json\n`);

      // Step 4: Bulk translate (mock)
      const translations = await this.bulkTranslate(namespace, translationKeys);
      console.log(`🌍 Generated translations for ${CONFIG.supportedLanguages.length} languages\n`);

      // Step 5: Update language files
      this.updateLanguageFiles(namespace, translations);
      console.log(`💾 Updated all language files\n`);

      console.log(`🎉 Successfully internationalized ${componentPath}!`);
      console.log(`   ✓ Component transformed to use t() functions`);
      console.log(`   ✓ ${Object.keys(translationKeys).length} new translation keys added`);
      console.log(`   ✓ ${CONFIG.supportedLanguages.length + 1} language files updated`);
      console.log(`   ✓ Ready for validation (pnpm type-check && npm run build)`);
    } catch (error) {
      console.error(`❌ Automation failed:`, error.message);
      throw error;
    }
  }

  // Helper methods
  extractNamespace(componentPath) {
    const relativePath = path.relative(CONFIG.componentsDir, componentPath);
    const parts = relativePath.split(path.sep);

    if (parts.includes("help")) {
      const helpIndex = parts.indexOf("help");
      const category = parts[helpIndex + 1];
      const article = path.basename(componentPath, ".tsx").replace("Content", "").toLowerCase();
      return `help.categories.${category}.articles.${article}`;
    }

    return "test"; // fallback for test components
  }

  generateTranslationKey(text, counter) {
    const sanitized = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 20);
    return `${sanitized}_${counter}`;
  }

  getLineNumber(content, index) {
    const lines = content.substring(0, index).split("\n");
    return lines.length;
  }
}

// CLI interface
async function main() {
  console.log("🚀 Starting I18n Automation Script...");
  const args = process.argv.slice(2);
  console.log("Arguments received:", args);

  if (args.length === 0) {
    console.log(`
🤖 AISEOTurbo I18n Automation Script

Usage: node scripts/i18n-automate.js <component-path>

Examples:
  pnpm i18n:auto app/[locale]/help/troubleshooting/audit-issues/AuditIssuesContent.tsx
  pnpm i18n:auto test-component-i18n.tsx

What it does:
1. 🔍 Detects untranslated strings in the component
2. 🔄 Transforms hardcoded strings to t() function calls
3. 📝 Adds translation keys to messages/en.json
4. 🌍 Generates translations for all supported languages
5. 💾 Updates all language files

Supported languages: de, it, id, es, fr
`);
    process.exit(1);
  }

  const componentPath = args[0];

  if (!fs.existsSync(componentPath)) {
    console.error(`❌ Component file not found: ${componentPath}`);
    process.exit(1);
  }

  const automator = new I18nAutomator();
  await automator.automateComponent(componentPath);
  console.log("✅ Script completed successfully");
}

// Run main if this is the entry point
if (process.argv[1].endsWith("i18n-automate-simple.js")) {
  main().catch(console.error);
}

export default I18nAutomator;
