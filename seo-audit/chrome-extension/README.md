# Instant AI SEO Analyzer Chrome Extension

A modern Chrome Extension for instant, client-side SEO analysis using AI. Built with TypeScript, React, Webpack, and Tailwind CSS.

## Features
- Analyze meta tags, headings, links, images, schema, and Core Web Vitals
- Modern popup dashboard with tabs, scores, issues, and quick fixes
- CSV export, settings page, and context menu integration
- Fully client-side, privacy-friendly

## Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Development build (with watch/hot reload):**
   ```bash
   npm run dev
   ```
   - Output is in `/dist`.
   - Load `/dist` as an unpacked extension in Chrome.

3. **Production build:**
   ```bash
   npm run build
   ```

4. **Package for release:**
   ```bash
   npm run zip
   ```
   - Creates `instant-ai-seo-analyzer.zip` for Chrome Web Store upload.

## Deployment Checklist

- [ ] **Manifest validation:** Ensure `manifest.json` is valid and uses Manifest V3.
- [ ] **Icon generation:** Provide 16x16, 48x48, 128x128 PNG icons in `/public`.
- [ ] **Screenshots:** Add at least 2 screenshots (1280x800 recommended) for Chrome Web Store.
- [ ] **Privacy policy:** If collecting any user data, provide a privacy policy link.
- [ ] **Store listing optimization:** Write a clear, keyword-rich description and feature list.
- [ ] **Test on multiple sites and Chrome versions.**

## Settings & Customization
- Access the settings page from the popup (gear icon).
- Customize analysis depth, enable/disable checks, and set scoring weights.
- Export/import settings as JSON.

## Contribution
PRs and issues welcome!

---
MIT License
