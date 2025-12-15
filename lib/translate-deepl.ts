/**
 * DeepL Translation Utility
 * Automatically translates missing keys from en.json to all target locales
 */

import fs from "fs";
import path from "path";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || process.env.DEEP_API_KEY;
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

interface TranslationConfig {
  sourceLocale: string;
  targetLocales: string[];
  formalityMap: Record<string, "default" | "more" | "less">;
  glossary?: Record<string, Record<string, string>>;
}

const config: TranslationConfig = {
  sourceLocale: "en",
  targetLocales: ["fr", "it", "es", "id", "de"],
  formalityMap: {
    de: "more", // Formal German
    id: "more", // Formal Indonesian
    fr: "default",
    it: "default",
    es: "default",
  },
  glossary: {
    // SEO-specific terms that should remain consistent
    en: {
      backlink: "backlink",
      backlinks: "backlinks",
      "Core Web Vitals": "Core Web Vitals",
      SEO: "SEO",
      URL: "URL",
      "meta tag": "meta tag",
      "meta tags": "meta tags",
      "schema markup": "schema markup",
      "structured data": "structured data",
      canonical: "canonical",
      sitemap: "sitemap",
      "robots.txt": "robots.txt",
      nofollow: "nofollow",
      dofollow: "dofollow",
    },
  },
};

export class TranslationService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || DEEPL_API_KEY || "";
    if (!this.apiKey) {
      throw new Error(
        "DeepL API key not found. Set DEEPL_API_KEY or DEEP_API_KEY environment variable."
      );
    }
  }

  /**
   * Translate a single text string
   */
  async translateText(
    text: string,
    targetLang: string,
    formality?: "default" | "more" | "less"
  ): Promise<string> {
    const params = new URLSearchParams({
      auth_key: this.apiKey,
      text,
      target_lang: this.mapLocaleToDeepL(targetLang),
      source_lang: "EN",
    });

    if (
      formality &&
      ["DE", "IT", "ES", "PT-BR", "PT-PT", "RU", "JA"].includes(this.mapLocaleToDeepL(targetLang))
    ) {
      params.append("formality", formality);
    }

    try {
      const response = await fetch(DEEPL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepL API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return data.translations[0].text;
    } catch (error) {
      console.error(`Translation error for "${text}" to ${targetLang}:`, error);
      throw error;
    }
  }

  /**
   * Map locale codes to DeepL language codes
   */
  private mapLocaleToDeepL(locale: string): string {
    const map: Record<string, string> = {
      en: "EN",
      fr: "FR",
      it: "IT",
      es: "ES",
      id: "ID",
      de: "DE",
      pt: "PT-BR",
      ja: "JA",
      zh: "ZH",
      ru: "RU",
    };
    return map[locale.toLowerCase()] || locale.toUpperCase();
  }

  /**
   * Translate nested JSON object
   */
  async translateObject(
    obj: any,
    targetLang: string,
    formality?: "default" | "more" | "less"
  ): Promise<any> {
    if (typeof obj === "string") {
      // Check if string contains interpolation variables
      const hasVariables = /\{[^}]+\}/.test(obj);

      if (hasVariables) {
        // Preserve variables during translation
        return await this.translateWithVariables(obj, targetLang, formality);
      }

      return await this.translateText(obj, targetLang, formality);
    }

    if (Array.isArray(obj)) {
      return await Promise.all(
        obj.map((item) => this.translateObject(item, targetLang, formality))
      );
    }

    if (typeof obj === "object" && obj !== null) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = await this.translateObject(value, targetLang, formality);
        // Add small delay to avoid rate limiting
        await this.delay(100);
      }
      return result;
    }

    return obj;
  }

  /**
   * Translate text while preserving interpolation variables
   */
  private async translateWithVariables(
    text: string,
    targetLang: string,
    formality?: "default" | "more" | "less"
  ): Promise<string> {
    // Extract variables
    const variables: string[] = [];
    const placeholders: string[] = [];

    let processedText = text.replace(/\{([^}]+)\}/g, (match, varName) => {
      const placeholder = `__VAR${variables.length}__`;
      variables.push(match);
      placeholders.push(placeholder);
      return placeholder;
    });

    // Translate
    const translated = await this.translateText(processedText, targetLang, formality);

    // Restore variables
    let result = translated;
    placeholders.forEach((placeholder, index) => {
      result = result.replace(placeholder, variables[index]);
    });

    return result;
  }

  /**
   * Translate entire messages file
   */
  async translateMessagesFile(
    sourcePath: string,
    targetPath: string,
    targetLang: string,
    options: { skipExisting?: boolean; dryRun?: boolean } = {}
  ): Promise<void> {
    console.log(`\n🌍 Translating to ${targetLang.toUpperCase()}...`);

    const sourceMessages = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
    let targetMessages: any = {};

    if (options.skipExisting && fs.existsSync(targetPath)) {
      targetMessages = JSON.parse(fs.readFileSync(targetPath, "utf-8"));
      console.log(`  ℹ️  Skipping existing translations`);
    }

    const formality = config.formalityMap[targetLang] || "default";
    const translatedMessages = await this.translateObject(sourceMessages, targetLang, formality);

    // Merge with existing if skipExisting is true
    const finalMessages = options.skipExisting
      ? this.deepMerge(translatedMessages, targetMessages)
      : translatedMessages;

    if (!options.dryRun) {
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(targetPath, JSON.stringify(finalMessages, null, 2), "utf-8");
      console.log(`  ✅ Saved to ${targetPath}`);
    } else {
      console.log(`  🔍 Dry run - would save to ${targetPath}`);
    }
  }

  /**
   * Deep merge objects, preferring target values
   */
  private deepMerge(source: any, target: any): any {
    if (typeof target !== "object" || target === null) {
      return target || source;
    }

    if (typeof source !== "object" || source === null) {
      return target;
    }

    const result: any = { ...source };

    for (const key of Object.keys(target)) {
      if (typeof target[key] === "object" && !Array.isArray(target[key])) {
        result[key] = this.deepMerge(source[key], target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Batch translate all locales
   */
  async translateAll(
    messagesDir: string,
    options: { skipExisting?: boolean; dryRun?: boolean } = {}
  ): Promise<void> {
    const sourcePath = path.join(messagesDir, "en.json");

    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file not found: ${sourcePath}`);
    }

    console.log("🚀 Starting batch translation...");
    console.log(`Source: ${sourcePath}`);
    console.log(`Target locales: ${config.targetLocales.join(", ")}\n`);

    for (const locale of config.targetLocales) {
      const targetPath = path.join(messagesDir, `${locale}.json`);

      try {
        await this.translateMessagesFile(sourcePath, targetPath, locale, options);
      } catch (error) {
        console.error(`❌ Failed to translate to ${locale}:`, error);
      }
    }

    console.log("\n✅ Batch translation complete!");
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const skipExisting = args.includes("--skip-existing");
  const locale = args.find((arg) => arg.startsWith("--locale="))?.split("=")[1];

  const messagesDir = path.join(process.cwd(), "messages");
  const translator = new TranslationService();

  if (locale) {
    // Translate single locale
    const sourcePath = path.join(messagesDir, "en.json");
    const targetPath = path.join(messagesDir, `${locale}.json`);
    await translator.translateMessagesFile(sourcePath, targetPath, locale, {
      dryRun,
      skipExisting,
    });
  } else {
    // Translate all locales
    await translator.translateAll(messagesDir, { dryRun, skipExisting });
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export default TranslationService;
