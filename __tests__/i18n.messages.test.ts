import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const LOCALES = ["en", "fr", "it", "es", "id", "de"] as const;
type Locale = (typeof LOCALES)[number];
const MESSAGES_DIR = path.resolve(__dirname, "..", "messages");

function loadMessages(locale: Locale) {
  const file = path.join(MESSAGES_DIR, `${locale}.json`);
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

function flatten(obj: any, prefix = "", out: Record<string, string> = {}) {
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v as any, key, out);
    else out[key] = String(v);
  }
  return out;
}

describe("i18n messages parity", () => {
  const base = flatten(loadMessages("en"));

  for (const locale of LOCALES) {
    it(`${locale} has same keys as en`, () => {
      const flat = flatten(loadMessages(locale));
      const missing = Object.keys(base).filter((k) => !(k in flat));
      expect(missing).toEqual([]);
    });
  }
});
