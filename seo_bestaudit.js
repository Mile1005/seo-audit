import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { Cluster } from 'puppeteer-cluster';
import { createObjectCsvWriter } from 'csv-writer';
import * as xml2js from 'xml2js';
import * as csvParse from 'csv-parse/sync';
import * as jsonld from 'jsonld';
import stringSimilarity from 'string-similarity';

// Default configuration
let SITEMAP_URL = 'http://localhost:3000/sitemap.xml';
const LANGUAGES = ['de', 'fr', 'en', 'it', 'es', 'id'];
const CONCURRENT_LIMIT = 10;
const PUPPETEER_TIMEOUT = 30000;
const RETRY_LIMIT = 2;
const RATE_LIMIT_DELAY = 1000;

let allTitles = [];
let allDescriptions = [];

function loadUrls() {
  if (!fs.existsSync('urls.csv')) {
    console.error('urls.csv not found');
    process.exit(1);
  }
  const csvData = fs.readFileSync('urls.csv', 'utf8');
  const records = csvParse.parse(csvData, { columns: true });
  return records;
}

function loadKeywords(lang = null) {
  let file = 'keywords.txt';
  if (lang) file = `keywords_${lang}.txt`;
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8').split('\n').map(k => k.trim()).filter(k => k);
  }
  return [];
}

async function fetchSitemap() {
  try {
    const response = await axios.get(SITEMAP_URL);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const urls = result.urlset.url.map(u => ({
      loc: u.loc[0],
      lastmod: u.lastmod ? u.lastmod[0] : null,
      changefreq: u.changefreq ? u.changefreq[0] : null,
      priority: u.priority ? parseFloat(u.priority[0]) : null
    }));
    return urls;
  } catch (e) {
    console.error('Failed to fetch sitemap:', e.message);
    return [];
  }
}

function checkTitle(title, keywords, allTitles) {
  if (!title) return { status: 'fail', score: 0, notes: 'No title' };
  if (title.length < 50 || title.length > 60) return { status: 'warn', score: 50, notes: `Title length ${title.length}` };
  const primaryKeyword = keywords[0] || '';
  if (primaryKeyword && !title.toLowerCase().includes(primaryKeyword.toLowerCase())) return { status: 'warn', score: 70, notes: 'Primary keyword not in title' };
  const similar = allTitles.filter(t => stringSimilarity.compareTwoStrings(t, title) > 0.8);
  if (similar.length > 1) return { status: 'warn', score: 60, notes: 'Similar titles found' };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkMetaDesc(desc, allDescriptions) {
  if (!desc) return { status: 'fail', score: 0, notes: 'No meta description' };
  if (desc.length < 120 || desc.length > 155) return { status: 'warn', score: 50, notes: `Description length ${desc.length}` };
  const similar = allDescriptions.filter(d => stringSimilarity.compareTwoStrings(d, desc) > 0.8);
  if (similar.length > 1) return { status: 'warn', score: 60, notes: 'Similar descriptions found' };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkHeadings($) {
  const h1s = $('h1').length;
  if (h1s !== 1) return { status: 'fail', score: 20, notes: `${h1s} H1s` };
  // Check hierarchy, etc.
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkCanonical($, url) {
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical || canonical !== url) return { status: 'fail', score: 0, notes: 'Canonical missing or incorrect' };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkSchema($) {
  const scripts = $('script[type="application/ld+json"]');
  if (!scripts.length) return { status: 'warn', score: 30, notes: 'No JSON-LD' };
  let valid = true;
  scripts.each((i, el) => {
    try {
      const data = JSON.parse($(el).html());
      if (!data['@type']) valid = false;
    } catch (e) {
      valid = false;
    }
  });
  if (!valid) return { status: 'fail', score: 20, notes: 'Invalid JSON-LD' };
  return { status: 'pass', score: 100, notes: 'Valid schema' };
}

async function checkHreflang($, url, lang) {
  const hreflangs = {};
  $('link[rel="alternate"]').each((i, el) => {
    const hreflang = $(el).attr('hreflang');
    const href = $(el).attr('href');
    if (hreflang && href) hreflangs[hreflang] = href;
  });
  if (!hreflangs[lang] || hreflangs[lang] !== url) return { status: 'fail', score: 0, notes: 'Self hreflang missing or incorrect' };
  const missing = LANGUAGES.filter(l => !hreflangs[l]);
  if (missing.length) return { status: 'warn', score: 50, notes: `Missing hreflang for ${missing.join(',')}` };
  if (!hreflangs['x-default']) return { status: 'warn', score: 70, notes: 'No x-default' };
  // Bidirectional check
  const altLang = lang === 'en' ? 'de' : 'en';
  const altUrl = hreflangs[altLang];
  if (altUrl) {
    try {
      const altResponse = await axios.get(altUrl, { timeout: 30000 });
      const alt$ = cheerio.load(altResponse.data);
      const altHreflangs = {};
      alt$('link[rel="alternate"]').each((i, el) => {
        const hreflang = alt$(el).attr('hreflang');
        const href = alt$(el).attr('href');
        if (hreflang && href) altHreflangs[hreflang] = href;
      });
      if (!altHreflangs[lang] || altHreflangs[lang] !== url) return { status: 'warn', score: 60, notes: 'Bidirectional hreflang missing' };
    } catch (e) {
      return { status: 'warn', score: 50, notes: 'Failed to check bidirectional' };
    }
  }
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkOpenGraph($) {
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDesc = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogUrl = $('meta[property="og:url"]').attr('content');
  const ogType = $('meta[property="og:type"]').attr('content');
  if (!ogTitle || !ogDesc || !ogImage || !ogUrl || !ogType) return { status: 'fail', score: 0, notes: 'Missing OG tags' };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkAria($) {
  // Basic checks
  const imgs = $('img');
  let missingAlt = 0;
  imgs.each((i, el) => {
    if (!$(el).attr('alt')) missingAlt++;
  });
  if (missingAlt > 0) return { status: 'warn', score: 50, notes: `${missingAlt} images missing alt` };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkKeywords($, keywords) {
  const text = $.text().toLowerCase();
  const totalWords = text.split(/\s+/).length;
  let keywordCount = 0;
  keywords.forEach(k => {
    const regex = new RegExp(k.toLowerCase(), 'g');
    const matches = text.match(regex);
    if (matches) keywordCount += matches.length;
  });
  const density = (keywordCount / totalWords) * 100;
  if (density > 2) return { status: 'warn', score: 50, notes: `Keyword density ${density.toFixed(2)}%` };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkContent($) {
  const text = $.text();
  const words = text.split(/\s+/).length;
  if (words < 1500) return { status: 'warn', score: 50, notes: `Content length ${words} words` };
  // Readability check simplified
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkImages($) {
  const imgs = $('img');
  let missingAlt = 0;
  imgs.each((i, el) => {
    if (!$(el).attr('alt')) missingAlt++;
  });
  if (missingAlt > 0) return { status: 'warn', score: 50, notes: `${missingAlt} images missing alt` };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkLinks($) {
  const links = $('a[href]');
  const internals = links.filter((i, el) => $(el).attr('href').startsWith('/')).length;
  if (internals < 3) return { status: 'warn', score: 50, notes: `Only ${internals} internal links` };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkRobots($) {
  const robots = $('meta[name="robots"]').attr('content');
  if (robots && robots.includes('noindex')) return { status: 'fail', score: 0, notes: 'Noindex' };
  return { status: 'pass', score: 100, notes: 'Good' };
}

function checkMobile($) {
  const viewport = $('meta[name="viewport"]').attr('content');
  if (!viewport || !viewport.includes('width=device-width')) return { status: 'fail', score: 0, notes: 'No viewport' };
  return { status: 'pass', score: 100, notes: 'Good' };
}

async function auditUrl(urlObj, keywords, sitemapUrls) {
  const url = urlObj.url;
  let lang = urlObj.lang || null;
  console.log(`Auditing: ${url}`);
  let retries = 0;
  while (retries <= RETRY_LIMIT) {
    try {
      const response = await axios.get(url, { timeout: 30000 });
      const $ = cheerio.load(response.data);
      let detectedLang = $('html').attr('lang') || 'en';
      if (!lang) lang = detectedLang;
      const scripts = $('script[src]').toArray().some(s => $(s).attr('src') && ($(s).attr('src').includes('react') || $(s).attr('src').includes('next')));
      let fullHtml = response.data;
      let lighthouseResult = null;
      if (scripts) {
        try {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
          await page.goto(url, { waitUntil: 'networkidle2', timeout: PUPPETEER_TIMEOUT });
          fullHtml = await page.content();
          // Lighthouse disabled
          await browser.close();
        } catch (puppeteerError) {
          console.warn(`Puppeteer failed for ${url}: ${puppeteerError.message}, using axios HTML`);
          // Fall back to axios HTML
        }
      }
      const $$ = cheerio.load(fullHtml);
      const title = $$('title').text().trim();
      const desc = $$('meta[name="description"]').attr('content') || '';
      let checks = {};
      try {
        checks = {
          title: checkTitle(title, keywords, allTitles),
          metaDesc: checkMetaDesc(desc, allDescriptions),
          headings: checkHeadings($$),
          canonical: checkCanonical($$, url),
          schema: checkSchema($$),
          hreflang: await checkHreflang($$, url, lang),
          openGraph: checkOpenGraph($$),
          aria: checkAria($$),
          keywords: checkKeywords($$, keywords),
          content: checkContent($$),
          images: checkImages($$),
          links: checkLinks($$),
          robots: checkRobots($$),
          mobile: checkMobile($$),
        };
      } catch (checkError) {
        console.error(`Check error for ${url}: ${checkError.message}`);
        checks = { error: checkError.message };
      }
      allTitles.push(title);
      allDescriptions.push(desc);
      const scores = Object.values(checks).filter(c => c && typeof c.score === 'number').map(c => c.score);
      const overallScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      console.log(`Completed: ${url} - Score: ${overallScore.toFixed(2)}`);
      return { url, lang, ...checks, overallScore };
    } catch (e) {
      console.error(`Error auditing ${url}: ${e.message}`);
      retries++;
      if (retries > RETRY_LIMIT) {
        console.error(`Failed to audit ${url} after ${RETRY_LIMIT} retries`);
        return { url, lang, error: e.message, overallScore: 0 };
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
    }
  }
}

async function auditUrls(urls, keywords, sitemapUrls) {
  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENT_LIMIT) {
    const batch = urls.slice(i, i + CONCURRENT_LIMIT);
    const promises = batch.map(urlObj => auditUrl(urlObj, keywords, sitemapUrls));
    const settled = await Promise.allSettled(promises);
    settled.forEach(result => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        results.push({ url: 'unknown', error: result.reason.message, overallScore: 0 });
      }
    });
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
  }
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  let langs = LANGUAGES;
  let subset = null;
  args.forEach(arg => {
    if (arg.startsWith('--langs=')) {
      langs = arg.split('=')[1].split(',');
    } else if (arg.startsWith('--subset=')) {
      subset = parseInt(arg.split('=')[1]);
    } else if (arg.startsWith('--base-url=')) {
      const baseUrl = arg.split('=')[1];
      SITEMAP_URL = `${baseUrl}/sitemap.xml`;
    }
  });
  const urls = loadUrls().filter(u => !langs.length || langs.includes(u.lang));
  if (subset) urls.splice(subset);
  const keywords = loadKeywords();
  const sitemapUrls = await fetchSitemap();
  const results = await auditUrls(urls, keywords, sitemapUrls);
  // Write CSV
  const csvHeader = [
    { id: 'url', title: 'URL' },
    { id: 'lang', title: 'Lang' },
    { id: 'overallScore', title: 'Overall Score' },
    { id: 'title_status', title: 'Title Status' },
    { id: 'title_score', title: 'Title Score' },
    { id: 'title_notes', title: 'Title Notes' },
    // Add for all checks
    { id: 'metaDesc_status', title: 'Meta Desc Status' },
    { id: 'metaDesc_score', title: 'Meta Desc Score' },
    { id: 'metaDesc_notes', title: 'Meta Desc Notes' },
    { id: 'headings_status', title: 'Headings Status' },
    { id: 'headings_score', title: 'Headings Score' },
    { id: 'headings_notes', title: 'Headings Notes' },
    { id: 'canonical_status', title: 'Canonical Status' },
    { id: 'canonical_score', title: 'Canonical Score' },
    { id: 'canonical_notes', title: 'Canonical Notes' },
    { id: 'schema_status', title: 'Schema Status' },
    { id: 'schema_score', title: 'Schema Score' },
    { id: 'schema_notes', title: 'Schema Notes' },
    { id: 'hreflang_status', title: 'Hreflang Status' },
    { id: 'hreflang_score', title: 'Hreflang Score' },
    { id: 'hreflang_notes', title: 'Hreflang Notes' },
    { id: 'openGraph_status', title: 'OpenGraph Status' },
    { id: 'openGraph_score', title: 'OpenGraph Score' },
    { id: 'openGraph_notes', title: 'OpenGraph Notes' },
    { id: 'aria_status', title: 'ARIA Status' },
    { id: 'aria_score', title: 'ARIA Score' },
    { id: 'aria_notes', title: 'ARIA Notes' },
    { id: 'keywords_status', title: 'Keywords Status' },
    { id: 'keywords_score', title: 'Keywords Score' },
    { id: 'keywords_notes', title: 'Keywords Notes' },
    { id: 'content_status', title: 'Content Status' },
    { id: 'content_score', title: 'Content Score' },
    { id: 'content_notes', title: 'Content Notes' },
    { id: 'images_status', title: 'Images Status' },
    { id: 'images_score', title: 'Images Score' },
    { id: 'images_notes', title: 'Images Notes' },
    { id: 'links_status', title: 'Links Status' },
    { id: 'links_score', title: 'Links Score' },
    { id: 'links_notes', title: 'Links Notes' },
    { id: 'robots_status', title: 'Robots Status' },
    { id: 'robots_score', title: 'Robots Score' },
    { id: 'robots_notes', title: 'Robots Notes' },
    { id: 'mobile_status', title: 'Mobile Status' },
    { id: 'mobile_score', title: 'Mobile Score' },
    { id: 'mobile_notes', title: 'Mobile Notes' },
  ];
  const csvWriterInstance = createObjectCsvWriter({
    path: 'audit_results.csv',
    header: csvHeader
  });
  const csvRecords = results.map(r => {
    const record = { url: r.url, lang: r.lang, overallScore: r.overallScore };
    Object.keys(r).forEach(key => {
      if (typeof r[key] === 'object' && r[key] !== null) {
        record[`${key}_status`] = r[key].status;
        record[`${key}_score`] = r[key].score;
        record[`${key}_notes`] = r[key].notes;
      }
    });
    return record;
  });
  await csvWriterInstance.writeRecords(csvRecords);
  // JSON summary
  const summary = {
    totalPages: results.length,
    avgScore: results.reduce((a, b) => a + b.overallScore, 0) / results.length,
    issues: {}
  };
  results.forEach(r => {
    Object.keys(r).forEach(key => {
      if (typeof r[key] === 'object' && r[key] !== null && r[key].status !== 'pass') {
        if (!summary.issues[key]) summary.issues[key] = 0;
        summary.issues[key]++;
      }
    });
  });
  fs.writeFileSync('audit_summary.json', JSON.stringify(summary, null, 2));
  console.log(`Audited ${summary.totalPages} pages. Avg score: ${summary.avgScore.toFixed(2)}`);
  console.log('Top issues:', summary.issues);
}

main().catch(console.error);