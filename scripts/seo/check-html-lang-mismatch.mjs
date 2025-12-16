#!/usr/bin/env node
/**
 * Validate HTML <html lang> against expected locale derived from Ahrefs export.
 *
 * Usage:
 *   node scripts/seo/check-html-lang-mismatch.mjs --csv path/to/export.csv --base-url http://localhost:3000
 *
 * Notes:
 * - Designed to be run while `pnpm dev` is running.
 * - Rewrites Ahrefs production URLs to the provided base URL.
 */

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = { csv: null, baseUrl: "http://localhost:3000" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--csv") out.csv = argv[++i];
    else if (a === "--base-url") out.baseUrl = argv[++i];
  }
  return out;
}

function splitCsvLine(line) {
  // Minimal CSV splitter handling quoted commas.
  const cells = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      cells.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  cells.push(cur);
  return cells;
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function extractHtmlLang(html) {
  const m = html.match(/<html\b[^>]*\blang\s*=\s*"([^"]+)"/i);
  return m?.[1] ?? "";
}

function expectedLocaleFromUrl(url) {
  // matches /fr/, /de/, /es/, /it/, /id/, /en/
  const m = url.match(/\/((en|fr|it|es|id|de))(?:\/|$)/i);
  return (m?.[1] || "en").toLowerCase();
}

function rewriteToBaseUrl(originalUrl, baseUrl) {
  const u = new URL(originalUrl);
  const b = new URL(baseUrl);
  u.protocol = b.protocol;
  u.host = b.host;
  return u.toString();
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.csv) {
    console.error("Missing --csv <path>");
    process.exit(2);
  }

  const csvPath = path.resolve(process.cwd(), args.csv);
  const raw = fs.readFileSync(csvPath, "utf8");
  const lines = stripBom(raw).split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    console.error("CSV appears empty");
    process.exit(2);
  }

  const header = splitCsvLine(lines[0]);
  const idxUrl = header.indexOf("URL");
  const idxHtmlLang = header.indexOf("HTML lang");
  const idxSelfHreflang = header.indexOf("Self-hreflang");
  if (idxUrl === -1) {
    console.error("CSV header must include 'URL' column");
    process.exit(2);
  }

  const rows = lines.slice(1).map(splitCsvLine);
  const targets = rows
    .map((r) => ({
      url: r[idxUrl],
      expected: (r[idxSelfHreflang] || expectedLocaleFromUrl(r[idxUrl] || "")).toLowerCase(),
      ahrefsHtmlLang: (idxHtmlLang !== -1 ? r[idxHtmlLang] : "") || "",
    }))
    .filter((r) => r.url);

  let ok = 0;
  let bad = 0;

  for (const t of targets) {
    const fetchUrl = rewriteToBaseUrl(t.url, args.baseUrl);
    try {
      const res = await fetch(fetchUrl, { redirect: "follow" });
      const html = await res.text();
      const lang = extractHtmlLang(html).toLowerCase();

      if (res.status !== 200) {
        bad++;
        console.log(`FAIL ${res.status} ${fetchUrl}`);
        continue;
      }

      if (lang === t.expected) {
        ok++;
      } else {
        bad++;
        console.log(
          `MISMATCH ${fetchUrl}\n  expected=${t.expected}  got=${lang || "(missing)"}  (ahrefs=${t.ahrefsHtmlLang})`
        );
      }
    } catch (e) {
      bad++;
      console.log(`ERROR ${fetchUrl} ${(e && e.message) || e}`);
    }
  }

  console.log(`\nSummary: OK=${ok}  Mismatch/Errors=${bad}  Total=${ok + bad}`);
  process.exit(bad ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
