#!/usr/bin/env node

/**
 * AISEOTurbo Internationalization Automation Script
 *
 * This script automates the 5-step internationalization formula:
 * 1. Content Detection & Analysis
 * 2. Component Transformation (strings → t() calls)
 * 3. English Source Updates (add keys to en.json)
 * 4. Bulk Translation via AI
 * 5. Language File Updates
 */

import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import OpenAI from "openai";

// Configuration
const CONFIG = {
  supportedLanguages: ["de", "it", "id", "es", "fr"],
  sourceLanguage: "en",
  messagesDir: "./messages",
  componentsDir: "./app",
  aiModel: "gpt-4",
  translationPrompt: `Translate the following JSON content from English to {language}.
Maintain the exact same JSON structure and key names.
Only translate the string values, never change keys or structure.
Provide only valid JSON as output, no additional text or explanations.

Content to translate:
{jsonContent}`,
};

class I18nAutomator {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Step 1: Content Detection & Analysis
   * Scans components for hardcoded strings that need translation
   */
  async detectUntranslatedContent(componentPath) {
    console.log(`🔍 Analyzing ${componentPath} for untranslated content...`);

    const content = fs.readFileSync(componentPath, "utf-8");
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    const untranslatedStrings = [];
    const namespace = this.extractNamespace(componentPath);

    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && text.length > 2 && !text.includes("{") && !text.includes("}")) {
          untranslatedStrings.push({
            text,
            location: `${componentPath}:${path.node.loc.start.line}`,
            context: "jsx-text",
          });
        }
      },
      StringLiteral(path) {
        // Skip if it's an import, prop name, or already a t() call
        if (
          path.parent.type === "ImportDeclaration" ||
          (path.parent.type === "JSXAttribute" && path.parent.name.name === "key") ||
          path.parent.callee?.name === "t"
        ) {
          return;
        }

        const text = path.node.value;
        if (text && text.length > 2 && !text.includes("{") && !text.includes("}")) {
          untranslatedStrings.push({
            text,
            location: `${componentPath}:${path.node.loc.start.line}`,
            context: "string-literal",
          });
        }
      },
    });

    return { untranslatedStrings, namespace };
  }

  /**
   * Step 2: Component Transformation
   * Replaces hardcoded strings with t() function calls
   */
  async transformComponent(componentPath, untranslatedStrings, namespace) {
    console.log(`🔄 Transforming ${componentPath} to use t() functions...`);

    const content = fs.readFileSync(componentPath, "utf-8");
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let keyCounter = 0;
    const translationKeys = {};

    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && untranslatedStrings.some((u) => u.text === text)) {
          const key = this.generateTranslationKey(text, keyCounter++);
          translationKeys[key] = text;

          // Replace JSXText with JSXExpressionContainer containing t() call
          path.replaceWith(
            t.jsxExpressionContainer(t.callExpression(t.identifier("t"), [t.stringLiteral(key)]))
          );
        }
      },
      StringLiteral(path) {
        if (
          path.parent.type === "ImportDeclaration" ||
          (path.parent.type === "JSXAttribute" && path.parent.name.name === "key") ||
          path.parent.callee?.name === "t"
        ) {
          return;
        }

        const text = path.node.value;
        if (text && untranslatedStrings.some((u) => u.text === text)) {
          const key = this.generateTranslationKey(text, keyCounter++);
          translationKeys[key] = text;

          path.replaceWith(t.callExpression(t.identifier("t"), [t.stringLiteral(key)]));
        }
      },
    });

    // Ensure useTranslations import exists
    this.ensureUseTranslationsImport(ast, namespace);

    const transformedCode = generate(ast, { retainLines: true }).code;
    fs.writeFileSync(componentPath, transformedCode);

    return translationKeys;
  }

  /**
   * Step 3: English Source Updates
   * Adds new keys to en.json
   */
  async updateEnglishSource(namespace, translationKeys) {
    console.log(`📝 Updating messages/en.json with new keys...`);

    const enPath = path.join(CONFIG.messagesDir, "en.json");
    const enContent = JSON.parse(fs.readFileSync(enPath, "utf-8"));

    // Navigate to the correct namespace path
    const namespaceParts = namespace.split(".");
    let current = enContent;

    for (let i = 0; i < namespaceParts.length - 1; i++) {
      if (!current[namespaceParts[i]]) {
        current[namespaceParts[i]] = {};
      }
      current = current[namespaceParts[i]];
    }

    const sectionName = namespaceParts[namespaceParts.length - 1];
    if (!current[sectionName]) {
      current[sectionName] = {};
    }

    // Add new keys
    Object.assign(current[sectionName], translationKeys);

    fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
  }

  /**
   * Step 4: Bulk Translation via AI
   */
  async bulkTranslate(namespace, translationKeys) {
    console.log(`🌍 Translating to ${CONFIG.supportedLanguages.length} languages...`);

    const translations = {};

    for (const lang of CONFIG.supportedLanguages) {
      console.log(`  → Translating to ${lang}...`);

      const jsonContent = JSON.stringify(translationKeys, null, 2);
      const prompt = CONFIG.translationPrompt
        .replace("{language}", this.getLanguageName(lang))
        .replace("{jsonContent}", jsonContent);

      try {
        const response = await this.openai.chat.completions.create({
          model: CONFIG.aiModel,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.1, // Low temperature for consistency
        });

        const translatedJson = response.choices[0].message.content.trim();
        translations[lang] = JSON.parse(translatedJson);
      } catch (error) {
        console.error(`❌ Translation failed for ${lang}:`, error.message);
        // Fallback: copy English
        translations[lang] = { ...translationKeys };
      }
    }

    return translations;
  }

  /**
   * Step 5: Language File Updates
   */
  async updateLanguageFiles(namespace, translations) {
    console.log(`💾 Updating language files...`);

    for (const [lang, translationKeys] of Object.entries(translations)) {
      const filePath = path.join(CONFIG.messagesDir, `${lang}.json`);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Navigate to namespace
      const namespaceParts = namespace.split(".");
      let current = content;

      for (let i = 0; i < namespaceParts.length - 1; i++) {
        if (!current[namespaceParts[i]]) {
          current[namespaceParts[i]] = {};
        }
        current = current[namespaceParts[i]];
      }

      const sectionName = namespaceParts[namespaceParts.length - 1];
      if (!current[sectionName]) {
        current[sectionName] = {};
      }

      Object.assign(current[sectionName], translationKeys);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    }
  }

  /**
   * Main automation function
   */
  async automateComponent(componentPath) {
    console.log(`🚀 Starting internationalization automation for ${componentPath}`);

    try {
      // Step 1: Detect untranslated content
      const { untranslatedStrings, namespace } =
        await this.detectUntranslatedContent(componentPath);

      if (untranslatedStrings.length === 0) {
        console.log(`✅ No untranslated content found in ${componentPath}`);
        return;
      }

      console.log(`📋 Found ${untranslatedStrings.length} untranslated strings`);

      // Step 2: Transform component
      const translationKeys = await this.transformComponent(
        componentPath,
        untranslatedStrings,
        namespace
      );

      // Step 3: Update English source
      await this.updateEnglishSource(namespace, translationKeys);

      // Step 4: Bulk translate
      const translations = await this.bulkTranslate(namespace, translationKeys);

      // Step 5: Update language files
      await this.updateLanguageFiles(namespace, translations);

      console.log(`🎉 Successfully internationalized ${componentPath}!`);
      console.log(`   - ${Object.keys(translationKeys).length} new translation keys added`);
      console.log(`   - Updated ${CONFIG.supportedLanguages.length + 1} language files`);
    } catch (error) {
      console.error(`❌ Automation failed:`, error.message);
      throw error;
    }
  }

  // Helper methods
  extractNamespace(componentPath) {
    // Extract namespace from component path
    // Example: app/[locale]/help/troubleshooting/audit-issues/page.tsx
    // → help.categories.troubleshooting.articles.auditIssues
    const relativePath = path.relative(CONFIG.componentsDir, componentPath);
    const parts = relativePath.split(path.sep);

    if (parts.includes("help")) {
      const helpIndex = parts.indexOf("help");
      const category = parts[helpIndex + 1]; // troubleshooting
      const article = parts[helpIndex + 2]; // audit-issues

      return `help.categories.${category}.articles.${this.toCamelCase(article)}`;
    }

    return "common"; // fallback
  }

  generateTranslationKey(text, counter) {
    // Generate consistent, readable keys
    const sanitized = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 30);

    return `${sanitized}_${counter}`;
  }

  ensureUseTranslationsImport(ast, namespace) {
    // Ensure the component has the useTranslations import and hook
    // This is complex and would need more sophisticated AST manipulation
    // For now, we'll assume it's already imported correctly
  }

  getLanguageName(code) {
    const names = {
      de: "German",
      it: "Italian",
      id: "Indonesian",
      es: "Spanish",
      fr: "French",
    };
    return names[code] || code;
  }

  toCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: node i18n-automate.js <component-path>

Example:
  node i18n-automate.js app/[locale]/help/troubleshooting/audit-issues/AuditIssuesContent.tsx

This will:
1. Detect untranslated strings in the component
2. Transform them to t() function calls
3. Add keys to messages/en.json
4. Translate to all supported languages
5. Update all language files
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
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default I18nAutomator;
